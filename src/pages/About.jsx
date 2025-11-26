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
  { icon: <SiJavascript title="JavaScript" />, name: "JavaScript", color: "#F0DB4F" },
  { icon: <SiTailwindcss title="Tailwind CSS" />, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: <SiTypescript title="TypeScript" />, name: "TypeScript", color: "#3178C6" },
  { icon: <SiNodedotjs title="Node.js" />, name: "Node.js", color: "#339933" },
  { icon: <SiGit title="Git" />, name: "Git", color: "#F05032" },
  { icon: <SiRedux title="Redux" />, name: "Redux", color: "#764ABC" },
  { icon: <SiHtml5 title="HTML5" />, name: "HTML5", color: "#E34F26" },
  { icon: <SiCss3 title="CSS3" />, name: "CSS3", color: "#1572B6" },
  { icon: <SiFramer title="Framer Motion" />, name: "Framer", color: "#0055FF" },
  { icon: <SiPostgresql title="PostgreSQL" />, name: "PostgreSQL", color: "#4169E1" },
  { icon: <SiSupabase title="Supabase" />, name: "Supabase", color: "#3ECF8E" },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 text-white overflow-hidden bg-slate-950"
      aria-labelledby="about-heading"
    >
      {/* Premium Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950" />

      {/* 🌟 Content */}
      <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          id="about-heading"
          className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        {/* Bio */}
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Hey there 👋 I’m{" "}
            <span className="text-cyan-300 font-semibold">Aafaque Nazir</span>, a{" "}
            <span className="text-cyan-300 font-semibold">Frontend Developer</span> based in{" "}
            <span className="text-cyan-300 font-semibold">Navi Mumbai</span>.  
            I craft sleek, interactive, and high-performing web experiences using{" "}
            <span className="text-cyan-300 font-semibold">React</span>,{" "}
            <span className="text-cyan-300 font-semibold">Next.js</span>, and{" "}
            <span className="text-cyan-300 font-semibold">Tailwind CSS</span>.
            <br />
            <br />
            My work is guided by precision and passion — every component, animation, and pixel has a purpose.
            I love blending aesthetics with usability, turning complex ideas into seamless digital experiences.
            <br />
            <br />
            <span className="block mt-6 text-sm italic text-gray-500 border-t border-white/10 pt-4">
              “Design is intelligence made visible — and code is how I give it life.”
            </span>
          </p>
        </motion.div>



        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 w-full max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
            Education
          </h3>

          <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-8 space-y-12">
            {/* BSc IT */}
            <div className="relative pl-8 md:pl-12 group">
              {/* Dot */}
              <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>
              
              <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-800/50">
                <h4 className="text-xl md:text-2xl font-bold text-white">Bachelor of Science in Information Technology</h4>
                <p className="text-cyan-400 font-medium mt-1">University of Mumbai</p>
                <span className="inline-block mt-2 px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">
                  Aug 2021 - May 2024
                </span>
              </div>
            </div>

            {/* HSC */}
            <div className="relative pl-8 md:pl-12 group">
              <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(20,184,166,0.6)]"></span>
              
              <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300 hover:bg-slate-800/50">
                <h4 className="text-xl md:text-2xl font-bold text-white">HSC Science</h4>
                <p className="text-teal-400 font-medium mt-1">Maharashtra State Board</p>
                <span className="inline-block mt-2 px-3 py-1 bg-teal-500/10 text-teal-300 text-xs rounded-full border border-teal-500/20">
                  Jul 2021
                </span>
              </div>
            </div>

            {/* SSC */}
            <div className="relative pl-8 md:pl-12 group">
              <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-950 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(168,85,247,0.6)]"></span>
              
              <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-800/50">
                <h4 className="text-xl md:text-2xl font-bold text-white">SSC</h4>
                <p className="text-purple-400 font-medium mt-1">Maharashtra State Board</p>
                <span className="inline-block mt-2 px-3 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20">
                  Jun 2019
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subtle Signature Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-gray-500 text-sm italic"
        >
          Building interfaces that feel alive ✨
        </motion.div>
      </div>
    </section>
  );
};

export default About;