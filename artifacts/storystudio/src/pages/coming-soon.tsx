import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/contexts/auth";

export default function ComingSoon() {
  const { user } = useAuth();

  // Random abstract shapes
  const shapes = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    color: ["hsl(262,83%,68%)", "hsl(189,94%,43%)", "hsl(160,60%,55%)", "hsl(38,92%,50%)", "hsl(292,84%,72%)"][
      Math.floor(Math.random() * 5)
    ],
    shape: ["circle", "square", "polygon"][Math.floor(Math.random() * 3)],
  }));

  const getShapeStyle = (shape: string) => {
    if (shape === "circle") return "rounded-full";
    if (shape === "square") return "rounded-lg";
    return "rounded-3xl";
  };

  const getShapeRotation = (shape: string) => {
    if (shape === "polygon") return "rotate-45";
    return "";
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-6 z-50">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Feather className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">StoryStudio</span>
        </Link>
        <div className="text-sm text-muted-foreground">
          {user?.email}
        </div>
      </div>

      {/* Animated floating shapes background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute ${getShapeStyle(shape.shape)} ${getShapeRotation(shape.shape)} opacity-[0.08]`}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: shape.color,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger background glow layers */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.04] rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/[0.04] rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Animated title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            THE STORYSTUDIO
          </motion.h1>

          {/* Coming soon text */}
          <motion.p
            className="text-2xl md:text-3xl text-primary font-semibold"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            WILL BE HERE SOON
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Something extraordinary is being crafted. Check back soon to start building your epic worlds.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 1, duration: 1 }}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </motion.div>

        {/* Floating particles around text */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-primary rounded-full"
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 3) * 100, 0],
              y: [0, Math.sin((i * Math.PI * 2) / 3) * 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
