"use client";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Simulate submission for UI demo purposes if actual endpoint isn't ready
      // await new Promise(resolve => setTimeout(resolve, 2000));

      const res = await fetch(
        "https://formsubmit.co/aafaquebuisness@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            _captcha: "false",
            _template: "table",
            _subject: `New Portfolio Message from ${data.name}`,
          }),
        },
      );

      if (res.ok) {
        toast.success("Signal Transmitted Successfully 🚀");
        reset();
      } else {
        toast.error("Transmission Failed. Retry. ❌");
      }
    } catch (error) {
      toast.error("System Error. Check Connection. 😢");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 flex flex-col justify-center items-center text-white overflow-hidden"
    >
      {/* 🌌 Ambient Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.8)",
            color: "#fff",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white"
          >
            LET'S <span className="text-cyan-400">CONNECT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            Initiate a secure channel. Let's discuss your next breakthrough.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* 📡 Holographic Form (Col 1-7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="relative h-full bg-slate-900/30 backdrop-blur-md rounded-3xl border border-white/5 p-8 md:p-10 shadow-2xl overflow-hidden group">
              {/* Decorative Corner Lines */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl group-hover:border-cyan-500/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl group-hover:border-cyan-500/60 transition-colors" />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 relative z-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="group/input">
                    <label className="text-xs font-mono text-cyan-400 mb-2 block uppercase tracking-wider">
                      // ID_NAME
                    </label>
                    <input
                      type="text"
                      placeholder="ENTER NAME"
                      {...register("name", { required: true })}
                      className="w-full bg-slate-950/50 border-b border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/80 transition-all font-mono"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group/input">
                    <label className="text-xs font-mono text-cyan-400 mb-2 block uppercase tracking-wider">
                      // COMMS_EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="ENTER EMAIL"
                      {...register("email", { required: true })}
                      className="w-full bg-slate-950/50 border-b border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/80 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="group/input">
                  <label className="text-xs font-mono text-cyan-400 mb-2 block uppercase tracking-wider">
                    // TRANSMISSION_DATA
                  </label>
                  <textarea
                    rows="4"
                    placeholder="INITIATE MESSAGE SEQUENCE..."
                    {...register("message", { required: true })}
                    className="w-full bg-slate-950/50 border-b border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/80 transition-all font-mono resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-5 rounded-xl transition-all duration-300 group/btn"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-slate-950 rounded-full border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span className="text-sm tracking-[0.2em]">
                          TRANSMIT
                        </span>
                        <IoIosSend
                          size={20}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </div>
                  {/* Glitch Effect Line */}
                  <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover/btn:animate-sheen" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* 📍 Info Hub (Col 8-12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Satellite Map */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 shadow-lg group">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
              <div className="absolute inset-0 border-[4px] border-cyan-500/20 z-20 pointer-events-none rounded-3xl" />

              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15091.95655459344!2d73.0768!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c15555555555%3A0x5555555555555555!2sNavi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1685799201326!5m2!1sen!2sin"
                className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 scale-110"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>

              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded border border-cyan-500/30 z-30">
                <p className="text-[10px] text-cyan-400 font-mono tracking-widest">
                  ● LIVE FEED :: NAVI MUMBAI
                </p>
              </div>
            </div>

            {/* Connection Modules */}
            <div className="grid grid-cols-1 gap-4 flex-1">
              {/* Email Module */}
              <a
                href="mailto:aafaquenazir@gmail.com"
                className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-mono uppercase tracking-wider">
                      Primary Comms
                    </h4>
                    <p className="text-white font-bold group-hover:text-cyan-300 transition-colors">
                      aafaquenazir@gmail.com
                    </p>
                  </div>
                </div>
              </a>

              {/* WhatsApp Module */}
              <a
                href="https://wa.me/919325629256"
                className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-green-500/50 hover:bg-green-500/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-mono uppercase tracking-wider">
                      Quick Chat
                    </h4>
                    <p className="text-white font-bold group-hover:text-green-300 transition-colors">
                      +91 93256 29256
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
