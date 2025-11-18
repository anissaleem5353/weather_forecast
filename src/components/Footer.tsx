import { motion } from "framer-motion";
import WeatherLogo from "./WeatherLogo";
import { useTheme } from "../context/ThemeProvider";

const Footer = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full border-t bg-background/95 py-4 supports-[backdrop-filter]:bg-background/60 backdrop-blur mt-10"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-3">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <WeatherLogo theme={theme} />
        </motion.div>

        {/* Copyright Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground text-center"
        >
          © {year} Weather Hub — All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
