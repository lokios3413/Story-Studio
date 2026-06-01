import { motion } from "framer-motion";
import { Feather, ChevronRight, PenTool, BookOpen, Globe, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const features = [
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Lore Builder",
    description: "Structure your world's history, magic systems, and rules in an interconnected web."
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary" />,
    title: "Character Builder",
    description: "Flesh out protagonists and antagonists with deep personality profiles and arcs."
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "World Builder",
    description: "Map kingdoms, cities, and dungeons. Never lose track of where your characters are."
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Timeline Builder",
    description: "Keep your story's chronological events in perfect order, from ancient history to present."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "AI Writing Studio",
    description: "An intelligent co-writer that understands your lore, ready to brainstorm or break blocks."
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm fixed top-0 w-full">
        <div className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">StoryStudio</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-sign-in-nav">
            Sign In
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-get-started-nav">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20"
        >
          <Sparkles className="h-4 w-4" />
          <span>The next generation writing platform</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
        >
          Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Legends.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Turn a simple idea into a complete book. A premium workspace for serious writers to build worlds, characters, and manuscripts.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/sign-up">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base group" data-testid="button-get-started-hero">
              Start Writing <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-border hover:bg-muted" data-testid="button-sign-in-hero">
              Sign In
            </Button>
          </Link>
        </motion.div>

        {/* Abstract UI Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 w-full rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          <div className="h-10 border-b border-border flex items-center px-4 gap-2 bg-sidebar">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-4 w-32 bg-border/50 rounded-md"></div>
            </div>
          </div>
          <div className="flex h-[300px] md:h-[500px]">
            <div className="w-1/4 border-r border-border hidden md:flex flex-col p-4 gap-3 bg-sidebar">
              <div className="h-5 w-24 bg-primary/20 rounded-md mb-2"></div>
              <div className="h-4 w-full bg-border rounded-md"></div>
              <div className="h-4 w-3/4 bg-border rounded-md"></div>
              <div className="h-4 w-5/6 bg-border rounded-md"></div>
              <div className="h-4 w-full bg-border rounded-md mt-4"></div>
              <div className="h-4 w-2/3 bg-border rounded-md"></div>
            </div>
            <div className="w-full md:w-3/4 p-6 flex flex-col gap-4">
              <div className="h-8 w-48 bg-border rounded-md mb-4"></div>
              <div className="h-4 w-full bg-border rounded-md"></div>
              <div className="h-4 w-full bg-border rounded-md"></div>
              <div className="h-4 w-5/6 bg-border rounded-md"></div>
              <div className="h-4 w-full bg-border rounded-md mt-4"></div>
              <div className="h-4 w-4/5 bg-border rounded-md"></div>
              <div className="h-4 w-full bg-border rounded-md"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-border bg-sidebar/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything a novelist needs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              No more scattered notes. StoryStudio brings your entire creative process into one focused, beautiful workspace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-1 mb-6 text-primary">
              {[1,2,3,4,5].map(i => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
              "StoryStudio replaced Scrivener, Notion, and three different notebooks for me. It's the cleanest, most focused writing environment I've ever used. The AI tools feel like a true collaborator."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sidebar flex items-center justify-center border border-border">
                <span className="font-bold text-lg">EK</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Elena Vance</div>
                <div className="text-muted-foreground">Bestselling Fantasy Author</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-sidebar text-center md:text-left flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto w-full gap-4">
        <div className="flex items-center gap-2">
          <Feather className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">© {new Date().getFullYear()} StoryStudio.</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}