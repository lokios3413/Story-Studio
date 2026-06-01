import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Feather, ChevronRight, ChevronDown, PenTool, BookOpen,
  Globe, Clock, Sparkles, MessageSquare, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/* ─── Rotating hero phrases ─────────────────────────────────────────── */
const rotatingPhrases = [
  "Create Legends.",
  "Craft Universes.",
  "Tell Stories That Last.",
  "Bring Worlds To Life.",
];

/* ─── Feature cards ──────────────────────────────────────────────────── */
const features = [
  {
    icon: <BookOpen className="h-5 w-5" />,
    color: "hsl(262,83%,68%)",
    title: "Lore Builder",
    preview: (
      <div className="flex flex-wrap gap-1.5">
        {["History", "Magic System", "Factions", "Politics"].map((t) => (
          <span key={t} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">{t}</span>
        ))}
      </div>
    ),
    description: "Structure your world's history, magic systems, and rules in an interconnected web.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    color: "hsl(189,94%,43%)",
    title: "Character Builder",
    preview: (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-background/60 border border-border/40">
        <div className="w-7 h-7 rounded-full flex items-center justify-center border border-border text-[9px] font-bold shrink-0"
          style={{ background: "hsl(189,94%,43%,0.15)", color: "hsl(189,94%,43%)" }}>EV</div>
        <div>
          <div className="text-[11px] font-semibold">Elaria Vance</div>
          <div className="text-[9px] text-muted-foreground">Protagonist · Pyromancer</div>
        </div>
      </div>
    ),
    description: "Flesh out protagonists and antagonists with deep personality profiles and arcs.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    color: "hsl(160,60%,55%)",
    title: "World Builder",
    preview: (
      <div className="flex flex-col gap-1 text-[11px]">
        <div className="flex items-center gap-1 text-foreground">
          <span style={{ color: "hsl(160,60%,55%)" }}>▾</span> The Astral Kingdoms
        </div>
        <div className="flex items-center gap-1 text-muted-foreground pl-3">
          <span style={{ color: "hsl(160,60%,55%)" }}>▾</span> Silver Keep
        </div>
        <div className="pl-6 text-muted-foreground/60">▪ The Lower Wards</div>
      </div>
    ),
    description: "Map kingdoms, cities, and dungeons. Never lose track of where your story lives.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    color: "hsl(38,92%,50%)",
    title: "Timeline Builder",
    preview: (
      <div className="relative pl-3 border-l-2 flex flex-col gap-2 ml-2" style={{ borderColor: "hsl(38,92%,50%,0.4)" }}>
        {[["Year 1024", "The Great Sundering"], ["Year 1042", "Elaria Born"]].map(([yr, ev]) => (
          <div key={yr} className="relative">
            <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full"
              style={{ background: "hsl(38,92%,50%)" }} />
            <div className="text-[9px] text-muted-foreground">{yr}</div>
            <div className="text-[11px] text-foreground">{ev}</div>
          </div>
        ))}
      </div>
    ),
    description: "Keep your chronological events in perfect order, from ancient history to present day.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    color: "hsl(292,84%,72%)",
    title: "AI Writing Studio",
    preview: (
      <div className="flex flex-col gap-1.5 text-[10px]">
        <div className="self-end px-2 py-1.5 rounded-lg rounded-tr-none max-w-[80%]"
          style={{ background: "hsl(292,84%,72%,0.15)", color: "hsl(292,84%,72%)" }}>
          Help me describe the Silver Keep.
        </div>
        <div className="self-start bg-sidebar border border-border/50 px-2 py-1.5 rounded-lg rounded-tl-none max-w-[90%] text-muted-foreground">
          "Towering slabs of star-forged steel, etched with wards..."
        </div>
      </div>
    ),
    description: "An intelligent co-writer that understands your lore, ready to brainstorm or break blocks.",
  },
  {
    icon: <PenTool className="h-5 w-5" />,
    color: "hsl(248,70%,70%)",
    title: "Manuscript Editor",
    preview: (
      <div className="font-serif text-[10px] text-muted-foreground leading-relaxed italic border-l-2 border-border/40 pl-2">
        "The iron gates of Valerius Academy loomed over Kira — she was the first commoner invited in three centuries."
        <span className="inline-block w-0.5 h-3 bg-primary align-middle ml-0.5 animate-pulse" />
      </div>
    ),
    description: "A distraction-free manuscript editor with chapter management and live word counts.",
  },
];

/* ─── Floating background pages ─────────────────────────────────────── */
const floatingPages = [
  { text: "Chapter 3: The Gathering Storm\n\nThe wind howled through the narrow streets of Oakhaven, rattling the shutters...", size: [148, 196], pos: [1, 18], rot: -8, dur: 28 },
  { text: "[LORE] The Sundering — Year 1024\nWhen the Archmage split the veil between realms, three kingdoms fell overnight...", size: [158, 216], pos: [82, 8], rot: 10, dur: 32 },
  { text: "CHARACTER: Elaria Vance\nAge: 19 | Role: Protagonist\nFears: Becoming her mother\nGoal: Master the Silver Flame", size: [138, 182], pos: [85, 50], rot: -13, dur: 25 },
  { text: "Timeline Fragment\n∙ Year 1024 — The Sundering\n∙ Year 1031 — Academy Founded\n∙ Year 1042 — Elaria Born", size: [142, 192], pos: [2, 58], rot: 6, dur: 29 },
  { text: "Chapter 7: Convergence\n\n'You've always known,' the old mage said without turning. 'You just weren't ready to believe it yet.'", size: [152, 206], pos: [3, 82], rot: -9, dur: 34 },
  { text: "[WORLD] The Astral Kingdoms\nSilver Keep — capital of the Northern Reach\nPopulation: ~40,000\nRuler: High Regent Velan", size: [148, 198], pos: [79, 78], rot: 12, dur: 27 },
  { text: "MAGIC SYSTEM NOTES\n∙ Flame-binding: requires emotional anchor\n∙ Cannot be self-taught\n∙ Three known schools...", size: [128, 172], pos: [0, 3], rot: 7, dur: 24 },
  { text: "Story Beats — Act 2\n∙ Elaria discovers the vault\n∙ Confrontation with Velan\n∙ The betrayal at Silver Keep", size: [152, 206], pos: [88, 28], rot: -5, dur: 31 },
];

/* ─── Abstract art panel ─────────────────────────────────────────────── */
function AbstractArt() {
  return (
    <div
      className="w-full rounded-2xl border border-border/40 bg-card/70 backdrop-blur-sm overflow-hidden relative"
      style={{
        height: 320,
        boxShadow:
          "0 0 80px hsl(262,83%,58%,0.08), 0 0 160px hsl(189,94%,43%,0.05), inset 0 0 40px hsl(0,0%,0%,0.3)",
      }}
    >
      <svg
        viewBox="0 0 900 320"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Outer slow ring — violet */}
        <motion.ellipse
          cx={450} cy={160} rx={320} ry={130} fill="none"
          stroke="hsl(262,83%,68%)" strokeWidth={0.6} strokeOpacity={0.25}
          strokeDasharray="6 14"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 160px" }}
        />
        {/* Mid ring — cyan */}
        <motion.ellipse
          cx={450} cy={160} rx={220} ry={88} fill="none"
          stroke="hsl(189,94%,43%)" strokeWidth={0.8} strokeOpacity={0.3}
          strokeDasharray="2 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 160px" }}
        />
        {/* Inner ring — rose */}
        <motion.ellipse
          cx={450} cy={160} rx={130} ry={52} fill="none"
          stroke="hsl(292,84%,72%)" strokeWidth={0.6} strokeOpacity={0.35}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 160px" }}
        />

        {/* Flowing ink curves */}
        <motion.path
          d="M 80 240 C 180 80, 320 280, 450 160 S 680 40, 820 180"
          fill="none" stroke="hsl(262,83%,68%)" strokeWidth={1} strokeOpacity={0.2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M 100 60 C 200 200, 380 40, 520 200 S 720 280, 860 100"
          fill="none" stroke="hsl(189,94%,43%)" strokeWidth={0.8} strokeOpacity={0.18}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, delay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 50 160 Q 250 20 450 160 T 860 160"
          fill="none" stroke="hsl(292,84%,72%)" strokeWidth={0.7} strokeOpacity={0.15}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1.5, ease: "easeInOut" }}
        />

        {/* Accent dots on rings — simple SVG circles, no motion offset */}
        <circle cx={670} cy={160} r={4} fill="hsl(189,94%,43%)" fillOpacity={0.7} />
        <circle cx={230} cy={160} r={4} fill="hsl(292,84%,72%)" fillOpacity={0.6} />

        {/* Floating geometric shapes — use CSS y transform, not SVG cy, to avoid framer attr errors */}
        {[
          { cx: 160, cy: 90, r: 6, color: "hsl(262,83%,68%)", op: 0.6, dur: 6 },
          { cx: 730, cy: 220, r: 4, color: "hsl(189,94%,43%)", op: 0.7, dur: 8 },
          { cx: 560, cy: 60, r: 5, color: "hsl(292,84%,72%)", op: 0.5, dur: 7 },
          { cx: 300, cy: 260, r: 3, color: "hsl(38,92%,50%)", op: 0.6, dur: 9 },
          { cx: 620, cy: 280, r: 4, color: "hsl(160,60%,55%)", op: 0.5, dur: 5 },
          { cx: 200, cy: 190, r: 3, color: "hsl(248,70%,70%)", op: 0.6, dur: 10 },
          { cx: 780, cy: 80, r: 5, color: "hsl(38,92%,50%)", op: 0.5, dur: 7 },
        ].map((dot, i) => (
          <motion.circle
            key={i} cx={dot.cx} cy={dot.cy} r={dot.r}
            fill={dot.color} fillOpacity={dot.op}
            animate={{ y: [0, -12, 0], opacity: [dot.op, dot.op * 0.4, dot.op] }}
            transition={{ duration: dot.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          />
        ))}

        {/* Glow halos — use CSS scale, not SVG r, to avoid framer attr errors */}
        <circle cx={450} cy={160} r={18} fill="hsl(262,83%,68%)" fillOpacity={0.07} />
        <motion.circle
          cx={450} cy={160} r={18} fill="none"
          stroke="hsl(262,83%,68%)" strokeWidth={1} strokeOpacity={0.4}
          animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "450px 160px" }}
        />

        {/* Center star dot */}
        <circle cx={450} cy={160} r={5} fill="hsl(262,83%,68%)" fillOpacity={0.9} />

        {/* Scattered pixel dots */}
        {[
          [130, 150], [220, 60], [380, 40], [530, 290], [660, 130],
          [770, 260], [840, 140], [90, 280], [430, 290],
        ].map(([x, y], i) => (
          <motion.circle
            key={`px-${i}`} cx={x} cy={y} r={1.5}
            fill="hsl(var(--foreground))" fillOpacity={0.15}
            animate={{ fillOpacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}

        {/* Diagonal cross-lines — structural feel */}
        <line x1={0} y1={0} x2={900} y2={320} stroke="hsl(var(--foreground))" strokeOpacity={0.02} strokeWidth={1} />
        <line x1={900} y1={0} x2={0} y2={320} stroke="hsl(var(--foreground))" strokeOpacity={0.02} strokeWidth={1} />

        {/* Edge vignette */}
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="hsl(224,22%,15%)" stopOpacity={0.7} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={900} height={320} fill="url(#vignette)" />
      </svg>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function Landing() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentPhrase((p) => (p + 1) % rotatingPhrases.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative">

      {/* ── Fixed background layer ────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Coloured glows */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[130px]"
          style={{ background: "hsl(262,83%,58%,0.05)" }} />
        <div className="absolute top-[10%] left-[4%] w-[380px] h-[380px] rounded-full blur-[100px]"
          style={{ background: "hsl(189,94%,43%,0.04)" }} />
        <div className="absolute top-[30%] right-[3%] w-[320px] h-[320px] rounded-full blur-[90px]"
          style={{ background: "hsl(292,84%,72%,0.04)" }} />
        <div className="absolute bottom-[10%] left-[30%] w-[480px] h-[480px] rounded-full blur-[120px]"
          style={{ background: "hsl(38,92%,50%,0.03)" }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Floating manuscript pages — left & right edges only */}
        {floatingPages.map((page, i) => (
          <motion.div
            key={`page-${i}`}
            className="absolute border border-foreground/10 bg-foreground/[0.025] backdrop-blur-[1px] rounded-[2px] p-3 overflow-hidden"
            style={{ width: page.size[0], height: page.size[1], left: `${page.pos[0]}vw`, top: `${page.pos[1]}vh` }}
            animate={{ y: [0, -24, 0], x: [0, 10, 0], rotate: [page.rot, page.rot + 4, page.rot] }}
            transition={{ duration: page.dur, repeat: Infinity, ease: "easeInOut", delay: i * -2 }}
          >
            <p className="text-[7px] md:text-[8px] font-serif italic leading-relaxed text-foreground/50 whitespace-pre-wrap">
              {page.text}
            </p>
          </motion.div>
        ))}

        {/* Ink blob shapes */}
        {[
          { w: 140, h: 110, pos: [16, 24], br: "60% 40% 70% 30% / 50% 60% 40% 70%", c: "hsl(262,83%,58%,0.025)" },
          { w: 180, h: 160, pos: [74, 46], br: "40% 60% 30% 70% / 60% 50% 70% 40%", c: "hsl(189,94%,43%,0.025)" },
          { w: 110, h: 150, pos: [11, 74], br: "50% 50% 70% 30% / 30% 70% 40% 60%", c: "hsl(292,84%,72%,0.02)" },
        ].map((s, i) => (
          <div key={`stain-${i}`} className="absolute"
            style={{ width: s.w, height: s.h, left: `${s.pos[0]}vw`, top: `${s.pos[1]}vh`, borderRadius: s.br, background: s.c }} />
        ))}
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <header className="px-6 py-4 flex items-center justify-between z-20 border-b border-border/25 bg-background/60 backdrop-blur-md fixed top-0 w-full">
        <div className="flex items-center gap-2">
          <Feather className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">StoryStudio</span>
        </div>
        <nav className="flex items-center gap-3">
          <Link href="/sign-in"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-sign-in-nav">
            Sign In
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-md shadow-primary/20" data-testid="button-get-started-nav">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-10 px-6 max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sidebar/60 border border-border/30 text-muted-foreground text-xs font-medium mb-6 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>The premium creative writing workspace</span>
        </motion.div>

        {/* Static line */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-white mb-1"
        >
          Build Worlds.
        </motion.h1>

        {/* Rotating line — overflow-hidden clips it so it never bleeds */}
        <div className="h-14 md:h-20 w-full flex justify-center items-center overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentPhrase}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
              transition={{ duration: 0.4 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, hsl(189,94%,43%), hsl(262,83%,68%), hsl(292,84%,72%))" }}
            >
              {rotatingPhrases[currentPhrase]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed font-light"
        >
          Turn a simple idea into a complete book. Build characters, worlds, lore, timelines — all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }}
          className="flex flex-row gap-3 items-center mb-8"
        >
          <Link href="/sign-up">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-7 text-sm group shadow-lg shadow-primary/25" data-testid="button-get-started-hero">
              Start Writing <ChevronRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="h-12 px-7 text-sm border-border/50 bg-background/40 hover:bg-sidebar backdrop-blur-sm" data-testid="button-sign-in-hero">
              Sign In
            </Button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center gap-1 mb-10 text-muted-foreground/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>

        {/* Abstract art panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <AbstractArt />
        </motion.div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="py-14 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">How it works</h2>
            <p className="text-muted-foreground text-sm">Three steps from blank page to finished world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px border-t border-dashed border-border/40" />
            {[
              { num: "01", title: "Plant your idea", desc: "Name your project, pick a genre, write a single sentence about your story.", icon: BookOpen },
              { num: "02", title: "Build your universe", desc: "Flesh out characters, lore, kingdoms, and timelines — all linked together.", icon: Globe },
              { num: "03", title: "Write your story", desc: "Draft with all your world context available instantly, no tab-switching.", icon: PenTool },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.15 }}
                className="flex flex-col items-center text-center p-5 bg-card/50 border border-border/40 rounded-2xl relative"
              >
                <div className="w-10 h-10 rounded-full bg-sidebar border border-border flex items-center justify-center mb-3 text-primary relative">
                  <step.icon className="w-4 h-4" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center border-2 border-background">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-border/25 bg-sidebar/15 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">Everything a novelist needs</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              No scattered notes. No missed continuity. One workspace for your entire creative process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="p-5 rounded-2xl border border-border/50 bg-card/50 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${feat.color}08, transparent 60%)` }} />
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${feat.color}18`, borderColor: `${feat.color}30`, color: feat.color }}>
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2">{feat.title}</h3>
                  <div className="mb-3">{feat.preview}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border/30 pt-2.5">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-border/25 relative z-10">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, hsl(262,83%,58%,0.06), transparent 70%)" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
              Your next chapter begins here.
            </h2>
            <p className="text-muted-foreground mb-7 text-sm max-w-md mx-auto">
              StoryStudio is a workspace built for the way writers actually think — nonlinear, layered, and alive.
            </p>
            <div className="flex flex-row gap-3 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-primary hover:bg-primary/90 h-11 px-8 shadow-lg shadow-primary/20" data-testid="button-cta-start">
                  Start Writing
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="h-11 px-8 border-border/50 hover:bg-sidebar" data-testid="button-cta-signin">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-border/25 bg-sidebar/30 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Feather className="h-4 w-4" />
            <span className="text-sm font-medium">© {new Date().getFullYear()} StoryStudio</span>
          </div>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
