import React, { useState } from 'react';
import swapi from 'swapi-node';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    console.log(username);
    event.preventDefault();
    try{
        const response =  await swapi.get(`https://swapi.co/api/people/?search=${username}&format=json`);
        console.log(response.results[0].name,response.results[0].birth_year);
        if(username === response.results[0].name && password === response.results[0].birth_year){
          console.log('success');
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