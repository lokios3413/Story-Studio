import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Feather, ChevronRight, PenTool, BookOpen, Globe, Clock, Sparkles, MessageSquare, Users } from "lucide-react";
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
    icon: <Users className="h-5 w-5 text-primary" />,
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

const rotatingPhrases = [
  "Create Legends.",
  "Craft Universes.",
  "Tell Stories That Last.",
  "Bring Worlds To Life."
];

const floatingPages = [
  { text: "Chapter 3: The Gathering Storm\n\nThe wind howled through the narrow streets of Oakhaven, rattling the shutters...", size: [160, 220], pos: [10, 15], rot: -8, dur: 28 },
  { text: "[LORE] The Sundering — Year 1024\nWhen the Archmage split the veil between realms, three kingdoms fell overnight...", size: [180, 240], pos: [75, 10], rot: 12, dur: 32 },
  { text: "CHARACTER: Elaria Vance\nAge: 19 | Role: Protagonist\nFears: Becoming her mother\nGoal: Master the Silver Flame", size: [140, 190], pos: [80, 50], rot: -15, dur: 25 },
  { text: "Timeline Fragment\n∙ Year 1024 — The Sundering\n∙ Year 1031 — Academy Founded\n∙ Year 1042 — Elaria Born", size: [150, 200], pos: [5, 60], rot: 5, dur: 29 },
  { text: "Chapter 7: Convergence\n\n'You've always known,' the old mage said without turning. 'You just weren't ready to believe it yet.'", size: [190, 250], pos: [20, 80], rot: -10, dur: 34 },
  { text: "[WORLD] The Astral Kingdoms\nSilver Keep — capital of the Northern Reach\nPopulation: ~40,000\nRuler: High Regent Velan", size: [160, 210], pos: [65, 85], rot: 14, dur: 27 },
  { text: "MAGIC SYSTEM NOTES\n∙ Flame-binding: requires emotional anchor\n∙ Cannot be self-taught\n∙ Three known schools...", size: [130, 180], pos: [40, 5], rot: 8, dur: 24 },
  { text: "Story Beats — Act 2\n∙ Elaria discovers the vault\n∙ Confrontation with Velan\n∙ The betrayal at Silver Keep", size: [170, 230], pos: [90, 30], rot: -6, dur: 31 },
];

export default function Landing() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const containerRef = useRef(null);
  const isGraphInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Radial gradient */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px]"></div>
        
        {/* Subtle dot grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        ></div>
        
        {/* Floating Pages */}
        {floatingPages.map((page, i) => (
          <motion.div
            key={`page-${i}`}
            className="absolute border border-foreground/10 bg-foreground/[0.03] backdrop-blur-[1px] rounded-[2px] shadow-sm flex flex-col p-4 overflow-hidden"
            style={{ 
              width: page.size[0], 
              height: page.size[1],
              left: `${page.pos[0]}vw`,
              top: `${page.pos[1]}vh`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [page.rot, page.rot + 5, page.rot],
            }}
            transition={{
              duration: page.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * -2
            }}
          >
            <p className="text-[8px] md:text-[9px] font-serif italic leading-relaxed text-foreground/60 whitespace-pre-wrap">
              {page.text}
            </p>
          </motion.div>
        ))}

        {/* Ink stains */}
        {[
          { w: 150, h: 120, pos: [15, 25], br: "60% 40% 70% 30% / 50% 60% 40% 70%" },
          { w: 200, h: 180, pos: [75, 45], br: "40% 60% 30% 70% / 60% 50% 70% 40%" },
          { w: 120, h: 160, pos: [10, 75], br: "50% 50% 70% 30% / 30% 70% 40% 60%" },
          { w: 180, h: 140, pos: [85, 80], br: "70% 30% 50% 50% / 60% 40% 60% 40%" }
        ].map((stain, i) => (
          <div
            key={`stain-${i}`}
            className="absolute bg-primary/[0.02]"
            style={{
              width: stain.w,
              height: stain.h,
              left: `${stain.pos[0]}vw`,
              top: `${stain.pos[1]}vh`,
              borderRadius: stain.br
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
      <section className="relative pt-36 pb-24 px-6 max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sidebar/50 border border-border/30 text-muted-foreground text-sm font-medium mb-8 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="tracking-wide">The next generation writing platform</span>
        </motion.div>
        
        <div className="h-[120px] md:h-[180px] mb-6 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight text-white"
          >
            Build Worlds.
          </motion.h1>
          <div className="h-20 md:h-28 relative w-full flex justify-center overflow-visible mt-2">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentPhrase}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="absolute text-6xl md:text-8xl font-bold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
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
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light"
        >
          Turn a simple idea into a complete book. A premium workspace for serious writers to build worlds, characters, and manuscripts.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
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

        {/* Connected Universe Visualization */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-[600px] h-[360px] relative rounded-2xl bg-card border border-border/60 shadow-2xl flex items-center justify-center overflow-hidden"
          style={{ boxShadow: "0 0 40px hsl(var(--primary)/0.1)" }}
        >
          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 360">
            {[
              { id: 1, x2: 120, y2: 100 },
              { id: 2, x2: 300, y2: 60 },
              { id: 3, x2: 480, y2: 100 },
              { id: 4, x2: 120, y2: 260 },
              { id: 5, x2: 300, y2: 300 },
              { id: 6, x2: 480, y2: 260 }
            ].map((line, i) => (
              <motion.line
                key={`line-${line.id}`}
                x1={300}
                y1={180}
                x2={line.x2}
                y2={line.y2}
                stroke="hsl(var(--primary))"
                strokeOpacity={0.3}
                strokeWidth={1}
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isGraphInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
              />
            ))}
          </svg>

          {/* Central Node */}
          <motion.div 
            className="absolute z-20 w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20"
            style={{ left: '50%', top: '50%', marginLeft: '-48px', marginTop: '-48px' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Your Story
          </motion.div>

          {/* Satellite Nodes */}
          {[
            { id: 1, label: "Characters", pos: { left: 120, top: 100 }, subs: "Elaria • Lord Velan", delay: 0 },
            { id: 2, label: "World", pos: { left: 300, top: 60 }, subs: "Silver Keep • Oakhaven", delay: 1 },
            { id: 3, label: "Lore", pos: { left: 480, top: 100 }, subs: "The Sundering", delay: 2 },
            { id: 4, label: "Timeline", pos: { left: 120, top: 260 }, subs: "Year 1024 • Year 1042", delay: 3 },
            { id: 5, label: "Manuscript", pos: { left: 300, top: 300 }, subs: "Chapter 1 • Act 2", delay: 4 },
            { id: 6, label: "AI Writer", pos: { left: 480, top: 260 }, subs: "Brainstorm • Rewrite", delay: 5 }
          ].map((node) => (
            <motion.div
              key={`node-${node.id}`}
              className="absolute z-10 flex flex-col items-center"
              style={{ left: node.pos.left, top: node.pos.top, marginLeft: '-40px', marginTop: '-20px' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
            >
              <div className="w-12 h-12 rounded-full bg-card border border-border/80 flex items-center justify-center text-[10px] font-medium text-foreground shadow-sm">
                {node.label}
              </div>
              <div className="mt-2 text-[9px] text-muted-foreground/60 whitespace-nowrap text-center opacity-50">
                {node.subs}
              </div>
            </motion.div>
          ))}

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-30"></div>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-sidebar border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">
                {['JD', 'EV', 'MR', 'AL', 'SK'][i-1]}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground/80 font-medium">Trusted by 12,000+ writers</p>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
      <section className="py-32 px-6 border-t border-border/30 bg-sidebar/20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-foreground">Everything a novelist needs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-light">
              No more scattered notes or endless browser tabs. StoryStudio brings your entire creative universe into one focused, beautiful workspace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 tracking-tight relative z-10">{feature.title}</h3>
                
                <div className="mb-6 flex-1 relative z-10">
                  {feature.preview}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed pt-6 border-t border-border/50 relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-6 border-t border-border/30 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="text-[120px] leading-none font-serif text-primary/10 absolute -top-16 left-10 md:left-20 select-none">"</div>
            
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
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 border-t border-border/30 bg-sidebar relative z-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Your next chapter awaits.</h2>
          <p className="text-xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto">
            Join thousands of authors who have upgraded their writing workflow. Start building your universe today.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
              Start Writing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background z-10 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Feather className="h-5 w-5 text-primary" />
            <span className="font-semibold">StoryStudio</span>
          </div>
          <div className="text-sm text-muted-foreground flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 StoryStudio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
