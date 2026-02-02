import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { FaExternalLinkAlt } from "react-icons/fa";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[30rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
  techStack = [],
  status = "Live",
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "row-span-1 relative group/bento rounded-3xl overflow-hidden shadow-none transition duration-500",
        "bg-[#0a0f1c] border border-white/10",
        className,
      )}
    >
      {/* SPOTLIGHT EFFECT */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {/* Spotlight Border */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.3), transparent 40%)`,
        }}
      />

      {/* Active Status Indicator (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">
          {status}
        </span>
      </div>

      {/* Main Image Container with Browser Window Frame */}
      <div className="relative h-[65%] w-full overflow-hidden p-4 pb-0">
        <div className="w-full h-full relative rounded-t-xl overflow-hidden border-t border-l border-r border-white/10 bg-slate-950 shadow-2xl group-hover/bento:scale-[1.02] transition-transform duration-500 origin-bottom">
          {/* Browser Toolbar */}
          <div className="h-6 bg-slate-900 border-b border-white/5 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>

          {/* Image Itself */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent z-10 opacity-60" />
            {header}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end">
        {/* Title & Icon */}
        <div className="flex items-center gap-3 mb-2 transform transition-transform duration-300 group-hover/bento:-translate-y-1">
          <div className="p-2 rounded-lg bg-cyan-950/30 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover/bento:bg-cyan-500 group-hover/bento:text-black transition-all">
            {icon}
          </div>
          <h3 className="font-bold text-xl text-white tracking-tight group-hover:text-cyan-100 transition-colors">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 transition-opacity duration-300">
          {description}
        </p>

        {/* Tech Stack & Actions Row */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5 group-hover/bento:border-cyan-500/20 transition-colors">
          {/* Tech Stack Badges */}
          <div className="flex -space-x-2 overflow-hidden">
            {techStack.slice(0, 4).map((tech, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-[#0F1629] border border-white/10 flex items-center justify-center text-[10px] text-gray-400 font-mono ring-2 ring-[#0a0f1c] hover:scale-110 hover:z-10 transition-transform relative bg-gradient-to-br from-slate-800 to-black"
                title={tech}
              >
                {tech[0]}
              </div>
            ))}
            {techStack.length > 4 && (
              <div className="w-7 h-7 rounded-full bg-[#0F1629] border border-white/10 flex items-center justify-center text-[8px] text-gray-400 font-mono ring-2 ring-[#0a0f1c]">
                +{techStack.length - 4}
              </div>
            )}
          </div>

          {/* Visit Button */}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-cyan-400 transition-colors group-hover/bento:translate-x-1 duration-300"
          >
            Preview <FaExternalLinkAlt size={10} />
          </a>
        </div>
      </div>
    </div>
  );
};
