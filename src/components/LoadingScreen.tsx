import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main brain icon with gradient background */}
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-focus-500 to-purple-600 rounded-2xl"
              animate={{ 
                rotateY: [0, 360],
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ 
                rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            {/* Sparkles animation */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-focus-300" />
            </motion.div>
          </div>
          
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 w-24 h-24 mx-auto border-2 border-focus-500/30 rounded-2xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          
          <motion.div
            className="absolute inset-0 w-24 h-24 mx-auto border-2 border-purple-500/30 rounded-2xl"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
        </motion.div>
        
        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">NeuroFocus</h1>
          <p className="text-muted-foreground">ADHD Task Management & Time Tracking</p>
        </motion.div>
        
        {/* Loading progress */}
        <motion.div
          className="w-64 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Progress bar background */}
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-focus-500 to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          
          {/* Loading text */}
          <motion.p
            className="text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Preparing your ADHD-friendly workspace...
          </motion.p>
        </motion.div>
        
        {/* Feature hints */}
        <motion.div
          className="mt-12 space-y-2 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="text-xs text-muted-foreground flex items-center justify-center"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            🎯 Breaking down overwhelming tasks
          </motion.div>
          
          <motion.div
            className="text-xs text-muted-foreground flex items-center justify-center"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >
            ⏱️ ADHD-optimized focus sessions
          </motion.div>
          
          <motion.div
            className="text-xs text-muted-foreground flex items-center justify-center"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          >
            📈 Smart productivity insights
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;