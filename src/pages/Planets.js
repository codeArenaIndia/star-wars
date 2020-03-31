import React , {useState, useEffect } from 'react';
import swapi from 'swapi-node';
import { handleNavigationHelper, debounce, generateRandom } from '../Components/Helper'
import "./Planets.css";
import { Redirect } from 'react-router';
import Auth from '../Components/Auth'

export default function Planets(){
  const [planets,setPlanets] = useState([]);
  const [page,setPage] = useState(1)
  const [count,setCount] = useState(null);
  const [next,setNext] = useState(null);
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState("none");
  const [error,setError] = useState(null); 
  const [signOut,setSignOut] = useState("");
  const [username,setUsername] = useState(JSON.parse(localStorage.getItem('user')).username);


  const updateApiRequestCount = () => {
    const currentCount = localStorage.getItem(username.replace(/ /g, "_"));
    localStorage.setItem(username.replace(/ /g, "_"),0);
  }

  const getResults = async(queries,pages) =>{
    setLoading("block");
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
        if(maxPage > page){
          setNext(response.next);
        }else {
          setNext("done");
        }
    } catch (err){
        setError(err)
    }
    setLoading("none");
  }
const checkLogin =() =>{
  if (!Auth()) {
    console.log('anfar aya');
    setSignOut(true);
  } 
}
  useEffect(()=>{
    checkLogin();
    getResults(query,page);
  },[query,page]);
  
  const handleNavigation = (target) =>{
    setPage(handleNavigationHelper(target));
  }
  
  const handleLogOut =()=>{
    localStorage.setItem('user',JSON.stringify({"isLoggedIn":false,"username":""}));
    setPage(0);
  }
  const handleSearch = debounce(function(target) {
    setPlanets([]);
    setQuery(target.value);
    setPage(1);
  }, 1000);

  return (
    <div className="planetContainer col-md-12 npr">
      <header className="col-md-12 col-xs-12">
        <h1 className="col-md-5 title pull-left">Star Wars Database: Planets</h1>
        <input type="search" className="searchBar col-md-3 pull-left" onChange={event=> handleSearch(event.target)} placeholder="Search Planets"/>
        <p  className="count col-md-2 pull-left">Showing: {planets.length} of {count}</p>
        <div className="col-md-2 pull-left">
          <button type="button" className="btn btn-danger pull-right" onClick={event=>handleLogOut()}>Sign Out</button>
        </div>
      </header>
      <>
          <div className="planet-list col-md-12 col-xs-12 style-2 scrollbar">
                {planets.map((results,key) => (
                    <div key={results.name} className="plant-cards card">
                      <div className="card-body">
                        <div className="card-box-body">
                            <p><span>Population:</span> <span  className="text-green bold">{results.population}</span></p>
                            <div className="width-100 climate-rotation">
                              <p className="width-50 pull-left"><span>Climate:</span> <span className="text-red bold">{results.climate}</span></p>
                              <p className="width-50 pull-left text-right"><span>Rotation period:</span><span className="text-red bold">{results.rotation_period}</span></p>
                            </div>
                            
                        </div>
                        <div className="card-box-name">
                          <p>{results.name}</p>
                        </div>
                      </div>
                      <div className="opacity-body">
                      <div className={`planet-img gradient${generateRandom()}`} style={{width: `${results.population.length*18}px`,height: `${results.population.length*18}px`}}></div>
                      </div>
                    </div>
                ))}
                {planets.length === 0 && loading === "none" ? (<p style={{color: "#fff"}}>No record found</p>) : ("")}
                <div className="spinner" style={{display: `${loading}`}}></div>
            </div>
      </>
      <button type="button" className="loadmore-btn btn btn-info" data-pointer={loading} onClick={event => handleNavigation(event.target)} data-nav={next}>{loading == "block" ? "loading..." : "Load More"}</button>
    </div>
  )
}