import { Castle, Map, Shield, Skull, Sword, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const categories = [
  { title: "Kingdoms", count: 4, icon: Castle, color: "text-amber-500", bg: "bg-amber-500/10" },
  { title: "Cities & Towns", count: 12, icon: Map, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Schools & Guilds", count: 3, icon: Shield, color: "text-primary", bg: "bg-primary/10" },
  { title: "Dungeons & Ruins", count: 7, icon: Skull, color: "text-red-500", bg: "bg-red-500/10" },
  { title: "Creatures", count: 24, icon: Sword, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "Natural Locations", count: 9, icon: TreePine, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export function WorldView() {
  return (
    <div className="h-full bg-background overflow-auto p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">World Atlas</h2>
          <p className="text-muted-foreground">Navigate the locations and inhabitants of your universe.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="bg-card border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/5 flex items-center p-6 gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cat.bg}`}>
                  <cat.icon className={`h-6 w-6 ${cat.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} entries</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Placeholder map area */}
        <div className="mt-8 rounded-xl border border-border bg-sidebar h-[400px] flex items-center justify-center flex-col gap-4 text-muted-foreground">
          <Map className="h-12 w-12 opacity-20" />
          <p>Interactive map visualization coming soon.</p>
        </div>
      </div>
    </div>
  );
}