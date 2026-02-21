import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";

const WhatsAppFloat = () => (
  <motion.a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'd like to enquire about a photography session.`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring" }}
    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-destructive rounded-full animate-ping" />
    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-destructive rounded-full" />
  </motion.a>
);

export default WhatsAppFloat;
