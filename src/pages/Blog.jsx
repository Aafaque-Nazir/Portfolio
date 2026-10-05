import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSearchLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArticleLine,
} from "react-icons/ri";
import { blogs, getAllBlogCategories } from "../data/blogs";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => ["All", ...getAllBlogCategories()], []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div id="blog" className="relative w-full min-h-screen flex flex-col items-center justify-start bg-black text-white pt-28 sm:pt-32 pb-20">
      {/* Background Subtle Grid & Ambient Glow matching Projects/Skills */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/[0.03] blur-[150px] pointer-events-none -z-[1]" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header Section: Exact match with My Projects and My Stack */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3"
          >
            Articles & Guides
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            In-depth engineering guides, React 19 & Next.js architecture, performance optimization, and full-stack insights.
          </motion.p>
        </div>

        {/* Filter and Search Bar: Compact & Unified */}
        <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 pb-5 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                    active
                      ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      : "bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white hover:border-white/15"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Compact Search Box */}
          <div className="relative w-full sm:w-64">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
            />
          </div>
        </div>

        {/* Compact, Structured Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/[0.01] w-full max-w-lg">
            <RiArticleLine className="mx-auto text-3xl text-zinc-600 mb-2" />
            <p className="text-zinc-300 font-medium text-sm">No articles found</p>
            <p className="text-zinc-500 text-xs font-mono mt-1">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredBlogs.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group relative rounded-2xl p-5 sm:p-6 bg-[#09090b] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] cursor-pointer"
                >
                  <div>
                    {/* Top Row: Category Pill & Read Time */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                        <RiTimeLine size={12} className="text-cyan-400/80" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link to={`/blog/${post.slug}`} className="block">
                      <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug line-clamp-2 mb-2">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Compact Description */}
                    <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                      {post.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Metadata & Link */}
                    <div className="pt-3.5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {post.publishedAt}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors"
                      >
                        <span>Read Article</span>
                        <RiArrowRightLine className="text-xs group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
