import React , {useState, useEffect } from 'react';
import swapi from 'swapi-node';
import { handleNavigationHelper, debounce } from '../Components/Helper'

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



  return (
    <div className="planetContainer">
        <input type="text" onChange={event=> handleSearch(event.target)}/>
        <p>Current page {page}</p>
        <p>Total: {count}</p>
        {
            loading ? (<p>Loading result...</p>) : 
            (<ul>
                {planets.map(results => (
                    <li key={results.name}>
                        {results.name}
                    </li>
                ))}
            </ul>)
        }
        {error && <div>Error: {error.message}</div>}
        <button type="button" onClick={event => handleNavigation(event.target)} data-nav={next}>More</button>
    </div>
  )
}