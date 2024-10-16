import React from 'react';
import { motion } from 'framer-motion';

const EntranceAnimation = ({ children, animationDelay, sx = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: animationDelay }}
      style={sx}
    >
      {children}
    </motion.div>
  );
};

export default EntranceAnimation;
