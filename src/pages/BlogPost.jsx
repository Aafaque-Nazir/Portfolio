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
  RiQuestionLine,
  RiArrowDownSLine,
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiListCheck2,
  RiShareLine
} from "react-icons/ri";
import SEO from "../components/SEO";
import { getBlogBySlug, blogs } from "../data/blogs";
import { projects } from "../data/projects";

// Parse markdown links [text](url) and inline code `code`
const renderFormattedText = (text) => {
  if (!text) return null;

  const parts = [];
  let lastIdx = 0;
  const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }

    if (match[2] && match[3]) {
      const label = match[2];
      const href = match[3];

      if (href.startsWith("/")) {
        parts.push(
          <Link
            key={match.index}
            to={href}
            className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 transition-colors"
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
            className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 transition-colors"
          >
            {label}
          </a>
        );
      }
    } else if (match[4]) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-xs border border-zinc-800"
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

// Clean, quiet code snippet with minimal header
const CodeSnippet = ({ code, language, caption }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-zinc-800/80 bg-[#0a0b0e]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950/70 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-500">
          <RiCodeSSlashLine size={13} />
          <span className="uppercase text-[11px] text-zinc-400">{language || "code"}</span>
          {caption && <span className="text-zinc-600 font-sans hidden sm:inline">· {caption}</span>}
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <RiCheckLine className="text-emerald-400" size={13} />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <RiFileCopyLine size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed scrollbar-none">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Clean Architectural Metrics Panel (Monochrome & Legible)
const StatsGrid = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((stat, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60 flex flex-col justify-between"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
            {stat.label}
          </div>
          <div className="text-xl sm:text-2xl font-mono font-semibold text-zinc-100 my-0.5">
            {stat.value}
          </div>
          {stat.desc && (
            <div className="text-xs text-zinc-400 font-light mt-1">
              {stat.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Wireframe Architecture & Execution Flow
const ArchitectureDiagram = ({ title, nodes, caption }) => {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 sm:p-6">
      <div className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-400 mb-4">
        {title || "Architecture Flow"}
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <div className="flex-1 p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-center flex flex-col justify-center min-h-[72px]">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                Step {node.step || `0${i + 1}`}
              </div>
              <div className="font-medium text-xs sm:text-sm text-zinc-200">
                {node.label}
              </div>
              {node.sub && (
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  {node.sub}
                </div>
              )}
            </div>

            {i < nodes.length - 1 && (
              <div className="flex items-center justify-center text-zinc-600 md:rotate-0 rotate-90 py-1 md:py-0 font-mono text-xs">
                &rarr;
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {caption && (
        <p className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-500 font-mono text-center">
          {caption}
        </p>
      )}
    </div>
  );
};

// Sequential Numbered Steps
const StepsPlaybook = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 space-y-3.5">
      {title && (
        <div className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
          <RiListCheck2 size={15} />
          <span>{title}</span>
        </div>
      )}

      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 flex gap-4 items-start"
        >
          <div className="text-xs font-mono font-semibold text-zinc-500 shrink-0 mt-0.5">
            {item.step || `0${idx + 1}`}
          </div>
          <div className="flex-1 space-y-1.5">
            <h4 className="text-sm sm:text-base font-semibold text-zinc-200">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {renderFormattedText(item.desc)}
            </p>
            {item.code && (
              <div className="mt-2 rounded-lg bg-black/80 border border-zinc-800 p-2.5 font-mono text-xs text-zinc-300 overflow-x-auto">
                <code>{item.code}</code>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Minimal Editorial Callout
const CalloutBox = ({ title, text, variant = "info" }) => {
  const isAlert = variant === "critical" || (title && title.toLowerCase().includes("alert"));
  const borderColor = isAlert ? "border-amber-500/70" : "border-zinc-500";

  return (
    <div className={`my-6 p-4 sm:p-5 rounded-r-xl border-l-2 ${borderColor} bg-zinc-900/30 border border-zinc-800`}>
      {title && (
        <div className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-300 mb-1.5">
          {title}
        </div>
      )}
      <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-light">
        {renderFormattedText(text)}
      </p>
    </div>
  );
};

// Clean Data Comparison Table
const ComparisonTable = ({ headers, rows }) => {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-zinc-800/80 bg-zinc-950/60">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="border-b border-zinc-800 text-zinc-400 font-mono text-xs uppercase tracking-wider">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-zinc-900/30 transition-colors">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`p-3.5 text-zinc-300 ${
                    cIdx === 0 ? "font-medium text-zinc-200 font-mono" : ""
                  }`}
                >
                  {renderFormattedText(cell)}
                </td>
              ))}
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const currentIndex = blogs.findIndex((b) => b.slug === slug || b.id === slug);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

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

  const headings = post?.sections
    ? post.sections
        .filter((sec) => sec.type === "heading" && sec.level === 2)
        .map((sec, idx) => ({
          title: sec.title,
          id: `heading-${idx}`,
        }))
    : [];

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
        <h1 className="text-2xl font-semibold mb-3 font-mono">Article Not Found</h1>
        <p className="text-zinc-500 text-sm mb-6">
          The requested engineering article does not exist.
        </p>
        <Link
          to="/blog"
          className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono hover:text-white transition-colors"
        >
          ← Return to Articles
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO blogPost={post} />

      {/* Top Reading Progress Bar (Subtle 1px line) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-300 origin-left z-50 opacity-90"
      />

      <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          
          {/* Top Breadcrumb Row */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              <RiArrowLeftLine size={13} />
              <span>Articles & Guides</span>
            </Link>

            <span className="uppercase tracking-wider text-zinc-400">
              {post.category}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-100 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
              {post.description}
            </p>

            {/* Author Attribution & Date Strip */}
            <div className="pt-4 border-t border-b border-zinc-800 py-3.5 flex items-center justify-between text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="text-zinc-300 font-medium">{post.author.name}</span>
                <span>·</span>
                <span>{post.publishedAt}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  title="Copy link"
                  className="hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  {copiedLink ? <RiCheckLine size={14} className="text-emerald-400" /> : <RiFileCopyLine size={14} />}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Share on X"
                  className="hover:text-zinc-200 transition-colors"
                >
                  <RiTwitterXFill size={14} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="hover:text-zinc-200 transition-colors"
                >
                  <RiLinkedinFill size={14} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + currentUrl)}`}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="hover:text-zinc-200 transition-colors"
                >
                  <RiWhatsappFill size={14} />
                </a>
              </div>
            </div>
          </header>

          {/* Executive Summary / Key Takeaways */}
          {post.quickAnswer && (
            <div className="mb-10 p-5 rounded-xl border border-zinc-800/80 border-l-2 border-l-zinc-400 bg-zinc-950/60">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium mb-2">
                Executive Summary
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {renderFormattedText(post.quickAnswer)}
              </p>
            </div>
          )}

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="mb-10 p-5 rounded-xl border border-zinc-800 bg-zinc-950/40">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <RiListCheck2 size={14} />
                <span>Contents</span>
              </div>
              <ul className="space-y-1.5">
                {headings.map((h) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`text-xs sm:text-sm transition-colors block py-0.5 ${
                          isActive
                            ? "text-zinc-100 font-medium translate-x-1"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {h.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Body Prose Content */}
          <div className="space-y-7 text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
            {post.sections.map((section, idx) => {
              if (section.type === "heading") {
                const headingId = `heading-${post.sections.slice(0, idx + 1).filter((s) => s.type === "heading" && s.level === 2).length - 1}`;
                if (section.level === 2) {
                  return (
                    <h2
                      id={headingId}
                      key={idx}
                      className="text-xl sm:text-2xl font-semibold text-zinc-100 pt-8 tracking-tight scroll-mt-24 border-b border-zinc-800 pb-2.5"
                    >
                      {section.title}
                    </h2>
                  );
                }
                return (
                  <h3
                    key={idx}
                    className="text-lg sm:text-xl font-medium text-zinc-200 pt-5 tracking-tight"
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
                  <ul key={idx} className="space-y-2.5 my-4 pl-4 list-disc text-zinc-400">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {renderFormattedText(item)}
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>

          {/* Case Study Reference */}
          {relatedProject && (
            <div className="mt-14 p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                Related Project Architecture
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {relatedProject.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 max-w-lg mt-1 font-light">
                    {relatedProject.solution || relatedProject.description}
                  </p>
                </div>
                <Link
                  to={`/projects/${relatedProject.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-xs font-mono whitespace-nowrap shrink-0"
                >
                  <span>View case study</span>
                  <RiArrowRightLine size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Structured FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-14 pt-8 border-t border-zinc-800">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                <RiQuestionLine size={14} />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 tracking-tight mb-6">
                Technical Details
              </h3>

              <div className="space-y-2.5">
                {post.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/40 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-medium text-zinc-200 hover:text-white transition-colors text-sm cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <RiArrowDownSLine
                          className={`text-zinc-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          size={18}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed border-t border-zinc-800/60 pt-3">
                          {renderFormattedText(faq.answer)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author Note */}
          <div className="mt-14 p-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-zinc-200">{post.author.name}</h4>
              <p className="text-xs text-zinc-500 font-mono">{post.author.role}</p>
            </div>
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-xs font-mono"
            >
              Get in touch →
            </Link>
          </div>

          {/* Prev / Next Navigation */}
          <div className="mt-12 pt-8 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-4 rounded-xl border border-zinc-800 hover:border-zinc-750 transition-colors group flex flex-col"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase mb-1">
                  ← Previous
                </span>
                <span className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-4 rounded-xl border border-zinc-800 hover:border-zinc-750 transition-colors group flex flex-col sm:text-right"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase mb-1">
                  Next →
                </span>
                <span className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>

        </article>
      </div>
    </>
  );
}
