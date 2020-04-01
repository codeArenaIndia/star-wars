import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import swapi from 'swapi-node';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth,setIsAuth] = useState(false);
  const [loginError,setLoginError] = useState(false);
  const [loading,setLoading] = useState(false);

  if (isAuth) {
    return <Redirect to="/planets"/>
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
          localStorage.setItem('user',JSON.stringify({"isLoggedIn":true,"username":username}));
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
      <h1 className="col-md-5 title">Star Wars Database</h1>
      <h2 className="col-md-12 login-title text-white">Login</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" >
          <label className="text-white">Username</label>
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
        <Button block  disabled={!validateForm()} type="submit">
            {loading ? "Loading..." : "Login"}
        </Button>
        {loginError ? (<div style={{marginTop:"20px"}} className="alert alert-danger alert-dismissible fade show">Invalid Credentials</div>) : ("")}
      </form>
    </div>
  );
}