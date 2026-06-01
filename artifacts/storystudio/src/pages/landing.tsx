import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Feather, ChevronRight, ChevronDown, PenTool, BookOpen,
  Globe, Clock, Sparkles, MessageSquare, Users, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/auth";

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

const videoPanels = [
  { left: 6, top: 10, width: 170, height: 120, rot: -8, x: 14, y: -8, dur: 18 },
  { left: 76, top: 12, width: 150, height: 110, rot: 6, x: -18, y: 12, dur: 22 },
  { left: 16, top: 68, width: 140, height: 120, rot: 10, x: 10, y: -10, dur: 20 },
  { left: 66, top: 74, width: 160, height: 100, rot: -12, x: -14, y: 10, dur: 24 },
];

const rotatingPhrases = [
  "Bring Worlds To Life.",
  "Create Legends.",
  "Craft Universes.",
  "Tell Stories That Last.",
];

/* ─── Main component ─────────────────────────────────────────────────── */
export default function Landing() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      setLocation("/dashboard");
    }
  }, [user, loading, setLocation]);

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rainOn, setRainOn] = useState(false);
  const [fireOn, setFireOn] = useState(false);
  const [ambientOn, setAmbientOn] = useState(true);
  const [rainPlaying, setRainPlaying] = useState(false);
  const [firePlaying, setFirePlaying] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [showAmbientPrompt, setShowAmbientPrompt] = useState(false);
  const [hasUserGesture, setHasUserGesture] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.6);
  const [reduceMotion, setReduceMotion] = useState(false);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const fireRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientFilterRef = useRef<BiquadFilterNode | null>(null);
  // Synth nodes for a generated soft ambient pad
  const synthActiveRef = useRef(false);
  const synthOsc1Ref = useRef<OscillatorNode | null>(null);
  const synthOsc2Ref = useRef<OscillatorNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const synthFilterRef = useRef<BiquadFilterNode | null>(null);
  const synthNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const synthNoiseGainRef = useRef<GainNode | null>(null);
  const [rainError, setRainError] = useState<string | null>(null);
  const [fireError, setFireError] = useState<string | null>(null);
  const [ambientError, setAmbientError] = useState<string | null>(null);
  const [rainReady, setRainReady] = useState(false);
  const [fireReady, setFireReady] = useState(false);
  const [ambientReady, setAmbientReady] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // detect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduceMotion(mql.matches);
      const cb = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      if (mql.addEventListener) mql.addEventListener("change", cb);
      else mql.addListener(cb);
    }

    // create audio elements once
    if (typeof window !== "undefined") {
      if (!rainRef.current) {
        const a = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
        a.loop = true; a.volume = 0.6; a.preload = 'metadata';
        a.addEventListener('canplaythrough', () => setRainReady(true));
        a.addEventListener('error', (ev) => setRainError(String((ev as any)?.message || 'failed to load')));
        rainRef.current = a;
      }
      if (!fireRef.current) {
        const a = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3");
        a.loop = true; a.volume = 0.5; a.preload = 'metadata';
        a.addEventListener('canplaythrough', () => setFireReady(true));
        a.addEventListener('error', (ev) => setFireError(String((ev as any)?.message || 'failed to load')));
        fireRef.current = a;
      }
      if (!ambientRef.current) {
        const a = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3");
        a.loop = true; a.volume = 0.45; a.preload = 'metadata';
        a.addEventListener('canplaythrough', () => setAmbientReady(true));
        a.addEventListener('error', (ev) => setAmbientError(String((ev as any)?.message || 'failed to load')));
        ambientRef.current = a;
      }
    }
    return () => {
      // pause and release on unmount
      try { rainRef.current?.pause(); fireRef.current?.pause(); ambientRef.current?.pause(); } catch (e) {}
    };
  }, []);

  const unlockAmbient = () => {
    const el = ambientRef.current;
    if (!el) return false;
    el.volume = 1; // use WebAudio gain for final volume
    try {
      // ensure AudioContext is created and connected to soften the audio
      if (!audioCtxRef.current) {
        try {
          const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
          audioCtxRef.current = new Ctx();
        } catch (e) {
          audioCtxRef.current = null;
        }
      }
      if (audioCtxRef.current && !ambientSourceRef.current) {
        try {
          ambientSourceRef.current = audioCtxRef.current.createMediaElementSource(el);
          ambientGainRef.current = audioCtxRef.current.createGain();
          ambientFilterRef.current = audioCtxRef.current.createBiquadFilter();
          // gentle lowpass to make tracks feel softer
          ambientFilterRef.current.type = 'lowpass';
          ambientFilterRef.current.frequency.value = 700; // lower cutoff for a mellower tone
          ambientFilterRef.current.Q.value = 1;
          // much lower gain for soft background music
          ambientGainRef.current.gain.value = Math.max(0, Math.min(1, masterVolume * 0.25));
          ambientSourceRef.current.connect(ambientFilterRef.current);
          ambientFilterRef.current.connect(ambientGainRef.current);
          ambientGainRef.current.connect(audioCtxRef.current.destination);
        } catch (e) {
          // fall back to element playback if WebAudio fails
          ambientSourceRef.current = null;
        }
      }
      // ensure the AudioContext is running (user gesture should allow resume)
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }

      // start a generated soft ambient synth to ensure a mellow default sound
      if (audioCtxRef.current) startAmbientSynth();

      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise
          .then(() => {
            setAmbientPlaying(true);
            setShowAmbientPrompt(false);
          })
          .catch((err) => {
            setAmbientPlaying(false);
            setAmbientError(String((err as any)?.message || 'Playback blocked'));
            setShowAmbientPrompt(true);
          });
      } else {
        setAmbientPlaying(true);
        setShowAmbientPrompt(false);
      }
      return true;
    } catch (e) {
      setAmbientPlaying(false);
      setAmbientError(String((e as any)?.message || 'Playback failed'));
      setShowAmbientPrompt(true);
      return false;
    }
  };

  const startAmbientSynth = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || synthActiveRef.current) return;
    try {
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 110;
      osc1.detune.value = -5;

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = 220;
      osc2.detune.value = 7;

      const gain = ctx.createGain();
      gain.gain.value = 0.0001;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 700;
      filter.Q.value = 1;

      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.12;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.01;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);

      noise.connect(noiseGain);
      noiseGain.connect(filter);

      osc1.start();
      osc2.start();
      noise.start();

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, masterVolume * 0.12), now + 4);

      synthOsc1Ref.current = osc1;
      synthOsc2Ref.current = osc2;
      synthGainRef.current = gain;
      synthFilterRef.current = filter;
      synthNoiseRef.current = noise;
      synthNoiseGainRef.current = noiseGain;
      synthActiveRef.current = true;
    } catch (e) {
      // ignore synth failures
    }
  };

  const stopAmbientSynth = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !synthActiveRef.current) return;
    try {
      const gain = synthGainRef.current;
      const now = ctx.currentTime;
      if (gain) {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value || 0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      }
      setTimeout(() => {
        try { synthOsc1Ref.current?.stop(); } catch (e) {}
        try { synthOsc2Ref.current?.stop(); } catch (e) {}
        try { synthNoiseRef.current?.stop(); } catch (e) {}
        synthOsc1Ref.current = null;
        synthOsc2Ref.current = null;
        synthNoiseRef.current = null;
        synthGainRef.current = null;
        synthFilterRef.current = null;
        synthNoiseGainRef.current = null;
        synthActiveRef.current = false;
      }, 1400);
    } catch (e) {
      synthActiveRef.current = false;
    }
  };

  const handleEnableAmbient = () => {
    setHasUserGesture(true);
    setShowAmbientPrompt(false);
    unlockAmbient();
  };

  // On first user interaction, mark that the browser can now unlock audio.
  useEffect(() => {
    const onFirstInteraction = () => {
      setHasUserGesture(true);
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
    window.addEventListener('pointerdown', onFirstInteraction, { once: true });
    return () => window.removeEventListener('pointerdown', onFirstInteraction);
  }, []);

  // play/pause handlers for each track when toggled
  useEffect(() => {
    const setTrack = async (ref: React.RefObject<HTMLAudioElement | null>, on: boolean, baseVol: number, setPlaying: (v: boolean) => void) => {
      const el = ref.current;
      if (!el) return;
      el.volume = Math.max(0, Math.min(1, masterVolume * baseVol));
      if (on) {
        try {
          await el.play();
          setPlaying(true);
        } catch (e) {
          setPlaying(false);
        }
      } else {
        try { el.pause(); } catch (e) {}
        try { el.currentTime = 0; } catch (e) {}
        setPlaying(false);
      }
    };

    if (!hasUserGesture) {
      // Do not auto-play before any user gesture; keep audio primed but paused.
      [rainRef, fireRef, ambientRef].forEach((ref) => {
        const el = ref.current;
        if (!el) return;
        try { el.pause(); } catch (e) {}
      });
      setRainPlaying(false);
      setFirePlaying(false);
      setAmbientPlaying(false);
      return;
    }

    setTrack(rainRef, rainOn, 0.9, setRainPlaying);
    setTrack(fireRef, fireOn, 0.8, setFirePlaying);
    setTrack(ambientRef, ambientOn, 0.85, setAmbientPlaying);
  }, [rainOn, fireOn, ambientOn, masterVolume, hasUserGesture]);

  // handlers that run synchronously inside user events to satisfy autoplay policies
  const handleToggleRain = (on: boolean) => {
    setRainOn(on);
    const el = rainRef.current;
    if (!el) return;
    el.volume = Math.max(0, Math.min(1, masterVolume * 0.9));
    if (on) {
      try { el.play(); setRainPlaying(true); } catch (e) { setRainPlaying(false); }
    } else {
      try { el.pause(); el.currentTime = 0; } catch (e) {}
      setRainPlaying(false);
    }
  };

  const handleToggleFire = (on: boolean) => {
    setFireOn(on);
    const el = fireRef.current;
    if (!el) return;
    el.volume = Math.max(0, Math.min(1, masterVolume * 0.8));
    if (on) {
      try { el.play(); setFirePlaying(true); } catch (e) { setFirePlaying(false); }
    } else {
      try { el.pause(); el.currentTime = 0; } catch (e) {}
      setFirePlaying(false);
    }
  };

  const handleToggleAmbient = (on: boolean) => {
    setAmbientOn(on);
    if (on) {
      // start synth or try to play element
      if (audioCtxRef.current) {
        startAmbientSynth();
        setAmbientPlaying(true);
      } else {
        const el = ambientRef.current;
        if (!el) return;
        el.volume = Math.max(0, Math.min(1, masterVolume * 0.85));
        try { el.play(); setAmbientPlaying(true); } catch (e) { setAmbientPlaying(false); }
      }
    } else {
      // stop synth and pause element fallback
      stopAmbientSynth();
      const el = ambientRef.current;
      if (el) {
        try { el.pause(); el.currentTime = 0; } catch (e) {}
      }
      setAmbientPlaying(false);
    }
  };

  const toggleMenu = () => {
    const newOpen = !menuOpen;
    setMenuOpen(newOpen);
    if (newOpen) {
      // treat this click as a user gesture to unlock playback where allowed
      const tryPlaySync = (ref: React.RefObject<HTMLAudioElement | null>, on: boolean) => {
        const el = ref.current;
        if (!el) return;
        // call play synchronously and swallow promise rejection
        // keep element paused if the track is not toggled on
        const p = el.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
        if (!on) {
          try { el.pause(); el.currentTime = 0; } catch (e) {}
        }
      };
      tryPlaySync(rainRef, rainOn);
      tryPlaySync(fireRef, fireOn);
      tryPlaySync(ambientRef, ambientOn);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative">

      {/* ── Fixed background layer ────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Strong animated video-like panels (reduced when performance mode enabled) */}
        {videoPanels.map((panel, i) => (
          reduceMotion ? (
            <div
              key={`video-panel-${i}`}
              className="absolute rounded-[1rem] border border-white/6 shadow-md overflow-hidden"
              style={{
                width: panel.width * 0.9,
                height: panel.height * 0.9,
                left: `${panel.left}vw`,
                top: `${panel.top}vh`,
                transform: `rotate(${panel.rot}deg)`,
                background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
              }}
            />
          ) : (
            <motion.div
              key={`video-panel-${i}`}
              className="absolute rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/20 overflow-hidden"
              style={{
                width: panel.width,
                height: panel.height,
                left: `${panel.left}vw`,
                top: `${panel.top}vh`,
                transform: `rotate(${panel.rot}deg)`,
                background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.01)), radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), transparent 30%)",
              }}
              animate={{ x: [0, panel.x, 0], y: [0, panel.y, 0], opacity: [0.12, 0.36, 0.12], rotate: [panel.rot, panel.rot + 2, panel.rot] }}
              transition={{ duration: panel.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            >
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.16), transparent 40%, rgba(255,255,255,0.06) 100%)" }}
                animate={{ y: [0, 6, 0], opacity: [0.18, 0.42, 0.18] }}
                transition={{ duration: panel.dur / 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Cinematic muted YouTube iframe to give a moving-video feel */}
                <iframe
                  title={`cinematic-${i}`}
                  src={`https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1&controls=0&loop=1&playlist=aqz-KE-bpKQ&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  style={{ pointerEvents: "none", opacity: 0.18, transform: "translateZ(0)" }}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )
        ))}
        {/* Water-like animated background (static fallback in performance mode) */}
        {reduceMotion ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(15,23,42,0.86))",
              opacity: 0.96,
            }}
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(15,23,42,0.78))," +
                "radial-gradient(circle at 22% 24%, rgba(59,130,246,0.24), transparent 18%)," +
                "radial-gradient(circle at 72% 18%, rgba(168,85,247,0.22), transparent 20%)," +
                "radial-gradient(circle at 50% 70%, rgba(16,185,129,0.18), transparent 18%)," +
                "radial-gradient(circle at 44% 42%, rgba(249,115,22,0.14), transparent 24%)",
              backgroundSize: "260% 260%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 18%", "20% 78%", "0% 0%"], opacity: [0.92, 1, 0.95, 0.92] }}
            transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Coloured glows */}
        {/* Coloured glows - use lighter/static variants in performance mode */}
        {reduceMotion ? (
          <>
            <div className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-[36px]" style={{ background: "hsl(262,83%,58%,0.045)" }} />
            <div className="absolute top-[10%] left-[4%] w-[220px] h-[220px] rounded-full blur-[30px]" style={{ background: "hsl(189,94%,43%,0.04)" }} />
            <div className="absolute top-[30%] right-[3%] w-[200px] h-[200px] rounded-full blur-[28px]" style={{ background: "hsl(292,84%,72%,0.04)" }} />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[40px]"
              style={{ background: "hsl(262,83%,58%,0.05)" }}
              animate={{ scale: [1, 1.02, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-[10%] left-[4%] w-[380px] h-[380px] rounded-full blur-[36px]"
              style={{ background: "hsl(189,94%,43%,0.04)" }}
              animate={{ scale: [1, 0.98, 1], opacity: [0.04, 0.07, 0.04] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-[30%] right-[3%] w-[320px] h-[320px] rounded-full blur-[32px]"
              style={{ background: "hsl(292,84%,72%,0.04)" }}
              animate={{ scale: [1, 1.01, 1], opacity: [0.04, 0.06, 0.04] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[10%] left-[30%] w-[480px] h-[480px] rounded-full blur-[40px]"
              style={{ background: "hsl(38,92%,50%,0.03)" }}
              animate={{ scale: [1, 0.99, 1], opacity: [0.03, 0.05, 0.03] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Floating manuscript pages — simplified in performance mode */}
        {reduceMotion ? (
          <div className="absolute border border-foreground/8 bg-foreground/[0.02] rounded-[2px] p-3 overflow-hidden" style={{ width: floatingPages[0].size[0], height: floatingPages[0].size[1], left: `${floatingPages[0].pos[0]}vw`, top: `${floatingPages[0].pos[1]}vh` }}>
            <p className="text-[7px] md:text-[8px] font-serif italic leading-relaxed text-foreground/50 whitespace-pre-wrap">
              {floatingPages[0].text}
            </p>
          </div>
        ) : (
          floatingPages.map((page, i) => (
            <motion.div
              key={`page-${i}`}
              className="absolute border border-foreground/10 bg-foreground/[0.025] backdrop-blur-sm rounded-[2px] p-3 overflow-hidden"
              style={{ width: page.size[0], height: page.size[1], left: `${page.pos[0]}vw`, top: `${page.pos[1]}vh` }}
              animate={{ y: [0, -24, 0], x: [0, 10, 0], rotate: [page.rot, page.rot + 4, page.rot] }}
              transition={{ duration: page.dur, repeat: Infinity, ease: "easeInOut", delay: i * -2 }}
            >
              <p className="text-[7px] md:text-[8px] font-serif italic leading-relaxed text-foreground/50 whitespace-pre-wrap">
                {page.text}
              </p>
            </motion.div>
          ))
        )}

        {/* Liquid color ribbons (static fallback in performance mode) */}
        {reduceMotion ? (
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(168,85,247,0.18))", opacity: 0.2, mixBlendMode: "screen" }} />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(59,130,246,0.30), rgba(168,85,247,0.24), rgba(16,185,129,0.22), rgba(249,115,22,0.16))",
              backgroundSize: "240% 240%",
              mixBlendMode: "screen",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 22%", "10% 78%", "0% 0%"], opacity: [0.22, 0.34, 0.22] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Additional large ribbons - simplified in performance mode */}
        {reduceMotion ? (
          <>
            <div className="absolute top-[8%] left-[-10%] w-[110vw] h-[22vh] rounded-full blur-[36px]" style={{ background: "linear-gradient(110deg, rgba(16,185,129,0.18), rgba(59,130,246,0.14))", mixBlendMode: "screen" }} />
            <div className="absolute right-[-10%] top-[34%] w-[95vw] h-[20vh] rounded-full blur-[30px]" style={{ background: "linear-gradient(140deg, rgba(249,115,22,0.18), rgba(123,63,248,0.14))", mixBlendMode: "screen" }} />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-[8%] left-[-15%] w-[135vw] h-[28vh] rounded-full blur-[36px]"
              style={{ background: "linear-gradient(110deg, rgba(16,185,129,0.26), rgba(59,130,246,0.22), rgba(168,85,247,0.20))", mixBlendMode: "screen" }}
              animate={{ x: [0, 26, 0], y: [0, -8, 0], opacity: [0.14, 0.3, 0.14], scale: [1, 1.025, 1] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-15%] top-[34%] w-[125vw] h-[24vh] rounded-full blur-[32px]"
              style={{ background: "linear-gradient(140deg, rgba(249,115,22,0.22), rgba(123,63,248,0.18), rgba(189,94,43,0.16))", mixBlendMode: "screen" }}
              animate={{ x: [0, -28, 0], y: [0, 10, 0], opacity: [0.12, 0.26, 0.12], scale: [1, 1.02, 1] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
            <motion.div
              className="absolute left-[4%] top-[60%] w-[90vw] h-[22vh] rounded-full blur-[40px]"
              style={{ background: "linear-gradient(150deg, rgba(123,63,248,0.18), rgba(59,130,246,0.16), rgba(249,115,22,0.14))", mixBlendMode: "screen" }}
              animate={{ x: [0, 14, 0], y: [0, 6, 0], opacity: [0.1, 0.22, 0.1], scale: [1, 1.02, 1] }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            />
          </>
        )}

        {/* Abstract fluid shapes */}
        {[
          { w: 170, h: 140, left: 6, top: 16, br1: "45% 55% 60% 40% / 55% 45% 50% 50%", br2: "55% 45% 40% 60% / 45% 55% 50% 50%", c1: "rgba(59,130,246,0.18)", c2: "rgba(168,85,247,0.18)", dur: 22 },
          { w: 140, h: 120, left: 78, top: 7, br1: "40% 60% 35% 65% / 55% 45% 60% 40%", br2: "50% 50% 45% 55% / 40% 60% 50% 50%", c1: "rgba(168,85,247,0.18)", c2: "rgba(249,115,22,0.18)", dur: 24 },
          { w: 120, h: 150, left: 10, top: 70, br1: "55% 45% 50% 50% / 65% 35% 45% 55%", br2: "45% 55% 55% 45% / 50% 50% 40% 60%", c1: "rgba(16,185,129,0.18)", c2: "rgba(59,130,246,0.18)", dur: 26 },
          { w: 160, h: 110, left: 54, top: 88, br1: "50% 50% 55% 45% / 50% 60% 40% 50%", br2: "45% 55% 50% 50% / 55% 45% 50% 50%", c1: "rgba(249,115,22,0.16)", c2: "rgba(168,85,247,0.16)", dur: 24 },
          { w: 100, h: 100, left: 88, top: 68, br1: "60% 40% 45% 55% / 50% 50% 45% 55%", br2: "45% 55% 55% 45% / 60% 40% 50% 50%", c1: "rgba(123,63,248,0.14)", c2: "rgba(16,185,129,0.14)", dur: 28 },
        ].map((shape, i) => (
          reduceMotion ? (
            <div
              key={`fluid-${i}`}
              className="absolute"
              style={{
                width: shape.w * 0.9,
                height: shape.h * 0.9,
                left: `${shape.left}vw`,
                top: `${shape.top}vh`,
                borderRadius: shape.br1,
                backgroundColor: shape.c1,
                filter: "blur(1px)",
              }}
            />
          ) : (
            <motion.div
              key={`fluid-${i}`}
              className="absolute"
              style={{
                width: shape.w,
                height: shape.h,
                left: `${shape.left}vw`,
                top: `${shape.top}vh`,
                borderRadius: shape.br1,
                backgroundColor: shape.c1,
                filter: "blur(1px)",
              }}
              animate={{
                x: [0, 12, 0],
                y: [0, -14, 0],
                opacity: [0.12, 0.26, 0.12],
                backgroundColor: [shape.c1, shape.c2, shape.c1],
                borderRadius: [shape.br1, shape.br2, shape.br1],
              }}
              transition={{ duration: shape.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
            />
          )
        ))}
      </div>

      {ambientOn && showAmbientPrompt && !ambientPlaying && (
        <div className="fixed top-20 inset-x-0 bottom-0 z-40 flex items-start justify-center bg-slate-950/20 backdrop-blur-sm px-6 py-8">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-center shadow-2xl shadow-black/40">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Premium Launch</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready when you are</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tap to start soft ambient music now. The gear menu in the top left gives you full control over rain, fire, and soundscape options.
            </p>
            <button
              type="button"
              onClick={handleEnableAmbient}
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-background shadow-xl shadow-primary/25 hover:bg-primary/90 transition"
            >
              Enable soft music
            </button>
            {ambientError ? (
              <p className="mt-3 text-sm text-rose-300">{ambientError}</p>
            ) : null}
            <div className="mt-4 text-xs text-muted-foreground">Soft music is the default experience; change it anytime from the gear menu.</div>
          </div>
        </div>
      )}

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="px-6 py-4 flex items-center justify-between z-20 border-b border-border/25 bg-background/60 backdrop-blur-sm fixed top-0 w-full"
      >
        <div className="flex items-center gap-2">
          <Feather className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">StoryStudio</span>
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Open audio settings"
            className="ml-3 relative rounded-full bg-gradient-to-br from-white/6 to-white/3 px-2 py-2 text-foreground shadow-md shadow-slate-900/20 hover:scale-105 transition-transform"
          >
            <Settings className="h-4 w-4 text-white/90" />
            {/* subtle status dot indicating ambient is enabled/ready */}
            {ambientOn && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse" />
            )}
          </button>
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
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 z-30 w-[min(92vw,420px)] -translate-x-1/2 rounded-[2rem] border border-white/15 bg-slate-950/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">Audio Settings</p>
                <p className="text-sm text-muted-foreground">Tap the gear again to close. Use these controls after soft music is enabled.</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-white transition"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-border/50 bg-background/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Soft music</p>
                    <p className="text-xs text-muted-foreground">Default ambient soundtrack.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleAmbient(!ambientOn)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${ambientOn ? 'bg-primary text-background' : 'bg-white/10 text-muted-foreground hover:bg-white/20'}`}
                  >
                    {ambientOn ? 'On' : 'Off'}
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">{ambientPlaying ? 'Playing softly.' : 'Tap the button above to start soft music.'}</p>
              </div>

              <div className="rounded-3xl border border-border/50 bg-background/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Rain ambience</p>
                    <p className="text-xs text-muted-foreground">Add a gentle rain layer.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleRain(!rainOn)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${rainOn ? 'bg-primary text-background' : 'bg-white/10 text-muted-foreground hover:bg-white/20'}`}
                  >
                    {rainOn ? 'On' : 'Off'}
                  </button>
                </div>
                {rainError ? <p className="mt-3 text-[11px] text-rose-300">{rainError}</p> : null}
              </div>

              <div className="rounded-3xl border border-border/50 bg-background/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Fire ambience</p>
                    <p className="text-xs text-muted-foreground">Warm crackling fire sound.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleFire(!fireOn)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${fireOn ? 'bg-primary text-background' : 'bg-white/10 text-muted-foreground hover:bg-white/20'}`}
                  >
                    {fireOn ? 'On' : 'Off'}
                  </button>
                </div>
                {fireError ? <p className="mt-3 text-[11px] text-rose-300">{fireError}</p> : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-36 md:pt-40 pb-6 px-6 max-w-5xl mx-auto w-full min-h-[calc(100vh-14rem)] md:min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sidebar/60 border border-border/30 text-muted-foreground text-xs font-medium mb-6 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>The premium creative writing workspace</span>
        </motion.div>

        {/* Static line */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight text-white mb-3"
        >
          Build Worlds.
        </motion.h1>


      
        <div className="h-[9.75rem] md:h-[10.75rem] w-full flex justify-center items-center overflow-visible mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentPhrase}
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
              transition={{ duration: 0.45 }}
              className="text-5xl md:text-[6.25rem] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, hsl(189,94%,43%), hsl(262,83%,68%), hsl(292,84%,72%))" }}
            >
              {rotatingPhrases[currentPhrase]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 leading-relaxed font-light"
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
          className="flex flex-col items-center gap-1 mb-4 text-muted-foreground/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
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
