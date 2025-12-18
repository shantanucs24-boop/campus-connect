import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImagePlus, Sparkles, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Status = "lost" | "found";

export const UploadItem = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<Status>("lost");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setIsUploading(true);
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    toast.success("Item reported successfully! AI is generating description...");
    navigate("/dashboard");
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Report an Item</h1>
          <p className="text-muted-foreground">
            Upload a photo and our AI will generate the description
          </p>
        </div>

        <GlassCard hover={false} className="p-6 sm:p-8">
          {/* Status Selector */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-3 block">
              What happened to this item?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["lost", "found"] as Status[]).map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "relative p-4 rounded-2xl border-2 transition-all text-left",
                    status === s
                      ? s === "lost"
                        ? "border-destructive bg-destructive/5"
                        : "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        s === "lost" ? "bg-destructive/10" : "bg-accent/10"
                      )}
                    >
                      {s === "lost" ? "🔍" : "📦"}
                    </div>
                    <div>
                      <div className="font-semibold capitalize">{s}</div>
                      <div className="text-xs text-muted-foreground">
                        {s === "lost" ? "I lost this item" : "I found this item"}
                      </div>
                    </div>
                  </div>
                  {status === s && (
                    <motion.div
                      layoutId="status-check"
                      className={cn(
                        "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",
                        s === "lost" ? "bg-destructive" : "bg-accent"
                      )}
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-3 block">
              Upload Image
            </label>
            <AnimatePresence mode="wait">
              {!image ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "relative border-2 border-dashed rounded-2xl p-8 sm:p-12 transition-all text-center cursor-pointer",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <motion.div
                    animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <ImagePlus className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium mb-1">
                      {isDragging ? "Drop your image here" : "Drag & drop an image"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-3 right-3 rounded-full"
                    onClick={() => setImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Hint */}
          <div className="bg-primary/5 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm mb-1">AI-Powered Description</p>
              <p className="text-xs text-muted-foreground">
                Our AI will automatically analyze your image and generate a detailed description to help identify the item.
              </p>
            </div>
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!image || isUploading}
            className="w-full h-12 rounded-xl text-base font-medium"
          >
            {isUploading ? (
              <motion.div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
                Uploading...
              </motion.div>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Report Item
              </>
            )}
          </Button>
        </GlassCard>
      </motion.div>
    </Layout>
  );
};

export default UploadItem;
