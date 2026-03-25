import React from "react";

function Reading() {
  return (
    <div id="read" className="reading-container">
      <div className="reading-header">
        <h1 className="reading-title">[ 🎥 Watch Our Latest Video ]</h1>
      </div>

      <section className="reading-video">
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/yM_PpNJwaXc"
            title="YouTube video player"
            style={{ border: "none" }}   // ✅ modern way
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Reading;