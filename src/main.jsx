import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import RetroButton from "../components/RetroButton";
import Gridlines from "react-gridlines";

const SelectAge = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [ageCategory, setAgeCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading user information...</div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ageCategory) {
      setError("Please select an age category");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ✅ FIX: use maybeSingle instead of single
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (existingProfile) {
        await supabase
          .from("profiles")
          .update({ age_category: ageCategory })
          .eq("id", user.id);
      } else {
        await supabase
          .from("profiles")
          .insert([{
            id: user.id,
            name: user.firstName || user.fullName || "Anonymous",
            points: 0,
            age_category: ageCategory
          }]);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Error saving your age category. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const ageCategories = [
    { value: "kids", label: "Kids (6-12)", emoji: "🧒" },
    { value: "teens", label: "Teens (13-18)", emoji: "👦" },
    { value: "adults", label: "Adults (19+)", emoji: "👨" }
  ];

  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      <Gridlines
        cellWidth={25}
        cellHeight={30}
        lineColor="rgba(255,255,255,0.1)"
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[#12122b] border-2 border-[#68696a] rounded-2xl p-8 max-w-2xl w-full"
        >
          <h1 className="text-3xl text-white text-center mb-6">
            Select Age Category
          </h1>

          {ageCategories.map((cat) => (
            <div
              key={cat.value}
              className={`p-4 border rounded mb-3 cursor-pointer ${
                ageCategory === cat.value ? "border-blue-500" : ""
              }`}
              onClick={() => setAgeCategory(cat.value)}
            >
              {cat.emoji} {cat.label}
            </div>
          ))}

          {error && <p className="text-red-400">{error}</p>}

          {/* ✅ FIX: button type submit only */}
          <RetroButton
            text={loading ? "Loading..." : "Start Learning"}
            type="submit"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default SelectAge;