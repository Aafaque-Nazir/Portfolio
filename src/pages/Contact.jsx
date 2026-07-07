import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid WhatsApp number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema)
  });
  
  const location = useLocation();

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
        toast.success("Message Sent 🚀");
        reset();
      } else {
        toast.error("Message Failed ❌");
      }
    } catch {
      toast.error("Network Error 😢");
    }
  };

  return (
    <section id="contact" aria-label="Contact Aafaque Nazir — Get in touch for web development services" className="relative w-full pt-24 lg:pt-32 pb-20 flex flex-col justify-center items-center px-4 bg-black">
      <Toaster 
        theme="dark" 
        position="top-center" 
        toastOptions={{
          style: {
            background: "rgba(9, 9, 11, 0.8)",
            border: "1px solid rgba(34, 211, 238, 0.5)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)"
          },
          className: "font-mono tracking-wider text-sm"
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase mb-4"
          >
            Contact Me
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 md:gap-y-4">
                  <div className="space-y-1 group/input relative">
                    <label className="text-[10px] font-bold text-gray-400 group-focus-within/input:text-cyan-400 uppercase tracking-[0.2em] pl-1 transition-colors">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register("name")}
                      className={`w-full bg-white/[0.02] border rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none transition-all ${errors.name ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}
                    />
                    {errors.name && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium">
                        {errors.name.message}
                      </motion.span>
                    )}
                  </div>
                  <div className="space-y-1 group/input relative">
                    <label className="text-[10px] font-bold text-gray-400 group-focus-within/input:text-cyan-400 uppercase tracking-[0.2em] pl-1 transition-colors">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                      className={`w-full bg-white/[0.02] border rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none transition-all ${errors.email ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}
                    />
                    {errors.email && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium">
                        {errors.email.message}
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 md:gap-y-4">
                  <div className="space-y-1 group/input relative">
                    <label className="text-[10px] font-bold text-gray-400 group-focus-within/input:text-cyan-400 uppercase tracking-[0.2em] pl-1 transition-colors">Phone</label>
                    <input
                      type="tel"
                      placeholder="WhatsApp Number"
                      {...register("phone")}
                      className={`w-full bg-white/[0.02] border rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none transition-all ${errors.phone ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}
                    />
                    {errors.phone && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium">
                        {errors.phone.message}
                      </motion.span>
                    )}
                  </div>
                  <div className="space-y-1 group/input relative">
                    <label className="text-[10px] font-bold text-gray-400 group-focus-within/input:text-cyan-400 uppercase tracking-[0.2em] pl-1 transition-colors">Service</label>
                    <div className="relative">
                      <select
                        {...register("service")}
                        className={`w-full bg-white/[0.02] border rounded-xl p-4 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer ${errors.service ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}
                      >
                        <option value="" className="bg-black">Select Service</option>
                        <option value="High-Converting Websites" className="bg-black">High-Converting Websites</option>
                        <option value="Custom Online Stores" className="bg-black">Custom Online Stores</option>
                        <option value="Custom Web Apps" className="bg-black">Custom Web Apps</option>
                        <option value="Custom" className="bg-black">Other / Custom</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 group-focus-within/input:text-cyan-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.service && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium">
                        {errors.service.message}
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 group/input relative mt-4 md:mt-2">
                  <label className="text-[10px] font-bold text-gray-400 group-focus-within/input:text-cyan-400 uppercase tracking-[0.2em] pl-1 transition-colors">Message</label>
                  <textarea
                    rows="4"
                    placeholder="How can I help you?"
                    {...register("message")}
                    className={`w-full bg-white/[0.02] border rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none transition-all resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 hover:border-white/20 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}
                  />
                  {errors.message && (
                    <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium">
                      {errors.message.message}
                    </motion.span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl text-[11px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-white transition-all group/btn overflow-hidden relative shadow-[0_0_20px_rgba(34,211,238,0.2)]"
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
                
                {/* OR Divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-white/30 text-[10px] font-mono tracking-widest uppercase">Or</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* Calendly Booking Button */}
                <a
                  href="https://calendly.com/aafaquebuisness/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/[0.02] border border-white/10 text-white font-bold py-4 rounded-xl text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-white/[0.05] hover:border-cyan-500/50 hover:text-cyan-400 transition-all group overflow-hidden relative"
                >
                  <svg className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span>Book a Discovery Call</span>
                </a>
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
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                href="mailto:aafaquenazir@gmail.com"
                aria-label="Send email to Aafaque Nazir at aafaquenazir@gmail.com"
                className="group flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope size={20} />
                  </div>
                  <div className="font-mono">
                    <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">Email</span>
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
                rel="noopener noreferrer"
                aria-label="Contact Aafaque Nazir on WhatsApp at +91 93256 29256"
                className="group flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FaWhatsapp size={20} />
                  </div>
                  <div className="font-mono">
                    <span className="block text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">WhatsApp</span>
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
