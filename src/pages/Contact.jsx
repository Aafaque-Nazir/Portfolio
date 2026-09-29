import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { RiArrowRightLine, RiMapPin2Line } from "react-icons/ri";

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
    <section id="contact" aria-label="Contact Aafaque Nazir — Get in touch for web development services" className="relative w-full pt-28 sm:pt-32 pb-16 flex flex-col justify-start items-center bg-black">
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(9, 9, 11, 0.9)",
            border: "1px solid rgba(34, 211, 238, 0.4)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)"
          },
          className: "font-mono tracking-wider text-sm"
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-3"
          >
            Contact Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed"
          >
            Have a project in mind, need a modern website, or want to collaborate? Send a message below or connect directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 relative p-[1px] rounded-2xl overflow-hidden group isolation-isolate border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            {/* Hover Border Glow */}
            <motion.div
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              style={{
                background: useTransform(
                  [mouseX, mouseY],
                  ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.1), transparent 80%)`
                ),
              }}
            />

            <div className="relative h-full bg-[#09090b] rounded-[15px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10 w-full">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register("name")}
                      className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/10 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.04]'
                      }`}
                    />
                    {errors.name && (
                      <span className="block text-xs text-red-400 font-mono mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register("email")}
                      className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/10 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.04]'
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
                    <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      {...register("phone")}
                      className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/10 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.04]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="block text-xs text-red-400 font-mono mt-1">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                      Service Needed
                    </label>
                    <div className="relative">
                      <select
                        {...register("service")}
                        className={`w-full bg-[#09090b] border rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer ${
                          errors.service
                            ? 'border-red-500/60 focus:border-red-500'
                            : 'border-white/10 hover:border-white/20 focus:border-cyan-400/60'
                        }`}
                      >
                        <option value="" className="bg-zinc-950 text-zinc-500">Select Service</option>
                        <option value="Websites & Landing Pages" className="bg-zinc-950">Websites & Landing Pages</option>
                        <option value="Custom Online Stores" className="bg-zinc-950">Custom Online Stores</option>
                        <option value="Custom Web Applications" className="bg-zinc-950">Custom Web Applications</option>
                        <option value="Custom" className="bg-zinc-950">Other / Custom</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
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
                  <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell me a bit about what you want to build..."
                    {...register("message")}
                    className={`w-full bg-white/[0.02] border rounded-xl px-3.5 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-red-500/60 focus:border-red-500'
                        : 'border-white/10 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.04]'
                    }`}
                  />
                  {errors.message && (
                    <span className="block text-[11px] text-red-400 font-mono mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-zinc-950 font-mono font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_22px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-zinc-950 rounded-full border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <IoIosSend size={16} />
                    </>
                  )}
                </motion.button>

                {/* OR Divider */}
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-white/10" />
                  <span className="flex-shrink-0 mx-4 text-zinc-500 text-[10px] font-mono tracking-widest uppercase">Or</span>
                  <div className="flex-grow border-t border-white/10" />
                </div>

                {/* Calendly Booking Button */}
                <a
                  href="https://calendly.com/aafaquebuisness/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/40 text-zinc-200 hover:text-white font-mono font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all group"
                >
                  <svg className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span>Schedule a Quick Call</span>
                </a>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[220px] sm:h-[240px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 group"
            >
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.582875152862!2d73.10915740428518!3d19.10271597843054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1851e40ee81%3A0x6b5b5c98d697841!2sTaloja%20Panchanand%2C%20Taloja%20Phase%201%2C%20Taloja%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707070000000!5m2!1sen!2sin"
                className="w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              {/* Location Badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-zinc-950/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 shadow-lg pointer-events-none">
                <RiMapPin2Line className="text-cyan-400 text-xs" />
                <span>Navi Mumbai, Maharashtra</span>
              </div>
            </motion.div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-3">
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                href="mailto:aafaquenazir@gmail.com"
                aria-label="Send email to Aafaque Nazir at aafaquenazir@gmail.com"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#09090b] border border-white/10 hover:border-cyan-400/40 hover:bg-zinc-900/60 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <FaEnvelope size={16} />
                  </div>
                  <div className="font-mono text-left">
                    <span className="block text-xs text-zinc-400 uppercase tracking-wider mb-0.5">Email</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">aafaquenazir@gmail.com</span>
                  </div>
                </div>
                <span className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 group-hover:border-cyan-400/40 transition-all shrink-0">
                  <RiArrowRightLine className="text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                href="https://wa.me/919325629256"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Aafaque Nazir on WhatsApp at +91 93256 29256"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#09090b] border border-white/10 hover:border-cyan-400/40 hover:bg-zinc-900/60 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <FaWhatsapp size={18} />
                  </div>
                  <div className="font-mono text-left">
                    <span className="block text-xs text-zinc-400 uppercase tracking-wider mb-0.5">WhatsApp</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">+91 93256 29256</span>
                  </div>
                </div>
                <span className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-400/40 transition-all shrink-0">
                  <RiArrowRightLine className="text-sm drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] group-hover:translate-x-0.5 transition-transform" />
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
