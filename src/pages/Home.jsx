import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaArrowRight, FaEnvelope, FaWhatsapp, FaStar } from "react-icons/fa";
import GlobalBackground from "../components/GlobalBackground";
import { SplitText } from "../components/ui/SplitText";
import { projects } from "../data/projects";
import { allSkills } from "../data/skills";
import FAQ from "../components/ui/FAQ";
import GlobalCTA from "../components/ui/GlobalCTA";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// Reusable Bento Card component - Optimized solid background for FPS and smooth scrolling
const BentoCard = ({ children, className = "", title, colSpan = "col-span-1", rowSpan = "row-span-1" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[2rem] p-[1px] overflow-hidden bg-white/5 transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] ${colSpan} ${rowSpan} ${className}`}
    >
      {/* Spotlight Border */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(200px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.2), transparent 85%)`
          ),
        }}
      />
      {/* Solid background color to avoid backdrop-blur performance drops */}
      <div className="relative h-full w-full bg-[#09090b] rounded-[1.95rem] border border-white/5 p-4 md:p-5 flex flex-col justify-between overflow-hidden">
        {/* Spotlight Inner */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.95rem]"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(250px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.03), transparent 80%)`
            ),
          }}
        />
        <div className="relative z-10 h-full w-full flex flex-col justify-between">
          {title && (
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h3 className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-[0.2em] font-bold">{title}</h3>
            </div>
          )}
          <div className="flex-grow flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 1. Terminal / Shell Simulation Module
const TerminalModule = () => {
  const [typedText, setTypedText] = useState("");
  const codeText = "curl https://api.aafaque.dev/metrics\n{\n  \"status\": \"online\",\n  \"uptime\": \"99.99%\",\n  \"loc_written\": \"150k+\",\n  \"stack\": [\"Next.js\", \"Supabase\", \"Node\"]\n}";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(codeText.slice(0, index));
      index += 2;
      if (index > codeText.length) {
        setTypedText(codeText);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard colSpan="col-span-1 md:col-span-2" title="System Status">
      <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-emerald-400 h-full overflow-hidden relative">
        <div className="flex gap-1.5 items-center mb-3 border-b border-white/5 pb-2">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="text-[8px] text-slate-500 uppercase tracking-widest pl-2">shell@aafaque-node</span>
        </div>
        <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
          <span className="text-cyan-400">$ </span>
          {typedText}
          <span className="animate-pulse bg-cyan-400 text-cyan-400">|</span>
        </pre>
      </div>
    </BentoCard>
  );
};

// 2. Project Deck Module - Fully Responsive for Mobile and Tablets
const ProjectDeckModule = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = projects.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <BentoCard colSpan="col-span-1 md:col-span-2" title="Featured Projects">
      <div className="relative h-full w-full flex flex-col justify-end sm:flex-row sm:items-stretch sm:justify-between gap-4 min-h-[280px] sm:min-h-0">
        <div className="relative z-10 flex-grow sm:max-w-[55%] pr-0 sm:pr-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm md:text-base font-black text-white uppercase tracking-tight mt-1 truncate">{featured[activeIdx].title}</h4>
            <p className="text-[10px] sm:text-[11px] text-slate-300 sm:text-slate-400 font-light line-clamp-2 mt-1.5 leading-relaxed">{featured[activeIdx].description}</p>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {featured[activeIdx].techStack.slice(0, 2).map((tech, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-mono font-semibold text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <Link to={`/projects/${featured[activeIdx].id}`} className="inline-flex items-center gap-1.5 text-[9px] font-mono text-cyan-400 hover:text-cyan-300 group">
              View Project <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[8px]" />
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 sm:relative w-full sm:w-[45%] h-full overflow-hidden rounded-xl border border-white/5 sm:border-none flex items-center justify-center bg-zinc-950 shrink-0 z-0 sm:z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent sm:hidden z-10" />
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              src={featured[activeIdx].image}
              alt={featured[activeIdx].title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover rounded-xl"
            />
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
};

// 3. Interactive Stack Explorer Module
const InteractiveStackModule = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const categories = ["Frontend", "Backend", "Database"];
  const skillsByCategory = allSkills.filter(s => s.category === activeCategory).slice(0, 8);

  return (
    <BentoCard colSpan="col-span-1" rowSpan="row-span-2" title="Skills">
      <div className="flex flex-col h-full justify-between py-1">
        <div className="flex flex-col gap-1.5 mb-4 mt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-2 px-4 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider text-left border transition-all ${
                activeCategory === cat
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "bg-white/[0.01] text-gray-500 border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {skillsByCategory.map((tech) => (
              <div 
                key={tech.name}
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-lg hover:border-cyan-500/30 transition-all hover:scale-105"
                style={{ color: tech.color }}
                title={tech.name}
              >
                <tech.icon />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/5 shrink-0">
          <Link to="/skills" className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest hover:underline flex items-center gap-1.5 group">
            All Skills <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={8} />
          </Link>
        </div>
      </div>
    </BentoCard>
  );
};

// 4. Estimator Module
const RecommenderModule = () => {
  const [projectType, setProjectType] = useState("Website");
  const [timeline, setTimeline] = useState("Normal");

  const getRecommendation = () => {
    if (projectType === "Website") {
      return {
        title: "High-Converting Website",
        deliverables: ["Custom UI design", "SEO Optimization", "100% Speed Target"],
        timeline: timeline === "Urgent" ? "2 Weeks (Express)" : "3 Weeks",
        urgencyFee: timeline === "Urgent" ? "Express Priority" : "Standard Model",
        linkState: "High-Converting Websites"
      };
    } else if (projectType === "E-Commerce") {
      return {
        title: "Custom Online Store",
        deliverables: ["Stripe Integration", "Inventory Tracking", "WhatsApp Sync"],
        timeline: timeline === "Urgent" ? "3 Weeks (Express)" : "4 Weeks",
        urgencyFee: timeline === "Urgent" ? "Express Priority" : "Standard Model",
        linkState: "Custom Online Stores"
      };
    } else {
      return {
        title: "Custom Web App",
        deliverables: ["Interactive Dashboard", "Secure DB Setup", "Real-Time Engine"],
        timeline: timeline === "Urgent" ? "4 Weeks (Express)" : "6 Weeks",
        urgencyFee: timeline === "Urgent" ? "Express Priority" : "Standard Model",
        linkState: "Custom Web Apps"
      };
    }
  };

  const rec = getRecommendation();

  return (
    <BentoCard colSpan="col-span-1 md:col-span-2" rowSpan="row-span-2" title="Estimate Project">
      <div className="flex flex-col h-full justify-between py-1 text-white">
        <div className="space-y-4">
          <div>
            <label className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-2 font-bold">Project Type</label>
            <div className="flex gap-2">
              {["Website", "E-Commerce", "Web App"].map(type => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`flex-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all ${
                    projectType === type
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                      : "bg-white/[0.01] text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-2 font-bold">Timeline</label>
            <div className="flex gap-2">
              {["Urgent", "Normal"].map(time => (
                <button
                  key={time}
                  onClick={() => setTimeline(time)}
                  className={`flex-1 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all ${
                    timeline === time
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                      : "bg-white/[0.01] text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {time === "Urgent" ? "⚡ Urgent" : "📅 Standard"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="my-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex-grow flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-tight">{rec.title}</span>
            <span className="text-[8px] font-mono text-orange-400 bg-orange-950/20 px-2.5 py-0.5 rounded-full border border-orange-500/20">{rec.urgencyFee}</span>
          </div>
          <p className="text-[9px] font-mono text-gray-500">Timeline: {rec.timeline}</p>
          <ul className="mt-3 space-y-1.5">
            {rec.deliverables.map((d, i) => (
              <li key={i} className="text-[10px] text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/contact"
          state={{ plan: rec.linkState }}
          className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-wider text-[10px] rounded-xl flex items-center justify-center gap-2 group transition-all shrink-0"
        >
          Get a Quote <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[8px]" />
        </Link>
      </div>
    </BentoCard>
  );
};

// 5. Contact Node with Dynamic Local Clock
const ContactNodeModule = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard colSpan="col-span-1" rowSpan="row-span-2" title="Get in Touch">
      <div className="flex flex-col h-full justify-between py-1 text-white">
        <div>
          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block mb-1">My Time (IST)</span>
          <h4 className="text-lg font-mono font-black text-cyan-400 tracking-tighter">{time}</h4>
          <span className="text-[8px] font-mono text-slate-500 uppercase block mt-1">New Delhi, India</span>
        </div>

        <div className="space-y-3 my-6">
          <a
            href="mailto:aafaquebuisness@gmail.com"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.03] transition-all group/link"
          >
            <FaEnvelope className="text-slate-500 group-hover/link:text-cyan-400 transition-colors" />
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-gray-500 uppercase leading-none">Email</span>
              <span className="text-[10px] text-white font-medium mt-0.5">Send Email</span>
            </div>
          </a>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.03] transition-all group/link"
          >
            <FaWhatsapp className="text-slate-500 group-hover/link:text-emerald-400 transition-colors" />
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-gray-500 uppercase leading-none">WhatsApp</span>
              <span className="text-[9px] text-white font-medium mt-0.5">Direct Chat</span>
            </div>
          </a>
        </div>

        <Link
          to="/contact"
          className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-2 group w-fit shrink-0"
        >
          Contact Me
          <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[8px]" />
        </Link>
      </div>
    </BentoCard>
  );
};

// 6. Testimonial Marquee Module
const TestimonialMarqueeModule = () => {
  const reviews = [
    { name: "Rahul M.", text: "Verified performance target optimization. Clean styling, smooth animations." },
    { name: "Sneha K.", text: "One of the best visual detail developer portfolios. Render speeds are top level." },
    { name: "Vikram S.", text: "Highly scalable systems from databases to neat responsive frontends." }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <BentoCard colSpan="col-span-1" title="Client Reviews">
      <div className="h-full w-full flex flex-col justify-between py-1 relative">
        <div className="absolute top-0.5 right-1 text-yellow-400 flex gap-0.5">
          {[...Array(5)].map((_, i) => <FaStar key={i} size={8} />)}
        </div>
        <div className="flex-grow flex flex-col justify-center pr-4 mt-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] text-slate-400 leading-normal italic line-clamp-3"
            >
              "{reviews[activeIdx].text}"
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1.5 pt-2 border-t border-white/5 shrink-0">
          <div className="w-4 h-4 rounded-full bg-cyan-500/10 flex items-center justify-center text-[8px] font-black text-cyan-400">
            {reviews[activeIdx].name[0]}
          </div>
          <div>
            <span className="text-[9px] font-black text-white leading-none block">{reviews[activeIdx].name}</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

const Home = () => {
  const firstName = "AAFAQUE".split("");
  const lastName = "NAZIR".split("");

  return (
    <>
      <div className="relative z-10 w-full min-h-screen bg-transparent">
        {/* 🚀 HERO SECTION */}
        <section
          id="home"
          aria-label="Hero — Aafaque Nazir, Frontend Engineer & Creative Developer"
          className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
        >
          {/* Particle Background - Runs ONLY within Hero section to auto-stop when scrolled off-screen (60 FPS optimization) */}
          <GlobalBackground />

          {/* Deep Ambient Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/20 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[100px] opacity-10" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full pt-28 pb-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-12 flex flex-col justify-center text-left max-w-4xl"
            >
              {/* Massive Typography */}
              <div className="relative mb-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-white leading-[0.9]">
                  <div className="overflow-hidden flex flex-wrap">
                    {firstName.map((char, index) => (
                      <motion.span key={index} variants={charVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="overflow-hidden flex flex-wrap mt-2">
                    {lastName.map((char, index) => (
                      <motion.span
                        key={index}
                        variants={charVariants}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </h1>
              </div>

              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-8 font-mono"
              >
                <SplitText
                  type="words"
                  delay={0.5}
                  className="text-cyan-400/80 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold"
                >
                  WEB DEVELOPER & FRONTEND ENGINEER
                </SplitText>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-2xl mb-8 md:mb-10"
              >
                <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed font-light border-l-[1px] border-cyan-500/30 pl-4 md:pl-6">
                  I build fast, beautiful websites that help your business grow. I focus on writing clean code and creating great user experiences.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <Link
                  to="/contact"
                  aria-label="Navigate to contact page"
                  className="group relative px-8 py-4 bg-white text-black font-bold text-sm md:text-base rounded-full overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Me
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />
                </Link>

                <div className="flex gap-4 w-full sm:w-auto">
                  <a
                    href="https://github.com/Aafaque-Nazir"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub"
                    className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-white text-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all flex items-center justify-center"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Down */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 pointer-events-auto"
            onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-[9px] font-mono text-cyan-500/50 uppercase tracking-[0.25em]">Explore Hub</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-5 flex items-center justify-center text-cyan-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* 🎛️ BENTO DASHBOARD */}
        <section id="dashboard" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono text-cyan-400/80 tracking-[0.3em] uppercase font-bold">Overview</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mt-2">
              My Dashboard
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              A quick overview of my skills, recent projects, performance targets, and contact details.
            </p>
          </div>

          {/* Responsive CSS Grid: auto-rows applies only on tablet and desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:auto-rows-[220px]">
            {/* 1. Bio card */}
            <BentoCard colSpan="col-span-1 md:col-span-2" title="About Me">
              <div className="flex items-start gap-4 h-full pt-2">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl font-black">
                    AN
                  </div>
                  <span className="absolute bottom-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-base font-black text-white leading-tight">Aafaque Nazir</h4>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block mt-1">● Available for Freelance</span>
                    <p className="text-[11px] text-slate-400 mt-2.5 font-light leading-relaxed">
                      I write high-fidelity systems from database design to visual UI. I aim for smooth rendering, robust API structures, and direct ROI for brands.
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* 2. Core performance metric (Lighthouse circle gauge) */}
            <BentoCard colSpan="col-span-1" title="My Performance">
              <div className="flex flex-col items-center justify-center h-full gap-2 mt-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="transparent" />
                    <motion.circle 
                      cx="48" 
                      cy="48" 
                      r="42" 
                      stroke="#22d3ee" 
                      strokeWidth="5" 
                      fill="transparent" 
                      strokeDasharray={42 * 2 * Math.PI} 
                      initial={{ strokeDashoffset: 42 * 2 * Math.PI }}
                      whileInView={{ strokeDashoffset: 42 * 2 * Math.PI * (1 - 0.98) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-tighter">98<span className="text-cyan-400 text-xs">%</span></span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Lighthouse score</span>
              </div>
            </BentoCard>

            {/* 3. Star Reviews Testimonial */}
            <TestimonialMarqueeModule />

            {/* 4. Project Deck slider */}
            <ProjectDeckModule />

            {/* 5. Terminal CLI log */}
            <TerminalModule />

            {/* 6. Estimator interactive grid */}
            <RecommenderModule />

            {/* 7. Stack Category Switcher */}
            <InteractiveStackModule />

            {/* 8. Contact card with dyn clock */}
            <ContactNodeModule />
          </div>
        </section>

        {/* ❓ FAQ Accordions */}
        <section id="faq-section" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <FAQ />
        </section>

        {/* Global CTA */}
        <section id="cta-section" className="relative w-full">
          <GlobalCTA />
        </section>
      </div>
    </>
  );
};

export default Home;
