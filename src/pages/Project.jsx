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
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://coursira.vercel.app/",
    icon: <RiBrainFill className="h-4 w-4" />,
    className: "md:col-span-2", // Big (Left)
    id: 7,
  },
  {
    title: "Bus Booked",
    description:
      "Bus operator dashboard with real-time seat management and WhatsApp integration.",
    header: (
      <img
        src="./bus-booked-thumbnail.png"
        alt="Bus Booked"
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://busbooked.netlify.app/",
    icon: <RiBusFill className="h-4 w-4" />,
    className: "md:col-span-1", // Small (Right)
    id: 6,
  },

  // --- Row 2: [1] [2] (Offset) ---
  {
    title: "Inventory Management",
    description: "Real-time stock tracking and automated reordering system.",
    header: (
      <img
        src="./inventory-thumbnail.png"
        alt="Inventory Management"
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://nvntory-mgm.vercel.app/",
    icon: <RiSignalTowerFill className="h-4 w-4" />,
    className: "md:col-span-1", // Small (Left)
    id: 1,
  },
  {
    title: "Smart Dining OS",
    description:
      "End-to-end Restaurant OS streamlining operations with table-to-kitchen ordering.",
    header: (
      <img
        src="./smart-dining-thumbnail.png"
        alt="Smart Dining OS"
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://korner-kafe.netlify.app/",
    icon: <RiRestaurantFill className="h-4 w-4" />,
    className: "md:col-span-2", // Big (Right) - Creates Asymmetry
    id: 4,
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
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://royalcarz.netlify.app/",
    icon: <RiCarFill className="h-4 w-4" />,
    className: "md:col-span-1",
    id: 5,
  },
  {
    title: "Ecommerce Store",
    description:
      "Seamless and secure shopping experience converting visitors to customers.",
    header: (
      <img
        src="./ecommerce-thumbnail.png"
        alt="Ecommerce Store"
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://shopease-aafaque.netlify.app/",
    icon: <RiShoppingCartFill className="h-4 w-4" />,
    className: "md:col-span-1",
    id: 2,
  },
  {
    title: "Food Delivery App",
    description:
      "Streamlines food ordering to reduce wait times and maximize turnover.",
    header: (
      <img
        src="./resturant-thumbnail.png"
        alt="Food Delivery App"
        className="w-full h-full object-cover group-hover/bento:scale-105 transition-transform duration-500"
      />
    ),
    link: "https://bread-and-bite.netlify.app/",
    icon: <RiMotorbikeFill className="h-4 w-4" />,
    className: "md:col-span-1",
    id: 3,
  },
];

// --- Mobile Components ---
const MobileProjectCard = ({ item }) => {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-[85vw] h-[60vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden relative flex flex-col group snap-center"
    >
      {/* Image Area */}
      <div className="h-[60%] w-full relative overflow-hidden">
        <div className="overlay absolute inset-0 bg-black/10 z-10" />
        {item.header}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between relative z-20 bg-gradient-to-t from-slate-950 to-slate-900">
        <div>
          <div className="flex items-center gap-2 mb-2 text-cyan-400 text-2xl">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-slate-400 text-sm line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest mt-4">
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
