import React from "react";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 min-h-screen text-white relative overflow-hidden"
    >
      {/* Subtle overlay to improve text readability */}
      <div className="absolute inset-0  pointer-events-none"></div>

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
          Have a project in mind or want to say hello? I'm always open to new opportunities and collaborations.
        </motion.p>

        {/* Form & Map Container */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 group">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                   style={{
                     background: 'conic-gradient(from 0deg, transparent, #06b6d4, #10b981, transparent)'
                   }}></div>

              <form
                action="https://formsubmit.co/aafaquebuisness@gmail.com"
                method="POST"
                className="relative z-10 flex flex-col gap-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Message from Portfolio!" />

                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all duration-300 peer"
                  />
                  <div className="absolute inset-0 rounded-xl border border-transparent peer-focus:border-cyan-500/50 transition"></div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all duration-300 peer"
                  />
                  <div className="absolute inset-0 rounded-xl border border-transparent peer-focus:border-cyan-500/50 transition"></div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    required
                    className="w-full p-5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition-all duration-300 resize-none peer"
                  ></textarea>
                  <div className="absolute inset-0 rounded-xl border border-transparent peer-focus:border-cyan-500/50 transition"></div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-2 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-cyan-500/25 hover:shadow-2xl group/button"
                >
                  <IoIosSend className="text-2xl transition-transform duration-300 group-hover/button:rotate-12" />
                  <span className="text-lg">Send Message</span>
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
              <p className="text-gray-300 text-lg">📍 Taloja, Navi Mumbai, Maharashtra</p>
              <p className="text-cyan-400 mt-1">Let’s build something amazing together!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;