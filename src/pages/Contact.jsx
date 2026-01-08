"use client";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaLinkedin, FaGithub, FaEnvelope , FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://formsubmit.co/aafaquebuisness@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully 🚀");
        reset();
      } else {
        toast.error("Failed to send. Please try again ❌");
      }
    } catch (error) {
      toast.error("Something went wrong 😢");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 flex flex-col justify-center items-center text-white overflow-hidden bg-slate-950"
    >
      {/* 🌌 High-End Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-cyan-600/10 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <Toaster position="top-right" reverseOrder={false} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Title & Subtitle */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent"
          >
            Let's Collaborate
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Ready to turn your vision into a digital masterpiece? <br className="hidden md:block" />
            Drop a message and let's make it happen.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Form Container (Col 1-7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative group p-[1px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
              <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-cyan-400 ml-1">Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-4 rounded-2xl bg-slate-800/40 border border-white/5 placeholder-gray-500 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-cyan-400 ml-1">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
                            message: "Enter a valid email",
                          },
                        })}
                        className="w-full p-4 rounded-2xl bg-slate-800/40 border border-white/5 placeholder-gray-500 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-cyan-400 ml-1">Message</label>
                    <textarea
                      rows="4"
                      placeholder="Tell me about your project..."
                      {...register("message", { required: "Message is required" })}
                      className="w-full p-4 rounded-2xl bg-slate-800/40 border border-white/5 placeholder-gray-500 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300 resize-none"
                    ></textarea>
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-slate-950 font-black py-4 rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {/* Glossy Sheen Effect */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-sheen" />
                    
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-4 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      ) : (
                        <IoIosSend size={24} className="group-hover:rotate-12 transition-transform" />
                      )}
                      <span className="text-lg uppercase tracking-wider">
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Info Side (Col 8-12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Map Card */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e123456789%3A0x123456789abcdef!2sTaloja%20Phase%201%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1685799201326!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-110"
              ></iframe>
              <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none group-hover:opacity-0 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-medium text-cyan-300">📍 Taloja, Navi Mumbai, Maharashtra</p>
              </div>
            </div>

            {/* Social & Contact Info */}
            <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 underline decoration-cyan-500/30 underline-offset-8">Direct Connections</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed mt-4">
                  Have a specific inquiry or just want to chat? Reach out through any of these premium channels.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/aafaque-nazir/" },
                  { icon: <FaGithub />, href: "https://github.com/Aafaque-Nazir" },
                  { icon: <FaEnvelope />, href: "mailto:aafaquebuisness@gmail.com" },
                  { icon: <FaWhatsapp />, href: "https://wa.me/919325629256" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      borderColor: "rgba(6,182,212,0.5)",
                      boxShadow: "0 0 20px rgba(6,182,212,0.2)"
                    }}
                    className="aspect-square flex items-center justify-center rounded-2xl text-2xl transition-all bg-slate-800/40 text-cyan-400 border border-white/10 shadow-lg"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-gray-500 text-xs italic text-center">
                  "Design is how it works, and code is how it speaks." ✨
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
