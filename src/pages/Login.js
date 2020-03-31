import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import swapi from 'swapi-node';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
//import { Redirect } from 'react-router-dom';
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth,setIsAuth] = useState(false);
  
  if (isAuth) {
    return <Redirect to="/planets"/>
  }
  
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try{
        const response =  await swapi.get(`https://swapi.co/api/people/?search=${username}&format=json`);
        if(username === response.results[0].name && password === response.results[0].birth_year){
          localStorage.setItem('user',JSON.stringify({"isLoggedIn":true,"username":username}));
          console.log(response.results);
          setIsAuth(true);
        }
        else {
          console.log("error");
        }
    } catch (err){
      //  setError(err)
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" >
          <label>Email</label>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <label>Password</label>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block  disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}