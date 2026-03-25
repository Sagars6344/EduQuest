import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"; // ✅ fixed case
import RetroButton from "../components/RetroButton";
import RetroCards from "../components/RetroCards";
import Gridlines from "react-gridlines";

// ✅ IMPORT IMAGES
import img1 from "../assets/origbig1.png";
import img4 from "../assets/origbig4.png";
import img5 from "../assets/origbig5.png";
import img6 from "../assets/origbig6.png";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner4 from "../assets/banner4.gif";

const ComingSoon = () => {
  const navigate = useNavigate();

  const comingSoonCourses = [
    { 
      title: "Our Planet, Our Home", 
      description: "Explore the fundamentals of our environment.",
      image: img1,
      points: 10,
      status: "Coming Soon"
    },
    { 
      title: "Ocean Mysteries", 
      description: "Uncover the secrets of the deep blue sea.",
      image: img4,
      points: 10,
      status: "Coming Soon"
    },
    { 
      title: "Climate Guardians", 
      description: "Learn about climate change.",
      image: img5,
      points: 10,
      status: "Coming Soon"
    },
    { 
      title: "Plastic Pirates", 
      description: "Join the fight against plastic pollution.",
      image: img6,
      points: 10,
      status: "Coming Soon"
    },
    { 
      title: "Recycling Basics", 
      description: "Learn how to recycle materials.",
      image: banner2,
      points: 10,
      status: "Coming Soon"
    },
    { 
      title: "Save Water", 
      description: "Discover ways to conserve water.",
      image: banner1,
      points: 10,
      status: "Coming Soon"
    },
    { 
      title: "Green Energy", 
      description: "Explore renewable energy.",
      image: banner4,
      points: 10,
      status: "Coming Soon"
    }
  ];

  return (
    <div className="relative bg-[#FEF3C6] min-h-screen overflow-hidden">

      <Gridlines
        cellWidth={25}
        cellHeight={30}
        lineColor="rgba(0,0,0,0.08)"
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-20 bg-black/90 backdrop-blur-sm">
        <Header />
      </div>
      
      {/* ✅ Banner fixed */}
      <div className="relative z-10 h-70 overflow-hidden">
        <img src={banner2} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 pt-8 pb-16 text-black">

        <div className="container mx-auto px-6 text-center mb-12">
          <div className="text-4xl font-bold mb-4">
            Coming Soon! 🚀
          </div>
          <p className="text-xl mb-8">
            Exciting new courses are being developed.
          </p>
        </div>

        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Upcoming Courses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {comingSoonCourses.map((course, idx) => (
              <div key={idx} className="opacity-75 hover:opacity-90">
                <RetroCards
                  title={course.title}
                  desc={course.description}
                  source={course.image} // ✅ fixed
                  tags={[`+${course.points} pts`, course.status]}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-sm font-bold">
                      {course.status}
                    </div>
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </RetroCards>
              </div>
            ))}
          </div>

          {/* ✅ Routing fixed */}
          <div className="flex justify-center space-x-4">
            <RetroButton 
              text="Back to Dashboard" 
              onClick={() => navigate("/EduQuest/dashboard")}
            />
            <RetroButton 
              text="Available Courses" 
              onClick={() => navigate("/EduQuest/all-courses")}
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-black/90 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  );
};

export default ComingSoon;