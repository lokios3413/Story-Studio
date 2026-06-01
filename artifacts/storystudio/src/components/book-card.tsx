import { Clock, Book, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  id: string;
  title: string;
  genre: string;
  lastUpdated: string;
  wordCount: string;
}

export function BookCard({ id, title, genre, lastUpdated, wordCount }: BookCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-5 rounded-xl border border-border bg-card group relative overflow-hidden transition-colors hover:border-primary/50"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary transition-colors"></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1 text-foreground">{title}</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {genre}
          </span>
        </div>
        <div className="h-10 w-10 rounded-lg bg-sidebar flex items-center justify-center border border-border">
          <Book className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{lastUpdated}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Book className="h-3.5 w-3.5" />
          <span>{wordCount} words</span>
        </div>
      </div>

      <Link href={`/book/${id}`}>
        <Button variant="secondary" className="w-full bg-sidebar hover:bg-primary hover:text-primary-foreground text-foreground border border-border hover:border-primary transition-all" data-testid={`button-open-book-${id}`}>
          Open Workspace <ChevronRight className="ml-1.5 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}