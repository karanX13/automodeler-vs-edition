import { useState } from "react";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Sun,
  Moon,
  Palette,
  Download,
  Smartphone,
  Camera,
  Video,
  Grid3X3,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ViewerControlsProps {
  onColorChange: (color: string) => void;
  onWireframeToggle: (enabled: boolean) => void;
  onEnvironmentChange: (env: string) => void;
}

const presetColors = [
  "#00d4ff", // Primary cyan
  "#8b5cf6", // Purple
  "#f97316", // Orange
  "#22c55e", // Green
  "#ef4444", // Red
  "#f59e0b", // Yellow
  "#ec4899", // Pink
  "#6366f1", // Indigo
];

const environments = [
  { value: "city", label: "City", icon: Sun },
  { value: "sunset", label: "Sunset", icon: Sun },
  { value: "dawn", label: "Dawn", icon: Moon },
  { value: "warehouse", label: "Studio", icon: Layers },
];

const ViewerControls = ({
  onColorChange,
  onWireframeToggle,
  onEnvironmentChange,
}: ViewerControlsProps) => {
  const [wireframe, setWireframe] = useState(false);
  const [selectedColor, setSelectedColor] = useState(presetColors[0]);

  const handleWireframeToggle = () => {
    setWireframe(!wireframe);
    onWireframeToggle(!wireframe);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 space-y-4"
    >
      {/* Main Controls */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold">Controls</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Color Picker */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Material Color</label>
        <div className="flex flex-wrap gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                selectedColor === color
                  ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Wireframe Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm text-muted-foreground">Wireframe</label>
        <Button
          variant={wireframe ? "default" : "outline"}
          size="sm"
          onClick={handleWireframeToggle}
          className="gap-2"
        >
          <Grid3X3 className="w-4 h-4" />
          {wireframe ? "On" : "Off"}
        </Button>
      </div>

      {/* Environment */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Environment</label>
        <div className="grid grid-cols-2 gap-2">
          {environments.map((env) => (
            <Button
              key={env.value}
              variant="outline"
              size="sm"
              className="gap-2 justify-start"
              onClick={() => onEnvironmentChange(env.value)}
            >
              <env.icon className="w-4 h-4" />
              {env.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Export Actions */}
      <div className="pt-4 border-t border-border space-y-2">
        <label className="text-sm text-muted-foreground">Export</label>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="glass" size="sm" className="gap-2">
            <Camera className="w-4 h-4" />
            Snapshot
          </Button>
          <Button variant="glass" size="sm" className="gap-2">
            <Video className="w-4 h-4" />
            360° Video
          </Button>
          <Button variant="glass" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="glass" size="sm" className="gap-2">
            <Smartphone className="w-4 h-4" />
            View in AR
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewerControls;
