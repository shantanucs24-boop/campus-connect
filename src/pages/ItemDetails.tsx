import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  MessageSquare,
  X,
  Send,
  CheckCircle
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Textarea } from "@/components/ui/textarea";
import { mockItems } from "@/data/mockData";
import { toast } from "sonner";

export const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(mockItems.find((i) => i.id === id));
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimMessage, setClaimMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    const found = mockItems.find((i) => i.id === id);
    setItem(found);
  }, [id]);

  const handleClaim = async () => {
    if (!claimMessage.trim()) {
      toast.error("Please provide details about your claim");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setClaimSuccess(true);
    
    setTimeout(() => {
      setShowClaimModal(false);
      setClaimSuccess(false);
      setClaimMessage("");
      toast.success("Claim submitted successfully!");
    }, 2000);
  };

  if (!item) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Item not found</h2>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard hover={false} className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 sm:h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <StatusBadge status={item.status} />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <GlassCard hover={false}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                {item.title}
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{item.location || "Location not specified"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Reported by {item.uploadedBy}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  AI Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassCard>

            {/* Claim Button */}
            {item.status === "found" && (
              <Button
                onClick={() => setShowClaimModal(true)}
                className="w-full h-12 rounded-xl text-base font-medium"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Claim This Item
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Claim Modal */}
      <AnimatePresence>
        {showClaimModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isSubmitting && setShowClaimModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard hover={false} className="p-6">
                <AnimatePresence mode="wait">
                  {!claimSuccess ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Claim Item</h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowClaimModal(false)}
                          disabled={isSubmitting}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        Please provide details to verify your ownership of this item.
                      </p>

                      <Textarea
                        value={claimMessage}
                        onChange={(e) => setClaimMessage(e.target.value)}
                        placeholder="Describe how you can prove this item belongs to you..."
                        className="min-h-32 mb-4 resize-none"
                        disabled={isSubmitting}
                      />

                      <Button
                        onClick={handleClaim}
                        disabled={isSubmitting}
                        className="w-full h-11 rounded-xl"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Claim
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </motion.div>
                      <h3 className="text-lg font-semibold mb-2">
                        Claim Submitted!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We'll notify you once it's reviewed
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ItemDetails;
