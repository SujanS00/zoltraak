"use client";
import { CalendarWithEvents } from "@/components/calendar-with-events";
import { motion } from "framer-motion";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl h-[800px]"
      >
        <CalendarWithEvents />
      </motion.div>
    </div>
  );
}