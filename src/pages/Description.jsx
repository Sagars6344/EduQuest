import React from 'react';
import Gridlines from 'react-gridlines';

// ✅ IMPORT ALL IMAGES
import desc1 from "../assets/desc1.png";
import desc2 from "../assets/desc2.png";
import desc3 from "../assets/desc3.png";
import desc4 from "../assets/desc4.png";
import battle from "../assets/battle.gif";
import rocket from "../assets/rocket.gif";
import friends from "../assets/friends.gif";

const Description = () => {
  return (
    <div id="desc" className="relative bg-slate-900 min-h-screen overflow-hidden">

      <Gridlines
        cellWidth={25}
        cellHeight={30}
        lineColor="rgba(255,255,255,0.03)"
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 space-y-32">

        {/* First Block */}
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div className="relative">
            <img src={desc1} alt="desc1" className="w-full h-80 object-cover rounded-lg" />
            <img src={battle} alt="battle" className="absolute h-60 w-60 top-[75%] left-[60%] transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-col">
            <p className="text-3xl font-bold text-white mb-4">
              Level Up Your Learning
            </p>
            <p className="text-lg text-white">
              Enhance your skills with interactive courses and hands-on projects.
            </p>
          </div>
        </div>

        {/* Second Block */}
        <div className="grid md:grid-cols-2 items-center gap-10 pt-30">
          <div className="flex flex-col order-last md:order-first">
            <p className="text-3xl font-bold text-white mb-4">
              Enhance Your Environmental Knowledge
            </p>
            <p className="text-lg text-white">
              Embark on a gamified journey to explore the environment.
            </p>
          </div>

          <div className="relative">
            <img src={desc2} alt="desc2" className="w-full h-60 object-cover rounded-lg" />
          </div>
        </div>

        {/* Third Block */}
        <div className="grid md:grid-cols-2 items-center gap-10 pt-30">
          <div className="relative">
            <img src={desc3} alt="desc3" className="w-full h-60 object-cover rounded-lg" />
            <img src={rocket} alt="rocket" className="absolute h-40 w-50 top-[75%] left-[60%] transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-col">
            <p className="text-3xl font-bold text-white mb-4">
              Create Your Eco-Projects
            </p>
            <p className="text-lg text-white">
              Share your achievements and explore ecological challenges.
            </p>
          </div>
        </div>

        {/* Fourth Block */}
        <div className="grid md:grid-cols-2 items-center gap-10 pt-40">
          <div className="flex flex-col order-last md:order-first">
            <p className="text-3xl font-bold text-white mb-4">
              Make friends along the way
            </p>
            <p className="text-lg text-white">
              Connect with fellow explorers and collaborate on projects.
            </p>
          </div>

          <div className="relative">
            <img src={desc4} alt="desc4" className="w-full h-60 object-cover rounded-lg" />
            <img src={friends} alt="friends" className="absolute h-40 w-50 top-[75%] left-[60%] transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Description;