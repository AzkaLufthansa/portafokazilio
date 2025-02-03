import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"
      />
    </motion.div>
  );
}; 