import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-10 min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      
      <div className="w-full max-w-3xl p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Me</h2>

        <form 
          action="https://formsubmit.co/aafaquebuisness@gmail.com" 
          method="POST" 
          className="flex flex-col gap-6"
        >
          {/* Hidden settings for FormSubmit */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value=""/>

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
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-4 rounded-lg transition duration-300 shadow-md hover:shadow-cyan-500/50"
          >
            Send Message
          </button>
        </form>
      </div>

    </section>
  );
};

export default Contact;
