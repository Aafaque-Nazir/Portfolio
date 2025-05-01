import React from "react";
import { motion } from "framer-motion";

const techLogos = [
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
  { name: "Redux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Tailwind CSS", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Framer Motion", url: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "GitHub", url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

const Logos = () => {
  const scrollingLogos = [...techLogos, ...techLogos, ...techLogos]; // Repeat logos for seamlessness

  return (
    <section className=" py-12 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-700">Frontend Technologies</h2>

      <div className="relative w-full overflow-hidden LogoGradient">
        <motion.div
          className="flex gap-12 py-6 w-max"
          animate={{ x: ["0%", "-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {scrollingLogos.map((tech, index) => (
            <img
              key={index}
              src={tech.url}
              alt={tech.name}
              title={tech.name}
              className="h-16 w-16 object-contain hover:scale-110 transition-transform duration-300"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Logos;
