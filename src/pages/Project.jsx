import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import SEO from "../components/SEO";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  RiSignalTowerFill,
  RiShoppingCartFill,
  RiMotorbikeFill,
  RiRestaurantFill,
  RiCarFill,
  RiBusFill,
  RiBrainFill,
  RiArrowRightUpLine,
} from "react-icons/ri";

const projects = [
  // --- Row 1: [2] [1] ---
  {
    title: "Coursira",
    description:
      "Revolutionizing self-education with an AI engine that generates custom study plans, proctored tests, and instant feedback loops.",
    header: (
      <img
        src="./coursira-thumbnail.png"
        alt="Coursira"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://coursira.vercel.app/",
    icon: <RiBrainFill className="h-4 w-4" />,
    className: "md:col-span-2", // Big (Left)
    id: 7,
    techStack: ["Next.js", "Gemini AI", "Tailwind", "NeonDB"],
    status: "Live",
  },
  {
    title: "Bus Booked",
    description:
      "Bus operator dashboard with real-time seat management and WhatsApp integration.",
    header: (
      <img
        src="./bus-booked-thumbnail.png"
        alt="Bus Booked"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://busbooked.netlify.app/",
    icon: <RiBusFill className="h-4 w-4" />,
    className: "md:col-span-1", // Small (Right)
    id: 6,
    techStack: ["React", "Firebase", "Redux"],
    status: "Live",
  },

  // --- Row 2: [1] [2] (Offset) ---
  {
    title: "Inventory Management",
    description: "Real-time stock tracking and automated reordering system.",
    header: (
      <img
        src="./inventory-thumbnail.png"
        alt="Inventory Management"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://nvntory-mgm.vercel.app/",
    icon: <RiSignalTowerFill className="h-4 w-4" />,
    className: "md:col-span-1", // Small (Left)
    id: 1,
    techStack: ["Next.js", "Supabase", "Prisma"],
    status: "Live",
  },
  {
    title: "Smart Dining OS",
    description:
      "End-to-end Restaurant OS streamlining operations with table-to-kitchen ordering.",
    header: (
      <img
        src="./smart-dining-thumbnail.png"
        alt="Smart Dining OS"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://korner-kafe.netlify.app/",
    icon: <RiRestaurantFill className="h-4 w-4" />,
    className: "md:col-span-2", // Big (Right) - Creates Asymmetry
    id: 4,
    techStack: ["React", "Node.js", "Socket.io"],
    status: "Beta",
  },

  // --- Row 3: [1] [1] [1] ---
  {
    title: "Luxury Chauffeur",
    description:
      "Premium booking engine for high-end fleet reservation management.",
    header: (
      <img
        src="./car-thumbnail.png"
        alt="Luxury Chauffeur"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://royalcarz.netlify.app/",
    icon: <RiCarFill className="h-4 w-4" />,
    className: "md:col-span-1",
    id: 5,
    techStack: ["React", "Motion", "Tailwind"],
    status: "Live",
  },
  {
    title: "Ecommerce Store",
    description:
      "Seamless and secure shopping experience converting visitors to customers.",
    header: (
      <img
        src="./ecommerce-thumbnail.png"
        alt="Ecommerce Store"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://shopease-aafaque.netlify.app/",
    icon: <RiShoppingCartFill className="h-4 w-4" />,
    className: "md:col-span-1",
    id: 2,
    techStack: ["React", "Redux", "Stripe"],
    status: "Live",
  },
  {
    title: "Food Delivery App",
    description:
      "Streamlines food ordering to reduce wait times and maximize turnover.",
    header: (
      <img
        src="./resturant-thumbnail.png"
        alt="Food Delivery App"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
      />
    ),
    link: "https://bread-and-bite.netlify.app/",
    icon: <RiMotorbikeFill className="h-4 w-4" />,
    className: "md:col-span-1",
    id: 3,
    techStack: ["React", "Firebase", "Maps API"],
    status: "Live",
  },
];

// --- Mobile Components ---
const MobileProjectCard = ({ item }) => {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-[85vw] h-[60vh] bg-[#0a0f1c] border border-white/10 rounded-3xl overflow-hidden relative flex flex-col group snap-center shadow-xl"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">
          {item.status || "Live"}
        </span>
      </div>

      {/* Image Area with Browser Frame */}
      <div className="h-[55%] w-full relative overflow-hidden p-4 pb-0">
        <div className="w-full h-full relative rounded-t-xl overflow-hidden border-t border-l border-r border-white/10 bg-slate-950 shadow-2xl">
          {/* Browser Toolbar */}
          <div className="h-6 bg-slate-900 border-b border-white/5 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>

          {/* Image Itself */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent z-10 opacity-60" />
            {item.header}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between relative z-20 bg-[#0a0f1c]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {item.title}
            </h3>
          </div>

          <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tech Stack */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {item.techStack?.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
          View Project <RiArrowRightUpLine className="text-lg" />
        </div>
      </div>
    </a>
  );
};

const MobileHorizontalScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] md:hidden">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-6">
          {projects.map((item, i) => (
            <MobileProjectCard key={i} item={item} />
          ))}
          {/* Spacer for end */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

const Project = () => {
  return (
    <div id="projects" className="relative">
      {/* --- Desktop View: Bento Grid (Standard Scroll) --- */}
      <div className="hidden md:block py-20">
        <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
          <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Selected Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A collection of projects exploring the intersection of design, AI,
            and functional web applications.
          </p>
        </div>

        <BentoGrid>
          {projects.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
              link={item.link}
              techStack={item.techStack}
              status={item.status}
            />
          ))}
        </BentoGrid>
      </div>

      {/* --- Mobile View: Horizontal Scroll Parallax (Sticky) --- */}
      <div className="block md:hidden">
        {/* Header for Mobile */}
        <div className="pt-20 pb-10 px-6 text-center">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Selected Works
          </h2>
          <p className="text-slate-400 text-sm">
            Scroll down to explore projects
          </p>
        </div>
        <MobileHorizontalScroll />
      </div>
    </div>
  );
};

export default Project;
