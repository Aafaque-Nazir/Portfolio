import React from "react";
import { Link } from "react-router-dom"; // Agar React Router use kar rahe ho to

const ThankYou = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6">
      
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg text-gray-300 mb-8">Your message has been successfully sent. I'll get back to you soon! 🚀</p>
        
        <Link to="/" className="px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-white rounded-full font-semibold transition">
          Go Back Home
        </Link>
      </div>

    </section>
  );
};

export default ThankYou;
