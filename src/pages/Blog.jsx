import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  RiSearchLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArticleLine,
  RiCloseLine,
  RiCalendarLine,
  RiSparklingFill,
  RiShieldFlashLine
} from "react-icons/ri";
import { blogs } from "../data/blogs";

const CATEGORIES = [
  "All",
  "Security & Architecture",
  "Performance Engineering",
  "Backend & Database",
  "Architecture & Frameworks",
  "Real-Time & Full-Stack",
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = blogs[0];

  const filteredBlogs = useMemo(() => {
    let result = blogs;

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // Filter by Search Query
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      result = result.filter((post) => {
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.category?.toLowerCase().includes(q) ||
          post.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <div id="blog" className="min-h-screen bg-black text-white pt-20 sm:pt-24 pb-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[380px] bg-cyan-500/[0.03] blur-[140px] pointer-events-none -z-0" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Engineering Logs & Architecture Deep-Dives</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase mb-3">
            Articles & Benchmarks
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            Battle-tested architecture breakdowns, performance engineering protocols, and zero-bullshit guides on React, Next.js, databases, and web security.
          </p>
        </div>

        {/* Featured Hero Article Spotlight (Only show if not currently filtering by search) */}
        {!searchQuery && selectedCategory === "All" && featuredPost && (
          <div className="mb-12">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-cyan-950/20 via-zinc-950 to-black border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 shadow-[0_0_35px_rgba(34,211,238,0.08)] overflow-hidden"
            >
              {/* Subtle mesh highlight */}
              <div className="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-400 border border-rose-500/40 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <RiShieldFlashLine size={13} />
                      <span>Breaking Vulnerability Breakdown</span>
                    </span>
                    <span className="text-zinc-500">&bull;</span>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <RiTimeLine size={13} />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <span className="text-zinc-500">&bull;</span>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <RiCalendarLine size={13} />
                      <span>{featuredPost.publishedAt}</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed font-light">
                    {featuredPost.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags?.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
                  <span className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-400 group-hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all font-mono shadow-[0_0_20px_rgba(34,211,238,0.3)] w-full md:w-auto">
                    <span>Read Full Analysis</span>
                    <RiArrowRightLine size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Filter & Search Bar Row */}
        <div className="mb-8 space-y-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer border ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                      : "bg-zinc-950/80 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center max-w-md">
            <RiSearchLine
              className="absolute left-3.5 text-zinc-500 pointer-events-none"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, CVE, framework, or topic..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <RiCloseLine size={16} />
              </button>
            )}
          </div>

          {(searchQuery || selectedCategory !== "All") && (
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
              <span>
                Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 px-4 border border-zinc-800/80 rounded-2xl bg-zinc-950/50 w-full max-w-md mx-auto">
            <RiArticleLine className="mx-auto text-3xl text-zinc-600 mb-3" />
            <p className="text-zinc-200 font-medium text-sm">No matching articles found</p>
            <p className="text-zinc-500 text-xs font-mono mt-1">
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBlogs.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group relative rounded-2xl p-5 bg-[#09090d] border border-white/10 hover:border-cyan-500/40 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between cursor-pointer no-underline block shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.06)] hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Row: Category Label & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono">
                    <span className="uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                      <span>{post.category}</span>
                    </span>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <RiTimeLine size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                    {post.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Metadata & Link */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <RiCalendarLine size={11} />
                      <span>{post.publishedAt}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-zinc-300 group-hover:text-cyan-300 transition-colors font-medium text-xs">
                      <span>Read</span>
                      <RiArrowRightLine className="text-xs transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
