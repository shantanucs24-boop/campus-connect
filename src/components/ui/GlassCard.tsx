import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-2xl p-6",
        hover && "glass-card-hover cursor-pointer",
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      whileTap={hover ? { scale: 0.99 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};
