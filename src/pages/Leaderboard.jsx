import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../SupabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer"; // ✅ fixed case
import RetroButton from "../components/RetroButton";
import Gridlines from "react-gridlines";
import { useNavigate } from "react-router-dom";

// ✅ import image
import banner from "../assets/origbig5.png";

const Leaderboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        let { data: leadersData } = await supabase
          .from("profiles")
          .select("name, points, age_category")
          .order("points", { ascending: false })
          .limit(10);

        setLeaders(leadersData || []);

        if (user) {
          let { data: userData } = await supabase
            .from("profiles")
            .select("name, points, age_category")
            .eq("id", user.id)
            .single();

          if (userData) {
            let { data: rankData } = await supabase
              .from("profiles")
              .select("id")
              .gte("points", userData.points)
              .order("points", { ascending: false });

            setUserRank({
              ...userData,
              rank: rankData ? rankData.length : 0
            });
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();

    const subscription = supabase
      .channel('leaderboard-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' },
        fetchLeaders
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#020618] min-h-screen overflow-hidden">

      <Gridlines
        cellWidth={25}
        cellHeight={30}
        lineColor="rgba(255,255,255,0.1)"
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-20 bg-black/90 backdrop-blur-sm">
        <Header />
      </div>

      {/* ✅ FIXED IMAGE */}
      <div className="relative z-10 h-32 overflow-hidden">
        <img src={banner} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 pt-8 pb-16">
        <div className="container mx-auto px-6 text-center mb-12">
          <div className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "heading" }}>
            🏆 Leaderboard
          </div>
        </div>

        {/* Leader list */}
        <div className="max-w-4xl mx-auto space-y-4">
          {leaders.map((leader, idx) => (
            <div key={idx} className="flex justify-between p-4 bg-[#12122b] rounded-lg text-white">
              <span>#{idx + 1} {leader.name}</span>
              <span>{leader.points} pts</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mt-12">
          <RetroButton 
            text="Back to Dashboard" 
            onClick={() => navigate("/EduQuest/dashboard")} // ✅ fixed
          />
          <RetroButton 
            text="Take Quiz" 
            onClick={() => navigate("/EduQuest/all-courses")} // ✅ fixed
          />
        </div>
      </div>

      <div className="relative z-20 bg-black/90 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  );
};

export default Leaderboard;