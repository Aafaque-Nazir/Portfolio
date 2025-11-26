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
      className="relative min-h-screen py-24 text-white overflow-hidden bg-slate-950"
    >
      {/* Premium Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950" />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Have a vision or an idea to bring to life? Let’s build something
          extraordinary together.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="relative bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-cyan-500/20">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-5 rounded-xl bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full p-5 rounded-xl bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    {...register("message", { required: "Message is required" })}
                    className="w-full p-5 rounded-xl bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50"
                >
                  <IoIosSend
                    className={`text-2xl ${
                      isSubmitting ? "animate-pulse" : ""
                    }`}
                  />
                  <span className="text-lg">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex-1 w-full space-y-6"
          >
            <div className="overflow-hidden rounded-3xl border border-white/20 hover:border-teal-400/40 transition-all duration-500 shadow-2xl aspect-video">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e123456789%3A0x123456789abcdef!2sTaloja%20Phase%201%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1685799201326!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="transition-transform duration-700 hover:scale-105"
              ></iframe>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-300 text-lg">
                📍 Taloja, Navi Mumbai, Maharashtra
              </p>
              <p className="text-cyan-400 text-sm italic">
                Let’s collaborate and create magic ✨
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-6 mt-4">
  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/aafaque-nazir/"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/30 transition-all duration-300"
  >
    <FaLinkedin className="text-2xl text-cyan-400" />
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/Aafaque-Nazir"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/30 transition-all duration-300"
  >
    <FaGithub className="text-2xl text-cyan-400" />
  </a>

  {/* Email */}
  <a
    href="mailto:aafaquebuisness@gmail.com"
    className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/30 transition-all duration-300"
  >
    <FaEnvelope className="text-2xl text-cyan-400" />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919325629256?text=Hi%20Aafaque!%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20connect."
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/30 transition-all duration-300"
  >
    <FaWhatsapp className="text-2xl text-cyan-400" />
  </a>
</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
