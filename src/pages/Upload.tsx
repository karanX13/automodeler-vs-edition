import { useState } from "react";
import { motion } from "framer-motion";
import { createProject } from "@/services/projectService";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sparkles,
  Upload as UploadIcon,
  Link2,
  Layers,
  Wand2,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";

import BatchUploader from "@/components/upload/BatchUploader";
import AIImageGenerator from "@/components/upload/AIImageGenerator";
import { ConversionProgress } from "@/components/upload/ConversionProgress";

import { useImageTo3D } from "@/hooks/useImageTo3D";
import { toast } from "@/hooks/use-toast";

const Upload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [uploadMethod, setUploadMethod] =
    useState<"file" | "url" | "ai" | "batch">("ai");

  const [aiGeneratedImage, setAiGeneratedImage] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const [projectName, setProjectName] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);

  const { isProcessing, progress, result, startConversion } =
    useImageTo3D();

  const defaultSettings = {
    outputFormat: "glb",
    quality: "high",
    meshSmoothing: true,
    textureEnhancement: true,
    holeRepair: true,
  };

  const handleGenerate = async () => {
    try {
      if (!user) {
        toast({
          title: "Please login first",
          variant: "destructive",
        });
        return;
      }

      if (!projectName.trim()) {
        toast({
          title: "Project name required",
          variant: "destructive",
        });
        return;
      }

      const projectId = await createProject(
        user.uid,
        projectName,
        aiPrompt
      );

      if (uploadMethod === "ai") {
        if (!aiGeneratedImage) {
          toast({
            title: "Generate an image first",
            variant: "destructive",
          });
          return;
        }

        await startConversion(aiGeneratedImage, {
          projectId,
          projectName,
          sourceType: "image",
          sourcePrompt: aiPrompt,
          ...defaultSettings,
        });
      }

      if (uploadMethod === "file") {
        if (!selectedFile) {
          toast({
            title: "Please select a file",
            variant: "destructive",
          });
          return;
        }

        await startConversion(selectedFile, {
          projectId,
          projectName,
          sourceType: "image",
          ...defaultSettings,
        });
      }

      if (uploadMethod === "url") {
        if (!urlInput) {
          toast({
            title: "Please enter an image URL",
            variant: "destructive",
          });
          return;
        }

        await startConversion(urlInput, {
          projectId,
          projectName,
          sourceType: "image",
          ...defaultSettings,
        });
      }

      setProjectName("");
    } catch {
      toast({
        title: "Conversion failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Back Button */}
          <div className="flex justify-start mb-6">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-zinc-700 text-white hover:bg-zinc-800"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Create 3D Model
            </h1>
            <p className="text-gray-400 mt-3">
              Convert images into AI-generated 3D models
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl p-8"
          >
            <Tabs
              value={uploadMethod}
              onValueChange={(v) =>
                setUploadMethod(v as "file" | "url" | "ai" | "batch")
              }
            >
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="file">
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload
                </TabsTrigger>

                <TabsTrigger value="url">
                  <Link2 className="w-4 h-4 mr-2" />
                  URL
                </TabsTrigger>

                <TabsTrigger value="ai">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Image
                </TabsTrigger>

                <TabsTrigger value="batch">
                  <Layers className="w-4 h-4 mr-2" />
                  Batch
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai">
                <AIImageGenerator
                  onGenerate={(imageUrl, prompt) => {
                    setAiGeneratedImage(imageUrl);
                    setAiPrompt(prompt);
                  }}
                />
              </TabsContent>

              <TabsContent value="file">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-zinc-700 hover:border-cyan-500 transition-all rounded-xl p-10 text-center bg-zinc-900/40">
                    <UploadIcon className="w-10 h-10 mx-auto mb-4 text-cyan-400" />

                    <p className="text-lg font-medium text-white">
                      {selectedFile
                        ? selectedFile.name
                        : "Click to upload an image"}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPG, WEBP supported
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </TabsContent>

              <TabsContent value="url">
                <input
                  type="text"
                  placeholder="Paste image URL here..."
                  className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="batch">
                <BatchUploader onFilesChange={() => {}} />
              </TabsContent>
            </Tabs>

            {isProcessing && (
              <div className="mt-8">
                <ConversionProgress
                  progress={progress}
                  status={
                    result?.status === "SUCCEEDED"
                      ? "completed"
                      : result?.status === "FAILED"
                      ? "failed"
                      : "processing"
                  }
                />
              </div>
            )}

            {!isProcessing && (
              <div className="mt-10">
                <Button
                  size="lg"
                  onClick={() => setShowProjectModal(true)}
                  className="gap-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                >
                  <Wand2 className="w-5 h-5" />
                  Generate 3D Model
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Project Name Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Project Name</h2>

            <input
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded mb-4"
              placeholder="My 3D Model"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowProjectModal(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  setShowProjectModal(false);
                  handleGenerate();
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;