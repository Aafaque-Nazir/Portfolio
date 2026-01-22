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
            I’m{" "}
            <span className="text-cyan-300 font-semibold">Aafaque Nazir</span>,
            a{" "}
            <span className="text-cyan-300 font-semibold">
              Frontend-First Full Stack Developer
            </span>{" "}
            based in Navi Mumbai.
            <br />
            <br />I specialize in{" "}
            <span className="text-white font-medium">
              engineering digital experiences
            </span>{" "}
            that are visually immersive and technically sound. My core strength
            lies in{" "}
            <span className="text-cyan-300 font-semibold">
              Advanced UI Engineering
            </span>{" "}
            (Next.js, Tailwind, Motion Design), where I craft the user journey.
            <br />
            <br />I engineer robust backends using{" "}
            <span className="text-teal-400 font-semibold">
              SQL & NoSQL
            </span>{" "}
            architectures, ensuring high-performance data layers that scale
            effortlessly.
            <br />
            <br />I don't just write code; I{" "}
            <span className="text-white font-bold decoration-cyan-500 underline underline-offset-4">
              build products
            </span>{" "}
            that scale, ensuring every layer from the database to the pixel is
            optimized for performance.
            <br />
            <span className="block mt-8 text-sm italic text-gray-500 border-t border-white/10 pt-6">
              “Focused on the Output. Powered by Modern Architecture.”
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

          <div className="relative mt-16 max-w-3xl mx-auto">
            {/* 🌈 High-End Gradient Timeline Rail */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-500 via-teal-500 to-teal-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)]"></div>

            <div className="space-y-10">
              {/* BSc IT */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative pl-12 md:pl-16 group"
              >
                {/* Glowing Node */}
                <div className="absolute left-[10px] md:left-[18px] top-2 w-5 h-5 rounded-full bg-slate-950 border-[3px] border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] z-10 group-hover:scale-125 transition-transform duration-300"></div>

                <div className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:-translate-y-1">
                  {/* Inner Gradient Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>

                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Bachelor of Science in IT
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-cyan-400/90 font-semibold tracking-wide">
                      University of Mumbai
                    </p>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-cyan-500/20">
                      2024
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* HSC */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pl-12 md:pl-16 group"
              >
                <div className="absolute left-[10px] md:left-[18px] top-2 w-5 h-5 rounded-full bg-slate-950 border-[3px] border-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.8)] z-10 group-hover:scale-125 transition-transform duration-300"></div>

                <div className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-teal-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] group-hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[50px] -z-10 group-hover:bg-teal-500/10 transition-colors"></div>

                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    HSC Science
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-teal-400/90 font-semibold tracking-wide">
                      Maharashtra State Board
                    </p>
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-300 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-teal-500/20">
                      2021
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* SSC */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative pl-12 md:pl-16 group"
              >
                <div className="absolute left-[10px] md:left-[18px] top-2 w-5 h-5 rounded-full bg-slate-950 border-[3px] border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] z-10 group-hover:scale-125 transition-transform duration-300"></div>

                <div className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>

                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    SSC
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-cyan-400/90 font-semibold tracking-wide">
                      Maharashtra State Board
                    </p>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-cyan-500/20">
                      2019
                    </span>
                  </div>
                </div>
              </motion.div>
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
