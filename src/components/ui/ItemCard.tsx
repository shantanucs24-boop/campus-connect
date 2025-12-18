import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./button";

export interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "lost" | "found";
  date: string;
  uploadedBy: string;
  location?: string;
}

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
  index?: number;
}

export const ItemCard = ({ item, onClick, index = 0 }: ItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <GlassCard className="overflow-hidden p-0" onClick={onClick}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <StatusBadge status={item.status} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-primary-foreground font-semibold text-lg truncate">
              {item.title}
            </h3>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{item.uploadedBy}</span>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};
