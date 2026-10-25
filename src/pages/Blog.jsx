import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  RiSearchLine,
  RiArrowRightLine,
  RiArticleLine,
  RiCloseLine
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
    <div id="blog" className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section: Pure editorial typography */}
        <header className="mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100 mb-3">
            Writing
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl leading-relaxed">
            Technical essays, architectural post-mortems, and engineering guides on full-stack systems, performance optimization, and web security.
          </p>
        </header>

        {/* Featured Story: Understated Editorial Lead */}
        {!searchQuery && selectedCategory === "All" && featuredPost && (
          <section className="mb-14">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block rounded-2xl p-6 sm:p-8 bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="uppercase tracking-wider text-zinc-400 font-medium">
                    {featuredPost.category}
                  </span>
                  <span>·</span>
                  <span>{featuredPost.publishedAt}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-tight leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-3xl">
                  {featuredPost.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-zinc-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">
                    <span>Read analysis</span>
                    <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Category Filter Tabs & Search: Minimalist Strip */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-3">
            {/* Minimalist Tabs */}
            <nav className="flex items-center gap-5 overflow-x-auto scrollbar-none py-1" aria-label="Category filter">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-mono transition-colors whitespace-nowrap cursor-pointer pb-2 -mb-3 border-b-2 ${
                      isSelected
                        ? "text-zinc-100 font-medium border-zinc-300"
                        : "text-zinc-500 hover:text-zinc-300 border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>

            {/* Quiet Search Input */}
            <div className="relative flex items-center min-w-[240px]">
              <RiSearchLine
                className="absolute left-3 text-zinc-500 pointer-events-none"
                size={14}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-zinc-600 transition-colors"
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <RiCloseLine size={14} />
                </button>
              )}
            </div>
          </div>

          {(searchQuery || selectedCategory !== "All") && (
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
              <span>
                {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"} found
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Article Grid / Stream: Clean Editorial Cards */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 px-4 border border-zinc-800 rounded-xl bg-zinc-950/40 max-w-md mx-auto">
            <RiArticleLine className="mx-auto text-2xl text-zinc-600 mb-2" />
            <p className="text-zinc-300 text-sm font-medium">No articles match your query</p>
            <p className="text-zinc-500 text-xs font-mono mt-1">
              Try a different keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-3 py-1.5 rounded-md text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBlogs.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group rounded-xl p-5 bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700/80 hover:bg-zinc-900/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2.5">
                    <span className="uppercase tracking-wider text-zinc-400">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-tight leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed mb-4">
                    {post.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>{post.publishedAt}</span>
                  <span className="inline-flex items-center gap-1 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <span>Read</span>
                    <RiArrowRightLine className="text-xs transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
