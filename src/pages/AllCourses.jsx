import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RetroCards from '../components/RetroCards'; 
import Gridlines from 'react-gridlines';


// ✅ IMPORT ALL IMAGES
import img1 from "../assets/origbig1.png";
import img2 from "../assets/origbig2.png";
import img3 from "../assets/origbig3.png";
import img4 from "../assets/origbig4.png";
import img5 from "../assets/origbig5.png";
import img6 from "../assets/origbig6.png";
import banner from "../assets/banner3.gif";

const CourseItems = [
  {
    id: 1,
    image: img1,
    title: "Our Planet, Our Home",
    description: "Explore the fundamentals of our environment, its ecosystems, and the importance of protecting our planet.",
    link: "/EduQuest/courses/coming-soon",  // ✅ fixed
    category: 'Beginner',
    tags: ['Beginner', 'Environment'],  
  },
  {
    id: 2,
    image: img2,
    title: "Jungle Detectives",
    description: "Dive into the world of wildlife and ecosystems, learning to observe and understand nature around us.",
    link: "/EduQuest/courses/jungle", // ✅ fixed
    tags: ['Intermediate', 'Animals'],
    category: 'Animals',
  },
  {
    id: 3,
    image: img3,
    title: "ZooTopia",
    description: "Step into the wild and explore the fascinating world of animals.",
    link: "/EduQuest/courses/zoo", // ✅ fixed
    tags: ['Beginner', 'Animals'],
    category: 'Animals',
  },
  {
    id: 4,
    title: 'Ocean Mysteries',
    image: img4,
    description: 'Uncover the secrets of the deep blue sea.',
    link: "/EduQuest/courses/coming-soon",
    tags: ['Beginner', 'Ocean'],
    category: 'Ocean',
  },
  {
    id: 5,
    title: 'Climate Guardians',
    image: img5,
    description: 'Learn about climate change.',
    link: "/EduQuest/courses/coming-soon",
    tags: ['Advanced', 'Conservation'],
    category: 'Conservation',
  },
  {
    id:6,
    title: 'Plastic Pirates',
    image: img6,
    description: 'Join the fight against plastic pollution.',
    link: "/EduQuest/courses/coming-soon",
    tags: ['Intermediate', 'Pollution'],
    category: 'Pollution',
  }
];

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = CourseItems.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' ||
      course.category?.toLowerCase() === activeCategory.toLowerCase() ||
      course.tags?.some(tag => tag.toLowerCase() === activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Header />

      {/* Banner */}
      <div 
        className="relative w-full h-[20rem] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }} // ✅ fixed
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
          <div className="bg-yellow-400 border-4 border-yellow-600 rounded-lg p-4 shadow-lg mb-4">
            <h1 className="text-4xl uppercase text-center" style={{ fontFamily: "heading" }}>
              Explore The World Of EduQuest
            </h1>
          </div>

          <SearchBar    
            courses={CourseItems} 
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      {/* Courses Section */}
      <div className="min-h-screen relative flex flex-col items-center bg-[#01091b]">
        
        <Gridlines
          cellWidth={25}
          cellHeight={30}
          lineColor="rgba(255,255,255,0.08)"
          className="absolute inset-0 pointer-events-none z-10"
        />

        <div className="mt-10 w-full max-w-5xl relative z-20"> 

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-4 text-white">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm uppercase ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-30 px-4">
            {filteredCourses.map(course => (
              <RetroCards
                key={course.id}
                title={course.title}
                desc={course.description}
                source={course.image} // ✅ correct
                tags={course.tags}
              >
                {course.link && (
                  <a
                    href={course.link}
                    className="bg-pink-300 hover:bg-pink-600 text-white px-4 py-2 rounded mt-2 inline-block"
                  >
                    Start Quest
                  </a>
                )}
              </RetroCards>
            ))}
          </div>
        </div>  
      </div>
    </div>
  );
};

export default AllCourses;