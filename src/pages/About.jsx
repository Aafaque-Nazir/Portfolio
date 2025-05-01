import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Navbar from "../components/Navbar";
import codingAnimation from "../assets/coding.json"; // Add your Lottie JSON here

const Home = () => {
  return (
    <>
    <Navbar/>
    <section className=" relative min-h-screen flex flex-col justify-center items-center px-10 text-white overflow-hidden">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto flex flex-col  md:flex-row items-center justify-between gap-20">
    
        {/* LEFT: Text */}
        <div className="text-center md:text-left flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Hi, I'm <span className="text-cyan-400">Aafaque Nazir</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-lg mb-6"
          >
            A frontend developer crafting clean & interactive user experiences with React, Tailwind, and animation.
          </motion.p>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-4 justify-center md:justify-start">
            <a
  href="/Aafaque_Resume.pdf"
  download
  className="px-6 py-3  text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:text-cyan-700 transition duration-300 shadow-lg hover:shadow-xl"
>
  Download CV
</a>
<a
  href="/Aafaque_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3  text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:text-cyan-700 transition duration-300 shadow-lg"
>
  View CV
</a>
<a 
href="https://github.com/Aafaque-Nazir"
target="_blank"
rel="noopener noreferrer"
className="text-center px-6 py-3 text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:text-cyan-700 transition duration-300 shadow-lg"
>
GitHub
</a>

          </motion.div>
        </div>

        {/* RIGHT: Lottie Animation */}
        <div className=" w-72 mb-26 md:mb-48  z-10 md:w-[400px] h-[200px]">
          <Lottie animationData={codingAnimation} loop={true} />
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-18 text-white text-lg opacity-70"
      >
        ↓ Scroll Down
      </motion.div>
    </section>
    </>
  );
};

export default Home;
