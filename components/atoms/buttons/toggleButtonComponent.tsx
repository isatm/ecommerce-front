import { ToggleButtonProps } from "@/interfaces/toggleProps";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToggleButtonComponent({
  options,
  buttonStyle = "bg-blue-500 text-white px-4 py-2 rounded-lg",
  menuStyle = "bg-white shadow-lg rounded-lg mt-2",
  animation = "none",
  onSelect,content, icon
}: ToggleButtonProps) {
  const [open, setOpen] = useState(false);

  // Definir variantes de animación para framer-motion
  const animations = {
    fade: {
      hidden: { opacity: 0, y: -10 },
      visible: { opacity: 1, y: 0 },
    },
    slide: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        className={`${buttonStyle} transition`}
      >
        {icon}
        {content}
      </button>

      {/* Opciones desplegables */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={animations[animation]}
            transition={{ duration: 0.3 }}
            className={`absolute left-0 w-40 ${menuStyle}`}
          >
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setOpen(false);
                  if (onSelect) onSelect(opt);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
