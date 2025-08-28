//  implement the home page UI here.
import React from "react";

// compoents imports
import LoginButton from "../components/navbar/LoginButton";
import Register from "../components/Register";
import Courses from "../components/Courses";
import Explore from "../components/navbar/Explore";
import Search from "../components/navbar/Search";
import Avatar from "../components/navbar/ProfileIcon";
import { colors } from "@mui/material";
import SignUpButton from "../components/navbar/SignupButton";
const Home = () => {
  return (
    //  write home page UI code here
    <div className="bg-blue-300" >
      {/* Landing Page */}
    
      <header>
        <nav style={{display: "flex", justifyContent:"space-evenly",alignItems:"center", boxShadow:"0px 2px 5px rgb(96, 165, 250)"}}>
          <Explore />
          <Search />
          <LoginButton />
          <SignUpButton />
          <Avatar />
        </nav>
      </header>
      
       {/* <main style={{backgroundColor:"red"}}>
          <p>Main Content</p>
       </main> */}

       {/* <footer style={{backgroundColor:"blue"}}>
          <p>Footer</p>
       </footer> */}

      {/* LandingPage -> register or login -> in the nav bar register or login links -> if user was been already registered then either signin with different acc or navigate to login */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Courses /> */}
    </div>

  );
};

export default Home;
