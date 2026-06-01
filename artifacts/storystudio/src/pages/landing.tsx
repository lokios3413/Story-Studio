import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Feather, ChevronRight, PenTool, BookOpen, Globe, Clock, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const features = [
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: "Lore Builder",
    preview: (
      <div className="flex gap-2 mb-3">
        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">History</span>
        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">Magic System</span>
        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">Factions</span>
      </div>
    ),
    description: "Structure your world's history, magic systems, and rules in an interconnected web."
  },
  {
    icon: <UsersIcon className="h-5 w-5 text-primary" />,
    title: "Character Builder",
    preview: (
      <div className="flex items-center gap-3 mb-3 p-2 rounded-md bg-background border border-border/50">
        <div className="w-8 h-8 rounded-full bg-sidebar flex items-center justify-center border border-border">
          <span className="text-[10px] font-bold">EV</span>
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground">Elaria Vance</div>
          <div className="text-[10px] text-muted-foreground">Protagonist • Pyromancer</div>
        </div>
      </div>
    ),
    description: "Flesh out protagonists and antagonists with deep personality profiles and arcs."
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    title: "World Builder",
    preview: (
      <div className="flex flex-col gap-1 mb-3 text-xs">
        <div className="text-foreground flex items-center gap-1"><span className="text-primary">▾</span> The Astral Kingdoms</div>
        <div className="text-muted-foreground pl-3 flex items-center gap-1"><span className="text-primary">▾</span> Silver Keep</div>
        <div className="text-muted-foreground pl-6 flex items-center gap-1">▪ The Lower Wards</div>
      </div>
    ),
    description: "Map kingdoms, cities, and dungeons. Never lose track of where your characters are."
  },
  {
    icon: <Clock className="h-5 w-5 text-primary" />,
    title: "Timeline Builder",
    preview: (
      <div className="relative pl-3 border-l-2 border-primary/30 flex flex-col gap-2 mb-3 ml-2 text-xs">
        <div className="relative">
          <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
          <span className="text-muted-foreground text-[10px]">Year 1024</span>
          <div className="text-foreground">The Great Sundering</div>
        </div>
        <div className="relative">
          <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full border border-primary bg-background" />
          <span className="text-muted-foreground text-[10px]">Year 1042</span>
          <div className="text-foreground">Elaria's Birth</div>
        </div>
      </div>
    ),
    description: "Keep your story's chronological events in perfect order, from ancient history to present."
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
    title: "AI Writing Studio",
    preview: (
      <div className="flex flex-col gap-2 mb-3 text-[10px]">
        <div className="self-end bg-primary/20 text-primary px-2 py-1.5 rounded-md rounded-tr-none max-w-[80%]">
          Help me describe the Silver Keep's gates.
        </div>
        <div className="self-start bg-sidebar border border-border px-2 py-1.5 rounded-md rounded-tl-none max-w-[90%] text-muted-foreground">
          "Towering slabs of star-forged steel, etched with wards that hummed with latent arcane energy..."
        </div>
      </div>
    ),
    description: "An intelligent co-writer that understands your lore, ready to brainstorm or break blocks."
  }
];

// Need a missing icon import
function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const rotatingPhrases = [
  "Create Legends.",
  "Craft Universes.",
  "Tell Stories That Last.",
  "Bring Worlds To Life."
];

export default function Landing() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 1000], [40, -40]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // vw
    y: Math.random() * 100, // vh
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle radial gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px]"></div>
        
        {/* Faint grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>
        
        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${p.x}vw`, top: `${p.y}vh` }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between z-20 border-b border-border/30 bg-background/60 backdrop-blur-md fixed top-0 w-full">
        <div className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">StoryStudio</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-sign-in-nav">
            Sign In
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20" data-testid="button-get-started-nav">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sidebar border border-border/50 text-muted-foreground text-sm font-medium mb-8 shadow-sm"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>The next generation writing platform</span>
        </motion.div>
        
        <div className="h-[120px] md:h-[180px] mb-6 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
          >
            Build Worlds.
          </motion.h1>
          <div className="h-16 md:h-24 relative w-full flex justify-center overflow-visible">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentPhrase}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="absolute text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary"
              >
                {rotatingPhrases[currentPhrase]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light"
        >
          Turn a simple idea into a complete book. A premium workspace for serious writers to build worlds, characters, and manuscripts.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/sign-up">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base group shadow-xl shadow-primary/20" data-testid="button-get-started-hero">
              Start Writing <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-border/50 bg-background/50 hover:bg-sidebar backdrop-blur-sm" data-testid="button-sign-in-hero">
              Sign In
            </Button>
          </Link>
        </motion.div>

        {/* Real HTML App Preview Mockup */}
        <motion.div 
          style={{ y: mockupY }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 40 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-24 w-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="w-full rounded-xl border border-border/50 bg-background shadow-2xl overflow-hidden relative z-10 flex flex-col h-[400px] md:h-[600px] text-left">
            {/* Top Bar */}
            <div className="h-12 border-b border-border bg-sidebar flex items-center px-4 gap-4 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
              </div>
              <div className="flex-1 flex justify-center items-center text-xs text-muted-foreground gap-2">
                <span className="opacity-50">StoryStudio</span> <span className="opacity-30">/</span> <span>Dragon Academy</span> <span className="opacity-30">/</span> <span className="text-foreground">Manuscript</span>
              </div>
            </div>
            
            <div className="flex-1 flex min-h-0">
              {/* Sidebar */}
              <div className="w-48 border-r border-border bg-sidebar/50 hidden md:flex flex-col py-4 px-2 gap-1">
                <div className="px-3 py-2 text-xs font-semibold text-foreground/80 mb-2 truncate">Dragon Academy</div>
                <div className="px-3 py-1.5 rounded-md text-xs text-muted-foreground flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Lore</div>
                <div className="px-3 py-1.5 rounded-md text-xs text-muted-foreground flex items-center gap-2"><UsersIcon className="w-3.5 h-3.5" /> Characters</div>
                <div className="px-3 py-1.5 rounded-md text-xs text-primary bg-primary/10 font-medium flex items-center gap-2"><PenTool className="w-3.5 h-3.5" /> Manuscript</div>
              </div>

              {/* AI Panel */}
              <div className="w-64 border-r border-border bg-background hidden lg:flex flex-col p-4 gap-4">
                <div className="text-xs font-medium text-foreground flex items-center gap-2 mb-2"><Sparkles className="w-3.5 h-3.5 text-primary" /> AI Assistant</div>
                <div className="bg-sidebar border border-border rounded-lg p-3 text-xs text-muted-foreground">
                  <p className="mb-2">How can I help you with chapter 3?</p>
                  <div className="flex flex-col gap-2 mt-3 border-t border-border/50 pt-2">
                    <span className="px-2 py-1 rounded bg-background border border-border/50 cursor-pointer hover:bg-card">Brainstorm conflicts</span>
                    <span className="px-2 py-1 rounded bg-background border border-border/50 cursor-pointer hover:bg-card">Analyze pacing</span>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary rounded-lg p-3 text-xs self-end max-w-[90%] rounded-tr-none">
                  What was the name of the innkeeper in Oakhaven?
                </div>
                <div className="bg-sidebar border border-border rounded-lg p-3 text-xs text-muted-foreground self-start max-w-[90%] rounded-tl-none mt-1">
                  According to your Lore database, the innkeeper of The Rusty Tankard in Oakhaven is <strong>Bramm</strong>.
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 p-8 md:p-12 overflow-hidden flex flex-col">
                <div className="text-2xl font-serif font-semibold mb-6">Chapter 3: The Gathering Storm</div>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground font-serif leading-relaxed">
                  <p>The wind howled through the narrow streets of Oakhaven, rattling the shutters of The Rusty Tankard. Inside, the hearth fire cast dancing shadows across the worn floorboards.</p>
                  <p>Elaria pulled her cloak tighter around her shoulders, the thick wool doing little to ward off the encroaching chill. She kept her eyes fixed on the man in the corner—the one who hadn't touched his ale since he sat down.</p>
                  <p className="text-foreground">"You're late," a voice murmured close to her ear.</p>
                  <div className="inline-flex w-1 h-5 bg-primary animate-pulse relative top-1"></div>
                </div>
              </div>
            </div>
            
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-[1px] bg-border/50 border-t border-dashed border-border -z-10 transform -translate-y-1/2"></div>
            
            {[
              { num: "01", title: "Start with an idea", desc: "Plant the seed of your universe.", icon: BookOpen },
              { num: "02", title: "Build your world", desc: "Flesh out lore, people, and places.", icon: Globe },
              { num: "03", title: "Write your story", desc: "Draft with all your context at hand.", icon: PenTool }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-6 bg-background border border-border/50 rounded-2xl shadow-sm relative"
              >
                <div className="w-12 h-12 rounded-full bg-sidebar border border-border flex items-center justify-center mb-4 text-primary relative shadow-inner">
                  <step.icon className="w-5 h-5" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-background">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-border/30 bg-sidebar/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Everything a novelist needs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-light">
              No more scattered notes or endless browser tabs. StoryStudio brings your entire creative universe into one focused, beautiful workspace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                
                <div className="mb-4 flex-1">
                  {feature.preview}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/50">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Section */}
      <section className="py-32 px-6 border-t border-border/30 relative z-10 overflow-hidden">
        {/* Decorative background glow for quotes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="text-[120px] leading-none font-serif text-primary/20 absolute -top-16 left-10 md:left-20 select-none">"</div>
            
            <div className="flex gap-1 mb-8 text-primary/80">
              {[1,2,3,4,5].map(i => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-4xl font-medium mb-12 leading-relaxed font-serif text-foreground/90 relative z-10 px-4 md:px-12">
              StoryStudio replaced Scrivener, Notion, and three different notebooks for me. It's the cleanest, most focused writing environment I've ever used. The AI tools feel like a true collaborator.
            </blockquote>
            
            <div className="flex items-center gap-4 mb-24">
              <div className="w-14 h-14 rounded-full bg-sidebar flex items-center justify-center border border-border shadow-md">
                <span className="font-bold text-lg text-primary">EK</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Elena Vance</div>
                <div className="text-muted-foreground text-sm">Bestselling Fantasy Author</div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left border-t border-border/50 pt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-sidebar/50 border border-border/50"
            >
              <div className="flex gap-1 mb-4 text-primary/60">
                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
              </div>
              <p className="text-sm text-muted-foreground mb-6 italic">"Finally, a tool that understands how worldbuilding actually works. The timeline feature alone saved me weeks of continuity checking."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border"><span className="text-xs font-bold">MR</span></div>
                <div className="text-xs"><span className="font-semibold block text-foreground">Marcus Reed</span><span className="text-muted-foreground">Sci-Fi Writer</span></div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-sidebar/50 border border-border/50"
            >
              <div className="flex gap-1 mb-4 text-primary/60">
                {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
              </div>
              <p className="text-sm text-muted-foreground mb-6 italic">"The interface gets out of your way when you just want to write, but all the deep lore context is just a click away."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border"><span className="text-xs font-bold">SC</span></div>
                <div className="text-xs"><span className="font-semibold block text-foreground">Sarah Chen</span><span className="text-muted-foreground">Game Writer</span></div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center">
            <div className="flex -space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-sidebar border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  {String.fromCharCode(65 + i)}{String.fromCharCode(90 - i)}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-foreground/80">Trusted by 12,000+ writers worldwide</p>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 px-6 relative z-10 border-t border-border/30">
        <div className="absolute inset-0 bg-sidebar/80 -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Your next chapter begins here.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10 font-light"
          >
            Join thousands of writers building their worlds in StoryStudio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/sign-up">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg shadow-xl shadow-primary/20 group">
                Start Writing for Free
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30 bg-background text-center md:text-left flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto w-full gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <Feather className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium text-sm">© {new Date().getFullYear()} StoryStudio.</span>
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