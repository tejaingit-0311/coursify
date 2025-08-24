//  implement the home page UI here.
import React from "react";

// compoents imports
import Login from "../components/Login";
import Register from "../components/Register";
import Courses from "../components/Courses";

const Home = () => {
  return (
    //  write home page UI code here
    <div>
      Home
      {/* LandingPage -> register or login -> in the nav bar register or login links -> if user was been already registered then either signin with different acc or navigate to login */}
      {/* <Register /> */}
      <Login />
    </div>

  );
};

export default Home;
