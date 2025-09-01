//  implement the home page UI here.
import React from "react";

// compoents imports
import Login from "../components/Login";
import RegisterButton from "../components/navbar/RegisterButton";
import Courses from "../components/Courses";
import Explore from "../components/navbar/Explore";
import Search from "../components/navbar/Search";
import Avatar from "../components/navbar/ProfileIcon";
import LoginButton from "../components/navbar/LoginButton";
import Logo from "../components/navbar/Logo";
const Home = () => {
  return (
    //  write home page UI code here
    <div className="grid grid-flow-col grid-rows-3 gap-4" >
      {/* Landing Page */}
    
       <nav className="grid grid-cols-7 bg-blue-400">
        <Explore />
        <Search />
        <Logo />
        <LoginButton />
        <RegisterButton />
        <Avatar />
       </nav>

       
      <main className="bg-blue-400 mt-[20px]" >
        <p className="font-serif tracking-tight">Ready to reimagine your career?</p>
        <p className="font-serif tracking-tight">Get the skills and real-world experience employers want with Career Accelerators.</p>
        
        <Courses />
      </main>

    </div>

  );
};

export default Home;
