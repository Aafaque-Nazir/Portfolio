// sections/About.jsx
"use client";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiGit,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiPostgresql,
  SiSupabase,
} from "react-icons/si";

const skills = [
  { icon: <SiReact title="React" />, name: "React", color: "#61DAFB" },
  { icon: <SiNextdotjs title="Next.js" />, name: "Next.js", color: "#ffffff" },
  {
    icon: <SiJavascript title="JavaScript" />,
    name: "JavaScript",
    color: "#F0DB4F",
  },
  {
    icon: <SiTailwindcss title="Tailwind CSS" />,
    name: "Tailwind CSS",
    color: "#06B6D4",
  },
  {
    icon: <SiTypescript title="TypeScript" />,
    name: "TypeScript",
    color: "#3178C6",
  },
  { icon: <SiNodedotjs title="Node.js" />, name: "Node.js", color: "#339933" },
  { icon: <SiGit title="Git" />, name: "Git", color: "#F05032" },
  { icon: <SiRedux title="Redux" />, name: "Redux", color: "#764ABC" },
  { icon: <SiHtml5 title="HTML5" />, name: "HTML5", color: "#E34F26" },
  { icon: <SiCss3 title="CSS3" />, name: "CSS3", color: "#1572B6" },
  {
    icon: <SiFramer title="Framer Motion" />,
    name: "Framer",
    color: "#0055FF",
  },
  {
    icon: <SiPostgresql title="PostgreSQL" />,
    name: "PostgreSQL",
    color: "#4169E1",
  },
  { icon: <SiSupabase title="Supabase" />, name: "Supabase", color: "#3ECF8E" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full h-screen flex flex-col justify-center items-center px-4 md:px-6 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* 🌟 Content Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left: Bio & Identity */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2
            id="about-heading"
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
          >
            About Me
          </h2>

          <div className="bg-slate-900/40 backdrop-blur-sm border-l-4 border-cyan-500 pl-6 py-4 rounded-r-xl">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
              I am a{" "}
              <span className="text-cyan-300 font-bold">
                Frontend-First Full Stack Developer
              </span>{" "}
              and{" "}
              <span className="text-teal-300 font-bold">Software Engineer</span>
              .
            </p>
            <p className="text-gray-400 mt-4 text-base md:text-lg">
              I specialize in architecting scalable{" "}
              <span className="text-white font-medium">Software Products</span>.
              My expertise bridges{" "}
              <span className="text-cyan-300">Advanced UI Engineering</span>{" "}
              (Next.js, Motion) with robust{" "}
              <span className="text-teal-300">SQL & NoSQL</span> backends.
            </p>
            <p className="text-gray-500 mt-4 italic text-sm">
              "Engineering pixel-perfect experiences backed by solid logic."
            </p>
          </div>
        </motion.div>

        {/* Right: Compact Education Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-md mx-auto md:ml-auto w-full"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-2">
            <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> Education
          </h3>

          <div className="relative border-l-2 border-white/10 pl-6 space-y-6">
            {/* BSc IT */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-black border-2 border-cyan-500 group-hover:scale-125 transition-transform"></div>
              <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                BSc in Information Technology
              </h4>
              <p className="text-cyan-400/80 text-sm">
                University of Mumbai • 2024
              </p>
            </div>

            {/* HSC */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-black border-2 border-teal-500 group-hover:scale-125 transition-transform"></div>
              <h4 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                HSC Science
              </h4>
              <p className="text-teal-400/80 text-sm">
                Maharashtra Board • 2021
              </p>
            </div>

            {/* SSC */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-black border-2 border-cyan-500 group-hover:scale-125 transition-transform"></div>
              <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                SSC
              </h4>
              <p className="text-cyan-400/80 text-sm">
                Maharashtra Board • 2019
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
