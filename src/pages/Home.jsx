import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaGithub } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import BlurText from "../components/BlurText";
import DecryptedText from "../components/DecryptedText";
import LightRays from "../components/LightRays";


const Home = () => {
  return (
    <>
      
          <Navbar />
        <section
          id="home"
          className="relative z-0 min-h-screen flex flex-col justify-center items-center text-white mx-auto overflow-hidden"
        >
          {/* 🔵 Light Rays Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.8}
              lightSpread={1.5}
              rayLength={1.7}
              followMouse={true}
              mouseInfluence={0.4}
              noiseAmount={0.1}
              distortion={0.1}
              className="custom-rays"
            />
          </div>
          {/* Main Container */}
          <div className=" flex flex-col py-6 items-center justify-between gap-12 relative z-10">
            {/* Text */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-bold mb-8 mx-auto inline-block"
              >
                Hi, I'm{" "}
                <BlurText
                  text="Aafaque Nazir"
                  delay={500}
                  animateBy="words"
                  direction="top"
                  className="text-cyan-400 text-4xl md:text-6xl font-bold mt-2"
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-lg mb-6 mx-auto md:mx-0"
              >
                <DecryptedText
                  text="A frontend developer crafting clean & interactive user experiences with React, Tailwind, and animation."
                  animateOn="view"
                  revealDirection="center"
                />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex gap-4 justify-center mx-auto"
              >
                <a
                  href="/AafaqueResume.pdf"
                  download
                  className="text-center px-6 py-3 text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition ease-in duration-300 shadow-lg hover:shadow-xl"
                >
                  <PiReadCvLogoFill className="inline-block mr-2" /> CV
                </a>
                <a
                  href="https://github.com/Aafaque-Nazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center px-6 py-3 text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition ease-in duration-300 shadow-lg"
                >
                  <FaGithub className="inline-block mr-2" /> GitHub
                </a>
              </motion.div>
            </div>

            {/* RIGHT: Card */}
            
            
          </div>
        </section>
    </>
  );
};

export default Home;
