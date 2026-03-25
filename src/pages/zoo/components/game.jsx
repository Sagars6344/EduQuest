import React from "react";
import testImage from "../../assets/test_image.png"; // ✅ correct import

function Game() {
  return (
    <div className="game-section">
      <div className="game-content">
        <p className="game-title">Learn by playing</p>

        <div className="game-text">
          <p>
            Dive into our interactive zoo adventure game! Explore, learn, and
            have fun while discovering the wonders of the animal kingdom.
          </p>
        </div>

        <div>
          <a
            href="/EduQuest/game/jungle_game.html" // ✅ fixed path
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="game-button">DIVE IN</button>
          </a>
        </div>
      </div>

      <div className="game-image">
        <img src={testImage} alt="Game preview" /> {/* ✅ fixed */}
      </div>
    </div>
  );
}

export default Game;