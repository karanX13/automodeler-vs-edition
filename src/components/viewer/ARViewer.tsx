import { useEffect, useRef } from "react";
import { X, Smartphone, Move3D, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ARViewerProps {
  modelUrl: string | null | undefined;
  usdzUrl?: string;
  onClose: () => void;
}

const ARViewer = ({ modelUrl, usdzUrl, onClose }: ARViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if device supports AR
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;

  // For iOS, use USDZ with AR Quick Look
  // For Android, use Scene Viewer with GLB
  const arUrl = isIOS && usdzUrl 
    ? usdzUrl 
    : modelUrl;

  const handleARClick = () => {
    if (!arUrl) return;

    if (isIOS && usdzUrl) {
      // iOS AR Quick Look
      const anchor = document.createElement('a');
      anchor.setAttribute('rel', 'ar');
      anchor.setAttribute('href', usdzUrl);
      anchor.click();
    } else if (isAndroid && modelUrl) {
      // Android Scene Viewer
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelUrl)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
      window.location.href = intentUrl;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 z-50"
      ref={containerRef}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </Button>

      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-primary-gradient flex items-center justify-center mx-auto mb-6">
          <Smartphone className="w-10 h-10 text-primary-foreground" />
        </div>

        <h2 className="font-display text-2xl font-bold mb-4">
          View in Augmented Reality
        </h2>

        {isMobile ? (
          <>
            <p className="text-muted-foreground mb-6">
              Place this 3D model in your real environment using your device's camera.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-4 text-center">
                <Move3D className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Move & position</p>
              </div>
              <div className="glass-card p-4 text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Rotate & scale</p>
              </div>
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full gap-2"
              onClick={handleARClick}
              disabled={!arUrl}
            >
              <Smartphone className="w-5 h-5" />
              {isIOS ? "Open in AR Quick Look" : "Open in Scene Viewer"}
            </Button>

            {!arUrl && (
              <p className="mt-4 text-sm text-destructive">
                {isIOS 
                  ? "USDZ format not available for iOS AR" 
                  : "GLB format required for Android AR"}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              AR viewing requires a mobile device. Scan the QR code below with your phone to view this model in AR.
            </p>

            <div className="glass-card p-6 mb-6">
              <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                {/* Simple QR placeholder - in production would use a QR library */}
                <div className="text-center">
                  <Smartphone className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Open this page on mobile
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Visit this URL on your mobile device:<br />
              <code className="text-primary text-xs">{window.location.href}</code>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ARViewer;
