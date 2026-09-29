import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do you build websites from scratch or use templates?",
    answer: "I build websites from scratch using modern tools like React and Next.js. This ensures your website has clean code, loads quickly, and is tailored to your exact needs."
  },
  {
    question: "How long does it usually take to complete a project?",
    answer: "A standard website typically takes about 1-2 weeks, while larger web applications with database features take 3-6 weeks depending on the scope."
  },
  {
    question: "Do you provide support after the website goes live?",
    answer: "Yes, I provide post-launch support to make sure everything runs smoothly, fix any issues, and help with updates."
  },
  {
    question: "Will my website be mobile-friendly and SEO ready?",
    answer: "Yes, every site is designed to look great on mobile phones, tablets, and desktops, with proper SEO meta tags included."
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
      
      <div className="text-center mb-10 max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-2"
        >
          Common Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed"
        >
          Everything you need to know before getting started.
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
