"use client";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // FormSubmit integration
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
      className="py-16 min-h-screen text-white relative overflow-hidden"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-7xl mx-auto px-6 z-10 relative">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-6 tracking-wide bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Have a project in mind or want to say hello? I'm always open to new
          opportunities and collaborations.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 group">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 flex flex-col gap-6"
              >
                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all duration-300 peer"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full p-5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all duration-300 peer"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    {...register("message", { required: "Message is required" })}
                    className="w-full p-5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all duration-300 resize-none peer"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-cyan-500/25 hover:shadow-2xl disabled:opacity-50"
                >
                  <IoIosSend
                    className={`text-2xl transition-transform duration-300 ${
                      isSubmitting ? "animate-pulse" : "group-hover/button:rotate-12"
                    }`}
                  />
                  <span className="text-lg">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 hover:border-teal-400/50 transition-all duration-500 aspect-video md:aspect-auto">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e123456789%3A0x123456789abcdef!2sTaloja%20Phase%201%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1685799201326!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "480px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-transform duration-700 hover:scale-105"
              ></iframe>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-300 text-lg">
                📍 Taloja, Navi Mumbai, Maharashtra
              </p>
              <p className="text-cyan-400 mt-1">
                Let’s build something amazing together!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
