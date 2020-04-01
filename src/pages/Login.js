import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import swapi from 'swapi-node';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
import { useLocation } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth,setIsAuth] = useState(false);
  const [loginError,setLoginError] = useState(false);
  const [loading,setLoading] = useState(false);
  const location = useLocation();

  if (isAuth) {
    return <Redirect to="/planets"/>
  }
  
  if (location.state && location.state.logout === true) {
    localStorage.removeItem("user");
  }
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try{
        const response =  await swapi.get(`https://swapi.co/api/people/?search=${username}&format=json`);
        if(username.toLowerCase() === response.results[0].name.toLowerCase() && password === response.results[0].birth_year){
          let timeNow = new Date();
          localStorage.setItem('user',JSON.stringify({"isLoggedIn":true,"username":username}));
          localStorage.setItem('counter',JSON.stringify({"count":1,"time": timeNow.getTime(),'username':username}));
          setIsAuth(true);
        }
        else {
          setLoginError(true);
        }
    } catch (err){
      setLoginError(true);
    }
    setLoading(false);
  }

  return (
    <div className="Login">
      <h1 className="col-md-5 title">Galactic Empire</h1>
      <h2 className="col-md-12 login-title text-white">Login to database</h2>
      <form onSubmit={handleSubmit}>
      <h5 className="col-md-12 login-title">May the force be with you</h5>
        <FormGroup controlId="username" >
          <label className="text-white">Username (case-insensitive)</label>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <label  className="text-white">Password</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block className="btn-success"  disabled={!validateForm()} type="submit">
            {loading ? "Loading..." : "Login"}
        </Button>
        {loginError ? (<div style={{marginTop:"20px"}} className="alert alert-danger alert-dismissible fade show">Invalid Credentials</div>) : ("")}
      </form>
    </div>
  );
}