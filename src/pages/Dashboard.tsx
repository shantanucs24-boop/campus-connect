import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Package, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ItemCard, Item } from "@/components/ui/ItemCard";
import { ItemCardSkeleton } from "@/components/ui/ItemSkeleton";
import { Button } from "@/components/ui/button";
import { mockItems } from "@/data/mockData";
import { cn } from "@/lib/utils";

type FilterType = "all" | "lost" | "found";

export const Dashboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setItems(mockItems);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const stats = {
    total: items.length,
    lost: items.filter((i) => i.status === "lost").length,
    found: items.filter((i) => i.status === "found").length,
  };

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="glass-card rounded-3xl p-6 sm:p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground mb-6">
              Help reunite students with their lost belongings
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-background/50 rounded-2xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total Items</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-background/50 rounded-2xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-2xl font-bold">{stats.lost}</div>
                <div className="text-xs text-muted-foreground">Lost</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-background/50 rounded-2xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div className="text-2xl font-bold">{stats.found}</div>
                <div className="text-xs text-muted-foreground">Found</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Recent Items
        </h2>
        
        <div className="flex gap-2">
          {(["all", "lost", "found"] as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-xl capitalize",
                filter === f && "shadow-glow"
              )}
            >
              {f === "all" ? "All Items" : f}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => navigate(`/item/${item.id}`)}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your filters or check back later
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
