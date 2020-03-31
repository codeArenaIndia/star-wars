import React , {useState, useEffect } from 'react';
import swapi from 'swapi-node';
import { handleNavigationHelper, debounce } from '../Components/Helper'
import "./Planets.css";

export default function Planets(){
  const [planets,setPlanets] = useState([]);
  const [page,setPage] = useState(1)
  const [count,setCount] = useState(null);
  const [next,setNext] = useState(null);
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const getResults = async(queries,pages) =>{
    setLoading(true);
    try{
        const response =  await swapi.get(`https://swapi.co/api/planets/?page=${pages}&format=json&search=${queries}`);
        var maxPage = response.count/10;
        if(planets.length !== 0){
          let res = [...planets,...response.results];
          setPlanets(res);
        }else {
          setPlanets(response.results);
        }
        console.log(response.results);
        setCount(response.count);
        if(maxPage >= page){
          console.log('innn');
          setNext(response.next);
        }else {
          setNext(null);
        }
    } catch (err){
        setError(err)
    }
    setLoading(false);
  }

  useEffect(()=>{
    getResults(query,page);
  },[query,page]);
  
  const handleNavigation = (target) =>{
    setPage(handleNavigationHelper(target));
  }
  
  const handleSearch = debounce(function(target) {
    setPlanets([]);
    setQuery(target.value);
    setPage(1);
  }, 250);

  const generateRandom = () =>{
   return Math.floor(Math.random() * 10);
  }


  return (
    <div className="planetContainer col-md-12">
      <header>
        <h1>Planets</h1>
        <input type="search" className="searchBar" onChange={event=> handleSearch(event.target)}/>
      </header>
      <>  
          <div className="planet-list col-md-12 col-xs-12">
                {planets.map((results,key) => (
                    <div key={results.name} className="plant-cards card col-md-3" style={{float:"left",margin:"10px"}}>
                      <div className={`card-body gradient${generateRandom()}`}>
                            <h5>{results.name}</h5>
                            <p>Population: {results.population}</p>
                            <p>Climate: {results.climate}</p>
                            <p>Rotation period: {results.rotation_period}</p>
                            <p>Surface water: {results.surface_water}</p>
                        </div>
                    </div>
                ))}
            </div>
        
      </>
      <button type="button" className="loadmore-btn btn btn-info" onClick={event => handleNavigation(event.target)} data-nav={next}>Load More</button>
    </div>
  )
}