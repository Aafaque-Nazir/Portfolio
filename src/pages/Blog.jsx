import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  RiSearchLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArticleLine,
  RiCloseLine
} from "react-icons/ri";
import { blogs } from "../data/blogs";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return blogs;
    return blogs.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        post.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div id="blog" className="min-h-screen bg-black text-white pt-20 sm:pt-24 pb-16">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[360px] bg-cyan-500/[0.02] blur-[130px] pointer-events-none -z-0" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section: Matches My Projects & Services site-wide design */}
        <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase mb-2">
            Articles & Guides
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            Practical guides and insights on modern web development, React, Next.js, and performance.
          </p>
        </div>

        {/* Search Bar: Centered, clean, and responsive */}
        <div className="w-full max-w-lg mx-auto mb-8 sm:mb-10">
          <div className="relative flex items-center">
            <RiSearchLine
              className="absolute left-3.5 text-zinc-500 pointer-events-none"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or tags..."
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-700/50 transition-all shadow-sm"
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

          {searchQuery && (
            <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] font-mono text-zinc-500">
              <span>
                Found {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 px-4 border border-zinc-800/80 rounded-xl bg-zinc-950/50 w-full max-w-md mx-auto">
            <RiArticleLine className="mx-auto text-3xl text-zinc-600 mb-3" />
            <p className="text-zinc-300 font-medium text-sm">No articles found</p>
            <p className="text-zinc-500 text-xs font-mono mt-1">
              No results matching "{searchQuery}". Try different keywords.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBlogs.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group relative rounded-xl p-5 bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-200 flex flex-col justify-between cursor-pointer no-underline block"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono">
                    <span className="uppercase tracking-wider text-zinc-400 font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-zinc-500">
                      <RiTimeLine size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-tight leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-normal line-clamp-2 leading-relaxed mb-4">
                    {post.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800/80 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Row */}
                  <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-[11px] text-zinc-500">
                      {post.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1 text-zinc-300 group-hover:text-white transition-colors font-medium">
                      <span>Read</span>
                      <RiArrowRightLine className="text-xs transition-transform group-hover:translate-x-0.5" />
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
