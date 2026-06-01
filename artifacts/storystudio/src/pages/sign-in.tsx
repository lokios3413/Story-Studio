import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Feather, Mail, Lock, ArrowLeft } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const floatingPages = [
  { text: "Chapter 3: The Gathering Storm\n\nThe wind howled through the narrow streets of Oakhaven, rattling the shutters...", size: [180, 240], pos: [15, 10], rot: -8, dur: 32 },
  { text: "[LORE] The Sundering — Year 1024\nWhen the Archmage split the veil between realms, three kingdoms fell overnight...", size: [200, 260], pos: [65, 15], rot: 12, dur: 38 },
  { text: "CHARACTER: Elaria Vance\nAge: 19 | Role: Protagonist\nFears: Becoming her mother\nGoal: Master the Silver Flame", size: [160, 210], pos: [5, 45], rot: -15, dur: 28 },
  { text: "Chapter 7: Convergence\n\n'You've always known,' the old mage said without turning. 'You just weren't ready to believe it yet.'", size: [210, 280], pos: [55, 55], rot: -10, dur: 42 },
  { text: "Story Beats — Act 2\n∙ Elaria discovers the vault\n∙ Confrontation with Velan\n∙ The betrayal at Silver Keep", size: [170, 230], pos: [25, 70], rot: 6, dur: 35 },
];

export default function SignIn() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Panel - Living Manuscript Atmosphere */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-sidebar p-12 border-r border-border relative overflow-hidden">
        
        {/* Background Atmosphere Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px]"></div>
          
          {/* Subtle parchment noise */}
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, hsl(var(--primary)) 1px, transparent 1px), radial-gradient(circle at 80% 70%, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
          ></div>

          {/* Layer 1: Dense Floating Pages */}
          {floatingPages.map((page, i) => (
            <motion.div
              key={`page-${i}`}
              className="absolute border border-foreground/10 bg-foreground/[0.05] backdrop-blur-[2px] rounded-[3px] shadow-md flex flex-col p-5 overflow-hidden z-10"
              style={{ 
                width: page.size[0], 
                height: page.size[1],
                left: `${page.pos[0]}%`,
                top: `${page.pos[1]}%`,
                opacity: 0.12
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [page.rot, page.rot + 3, page.rot],
              }}
              transition={{
                duration: page.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * -3
              }}
            >
              <p className="text-[10px] font-serif italic leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {page.text}
              </p>
            </motion.div>
          ))}

          {/* Layer 2: Floating quote fragments */}
          <motion.div className="absolute top-[20%] right-[10%] font-serif text-sm text-foreground/20 italic z-10 w-64" animate={{ x: [0, -10, 0], y: [0, 15, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}>
            "She had mapped seventeen kingdoms and named a thousand stars, but had never once thought to map her own heart."
          </motion.div>
          <motion.div className="absolute top-[60%] left-[10%] font-serif text-sm text-foreground/20 italic z-10 w-64" animate={{ x: [0, 15, 0], y: [0, -10, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            "The contract was written in ash and signed in firelight."
          </motion.div>
          <motion.div className="absolute top-[80%] right-[20%] font-serif text-sm text-foreground/20 italic z-10 w-64" animate={{ x: [0, -5, 0], y: [0, -15, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}>
            "Every good villain believes they are the hero."
          </motion.div>

          {/* Layer 3: Ink blob decorations */}
          <div className="absolute bg-primary/[0.06] w-[250px] h-[200px] top-[-5%] right-[-5%] z-0" style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%" }}></div>
          <div className="absolute bg-primary/[0.05] w-[300px] h-[250px] bottom-[-10%] left-[-10%] z-0" style={{ borderRadius: "40% 60% 30% 70% / 60% 50% 70% 40%" }}></div>

          {/* Layer 4: Character Note Cards */}
          <motion.div 
            className="absolute bottom-[10%] left-[20%] w-[200px] bg-card border border-border/40 rounded-sm p-4 shadow-xl z-20"
            animate={{ y: [0, -10, 0], rotate: [-4, -2, -4] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-[10px] font-bold font-sans uppercase mb-1 text-foreground/80">Elaria Vance</div>
            <div className="text-[9px] text-muted-foreground font-sans mb-3">Protagonist</div>
            <div className="text-[11px] font-serif italic text-foreground/90 leading-relaxed">
              Trauma from mother's betrayal drives risk-taking behavior.
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-[20%] right-[15%] w-[180px] bg-card border border-border/40 rounded-sm p-4 shadow-xl z-20"
            animate={{ y: [0, 15, 0], rotate: [6, 8, 6] }}
            transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="text-[10px] font-bold font-sans uppercase mb-1 text-foreground/80">Lord Veran</div>
            <div className="text-[9px] text-muted-foreground font-sans mb-3">Antagonist</div>
            <div className="text-[11px] font-serif italic text-foreground/90 leading-relaxed">
              Believes order &gt; freedom. Convinced he's saving the world.
            </div>
          </motion.div>
        </div>

        {/* Layer 5: Brand Content (Foreground) */}
        <div className="relative z-30">
          <Link href="/" className="flex items-center gap-2 mb-16 inline-flex">
            <Feather className="h-8 w-8 text-primary drop-shadow-md" />
            <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">StoryStudio</span>
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg tracking-tight">Welcome back.</h1>
            <p className="text-xl text-foreground/90 max-w-md leading-relaxed drop-shadow-md font-medium">
              Your characters are waiting. Pick up right where you left off.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 absolute top-6 left-6">
          <Feather className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">StoryStudio</span>
        </Link>
        
        {/* Back to Home Button - Always Visible */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="absolute top-6 left-6 text-muted-foreground hover:text-foreground group z-10 hidden lg:flex items-center gap-2"
            tabIndex={0}
            aria-label="Back to Home"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>
        
        <Link href="/">
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground group z-10 lg:hidden"
            tabIndex={0}
            aria-label="Back to Home"
            data-testid="button-back-home-mobile"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Sign In</h2>
            <p className="text-muted-foreground">Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="elena@example.com" 
                  className="pl-10 bg-card border-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline" data-testid="link-forgot-password">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 bg-card border-border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 h-11" data-testid="button-sign-in">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full h-11 bg-transparent border-border hover:bg-muted" data-testid="button-google-signin">
            <SiGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline font-medium" data-testid="link-to-signup">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
