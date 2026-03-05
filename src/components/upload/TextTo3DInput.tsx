import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextTo3DInputProps {
  value: string;
  onChange: (value: string) => void;
}

const examplePrompts = [
  "A futuristic sports car with sleek curves and glowing headlights",
  "A medieval knight's helmet with ornate gold details",
  "A cozy cottage with a thatched roof and flower garden",
  "A robotic dog with chrome finish and glowing eyes",
  "An ancient Greek amphora with painted figures",
];

const TextTo3DInput = ({ value, onChange }: TextTo3DInputProps) => {
  const [showExamples, setShowExamples] = useState(false);

  const handleExampleClick = (prompt: string) => {
    onChange(prompt);
    setShowExamples(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Describe the 3D model you want to create..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none pr-12"
        />
        <div className="absolute top-3 right-3">
          <Wand2 className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={() => setShowExamples(!showExamples)}
        >
          <Lightbulb className="w-4 h-4" />
          {showExamples ? "Hide examples" : "Need inspiration?"}
        </Button>
        <span className="text-xs text-muted-foreground">
          {value.length}/500 characters
        </span>
      </div>

      {showExamples && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <p className="text-sm font-medium text-muted-foreground">
            Try one of these prompts:
          </p>
          <div className="grid gap-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(prompt)}
                className={cn(
                  "text-left text-sm p-3 rounded-lg border border-border",
                  "bg-secondary/50 hover:bg-secondary transition-colors",
                  "flex items-start gap-2"
                )}
              >
                <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Tips for better results</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be specific about shape, material, and details</li>
              <li>• Mention colors, textures, and surface finish</li>
              <li>• Describe the style (realistic, cartoon, abstract)</li>
              <li>• Include size references when relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextTo3DInput;
