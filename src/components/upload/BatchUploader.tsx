import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  CheckCircle, 
  Layers,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface BatchFile {
  file: File;
  preview: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  projectId?: string;
}

interface BatchUploaderProps {
  onFilesChange: (files: File[]) => void;
  onStartBatch?: () => void;
  isProcessing?: boolean;
  batchProgress?: { current: number; total: number };
}

const BatchUploader = ({ 
  onFilesChange, 
  onStartBatch,
  isProcessing = false,
  batchProgress
}: BatchUploaderProps) => {
  const [files, setFiles] = useState<BatchFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
      progress: 0
    }));
    
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles.map(f => f.file));
  }, [files, onFilesChange]);

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles.map(f => f.file));
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    onFilesChange([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    disabled: isProcessing,
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
            <Layers className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Batch Processing</h3>
            <p className="text-sm text-muted-foreground">
              {files.length} {files.length === 1 ? "image" : "images"} selected
            </p>
          </div>
        </div>
        {files.length > 0 && !isProcessing && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        )}
      </div>

      {/* Batch Progress */}
      {isProcessing && batchProgress && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Processing {batchProgress.current} of {batchProgress.total}
            </span>
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          </div>
          <Progress 
            value={(batchProgress.current / batchProgress.total) * 100} 
            className="h-2"
          />
        </motion.div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
            isDragActive ? "bg-primary text-primary-foreground scale-110" : "bg-secondary"
          )}>
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="font-display font-semibold text-lg mb-2">
            {isDragActive ? "Drop images here" : "Add Multiple Images"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drop multiple images to process them in batch
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon className="w-4 h-4" />
            <span>JPG, PNG, WEBP • No limit</span>
          </div>
        </div>
      </div>

      {/* File Grid */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {files.map((item, index) => (
              <motion.div
                key={`${item.file.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-xl overflow-hidden glass-card"
              >
                <img
                  src={item.preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Overlay */}
                {item.status === "processing" && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                      <span className="text-xs">{item.progress}%</span>
                    </div>
                  </div>
                )}
                
                {item.status === "completed" && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                )}

                {/* Hover Actions */}
                {item.status === "pending" && !isProcessing && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Index Badge */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-background/80 text-xs font-medium">
                  #{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      {files.length > 0 && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            variant="hero"
            size="lg"
            className="gap-2"
            onClick={onStartBatch}
          >
            Process {files.length} {files.length === 1 ? "Image" : "Images"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default BatchUploader;
