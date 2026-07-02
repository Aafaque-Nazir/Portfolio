import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do you build websites from scratch or use templates?",
    answer: "I build everything from scratch using modern frameworks like React and Next.js. This ensures your website is uniquely tailored to your brand, highly secure, lightning-fast, and deeply scalable."
  },
  {
    question: "How long does it usually take to complete a project?",
    answer: "A standard business website takes about 2-3 weeks, while complex web applications can take 4-8 weeks depending on the features. However, timelines are flexible, and we can deliver much faster if your project has an urgent deadline."
  },
  {
    question: "Do you provide maintenance after the website goes live?",
    answer: "Yes! I offer ongoing support and maintenance to ensure your website stays updated, secure, and performs optimally at all times."
  },
  {
    question: "Will my website be mobile-friendly and SEO optimized?",
    answer: "Absolutely. Every project I build is fully responsive (works perfectly on mobile, tablet, and desktop) and follows strict SEO best practices to help you rank on Google."
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border border-white/5 bg-zinc-950/40 backdrop-blur-sm rounded-2xl overflow-hidden transition-colors hover:border-cyan-500/20">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h3 className={`text-sm md:text-base font-bold transition-colors ${isOpen ? "text-cyan-400" : "text-white group-hover:text-cyan-300"}`}>
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 ml-4 text-cyan-500"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-400 text-sm md:text-base font-light leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  // Generate Google Rich Snippet JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 relative z-10">
      {/* Injecting SEO Schema directly into the head/page for Google Bots */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4"
        >
          Common Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 font-mono text-xs md:text-sm tracking-widest uppercase"
        >
          Everything you need to know
        </motion.p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
