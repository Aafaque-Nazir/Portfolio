import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaGithub } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";
import BlurText from "../components/BlurText";
import DecryptedText from "../components/DecryptedText";
import UserCard from "../components/UserCard";

const Home = () => {
  return (
    <>
    <Navbar/>

    <section className=" relative -z-10 min-h-screen flex flex-col justify-center items-center px-10 text-white overflow-hidden">

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto flex flex-col-reverse  md:flex-row items-center justify-between gap-28 py-20 relative z-10">
  
        {/* LEFT: Text */}
        <div className="text-center md:text-left flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 mx-auto inline-block"
          >
            Hi, I'm <BlurText
  text="Aafaque Nazir"
  delay={500}
  animateBy="words"
  direction="top"
  className="text-cyan-400 text-4xl md:text-6xl  font-bold mt-2 "
/>
          </motion.h1>
          <div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-lg mb-6"
            >
<DecryptedText
  text=" A frontend developer crafting clean & interactive user experiences with React, Tailwind, and animation."
  animateOn="view"
  revealDirection="center"
/>
          </motion.p>
  </div>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-4 justify-center md:justify-start">
            <a
  href="/Aafaque_Resume.pdf"
  download
  className="text-center px-6 py-3   text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition ease-in duration-300 shadow-lg hover:shadow-xl"
>
  <PiReadCvLogoFill className="inline-block mr-2"/> CV 
</a>
<a 
href="https://github.com/Aafaque-Nazir"
target="_blank"
rel="noopener noreferrer"
className="text-center px-6 py-3 text-cyan-400 font-semibold border border-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-black transition ease-in duration-300 shadow-lg"
>
<FaGithub className="inline-block mr-2" />GitHub
</a>

          </motion.div>
        </div>

        {/* RIGHT: Card*/}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        className=" w-72 mb-26 md:mb-88  md:w-[400px] h-[200px] -mt-4">
          <UserCard
           />
        </motion.div>
          </div>
    </section>
    </>
  );
};

export default Home;
