import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockClaims, Claim } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
};

export const MyClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setClaims(mockClaims);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const groupedClaims = {
    pending: claims.filter((c) => c.status === "pending"),
    approved: claims.filter((c) => c.status === "approved"),
    rejected: claims.filter((c) => c.status === "rejected"),
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Claims</h1>
          <p className="text-muted-foreground">
            Track the status of your item claims
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pending", count: groupedClaims.pending.length, color: "primary" },
            { label: "Approved", count: groupedClaims.approved.length, color: "accent" },
            { label: "Rejected", count: groupedClaims.rejected.length, color: "destructive" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard hover={false} className="text-center p-4">
                <div className={cn(
                  "text-3xl font-bold mb-1",
                  stat.color === "primary" && "text-primary",
                  stat.color === "accent" && "text-accent",
                  stat.color === "destructive" && "text-destructive"
                )}>
                  {isLoading ? "-" : stat.count}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Claims Timeline */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : claims.length > 0 ? (
          <div className="space-y-4">
            {claims.map((claim, index) => {
              const StatusIcon = statusIcons[claim.status];
              return (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard 
                    className="p-4"
                    onClick={() => navigate(`/item/${claim.itemId}`)}
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={claim.itemImage}
                          alt={claim.itemTitle}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                        />
                        <div className={cn(
                          "absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center",
                          claim.status === "pending" && "bg-primary/10",
                          claim.status === "approved" && "bg-accent/10",
                          claim.status === "rejected" && "bg-destructive/10"
                        )}>
                          <StatusIcon className={cn(
                            "w-4 h-4",
                            claim.status === "pending" && "text-primary",
                            claim.status === "approved" && "text-accent",
                            claim.status === "rejected" && "text-destructive"
                          )} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold truncate">
                            {claim.itemTitle}
                          </h3>
                          <StatusBadge status={claim.status} className="flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {claim.date}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {claim.message}
                        </p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 hidden sm:block" />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No claims yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              When you claim an item, it will appear here
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Browse Items
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default MyClaims;
