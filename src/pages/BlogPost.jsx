import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  RiCalendarLine,
  RiTimeLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiFileCopyLine,
  RiCheckLine,
  RiWhatsappFill,
  RiTwitterXFill,
  RiLinkedinFill,
  RiSparklingFill,
  RiQuestionLine,
  RiArrowDownSLine,
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiLightbulbFlashLine,
  RiListCheck2,
  RiShieldFlashLine,
  RiAlertLine,
  RiInformationLine,
  RiFlowChart,
  RiShareLine
} from "react-icons/ri";
import SEO from "../components/SEO";
import { getBlogBySlug, blogs } from "../data/blogs";
import { projects } from "../data/projects";

// Enhanced helper to parse markdown links [text](url) and inline code `code`
const renderFormattedText = (text) => {
  if (!text) return null;

  // First handle inline code `code`
  const codeRegex = /`([^`]+)`/g;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Simple parser that splits and replaces
  const parts = [];
  let lastIdx = 0;
  
  // Combined regex for [text](url) and `code`
  const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }

    if (match[2] && match[3]) {
      // It's a markdown link
      const label = match[2];
      const href = match[3];

      if (href.startsWith("/")) {
        parts.push(
          <Link
            key={match.index}
            to={href}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/40 hover:decoration-cyan-400 font-medium transition-colors"
          >
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/40 hover:decoration-cyan-400 font-medium transition-colors"
          >
            {label}
          </a>
        );
      }
    } else if (match[4]) {
      // It's inline code
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-white/[0.08] text-cyan-300 font-mono text-xs border border-white/5"
        >
          {match[4]}
        </code>
      );
    }

    lastIdx = combinedRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts;
};

// Sleek macOS-styled Code block with copy button and language tag
const CodeSnippet = ({ code, language, caption }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#090a0f] shadow-2xl transition-all hover:border-white/15">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
          </div>

          <div className="h-3.5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2 text-xs font-mono">
            <RiCodeSSlashLine className="text-cyan-400" size={14} />
            <span className="text-zinc-300 font-semibold tracking-wider uppercase text-[11px]">
              {language || "code"}
            </span>
            {caption && (
              <span className="text-zinc-500 font-sans text-xs hidden sm:inline">
                &bull; {caption}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-[11px] font-mono border border-white/5 cursor-pointer active:scale-95"
        >
          {copied ? (
            <>
              <RiCheckLine className="text-emerald-400" size={13} />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <RiFileCopyLine size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-100/90 leading-relaxed scrollbar-none selection:bg-cyan-500/30">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Visual Stats / Metrics Grid Component
const StatsGrid = ({ items }) => {
  if (!items || items.length === 0) return null;

  const accentStyles = {
    rose: "border-rose-500/30 bg-rose-950/15 text-rose-400",
    amber: "border-amber-500/30 bg-amber-950/15 text-amber-400",
    emerald: "border-emerald-500/30 bg-emerald-950/15 text-emerald-400",
    cyan: "border-cyan-500/30 bg-cyan-950/15 text-cyan-400",
    blue: "border-blue-500/30 bg-blue-950/15 text-blue-400"
  };

  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {items.map((stat, i) => {
        const style = accentStyles[stat.accent] || accentStyles.cyan;
        return (
          <div
            key={i}
            className={`p-4 rounded-2xl border ${style} backdrop-blur-sm transition-all hover:scale-[1.02] flex flex-col justify-between`}
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
              {stat.label}
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight my-1">
              {stat.value}
            </div>
            {stat.desc && (
              <div className="text-xs text-zinc-400 font-sans mt-1 line-clamp-2">
                {stat.desc}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Architecture / Flow Diagram Component
const ArchitectureDiagram = ({ title, nodes, caption }) => {
  if (!nodes || nodes.length === 0) return null;

  const nodeColorMap = {
    threat: "border-rose-500/40 bg-rose-950/30 text-rose-300",
    vulnerable: "border-amber-500/40 bg-amber-950/30 text-amber-300",
    critical: "border-red-500/50 bg-red-950/40 text-red-300",
    neutral: "border-zinc-700 bg-zinc-900/60 text-zinc-300",
    secure: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
    client: "border-cyan-500/40 bg-cyan-950/30 text-cyan-300"
  };

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-[#09090d] p-5 sm:p-6 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
        <RiFlowChart size={15} />
        <span>{title || "Architecture & Execution Flow"}</span>
      </div>

      {/* Responsive Diagram Nodes */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {nodes.map((node, i) => {
          const colorClass = nodeColorMap[node.type] || nodeColorMap.neutral;
          return (
            <React.Fragment key={i}>
              <div className={`flex-1 p-3.5 rounded-xl border ${colorClass} text-center flex flex-col justify-center min-h-[80px] shadow-sm`}>
                <div className="text-[10px] font-mono opacity-60 uppercase mb-0.5">
                  Step {node.step || `0${i + 1}`}
                </div>
                <div className="font-bold text-xs sm:text-sm tracking-tight text-white">
                  {node.label}
                </div>
                {node.sub && (
                  <div className="text-[11px] font-sans opacity-75 mt-0.5 line-clamp-2">
                    {node.sub}
                  </div>
                )}
              </div>

              {/* Connecting arrow */}
              {i < nodes.length - 1 && (
                <div className="flex items-center justify-center text-zinc-600 md:rotate-0 rotate-90 py-1 md:py-0">
                  <span className="text-cyan-400/80 font-mono text-sm font-bold">&rarr;</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {caption && (
        <p className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-400 font-mono text-center">
          &bull; {caption}
        </p>
      )}
    </div>
  );
};

// Sequential Step-by-Step Tutorial Cards
const StepsPlaybook = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 space-y-4">
      {title && (
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
          <RiListCheck2 size={16} />
          <span>{title}</span>
        </div>
      )}

      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/10 bg-[#09090d] hover:border-white/15 transition-all flex gap-4 items-start"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-mono font-black text-xs flex items-center justify-center shrink-0">
              {item.step || `0${idx + 1}`}
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {renderFormattedText(item.desc)}
              </p>
              {item.code && (
                <div className="mt-2.5 rounded-xl bg-black/60 border border-white/5 p-3 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>{item.code}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Callout with distinct severity variants
const CalloutBox = ({ title, text, variant = "info" }) => {
  // Infer variant from title if not explicitly provided
  let effectiveVariant = variant;
  const lowerTitle = (title || "").toLowerCase();
  if (lowerTitle.includes("critical") || lowerTitle.includes("security") || lowerTitle.includes("alert")) {
    effectiveVariant = "critical";
  } else if (lowerTitle.includes("warning") || lowerTitle.includes("caution")) {
    effectiveVariant = "warning";
  } else if (lowerTitle.includes("tip") || lowerTitle.includes("best practice")) {
    effectiveVariant = "tip";
  }

  const config = {
    critical: {
      border: "border-rose-500/40 bg-rose-950/20",
      textCol: "text-rose-300",
      badgeCol: "text-rose-400 bg-rose-950/80 border-rose-500/40",
      icon: <RiShieldFlashLine size={16} className="text-rose-400" />
    },
    warning: {
      border: "border-amber-500/40 bg-amber-950/20",
      textCol: "text-amber-200/90",
      badgeCol: "text-amber-400 bg-amber-950/80 border-amber-500/40",
      icon: <RiAlertLine size={16} className="text-amber-400" />
    },
    tip: {
      border: "border-emerald-500/40 bg-emerald-950/20",
      textCol: "text-emerald-200/90",
      badgeCol: "text-emerald-400 bg-emerald-950/80 border-emerald-500/40",
      icon: <RiLightbulbFlashLine size={16} className="text-emerald-400" />
    },
    info: {
      border: "border-cyan-500/40 bg-cyan-950/20",
      textCol: "text-cyan-200/90",
      badgeCol: "text-cyan-400 bg-cyan-950/80 border-cyan-500/40",
      icon: <RiInformationLine size={16} className="text-cyan-400" />
    }
  };

  const current = config[effectiveVariant] || config.info;

  return (
    <div className={`my-6 p-5 rounded-2xl border ${current.border} shadow-lg transition-all`}>
      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
        {current.icon}
        <span className="text-white">{title}</span>
      </div>
      <p className={`text-xs sm:text-sm leading-relaxed font-light ${current.textCol}`}>
        {renderFormattedText(text)}
      </p>
    </div>
  );
};

// Comparison table with status pills
const ComparisonTable = ({ headers, rows }) => {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#09090b] shadow-2xl">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-white/[0.04] border-b border-white/10 text-cyan-400 font-mono uppercase tracking-wider">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3.5 sm:p-4 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-sans">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
              {row.map((cell, cIdx) => {
                // Auto status pill badge detection
                let isPill = false;
                let pillStyle = "";
                if (typeof cell === "string") {
                  if (cell.startsWith("✓") || cell.includes("Fixed") || cell.includes("Supported")) {
                    isPill = true;
                    pillStyle = "text-emerald-400 bg-emerald-950/60 border border-emerald-500/30";
                  } else if (cell.startsWith("✗") || cell.includes("Vulnerable") || cell.includes("Critical")) {
                    isPill = true;
                    pillStyle = "text-rose-400 bg-rose-950/60 border border-rose-500/30";
                  } else if (cell.includes("⚠️") || cell.includes("Workaround") || cell.includes("Partial")) {
                    isPill = true;
                    pillStyle = "text-amber-400 bg-amber-950/60 border border-amber-500/30";
                  }
                }

                return (
                  <td
                    key={cIdx}
                    className={`p-3.5 sm:p-4 text-zinc-300 ${
                      cIdx === 0 ? "font-semibold text-white font-mono" : ""
                    }`}
                  >
                    {isPill ? (
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${pillStyle}`}>
                        {cell}
                      </span>
                    ) : (
                      renderFormattedText(cell)
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Current post index for Prev/Next
  const currentIndex = blogs.findIndex((b) => b.slug === slug || b.id === slug);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  // Match related project if specified
  const relatedProject = post?.relatedProjectId
    ? projects.find((p) => p.id === post.relatedProjectId)
    : null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://aafaque.in/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNativeShare = () => {
    if (typeof navigator !== "undefined" && navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: currentUrl
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  // Extract headings for Table of Contents
  const headings = post?.sections
    ? post.sections
        .filter((sec) => sec.type === "heading" && sec.level === 2)
        .map((sec, idx) => ({
          title: sec.title,
          id: `heading-${idx}`,
        }))
    : [];

  // Scroll spy effect for Table of Contents
  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 pt-24">
        <h1 className="text-3xl font-bold mb-4 font-mono">Article Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">
          The requested engineering article could not be located.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider font-mono hover:bg-cyan-300 transition-colors"
        >
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO blogPost={post} />

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 origin-left z-50 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
      />

      <div className="relative min-h-screen bg-black text-white pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-cyan-500/[0.03] blur-[150px] pointer-events-none -z-0" />

        <article className="max-w-4xl mx-auto relative z-10">
          {/* Top Breadcrumb Navigation Row */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs font-mono mb-6">
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <RiArrowLeftLine className="transition-transform group-hover:-translate-x-0.5" />
              <span>All Articles</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 uppercase tracking-widest text-[11px] font-semibold">
                {post.category}
              </span>
            </div>
          </nav>

          {/* Article Header */}
          <header className="mb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <RiCalendarLine size={13} className="text-cyan-400" />
                <span>{post.publishedAt}</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <RiTimeLine size={13} className="text-cyan-400" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-snug">
              {post.title}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              {post.description}
            </p>

            {/* Author info pill & Social Share Row */}
            <div className="pt-4 border-t border-b border-white/10 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar || "/og-image.png"}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full border border-cyan-400/40 object-cover bg-zinc-800"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    <span>{post.author.name}</span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20">
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Share Actions */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-zinc-500 mr-1 hidden sm:inline">Share:</span>
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link to article"
                  title="Copy link"
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-white/5 active:scale-95 cursor-pointer"
                >
                  {copiedLink ? <RiCheckLine size={15} className="text-emerald-400" /> : <RiFileCopyLine size={15} />}
                </button>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + currentUrl)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-400 transition-all border border-white/5"
                >
                  <RiWhatsappFill size={15} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Share on X"
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/15 text-zinc-300 hover:text-white transition-all border border-white/5"
                >
                  <RiTwitterXFill size={15} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-400 transition-all border border-white/5"
                >
                  <RiLinkedinFill size={15} />
                </a>
                <button
                  onClick={handleNativeShare}
                  aria-label="Share natively"
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/15 text-zinc-300 hover:text-white transition-all border border-white/5 sm:hidden"
                >
                  <RiShareLine size={15} />
                </button>
              </div>
            </div>
          </header>

          {/* AI Quick Answer / Executive Takeaways (High-end Glassmorphic Card) */}
          {post.quickAnswer && (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-zinc-950 to-black border-l-4 border-cyan-400 border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.06)] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                <RiSparklingFill size={14} className="text-cyan-400 animate-pulse" />
                <span>Executive Summary & Quick Answer</span>
              </div>
              <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed font-light">
                {renderFormattedText(post.quickAnswer)}
              </p>
            </div>
          )}

          {/* Table of Contents (Sticky navigation with active section indicator) */}
          {headings.length > 0 && (
            <div className="mb-10 p-5 rounded-2xl bg-[#09090d] border border-white/10 shadow-lg">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3.5 flex items-center gap-2">
                <RiListCheck2 className="text-cyan-400" size={16} />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2">
                {headings.map((h) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`text-xs sm:text-sm transition-all flex items-center gap-2.5 py-1 ${
                          isActive
                            ? "text-cyan-300 font-medium translate-x-1"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <span className={`font-mono text-xs ${isActive ? "text-cyan-400" : "text-zinc-600"}`}>
                          &rarr;
                        </span>
                        <span>{h.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className="space-y-8 text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
            {post.sections.map((section, idx) => {
              if (section.type === "heading") {
                const headingId = `heading-${post.sections.slice(0, idx + 1).filter((s) => s.type === "heading" && s.level === 2).length - 1}`;
                if (section.level === 2) {
                  return (
                    <h2
                      id={headingId}
                      key={idx}
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-white pt-6 tracking-tight scroll-mt-24 border-b border-white/5 pb-3"
                    >
                      {section.title}
                    </h2>
                  );
                }
                return (
                  <h3
                    key={idx}
                    className="text-lg sm:text-xl font-bold text-white pt-4 tracking-tight"
                  >
                    {section.title}
                  </h3>
                );
              }

              if (section.type === "paragraph") {
                return (
                  <p key={idx} className="leading-relaxed text-zinc-300">
                    {renderFormattedText(section.text)}
                  </p>
                );
              }

              if (section.type === "code") {
                return (
                  <CodeSnippet
                    key={idx}
                    code={section.code}
                    language={section.language}
                    caption={section.caption}
                  />
                );
              }

              if (section.type === "stats") {
                return <StatsGrid key={idx} items={section.items} />;
              }

              if (section.type === "diagram") {
                return (
                  <ArchitectureDiagram
                    key={idx}
                    title={section.title}
                    nodes={section.nodes}
                    caption={section.caption}
                  />
                );
              }

              if (section.type === "steps") {
                return (
                  <StepsPlaybook
                    key={idx}
                    title={section.title}
                    items={section.items}
                  />
                );
              }

              if (section.type === "comparison") {
                return (
                  <ComparisonTable
                    key={idx}
                    headers={section.headers}
                    rows={section.rows}
                  />
                );
              }

              if (section.type === "callout") {
                return (
                  <CalloutBox
                    key={idx}
                    title={section.title}
                    text={section.text}
                    variant={section.variant}
                  />
                );
              }

              if (section.type === "list") {
                return (
                  <ul key={idx} className="space-y-3 my-4 pl-1">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          ✓
                        </span>
                        <span className="leading-relaxed">{renderFormattedText(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>

          {/* Related Case Study Project Card (High-intent Contextual Internal Linking) */}
          {relatedProject && (
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900 via-[#0a0a0c] to-black border border-cyan-500/30 relative overflow-hidden shadow-[0_0_35px_rgba(34,211,238,0.1)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40">
                  Featured Case Study Mentioned In This Article
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  ⚡ 98+ Lighthouse
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {relatedProject.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2">
                    {relatedProject.solution || relatedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {relatedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-zinc-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
                  <Link
                    to={`/projects/${relatedProject.id}`}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] font-mono"
                  >
                    View Project Case Study
                  </Link>
                  {relatedProject.link && (
                    <a
                      href={relatedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/10 inline-flex items-center justify-center gap-1.5 font-mono"
                    >
                      <span>Live Site</span>
                      <RiExternalLinkLine size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Structured FAQ Section (AEO and Google FAQ Rich Snippets) */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-14 pt-10 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <RiQuestionLine size={16} />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
                Key Technical Questions Answered
              </h3>

              <div className="space-y-3">
                {post.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/10 bg-[#09090d] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-cyan-300 transition-colors text-sm sm:text-base cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <RiArrowDownSLine
                          className={`text-cyan-400 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          size={20}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed border-t border-white/5 pt-3">
                          {renderFormattedText(faq.answer)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author Bio Card & Direct Conversion Callout */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-[#0a0a0e] to-black border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl">
            <img
              src={post.author.avatar || "/og-image.png"}
              alt={post.author.name}
              className="w-20 h-20 rounded-2xl border border-cyan-400/40 object-cover bg-zinc-800 shrink-0"
            />
            <div className="space-y-2.5 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    <span>{post.author.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                      Independent Engineer
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">{post.author.role}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all font-mono shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                >
                  <span>Consult Architecture</span>
                  <RiArrowRightLine size={13} />
                </Link>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {post.author.bio} Need an audit or hands-on assistance building scalable React/Next.js architectures or hardening server stacks? Let's build together.
              </p>
            </div>
          </div>

          {/* Prev / Next Article Navigation */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1 mb-1">
                  <RiArrowLeftLine /> Previous Article
                </span>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col sm:text-right"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center sm:justify-end gap-1 mb-1">
                  Next Article <RiArrowRightLine />
                </span>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </div>
    </>
  );
}
