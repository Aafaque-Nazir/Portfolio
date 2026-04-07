"use client";
import React, { useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleSelectService = (e) => {
        if (e.detail) setValue("service", e.detail);
      };
      window.addEventListener("selectService", handleSelectService);
      return () => window.removeEventListener("selectService", handleSelectService);
    }
  }, [setValue]);

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
        toast.success("Connection Established 🚀");
        reset();
      } else {
        toast.error("Transmission Failed ❌");
      }
    } catch (error) {
      toast.error("Uplink Error 😢");
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 bg-black py-20 lg:py-32">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(0, 0, 0, 0.9)",
            color: "#fff",
            border: "1px solid rgba(34, 211, 238, 0.3)",
            backdropFilter: "blur(20px)",
            fontSize: '12px',
            fontFamily: 'monospace'
          },
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center">
        <div className="text-center mb-12 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl lg:text-8xl font-black tracking-tighter text-white"
          >
            CONNECT <span className="text-cyan-500">.</span>
          </motion.h2>

        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 relative p-[1px] rounded-[2rem] overflow-hidden group isolation-isolate"
          >
            {/* Hover Border Glow */}
            <motion.div
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
              style={{
                background: useTransform(
                  [mouseX, mouseY],
                  ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 80%)`
                ),
              }}
            />

            <div className="relative h-full bg-zinc-950/40 backdrop-blur-3xl rounded-[1.95rem] border border-white/5 p-8 lg:p-12 flex flex-col justify-center overflow-hidden">
              {/* Spotlight */}
              <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.95rem]"
                style={{
                  background: useTransform(
                    [mouseX, mouseY],
                    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.02), transparent 80%)`
                  ),
                }}
              />

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10 w-full lg:max-w-md mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-1">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/10 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-1">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      {...register("email", { required: true })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/10 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-1">Service</label>
                  <div className="relative">
                    <select
                      {...register("service", { required: true })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">Select Package</option>
                      <option value="Launchpad" className="bg-black">Launchpad (SPA)</option>
                      <option value="Growth" className="bg-black">Growth (Business)</option>
                      <option value="Empire" className="bg-black">Empire (Enterprise)</option>
                      <option value="Custom" className="bg-black">Other / Custom</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-1">Message</label>
                  <textarea
                    rows="4"
                    placeholder="How can I help you?"
                    {...register("message", { required: true })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/10 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-500 text-black font-black py-5 rounded-xl text-[11px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-white transition-all group/btn overflow-hidden relative shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black rounded-full border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <IoIosSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[300px] lg:flex-1 rounded-[2rem] overflow-hidden border border-white/5 grayscale group hover:grayscale-0 transition-all duration-1000"
            >
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.582875152862!2d73.10915740428518!3d19.10271597843054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1851e40ee81%3A0x6b5b5c98d697841!2sTaloja%20Panchanand%2C%20Taloja%20Phase%201%2C%20Taloja%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707070000000!5m2!1sen!2sin"
                className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-black" />
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  Grid: Taloja Phase 1
                </p>
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                href="mailto:aafaquenazir@gmail.com"
                className="group flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope size={20} />
                  </div>
                  <div className="font-mono">
                    <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">Primary Link</span>
                    <span className="text-sm lg:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">aafaquenazir@gmail.com</span>
                  </div>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                href="https://wa.me/919325629256"
                target="_blank"
                className="group flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FaWhatsapp size={20} />
                  </div>
                  <div className="font-mono">
                    <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">Quick Uplink</span>
                    <span className="text-sm lg:text-base font-bold text-white group-hover:text-cyan-400 transition-colors">+91 93256 29256</span>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
