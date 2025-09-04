// courses code here
import React from "react";
import CourseCards from "./main/CourseCards"; 
// use axios here, similar to register and login
const Courses = () => {
  
  return <div className={"flex justify-between"}>
    
      <CourseCards />
    </div>;
};

export default Courses;
