import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Feather, Mail, Lock } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function SignIn() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard on mock submit
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-sidebar p-12 border-r border-border relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16 inline-flex">
            <Feather className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">StoryStudio</span>
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Welcome back.</h1>
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              Your characters are waiting. Pick up right where you left off.
            </p>
          </motion.div>
        </div>
        
        {/* Abstract decor */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 absolute top-6 left-6">
          <Feather className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">StoryStudio</span>
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