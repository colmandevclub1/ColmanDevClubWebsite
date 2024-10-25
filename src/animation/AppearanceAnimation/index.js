import { motion } from "framer-motion";

const AppearanceAnimation = ({ children, sx }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} style={sx}>
      {children}
    </motion.div>
  );
};

export default AppearanceAnimation;
