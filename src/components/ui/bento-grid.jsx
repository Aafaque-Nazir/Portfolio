import { cn } from "../../lib/utils";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[28rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4",
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
  status = "Live", // "Live", "Dev", "Beta"
}) => {
  return (
    <div
      className={cn(
        "row-span-1 relative group/bento rounded-3xl overflow-hidden shadow-none transition duration-500",
        "bg-[#0a0f1c] border border-white/10 hover:border-cyan-500/30", // Solid background with subtle border
        className,
      )}
    >
      {/* Active Status Indicator (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">
          {status}
        </span>
      </div>

      {/* Main Image Container */}
      <div className="relative h-[60%] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent z-10 opactiy-90" />
        {/* Hover Zoom Effect on Image */}
        <div className="w-full h-full transition-transform duration-700 group-hover/bento:scale-110">
          {header}
        </div>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/95 to-transparent pt-12">
        {/* Title & Icon */}
        <div className="flex items-center gap-3 mb-2 transform transition-transform duration-300 group-hover/bento:-translate-y-1">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover/bento:bg-cyan-500 group-hover/bento:text-black transition-colors">
            {icon}
          </div>
          <h3 className="font-bold text-xl text-white tracking-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 transition-opacity duration-300 delay-75">
          {description}
        </p>

        {/* Tech Stack & Actions Row */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
          {/* Tech Stack Badges */}
          <div className="flex -space-x-2 overflow-hidden">
            {techStack.slice(0, 4).map((tech, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-[#0F1629] border border-white/10 flex items-center justify-center text-[10px] text-gray-400 font-mono ring-2 ring-[#0a0f1c]"
                title={tech}
              >
                {tech[0]}{" "}
                {/* First letter as simple icon fallback if needed, usually passed as string */}
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
            Visit Site <FaExternalLinkAlt size={10} />
          </a>
        </div>
      </div>

      {/* Hover Light Sweep Effect */}
      <div className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-sheen" />
      </div>
    </div>
  );
};
