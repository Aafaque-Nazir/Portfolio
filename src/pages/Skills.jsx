"use client";
import { motion } from "framer-motion";
import LogoLoop from "../components/Logos";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiGithub,
  SiGit,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact style={{ color: "#61DAFB" }} />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs style={{ color: "#ffffff" }} />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiJavascript style={{ color: "#F0DB4F" }} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiTailwindcss style={{ color: "#06B6D4" }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer style={{ color: "#0055FF" }} />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiGithub style={{ color: "#ffffff" }} />, title: "GitHub", href: "https://github.com" },
  { node: <SiGit style={{ color: "#F1502F" }} />, title: "Git", href: "https://git-scm.com" },
];

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative w-full py-20 flex flex-col justify-center items-center text-white overflow-hidden bg-slate-950"
      aria-label="Technologies I work with"
    >
      {/* Premium Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950" />

      {/* 🧠 Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
      >
        Tech Stack I Love ⚙️
      </motion.h2>

      {/* 🌈 Animated Logo Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 w-full h-36 overflow-hidden"
      >
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="left"
          logoHeight={50}
          gap={60}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#020617"
          ariaLabel="Technologies I work with"
        />
      </motion.div>

      {/* 💫 Bottom Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-sm" />

      {/* ✨ Floating Shimmer Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        animate={{ x: ["-10%", "110%"] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />
    </section>
  );
}
