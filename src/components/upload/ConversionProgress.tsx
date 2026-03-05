import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ConversionProgressProps {
  progress: number;
  status: "processing" | "completed" | "failed";
  onComplete?: () => void;
}

const stages = [
  "Analyzing image...",
  "Detecting object boundaries...",
  "Generating depth map...",
  "Creating mesh geometry...",
  "Applying textures...",
  "Optimizing model...",
  "Finalizing output...",
];

export function ConversionProgress({ progress, status, onComplete }: ConversionProgressProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const stageIndex = Math.min(
      Math.floor((progress / 100) * stages.length),
      stages.length - 1
    );
    setCurrentStage(stageIndex);
  }, [progress]);

  useEffect(() => {
    if (status === "completed" && onComplete) {
      onComplete();
    }
  }, [status, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="mb-8">
        {status === "processing" && (
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        )}
        {status === "completed" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>
        )}
        {status === "failed" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center"
          >
            <XCircle className="w-10 h-10 text-destructive" />
          </motion.div>
        )}
      </div>

      <h2 className="font-display text-2xl font-bold mb-2">
        {status === "processing" && "Creating Your 3D Model"}
        {status === "completed" && "Model Ready!"}
        {status === "failed" && "Conversion Failed"}
      </h2>

      <p className="text-muted-foreground mb-6">
        {status === "processing" && stages[currentStage]}
        {status === "completed" && "Your 3D model has been generated successfully"}
        {status === "failed" && "Something went wrong. Please try again."}
      </p>

      {status === "processing" && (
        <div className="max-w-md mx-auto space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{Math.round(progress)}%</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Processing
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
