import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4",
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
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-500 shadow-none p-[1px] justify-between flex flex-col space-y-4 overflow-hidden relative",
        className,
      )}
    >
      {/* Moving Border moving-border - Spinning Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#06b6d4_100%)] opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]" />

      {/* Inner Content Container - Acts as the mask */}
      <div className="h-full w-full bg-slate-900 rounded-[23px] relative z-10 p-4 flex flex-col justify-between">
        <div className="h-full w-full absolute inset-0 bg-slate-900 z-0 rounded-[23px]" />

        {/* Header / Image Container */}
        <div className="relative z-10 w-full h-[60%] rounded-xl overflow-hidden border border-white/5">
          {header}
          <div className="absolute inset-0 bg-black/20 group-hover/bento:bg-transparent transition-colors duration-500" />
        </div>

        <div className="relative z-10 group-hover/bento:translate-x-2 transition duration-200 flex flex-col justify-end flex-grow">
          <div className="flex items-center gap-2 mb-2 text-slate-500 group-hover/bento:text-cyan-400 transition-colors">
            {icon}
          </div>
          <div className="font-bold text-slate-100 mb-1 mt-2 text-xl group-hover/bento:text-white transition-colors">
            {title}
          </div>
          <div className="font-normal text-slate-400 text-sm line-clamp-2 leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </a>
  );
};
