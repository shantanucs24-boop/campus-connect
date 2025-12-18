import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      
      <motion.div
        className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        animate={{
          scale: [1, 1.1, 0.9, 1],
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        animate={{
          scale: [1, 0.9, 1.1, 1],
          x: [0, -30, 20, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        animate={{
          scale: [1, 1.2, 0.8, 1],
          x: [0, -20, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};
