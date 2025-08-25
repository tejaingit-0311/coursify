// login code herein
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Toaster, toast} from "sonner";
// import { config } from "dotenv";
// config();
const Login = () => {

  const [userDetails, setUserDetails] = useState(
      {
        username : "",
        password : ""
      }
  );
  const [responseMessage, setResponseMessage] = useState("");

  function handleInput(event){
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    console.log(fieldName,", ", fieldValue);
    //dynamically pick inputs: tag's name : value 
    setUserDetails((prev)=>{
      return {...prev, [fieldName] : fieldValue}
    });
   
  }

  // call the functions onClick of button.
  async function handleLogin(event) {
    console.log(userDetails);
    event.preventDefault();
    await axios.post(
      `http://localhost:3001/users/signin?username=${userDetails.username}&password=${userDetails.password}`, 
      {
        headers:{
          'Content-Type': 'application/json',
        }
      }
    )
    .then((response)=>{
      console.log(response);
      // alert(response.data.data.message);
      //set-token:
      localStorage.setItem("token", response.data.data.token);
      toast.success(response.data.data.message);

    })
    .catch((error)=>{
      console.error(error);
      //n/w error: 
      if(!error.status)
        toast.error(error.message);
      //sign-in error:  
      else
        toast.error(error.response.data.error.message);
    });
  }
  return <div>
    <Toaster />
    <form name="sign-in-form" onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" name="username" value={userDetails.username} placeholder="Enter Username" id="username" onChange={handleInput} required/>
      </label>
      <br /> <br />

      <label>
        Password:
        <input type="password" name="password" value={userDetails.password} placeholder="Enter Password" id="password" onChange={handleInput} required/>
      </label>
      <br /> <br />

      <button type="submit">Submit</button>
    </form>
    {responseMessage}
  </div>;
};

export default Login;
