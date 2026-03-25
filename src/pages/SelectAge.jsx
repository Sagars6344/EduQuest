const handleSubmit = async (e) => {
  e.preventDefault();

  if (!ageCategory) {
    setError("Please select an age category");
    return;
  }

  setLoading(true);
  setError("");

  try {
    // safe fetch
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(); // 🔥 FIX

    if (fetchError) throw fetchError;

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ age_category: ageCategory })
        .eq("id", user.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([{
          id: user.id,
          name: user.firstName || user.fullName || "Anonymous",
          points: 0,
          age_category: ageCategory
        }]);

      if (insertError) throw insertError;
    }

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    setError("Error saving your age category");
  } finally {
    setLoading(false);
  }
};