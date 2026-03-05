import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  maxImages?: number;
  onImagesChange: (images: File[]) => void;
}

const ImageUploader = ({ maxImages = 8, onImagesChange }: ImageUploaderProps) => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = [...images, ...acceptedFiles].slice(0, maxImages);
    setImages(newImages);
    onImagesChange(newImages);
  }, [images, maxImages, onImagesChange]);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages,
  });

  const recommendedCounts = [1, 2, 4, 8];
  const currentRecommended = recommendedCounts.find(c => images.length <= c) || 8;

  return (
    <div className="space-y-6">
      {/* Upload Guidelines */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Recommended images:</span>
          {recommendedCounts.map((count) => (
            <div
              key={count}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-medium transition-colors",
                images.length >= count
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {count}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          More images from different angles = better 3D quality
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30",
          images.length >= maxImages && "opacity-50 cursor-not-allowed"
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
            {isDragActive ? "Drop images here" : "Upload Images"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag & drop or click to select images
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon className="w-4 h-4" />
            <span>JPG, PNG, WEBP • Max {maxImages} images</span>
          </div>
        </div>
      </div>

      {/* Image Preview Grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {images.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-xl overflow-hidden glass-card"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-medium bg-background/80 px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Info */}
      {images.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {images.length} of {maxImages} images uploaded
          </span>
          <span className={cn(
            "font-medium",
            images.length >= currentRecommended ? "text-primary" : "text-muted-foreground"
          )}>
            {images.length >= currentRecommended ? "Ready for processing" : `Add ${currentRecommended - images.length} more for better quality`}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
