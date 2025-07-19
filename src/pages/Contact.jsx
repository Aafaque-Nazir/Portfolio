import React from "react";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 min-h-screen text-white  bg-[#0b0f19] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 z-10 relative">
        <h2 className="text-4xl font-bold text-center mb-14 tracking-wide">Contact Me</h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md border border-white/20"
          >
            <form
              action="https://formsubmit.co/aafaquebuisness@gmail.com"
              method="POST"
              className="flex flex-col gap-6"
            >
              <input type="hidden" name="_captcha" value="false" />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              ></textarea>

              <button
                type="submit"
                className="mt-2 w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition"
              >
                <IoIosSend className="text-2xl" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex-1 overflow-hidden rounded-2xl shadow-lg border border-white/20"
          >
            <iframe
              title="Taloja Phase 1 Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e123456789%3A0x123456789abcdef!2sTaloja%20Phase%201%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1685799201326!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ minHeight: "450px", border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
