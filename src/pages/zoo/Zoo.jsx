import React from "react";
import Header from "../../components/Header";
import Hero from "./components/Hero"; // ✅ fixed
import Game from "./components/Game"; // ✅ fixed
import Quiz from "../../components/course-components/Quiz"; // ✅ fixed spelling
import Footer from "../../components/Footer"; // ✅ fixed
import ZooQuestions from "./ZooQuestions";
import "../courses.css";

function Zoo(){
    return (
        <div>
            <Header />
            <Hero />
            <Game />
            <Quiz ques={ZooQuestions} quizType="zoo" />
            <Footer />
        </div>
    );
}

export default Zoo;