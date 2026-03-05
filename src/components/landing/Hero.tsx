import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">

      {/* Floating glow blob */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300">
          ✨ AI-Powered 3D Generation
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          Transform 2D Images <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Into Stunning 3D Models
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Upload your photos and let AI generate production-ready 3D models. 
          View in AR, edit materials, and export in multiple formats.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6"
        >
          <Button
            onClick={() => navigate("/upload")}
            className="px-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 
                       hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-500/30"
          >
            Start Creating
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="px-8 py-6 text-lg rounded-xl border-white/20 text-gray-300 hover:bg-white/5"
          >
            View Demo
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
