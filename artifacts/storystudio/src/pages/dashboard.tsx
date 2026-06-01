import { useState } from "react";
import { Plus, BookOpen, PenTool, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/top-bar";
import { BookCard } from "@/components/book-card";
import { CreateBookModal } from "@/components/create-book-modal";
import { Button } from "@/components/ui/button";

const mockBooks = [
  {
    id: "1",
    title: "Dragon Academy",
    genre: "Fantasy",
    lastUpdated: "2 days ago",
    wordCount: "42,500"
  },
  {
    id: "2",
    title: "Shadow Empire",
    genre: "Political Thriller",
    lastUpdated: "5 days ago",
    wordCount: "85,200"
  },
  {
    id: "3",
    title: "The Last Mage",
    genre: "Epic Fantasy",
    lastUpdated: "1 week ago",
    wordCount: "12,400"
  }
];

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <TopBar />
      
      <main className="flex-1 overflow-auto p-6 md:p-10 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Alex.</h1>
            <p className="text-muted-foreground">You have 3 active projects. Ready to write?</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="gap-2 shadow-lg shadow-primary/20" data-testid="button-new-book">
            <Plus className="h-4 w-4" /> New Book
          </Button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <div className="p-4 rounded-xl border border-border bg-sidebar flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">Total Books</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-sidebar flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <PenTool className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">Total Words</div>
              <div className="text-2xl font-bold">140,100</div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-sidebar flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">Writing Streak</div>
              <div className="text-2xl font-bold">12 days</div>
            </div>
          </div>
        </motion.div>

        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Recent Books
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {mockBooks.map((book) => (
              <motion.div 
                key={book.id}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
              >
                <BookCard {...book} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <CreateBookModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}