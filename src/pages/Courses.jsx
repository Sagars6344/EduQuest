import React from "react";
import { useNavigate } from "react-router-dom";
import RetroCards from "../components/RetroCards";
import CourseItems from "../components/CourseItems";
import Gridlines from "react-gridlines";
import RetroButton from "../components/RetroButton";

const Courses = () => {
  const navigate = useNavigate();

  const handleCourseClick = (link) => {
    navigate(link); // ✅ single navigation
  };

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">

      <Gridlines
        cellWidth={25}
        cellHeight={30}
        lineColor="rgba(255,255,255,0.1)"
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10">
        <p className="font-bold text-3xl text-center pt-[150px] text-white">
          Journey Through The World Of Environment
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-15 mt-12">
          {CourseItems.map((course, index) => (
            <div
              key={index}
              onClick={() => handleCourseClick(course.link)}
              className="cursor-pointer"
            >
              <RetroCards
                title={course.title}
                desc={course.description}
                source={course.image}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center pb-[150px]">
          <RetroButton 
            text={"Explore All Quests"} 
            onClick={() => navigate('/EduQuest/all-courses')} // ✅ fixed
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;