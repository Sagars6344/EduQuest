import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import RetroButton from "../components/RetroButton";
import Gridlines from "react-gridlines";

const SelectAge = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [ageCategory, setAgeCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ FIX 1: Proper loading handling
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading user...</div>
      </div>
    );
  }

  // ❌ user null case handle
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Please login first</div>
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
      // ✅ FIX 2: safer query (no crash if not found)
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingProfile) {
        // update
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ age_category: ageCategory })
          .eq("id", user.id);

        if (updateError) throw updateError;
      } else {
        // insert
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              name: user.firstName || user.fullName || "Anonymous",
              points: 0,
              age_category: ageCategory,
            },
          ]);

        if (insertError) throw insertError;
      }

      navigate("/dashboard");

    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const ageCategories = [
    { value: "kids", label: "Kids (6-12)", emoji: "🧒", description: "Fun and interactive learning" },
    { value: "teens", label: "Teens (13-18)", emoji: "👦", description: "Engaging challenges and projects" },
    { value: "adults", label: "Adults (19+)", emoji: "👨", description: "In-depth environmental knowledge" },
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
        <div className="bg-[#12122b] border-2 border-[#68696a] rounded-2xl p-8 shadow-xl max-w-2xl w-full">

          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "heading" }}>
              Welcome to EduQuest 🎮
            </div>

            <p className="text-lg text-white" style={{ fontFamily: "regular" }}>
              Let's personalize your learning journey
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Welcome, {user.firstName || user.fullName || "User"}!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-white text-xl font-bold mb-4">
                Select Your Age Category
              </label>

              <div className="space-y-3">
                {ageCategories.map((category) => (
                  <div
                    key={category.value}
                    onClick={() => setAgeCategory(category.value)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      ageCategory === category.value
                        ? "border-[#14ADFF] bg-[#14ADFF]/10"
                        : "border-[#68696a] hover:border-[#14ADFF]/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{category.emoji}</span>

                      <div>
                        <h3 className="text-white font-bold text-lg">{category.label}</h3>
                        <p className="text-gray-300 text-sm">{category.description}</p>
                      </div>

                      <div className="ml-auto">
                        <input
                          type="radio"
                          checked={ageCategory === category.value}
                          onChange={() => setAgeCategory(category.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-center p-3 bg-red-400/10 border border-red-400 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <RetroButton
                text={loading ? "Setting up..." : "Start Learning!"}
                disabled={!ageCategory || loading}
                className="px-8 py-3 text-lg"
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectAge;