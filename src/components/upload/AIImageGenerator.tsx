import { useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  onGenerate: (imageUrl: string, prompt: string) => void;
}

const AIImageGenerator = ({ onGenerate }: Props) => {
  const [prompt, setPrompt] = useState("");

  const handleAutoGenerate = () => {
    if (!prompt.trim()) return;

    // fake AI result
    const demoImage = "/placeholder.svg";

    onGenerate(demoImage, prompt);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          AI Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            handleAutoGenerate(); // 🔥 auto generate when typing
          }}
          placeholder="Describe the object you want to generate..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          rows={4}
        />
      </div>

      {/* Optional visual indicator */}
      <div className="flex items-center text-sm text-gray-400 gap-2">
        <Sparkles className="w-4 h-4" />
        Image will be prepared automatically
      </div>
    </div>
  );
};

export default AIImageGenerator;