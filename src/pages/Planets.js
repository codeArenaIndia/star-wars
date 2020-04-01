import React , {useState, useEffect } from 'react';
import swapi from 'swapi-node';
import { handleNavigationHelper, debounce ,updateCounter} from '../Components/Helper/Helper'
import "./Planets.css";
import { Link } from 'react-router-dom';
import Cards from '../Components/Presentational/Cards'

export default function Planets(){
  const [planets,setPlanets] = useState([]);
  const [page,setPage] = useState(1)
  const [count,setCount] = useState(null);
  const [next,setNext] = useState(null);
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState("none");
  const [restricted,setRestricted] = useState("");
  const [username,setUsername]= useState("");


  const getResults = async(queries,pages) =>{
    if(!updateCounter()){
      setPlanets([]);
      setRestricted("Maximum Api request limit reached. Please try after a minute.")
      return false;
    }
    else{
      setRestricted("")
    }
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
        setCount(response.count);
        if(maxPage > page){
          setNext(response.next);
        }else {
          setNext("done");
        }
    } catch (err){
        console.log('Error',err);
    }
    setLoading("none");
  }
  useEffect(()=>{
    getResults(query,page);
    setUsername(JSON.parse(localStorage.getItem('counter')).username);
  },[query,page]);
  
  const handleSearch = debounce(function(target) {
    setPlanets([]);
    setQuery(target.value);
    setPage(1);
  }, 1000);

  return (
    <div className="planetContainer col-md-12 npr">
      <header className="col-md-12 col-xs-12">
        <h1 className="col-md-5 title pull-left">Galactic Empire: Planets</h1>
        <div className="text-red col-md-4 pull-left" style={{padding: "15px"}}>Welcome {username.toUpperCase()}</div>
        <div className="col-md-3 pull-left">
            <Link to={{
                  pathname: '/login',
                  state: {
                    logout: true
                  }
            }}><button type="button" className="btn btn-danger transparent pull-right">Sign Out</button>
          </Link>
        </div>
      </header>
        <input type="search" className="searchBar col-md-3 pull-left" onChange={event=> handleSearch(event.target)} placeholder="Search Planets"/>
        <button type="button" className="loadmore-btn btn btn-success transparent pull-left" data-pointer={loading} onClick={event => setPage(handleNavigationHelper(event.target))} data-nav={next}>{loading === "block" ? "loading..." : "Load More"}</button>
        <p  className="count col-md-2 pull-left text-white">Showing: {planets.length} of {count ? count : 0}</p>
        <div className="planet-list col-md-12 col-xs-12 style-2 scrollbar">
          {restricted !== "" ? (<div class="alert alert-danger">{restricted}</div>) : ""}
            {planets.map((results,key) => (
                <Cards key={results.name +key} results={results}/>
            ))}
            {planets.length === 0 && loading === "none" ? (<p style={{color: "#fff"}}>No record found</p>) : ("")}
            <div className="spinner" style={{display: `${loading}`}}></div>
        </div>
    </div>
  )
}