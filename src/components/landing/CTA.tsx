import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Start Free Today</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Ready to Create Your
            <br />
            <span className="gradient-text">First 3D Model?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of creators using AutoModeler to bring their ideas to life in 3D.
            No 3D experience required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* ✅ FIXED ROUTE */}
            <Link to="/create">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/tutorials">
              <Button variant="glass" size="xl">
                Watch Tutorials
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;