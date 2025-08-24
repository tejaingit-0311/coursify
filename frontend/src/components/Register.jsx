// register code here
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Register = () => {

  const [userDetails, setUserDetails] = useState(
        {
          username:"",
          email:"",
          password:""
        }
    );
  const [responseMessage, setResponseMessage] = useState("");

  // call the functions onClick of button.
  async function handleRegister(event) {
    event.preventDefault();
    //send to BE: /users/signup
      await axios.post(
        "http://localhost:3001/users/signup", 
        {
          username: userDetails.username,
          password: userDetails.password
        }, {
          headers: {
            "Content-Type" : "application/json"
          } 
        }    
      )
      .then((response)=>{
        alert(response.data.data.message);
        setResponseMessage(response.data.data.message);
      })
      .catch((error)=>{
        console.log(error.response);
        alert(error.response.data.error.message || "Error While sign-up");
        setResponseMessage(error.response.data.error.message);
      })
      
  }

  function handleInput(e){
    console.log(e.target.value);
    // expression:
    let fieldValue = e.target.value;
    let fieldName = e.target.name;
    setUserDetails((prev)=>{
      ({...prev, [fieldName] : fieldValue})
    });
    
    console.log(userDetails);
  }
  return <div>
    <form name="sign-up-form" onSubmit={handleRegister}>
      <label htmlFor="username" aria-required="true">Username:</label>
      <input type="text" id="username" name="username" value={userDetails.username} placeholder="enter username" onChange={handleInput} required/>
      <br /> <br />
      
      <label aria-required="true">
        Email:
        <input type="email" id="email" name="email" value={userDetails.email} placeholder="enter email" onChange={handleInput} required/>
      </label>
      <br /> <br />

      <label htmlFor="password" aria-required="true">Password:</label>
      <input type="password" id="password" name="password" value={userDetails.password} placeholder="enter password" onChange={handleInput} required/>
      <br /> <br />

      <button>Submit</button>
    </form>
    {responseMessage}
  </div>
};

export default Register;
