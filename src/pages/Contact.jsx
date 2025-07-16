import React from "react";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-10 min-h-screen flex flex-col justify-center items-center px-6 text-white">
      
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 p-4">

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 , ease: "easeInOut" , delay: 0.3 }}
        className="flex-1 p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
          <h2 className="text-4xl font-bold text-center mb-8">Contact Me</h2>
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
              className="p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>

            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-4 rounded-lg transition duration-300 shadow-md hover:shadow-md flex justify-center items-center gap-2"
            >
             <IoIosSend /> Send Message
            </button>
          </form>
        </motion.div>

        {/* Map Section */}

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 ,  ease: "easeInOut" , delay: 0.3}}
         className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-white/20">
        <iframe
  title="Orange Orchid, Taloja Phase 1"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e123456789%3A0x123456789abcdef!2sTaloja%20Phase%201%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1685799201326!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
