import { motion } from "framer-motion";
import { BookOpen, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const loreSections = [
  { id: 1, title: "History: The First Dragon War", excerpt: "500 years ago, the skies burned. Humanity was almost driven to extinction before the First Pact was formed..." },
  { id: 2, title: "Magic System: Aether Linking", excerpt: "Riders don't command dragons; they link with them. A pure bond requires giving up a piece of one's own soul..." },
  { id: 3, title: "Politics: The High Council", excerpt: "Seven noble houses rule the continent, each claiming descent from the original seven dragon riders." },
  { id: 4, title: "Factions: The Ashborn", excerpt: "A rebel group operating in the dead zones, believing dragons should be wild, not ridden." },
  { id: 5, title: "Rules: Academy Laws", excerpt: "Rule 1: Never approach a dragon uninvited. Rule 2: Magic is forbidden outside the dueling rings." }
];

export function LoreView() {
  return (
    <div className="h-full bg-background overflow-auto p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">World Lore</h2>
            <p className="text-muted-foreground">The foundational rules and history of your universe.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <BookOpen className="mr-2 h-4 w-4" /> Add Entry
          </Button>
        </div>

        <div className="grid gap-4">
          {loreSections.map((section, idx) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="py-4 cursor-pointer flex flex-row items-center justify-between">
                  <CardTitle className="text-lg text-foreground">{section.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-primary">
                      <Sparkles className="h-3.5 w-3.5 mr-1" /> Expand
                    </Button>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground pb-4 pt-0">
                  {section.excerpt}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}