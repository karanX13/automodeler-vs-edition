import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Camera,
  Download,
  Smartphone,
  Palette,
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

/* ---------------- DATA ---------------- */

const tutorials = [
  {
    id: 1,
    title: "How to Take Perfect Photos",
    description:
      "Learn the best techniques for capturing images that create high-quality 3D models.",
    duration: "5 min",
    icon: Camera,
    category: "Getting Started",
    content: [
      "Use good, even lighting - natural daylight works best",
      "Place your object on a plain, contrasting background",
      "Take photos from multiple angles: front, back, sides, top",
      "Keep your camera steady or use a tripod",
      "Avoid reflective surfaces or transparent objects",
      "Ensure the entire object is in focus",
    ],
  },
  {
    id: 2,
    title: "Exporting Your 3D Models",
    description: "Understand different file formats and when to use each one.",
    duration: "4 min",
    icon: Download,
    category: "Export",
    content: [
      "GLB - Best for web viewing and most applications",
      "OBJ - Universal format, great for editing software",
      "FBX - Ideal for game engines and animation",
      "STL - Perfect for 3D printing",
      "USDZ - Required for iOS AR Quick Look",
    ],
  },
  {
    id: 3,
    title: "Viewing Models in AR",
    description:
      "Step-by-step guide to viewing your creations in augmented reality.",
    duration: "3 min",
    icon: Smartphone,
    category: "AR/VR",
    content: [
      "On iOS: Export as USDZ and open in Quick Look",
      "On Android: Use GLB format with SceneViewer",
      "Ensure good lighting in your environment",
      "Point your camera at a flat surface",
      "Tap to place the model, then walk around it",
      "Use pinch gestures to resize",
    ],
  },
  {
    id: 4,
    title: "Editing Materials & Textures",
    description:
      "Customize colors, materials, and finishes on your 3D models.",
    duration: "6 min",
    icon: Palette,
    category: "Editing",
    content: [
      "Open your model in the 3D viewer",
      "Access the Controls panel on the right",
      "Click color swatches to change material color",
      "Toggle wireframe mode to see mesh structure",
      "Change environment lighting for different moods",
      "Export snapshots to capture your customizations",
    ],
  },
];

const categories = ["All", "Getting Started", "Export", "AR/VR", "Editing"];

/* ---------------- COMPONENT ---------------- */

const Tutorials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(1);

  const filteredTutorials = tutorials.filter(
    (t) => activeCategory === "All" || t.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 mb-6">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">Learn AutoModeler</span>
            </div>

            <h1 className="text-5xl font-bold mb-4">
              Tutorials &{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Guides
              </span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create stunning 3D models from your photos
            </p>
          </motion.div>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  activeCategory === category
                    ? "bg-cyan-500 text-black border-cyan-500"
                    : "border-zinc-700 text-gray-300 hover:border-cyan-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ACCORDION LIST */}
          <div className="space-y-6">
            {filteredTutorials.map((tutorial, index) => {
              const Icon = tutorial.icon;
              const isOpen = expandedTutorial === tutorial.id;

              return (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-cyan-500 shadow-[0_0_40px_rgba(0,255,255,0.15)] bg-zinc-900/60"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-cyan-500"
                  }`}
                >
                  {/* HEADER */}
                  <button
                    onClick={() =>
                      setExpandedTutorial(isOpen ? null : tutorial.id)
                    }
                    className="w-full p-6 flex items-center gap-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-black" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 text-sm text-gray-400">
                        <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs">
                          {tutorial.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <Clock className="w-3 h-3" />
                          {tutorial.duration}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {tutorial.description}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* CONTENT */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-6 border-t border-zinc-800 space-y-4">
                        {tutorial.content.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 text-gray-300"
                          >
                            <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">
                              {i + 1}
                            </div>
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* VIDEO CTA */}
          <div className="mt-20 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
              <Play className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Video Tutorials Coming Soon
            </h3>

            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We're creating in-depth video guides to help you master AutoModeler. Stay tuned!
            </p>

            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 gap-2">
              <Play className="w-4 h-4" />
              Notify Me
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tutorials;