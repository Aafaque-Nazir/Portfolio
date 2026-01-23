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
  SiTypescript,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiVite,
  SiGreensock,
  SiRedux,
  SiVercel,
  SiPostman,
} from "react-icons/si";

const techLogos = [
  {
    node: <SiReact style={{ color: "#61DAFB" }} />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs style={{ color: "#ffffff" }} />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiJavascript style={{ color: "#F0DB4F" }} />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    node: <SiTypescript style={{ color: "#3178C6" }} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  {
    node: <SiTailwindcss style={{ color: "#06B6D4" }} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiFramer style={{ color: "#0055FF" }} />,
    title: "Framer Motion",
    href: "https://www.framer.com/motion/",
  },
  {
    node: <SiGreensock style={{ color: "#88CE02" }} />,
    title: "GSAP",
    href: "https://greensock.com/",
  },
  {
    node: <SiSupabase style={{ color: "#3ECF8E" }} />,
    title: "Supabase",
    href: "https://supabase.com/",
  },
  {
    node: <SiNodedotjs style={{ color: "#339933" }} />,
    title: "Node.js",
    href: "https://nodejs.org/",
  },
  {
    node: <SiPostgresql style={{ color: "#4169E1" }} />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
  },
  {
    node: <SiRedux style={{ color: "#764ABC" }} />,
    title: "Redux",
    href: "https://redux.js.org/",
  },
  {
    node: <SiVite style={{ color: "#646CFF" }} />,
    title: "Vite",
    href: "https://vitejs.dev/",
  },
  {
    node: <SiHtml5 style={{ color: "#E34F26" }} />,
    title: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    node: <SiCss3 style={{ color: "#1572B6" }} />,
    title: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    node: <SiGithub style={{ color: "#ffffff" }} />,
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: <SiGit style={{ color: "#F05032" }} />,
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    node: <SiVercel style={{ color: "#ffffff" }} />,
    title: "Vercel",
    href: "https://vercel.com/",
  },
  {
    node: <SiPostman style={{ color: "#FF6C37" }} />,
    title: "Postman",
    href: "https://www.postman.com/",
  },
];

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative w-full py-20 flex flex-col justify-center items-center text-white overflow-hidden"
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
        Tech Stack I Use ⚙️
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
