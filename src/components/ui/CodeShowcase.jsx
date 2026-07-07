import React, { useState } from "react";
import { motion } from "framer-motion";

const codeSnippet = `import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeData(table) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch initial dataset
    const fetchInitial = async () => {
      const { data: initialData } = await supabase
        .from(table)
        .select('*');
      setData(initialData);
      setLoading(false);
    };

    fetchInitial();

    // 2. Subscribe to realtime changes
    const subscription = supabase
      .channel('public:' + table)
      .on('postgres_changes', { event: '*', schema: 'public', table }, 
        (payload) => {
          setData(prev => {
            if (payload.eventType === 'INSERT') return [...prev, payload.new];
            if (payload.eventType === 'DELETE') return prev.filter(item => item.id !== payload.old.id);
            if (payload.eventType === 'UPDATE') return prev.map(item => item.id === payload.new.id ? payload.new : item);
            return prev;
          });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table]);

  return { data, loading };
}`;

const CodeShowcase = () => {
  const [copied, setCopied] = useState(false);
  const [inView, setInView] = useState(false);
  const [displayedCode, setDisplayedCode] = useState("");

  React.useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.slice(0, i));
      i += 3; // speed up typing slightly
      if (i > codeSnippet.length) {
        setDisplayedCode(codeSnippet);
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [inView]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting simulation for presentation
  const highlightCode = (code) => {
    return code
      .replace(/(import|from|export|function|const|let|var|return|if|else|await|async)/g, '<span class="text-pink-500">$1</span>')
      .replace(/({|}|\[|\]|\(|\))/g, '<span class="text-yellow-400">$1</span>')
      .replace(/('([^']*)')/g, '<span class="text-green-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-slate-500">$1</span>')
      .replace(/(useState|useEffect|supabase|setData|setLoading|fetchInitial|subscription)/g, '<span class="text-cyan-400">$1</span>');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-20 px-4">
      <div className="text-center mb-10">

        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          Clean & Scalable Code
        </h3>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          I write code that is meant to be read by humans and executed efficiently by machines. 
          Here is an example of a custom React hook managing complex real-time WebSockets state.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => setInView(true)}
        className="relative bg-[#0d1117]/80 backdrop-blur-xl border border-white/[0.05] rounded-xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
      >
        {/* IDE Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.05]">
          <div className="flex items-center gap-2 group/mac">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center">
              <svg className="w-2 h-2 text-black/50 opacity-0 group-hover/mac:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center">
              <svg className="w-2 h-2 text-black/50 opacity-0 group-hover/mac:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center">
              <svg className="w-2 h-2 text-black/50 opacity-0 group-hover/mac:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none"><path d="M8 2L13 7M13 7L8 12M13 7H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#0d1117] px-3 py-1 rounded-md border border-[#30363d]">
            <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            useRealtimeData.js
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* IDE Content */}
        <div className="p-4 md:p-6 overflow-x-auto text-[13px] md:text-sm font-mono leading-relaxed text-slate-300 min-h-[500px]">
          <pre>
            <code dangerouslySetInnerHTML={{ __html: highlightCode(displayedCode) + (displayedCode.length < codeSnippet.length ? '<span class="animate-pulse bg-cyan-500/50 text-transparent">_</span>' : '') }} />
          </pre>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeShowcase;
