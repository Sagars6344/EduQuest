import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import introVideo from "../assets/intro.mp4"; // ✅ important

export default function IntroVideo() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "s") {
        navigate("/EduQuest/all-courses"); // ✅ basename fix
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        className="w-full h-full object-cover"
        onEnded={() => navigate("/EduQuest/all-courses")} // ✅ basename fix
      >
        <source src={introVideo} type="video/mp4" />
      </video>

      <div className="absolute bottom-30 right-10 text-white text-lg bg-black/50 px-4 py-2 rounded-lg" style={{fontFamily:'heading'}}>
        Press <strong>S</strong> to skip
      </div>
    </div>
  );
}