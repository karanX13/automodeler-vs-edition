import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  Box,
  Palette,
  Smartphone,
  Cloud,
  Download,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Multi-Image Upload",
    description:
      "Upload 1, 2, 4, or 8 images from different angles for high-quality 3D output.",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    description:
      "Automatic mesh smoothing, texture improvement, and intelligent hole repair.",
  },
  {
    icon: Box,
    title: "3D Model Viewer",
    description:
      "Interactive viewer with rotate, zoom, lighting control, and real-time preview.",
  },
  {
    icon: Palette,
    title: "Material Editor",
    description:
      "Apply metal, plastic, matte, or custom materials with live visual feedback.",
  },
  {
    icon: Smartphone,
    title: "AR Ready",
    description:
      "View your models in real-world scale using AR on supported devices.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Projects automatically saved and synced across all your devices.",
  },
  {
    icon: Download,
    title: "Export Formats",
    description:
      "Export in GLB, OBJ, FBX, STL, USDZ, MP4, or animated GIF formats.",
  },
  {
    icon: RotateCcw,
    title: "360° Video Export",
    description:
      "Generate rotating 360-degree product videos in seconds.",
  },
];

const Features = () => {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,255,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Powerful{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to create, edit, and share stunning 3D models.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 
                           rounded-2xl p-8 transition-all duration-300 
                           hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Icon */}
                <div className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center 
                                bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-500 
                                shadow-lg shadow-purple-500/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                                from-cyan-500/10 via-purple-500/10 to-blue-500/10 
                                opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
