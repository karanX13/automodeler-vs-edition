import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Share2, 
  Copy, 
  Check, 
  Globe, 
  Lock,
  ExternalLink,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ShareModalProps {
  projectId: string;
  projectName: string;
  isPublic?: boolean;
  shareSlug?: string | null;
  onUpdate?: (isPublic: boolean, shareSlug: string | null) => void;
}

const generateSlug = () => {
  return Math.random().toString(36).substring(2, 10) + 
         Math.random().toString(36).substring(2, 10);
};

const ShareModal = ({ 
  projectId, 
  projectName, 
  isPublic: initialIsPublic = false,
  shareSlug: initialSlug = null,
  onUpdate 
}: ShareModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [shareSlug, setShareSlug] = useState(initialSlug);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = shareSlug 
    ? `${window.location.origin}/share/${shareSlug}` 
    : null;

  const handleTogglePublic = async (checked: boolean) => {
    setIsSaving(true);
    try {
      let newSlug = shareSlug;
      
      // Generate slug if making public and no slug exists
      if (checked && !shareSlug) {
        newSlug = generateSlug();
      }

      const { error } = await supabase
        .from("projects")
        .update({ 
          is_public: checked,
          share_slug: checked ? newSlug : shareSlug
        })
        .eq("id", projectId);

      if (error) throw error;

      setIsPublic(checked);
      if (checked && newSlug) {
        setShareSlug(newSlug);
      }
      
      onUpdate?.(checked, checked ? newSlug : shareSlug);

      toast({
        title: checked ? "Model is now public!" : "Model is now private",
        description: checked 
          ? "Anyone with the link can view this model." 
          : "Only you can access this model.",
      });
    } catch (err) {
      console.error("Error updating share settings:", err);
      toast({
        title: "Error",
        description: "Failed to update sharing settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Share Model</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Public Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              {isPublic ? (
                <Globe className="w-5 h-5 text-primary" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">
                  {isPublic ? "Public" : "Private"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPublic 
                    ? "Anyone with the link can view" 
                    : "Only you can access"}
                </p>
              </div>
            </div>
            <Switch
              checked={isPublic}
              onCheckedChange={handleTogglePublic}
              disabled={isSaving}
            />
          </div>

          {/* Share Link */}
          {isPublic && shareUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-sm font-medium">Share Link</p>
              <div className="flex gap-2">
                <Input 
                  value={shareUrl} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={copyLink}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <a 
                href={shareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Open share page
              </a>
            </motion.div>
          )}

          {/* Gallery Info */}
          {isPublic && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Featured in Gallery</p>
                  <p className="text-xs text-muted-foreground">
                    Public models appear in the community gallery for others to discover.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isSaving && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
