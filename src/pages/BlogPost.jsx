import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  RiListCheck2
} from "react-icons/ri";
import SEO from "../components/SEO";
import { getBlogBySlug, blogs } from "../data/blogs";
import { projects } from "../data/projects";

// Helper to parse markdown links [text](url) into proper React Link / anchor elements
const renderFormattedText = (text) => {
  if (!text) return null;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];

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
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

// Code block with copy button
const CodeSnippet = ({ code, language, caption }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0c0d12] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <RiCodeSSlashLine className="text-cyan-400" />
          <span className="text-gray-300 uppercase">{language || "code"}</span>
          {caption && <span className="text-gray-500 font-sans hidden sm:inline">&bull; {caption}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-[11px]"
        >
          {copied ? (
            <>
              <RiCheckLine className="text-green-400" />
              <span className="text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <RiFileCopyLine />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-100/90 leading-relaxed scrollbar-none">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogBySlug(slug);

  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 pt-24">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-400 text-sm mb-6">
          The requested engineering article could not be located.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Extract headings for Table of Contents
  const headings = post.sections
    .filter((sec) => sec.type === "heading" && sec.level === 2)
    .map((sec, idx) => ({
      title: sec.title,
      id: `heading-${idx}`,
    }));

  return (
    <>
      <SEO blogPost={post} />

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
      />

      <div className="relative min-h-screen bg-black text-white pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle Ambient background glow matching ProjectDetails */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none -z-0" />

        <article className="max-w-4xl mx-auto relative z-10">
          {/* Top Navigation Row matching ProjectDetails.jsx */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all duration-200"
            >
              <RiArrowLeftLine className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              {post.category}
            </span>
          </div>

          {/* Article Header: Unified font sizing */}
          <header className="mb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <RiCalendarLine size={13} className="text-cyan-400/80" />
                <span>{post.publishedAt}</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <RiTimeLine size={13} className="text-cyan-400/80" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
              {post.title}
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              {post.description}
            </p>

            {/* Author info pill & Social Share Row */}
            <div className="pt-4 border-t border-b border-white/10 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar || "/og-image.png"}
                  alt={post.author.name}
                  className="w-9 h-9 rounded-full border border-cyan-400/30 object-cover bg-zinc-800"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {post.author.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-zinc-500 mr-1 hidden sm:inline">Share:</span>
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link to article"
                  title="Copy link"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                >
                  {copiedLink ? <RiCheckLine size={15} className="text-green-400" /> : <RiFileCopyLine size={15} />}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-green-500/20 text-zinc-400 hover:text-green-400 transition-colors border border-white/5"
                >
                  <RiWhatsappFill size={15} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/15 text-zinc-400 hover:text-white transition-colors border border-white/5"
                >
                  <RiTwitterXFill size={15} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 transition-colors border border-white/5"
                >
                  <RiLinkedinFill size={15} />
                </a>
              </div>
            </div>
          </header>

          {/* AI Quick Answer / Executive Takeaways (Compact & Clean) */}
          {post.quickAnswer && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border-l-2 border-cyan-400 border border-white/5">
              <div className="flex items-center gap-1.5 mb-1.5 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                <RiSparklingFill size={13} className="text-cyan-400" />
                <span>Quick Answer & Summary</span>
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                {post.quickAnswer}
              </p>
            </div>
          )}

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="mb-10 p-5 rounded-2xl bg-[#09090b] border border-white/10">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <RiListCheck2 className="text-cyan-400" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-xs sm:text-sm text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                    >
                      <span className="text-cyan-500/60 font-mono">&rarr;</span>
                      <span>{h.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className="space-y-8 text-gray-300 leading-relaxed font-light text-sm sm:text-base">
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
                  <p key={idx} className="leading-relaxed">
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

              if (section.type === "comparison") {
                return (
                  <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#09090b]">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-white/[0.04] border-b border-white/10 text-cyan-400 font-mono uppercase tracking-wider">
                        <tr>
                          {section.headers.map((h, i) => (
                            <th key={i} className="p-3.5 sm:p-4 font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-sans">
                        {section.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 sm:p-4 text-gray-300 ${
                                  cIdx === 0 ? "font-semibold text-white font-mono" : ""
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (section.type === "callout") {
                return (
                  <div
                    key={idx}
                    className="my-6 p-5 rounded-2xl bg-cyan-950/20 border-l-4 border-cyan-400 bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono text-xs uppercase tracking-wider mb-1.5">
                      <RiLightbulbFlashLine size={16} />
                      <span>{section.title}</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                );
              }

              if (section.type === "list") {
                return (
                  <ul key={idx} className="space-y-2.5 my-4 pl-1">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <span className="text-cyan-400 mt-1 font-bold">&check;</span>
                        <span>{renderFormattedText(item)}</span>
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
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
                    {relatedProject.solution || relatedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {relatedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-gray-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
                  <Link
                    to={`/projects/${relatedProject.id}`}
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  >
                    View Project Case Study
                  </Link>
                  {relatedProject.link && (
                    <a
                      href={relatedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/10 inline-flex items-center justify-center gap-1.5"
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
                      className="rounded-2xl border border-white/10 bg-[#09090b] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-cyan-300 transition-colors text-sm sm:text-base"
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
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author Bio Card & Direct Conversion Callout */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#09090b] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={post.author.avatar || "/og-image.png"}
              alt={post.author.name}
              className="w-20 h-20 rounded-2xl border border-cyan-400/40 object-cover bg-zinc-800 shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg font-bold text-white">{post.author.name}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{post.author.role}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Work With Me</span>
                  <RiArrowRightLine size={13} />
                </Link>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {post.author.bio}
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
                <span className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-1 mb-1">
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
                <span className="text-[10px] font-mono text-gray-500 uppercase flex items-center sm:justify-end gap-1 mb-1">
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
