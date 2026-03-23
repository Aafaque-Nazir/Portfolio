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
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center px-4 md:px-6 py-24 lg:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* 🌟 Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: Bio & Identity */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left flex flex-col justify-center"
        >
          <h2
            id="about-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 lg:mb-6 bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent"
          >
            About Me
          </h2>

          <div className="bg-slate-900/40 backdrop-blur-sm border-l-4 border-cyan-500 pl-4 sm:pl-6 py-4 rounded-r-xl">
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
              I am a{" "}
              <span className="text-cyan-300 font-bold">
                Frontend-First Full Stack Developer
              </span>{" "}
              with a strong{" "}
              <span className="text-cyan-300 font-bold">Business Acumen</span>
              .
            </p>
            <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
              I don't just write code; I engineer scalable{" "}
              <span className="text-white font-medium">Solutions</span> that drive growth.
              My expertise bridges{" "}
              <span className="text-cyan-300">Advanced UI</span>{" "}
              with robust backends, always prioritizing business goals and user retention.
            </p>
            <p className="text-gray-500 mt-3 sm:mt-4 italic text-xs sm:text-sm">
              "Engineering pixel-perfect experiences that solve real business problems."
            </p>
          </div>
        </motion.div>

        {/* Right: Engineering Philosophy & Impact */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-lg lg:max-w-md mx-auto lg:ml-auto w-full flex flex-col gap-6 lg:gap-8"
        >
          {/* Section 1: Impact Metrics (Bento UI) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-center">
              <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-cyan-100 group-hover:to-cyan-400 transition-all">
                1M+
              </h3>
              <p className="text-sm font-medium text-cyan-500/80 mt-1 uppercase tracking-wider">
                Reqs Handled
              </p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-center">
              <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-cyan-100 group-hover:to-cyan-400 transition-all">
                100%
              </h3>
              <p className="text-sm font-medium text-cyan-500/80 mt-1 uppercase tracking-wider">
                Type Safe
              </p>
            </div>
          </div>

          {/* Section 2: Core Philosophy */}
          <div className="relative group rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-white/10 to-transparent">
            {/* Inner Content */}
            <div className="bg-slate-950/90 backdrop-blur-xl rounded-3xl p-6 h-full border border-white/5 relative z-10 transition-colors duration-500 group-hover:border-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <h3 className="text-xl font-bold mb-6 text-gray-100 flex items-center gap-3">
                <span className="w-6 h-1 bg-gradient-to-r from-cyan-400 to-cyan-400 rounded-full"></span>
                Engineering & Product Philosophy
              </h3>

              <ul className="space-y-5 relative z-20">
                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base group-hover:text-cyan-300 transition-colors">Zero Genericism</h4>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">I don't use out-of-the-box templates. Every pixel is customized for a premium experience.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform duration-300 delay-75">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base group-hover:text-cyan-300 transition-colors">Offensive Security</h4>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">Code is engineered assuming it's already under attack. Strict validation by default.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform duration-300 delay-150">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base group-hover:text-blue-300 transition-colors">Obsessive Performance</h4>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">Sub-second loading times aren't optimization features, they are baseline requirements.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform duration-300 delay-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base group-hover:text-cyan-300 transition-colors">Business-Centric Execution</h4>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">Code isn't just about syntax; it's about solving business limits, driving user retention, and maximizing ROI.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
