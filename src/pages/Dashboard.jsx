import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer"; // ✅ fixed case
import RetroButton from "../components/RetroButton";
import RetroCards from "../components/RetroCards";
import Gridlines from "react-gridlines";

// ✅ IMPORT IMAGES
import img1 from "../assets/origbig1.png";
import img2 from "../assets/origbig2.png";
import img3 from "../assets/origbig3.png";
import img4 from "../assets/origbig4.png";
import img5 from "../assets/origbig5.png";
import img6 from "../assets/origbig6.png";
import banner from "../assets/banner.gif";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner4 from "../assets/banner4.gif";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        let { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (!data || !data.age_category) {
          navigate("/EduQuest/select-age"); // ✅ fixed
          return;
        }
        
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, navigate]);

  const courses = {
    kids: [
      { title: "ZooTopia", description: "Explore animals.", link: "/EduQuest/courses/zoo", image: img3, points: 10 },
      { title: "Our Planet, Our Home", description: "Learn environment.", link: "/EduQuest/courses/coming-soon", image: img1, points: 10 },
      { title: "Ocean Mysteries", description: "Explore oceans.", link: "/EduQuest/courses/coming-soon", image: img4, points: 10 }
    ],
    teens: [
      { title: "Jungle Detectives", description: "Wildlife learning.", link: "/EduQuest/courses/jungle", image: img2, points: 10 },
      { title: "Climate Guardians", description: "Climate change.", link: "/EduQuest/courses/coming-soon", image: img5, points: 10 },
      { title: "Plastic Pirates", description: "Fight pollution.", link: "/EduQuest/courses/coming-soon", image: img6, points: 10 }
    ],
    adults: [
      { title: "Recycling Basics", description: "Learn recycling.", link: "/EduQuest/courses/coming-soon", image: banner2, points: 10 },
      { title: "Save Water", description: "Conserve water.", link: "/EduQuest/courses/coming-soon", image: banner1, points: 10 },
      { title: "Green Energy", description: "Renewable energy.", link: "/EduQuest/courses/coming-soon", image: banner4, points: 10 }
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  if (!profile) return null;

  const recommended = courses[profile.age_category] || [];

  return (
    <div className="relative bg-[#020618] min-h-screen overflow-hidden">

      <Gridlines
        cellWidth={25}
        cellHeight={30}
        lineColor="rgba(255,255,255,0.1)"
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-20 bg-black/90">
        <Header />
      </div>
      
      {/* ✅ Banner fixed */}
      <div className="relative z-10 h-100 overflow-hidden">
        <img src={banner} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 pt-8 pb-16">

        <div className="text-center mb-12">
          <div className="text-4xl font-bold text-white mb-4">
            Welcome back, {profile.name}!
          </div>

          <div className="flex justify-center gap-6 text-white mt-10">
            <div className="bg-[#12122b] p-4 rounded-lg">
              <div className="text-2xl text-[#14ADFF]">{profile.points || 0}</div>
              <div>Total Points</div>
            </div>
            <div className="bg-[#12122b] p-4 rounded-lg">
              <div className="text-2xl text-[#B4E50D]">{profile.age_category}</div>
              <div>Age Group</div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="container mx-auto px-6 mt-10">
          <h2 className="text-3xl text-white text-center mb-8">
            Recommended for You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recommended.map((course, idx) => (
              <div key={idx} onClick={() => navigate(course.link)} className="cursor-pointer">
                <RetroCards
                  title={course.title}
                  desc={course.description}
                  source={course.image}
                />
              </div>
            ))}
          </div>

          {/* ✅ Navigation fixed */}
          <div className="flex justify-center gap-4">
            <RetroButton 
              text="View All Courses" 
              onClick={() => navigate("/EduQuest/all-courses")}
            />
            <RetroButton 
              text="Leaderboard" 
              onClick={() => navigate("/EduQuest/leaderboard")}
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-black/90">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;