import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  Calendar,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid WhatsApp number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleSelectService = (e) => {
        if (e.detail) setValue("service", e.detail);
      };
      window.addEventListener("selectService", handleSelectService);
      return () => window.removeEventListener("selectService", handleSelectService);
    }
  }, [setValue]);

  useEffect(() => {
    if (location.state?.plan) {
      setValue("service", location.state.plan);
    }
  }, [location, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://formsubmit.co/aafaquebuisness@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _captcha: "false",
          _template: "table",
          _subject: `Portfolio Inquiry: ${data.service || "General"} from ${data.name}`,
        }),
      });

      if (res.ok) {
        toast.success("Message sent successfully!", {
          description: "I will get back to you within 24 hours.",
        });
        reset();
      } else {
        toast.error("Message could not be sent. Please reach out directly on WhatsApp or Email.");
      }
    } catch {
      toast.error("Network error. Please message me directly on WhatsApp.");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Aafaque Nazir — Web Development Inquiries"
      className="relative w-full pt-36 sm:pt-40 pb-20 flex flex-col justify-start items-center bg-black min-h-screen"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Header Section with Generous Clearance from Floating Navbar */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3 font-sans"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed font-sans"
          >
            Have a project in mind, need a modern web application, or want to collaborate? Send a message below or reach out directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Form Card (Linear / Stripe Style: Hairline 1px Obsidian Border) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl bg-zinc-950/80 border border-white/10 p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block font-sans">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Aafaque Nazir"
                    {...register("name")}
                    className={`w-full bg-white/[0.03] border rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all font-sans ${
                      errors.name
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-white/30 focus:bg-white/[0.05]"
                    }`}
                  />
                  {errors.name && (
                    <span className="block text-xs text-red-400 font-mono mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className={`w-full bg-white/[0.03] border rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all font-sans ${
                      errors.email
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-white/30 focus:bg-white/[0.05]"
                    }`}
                  />
                  {errors.email && (
                    <span className="block text-xs text-red-400 font-mono mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone & Service Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block font-sans">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 93256 29256"
                    {...register("phone")}
                    className={`w-full bg-white/[0.03] border rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all font-sans ${
                      errors.phone
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-white/30 focus:bg-white/[0.05]"
                    }`}
                  />
                  {errors.phone && (
                    <span className="block text-xs text-red-400 font-mono mt-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block font-sans">
                    Project Type
                  </label>
                  <div className="relative">
                    <select
                      {...register("service")}
                      className={`w-full bg-zinc-900 border rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none transition-all appearance-none cursor-pointer font-sans ${
                        errors.service
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 hover:border-white/20 focus:border-white/30"
                      }`}
                    >
                      <option value="" className="bg-zinc-950 text-zinc-500">Select project type...</option>
                      <option value="Websites" className="bg-zinc-950">Websites</option>
                      <option value="Custom Online Stores" className="bg-zinc-950">E-Commerce Stores</option>
                      <option value="Custom Web Applications" className="bg-zinc-950">Custom Web Applications</option>
                      <option value="Custom" className="bg-zinc-950">Other / Consultation</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {errors.service && (
                    <span className="block text-xs text-red-400 font-mono mt-1">
                      {errors.service.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">
                  Project Details
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell me a bit about what you want to build, timelines, or requirements..."
                  {...register("message")}
                  className={`w-full bg-white/[0.03] border rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all resize-none font-sans ${
                    errors.message
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 hover:border-white/20 focus:border-white/30 focus:bg-white/[0.05]"
                  }`}
                />
                {errors.message && (
                  <span className="block text-[11px] text-red-400 font-mono mt-1">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button (Clean tactile white button) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-zinc-950 rounded-full border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-0.5">
                <div className="flex-grow border-t border-white/5" />
                <span className="flex-shrink-0 mx-4 text-zinc-500 text-[10px] font-mono tracking-widest uppercase">Or</span>
                <div className="flex-grow border-t border-white/5" />
              </div>

              {/* Direct WhatsApp Call Scheduling */}
              <a
                href="https://wa.me/919325629256?text=Hi%20Aafaque,%20I'd%20like%20to%20schedule%20a%20quick%20call%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-medium py-2.5 px-4 rounded-xl text-xs tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Calendar size={14} className="text-zinc-400" />
                <span>Schedule a Quick Call via WhatsApp</span>
              </a>
            </form>
          </motion.div>

          {/* Info Side (Map & Direct Contact) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative h-[200px] sm:h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 group"
            >
              <iframe
                title="Location — Navi Mumbai, India"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.582875152862!2d73.10915740428518!3d19.10271597843054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1851e40ee81%3A0x6b5b5c98d697841!2sTaloja%20Panchanand%2C%20Taloja%20Phase%201%2C%20Taloja%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707070000000!5m2!1sen!2sin"
                className="w-full h-full opacity-60 group-hover:opacity-85 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              {/* Location Badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-zinc-950/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 shadow-lg pointer-events-none">
                <MapPin size={12} className="text-zinc-400" />
                <span>Navi Mumbai, Maharashtra</span>
              </div>
            </motion.div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-3">
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href="mailto:aafaquenazir@gmail.com"
                aria-label="Send email to Aafaque Nazir at aafaquenazir@gmail.com"
                className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="text-left font-sans">
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">Direct Email</span>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">aafaquenazir@gmail.com</span>
                  </div>
                </div>
                <span className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight size={14} />
                </span>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                href="https://wa.me/919325629256"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Aafaque Nazir on WhatsApp at +91 93256 29256"
                className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div className="text-left font-sans">
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">WhatsApp Chat</span>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">+91 93256 29256</span>
                  </div>
                </div>
                <span className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight size={14} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
