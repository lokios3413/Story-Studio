import { motion } from "framer-motion";
import { Circle } from "lucide-react";

interface TimelineItemProps {
  event: string;
  time: string;
  isLast?: boolean;
}

export function TimelineItem({ event, time, isLast }: TimelineItemProps) {
  return (
    <div className="flex gap-4 relative">
      {!isLast && (
        <div className="absolute left-2.5 top-6 bottom-0 w-px bg-border/80 -translate-x-1/2" />
      )}
      <div className="mt-1 relative z-10 bg-background rounded-full border-2 border-primary">
        <Circle className="h-4 w-4 text-primary fill-primary/20" />
      </div>
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="pb-8"
      >
        <div className="font-semibold text-foreground text-lg">{event}</div>
        <div className="text-muted-foreground text-sm font-medium">{time}</div>
      </motion.div>
    </div>
  );
}