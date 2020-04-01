import React , {useState, useEffect } from 'react';
import swapi from 'swapi-node';
import { handleNavigationHelper, debounce } from '../Components/Helper'
import "./Planets.css";
import { Redirect } from 'react-router';
import Auth from '../Components/Auth'
import Cards from '../Components/Cards'

export default function Planets(){
  const [planets,setPlanets] = useState([]);
  const [page,setPage] = useState(1)
  const [count,setCount] = useState(null);
  const [next,setNext] = useState(null);
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState("none");


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
    console.log("rendered");
    getResults(query,page);
  },[query,page]);
  
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
          <button type="button" className="btn btn-danger pull-right">Sign Out</button>
        </div>
      </header>
          <div className="planet-list col-md-12 col-xs-12 style-2 scrollbar">
                {planets.map((results,key) => (
                    <Cards results={results}/>
                ))}
                {planets.length === 0 && loading === "none" ? (<p style={{color: "#fff"}}>No record found</p>) : ("")}
                <div className="spinner" style={{display: `${loading}`}}></div>
            </div>
      <button type="button" className="loadmore-btn btn btn-info" data-pointer={loading} onClick={event => setPage(handleNavigationHelper(event.target))} data-nav={next}>{loading == "block" ? "loading..." : "Load More"}</button>
    </div>
  )
}