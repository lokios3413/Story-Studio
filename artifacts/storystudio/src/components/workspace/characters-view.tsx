import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/character-card";
import { motion } from "framer-motion";

const mockCharacters = [
  {
    name: "Kira Ashborn",
    age: 19,
    role: "Protagonist",
    appearance: "Ash-blonde hair, scarred hands, worn leather clothing.",
    personality: "Determined, reckless, secretly desperate for approval.",
    goals: "Prove commoners can bond with dragons.",
    fears: "Being sent back to the dead zones.",
    secrets: "She has an illegal aether link with a wild drake."
  },
  {
    name: "Lord Varek",
    age: 52,
    role: "Antagonist",
    appearance: "Immaculate academy uniform, sharp features, always carries a silver cane.",
    personality: "Cold, calculating, strictly adheres to tradition.",
    goals: "Maintain the purity of the noble riding houses.",
    fears: "Losing control of the academy.",
    secrets: "His own dragon bond is failing."
  },
  {
    name: "Mira Dawnwhisper",
    age: 24,
    role: "Mentor",
    appearance: "Tall, athletic, wears the teal cloak of a senior instructor.",
    personality: "Patient but demanding, sees through lies instantly.",
    goals: "Find the next generation of true riders.",
    fears: "Another war is coming.",
    secrets: "She fought in the border skirmishes and deserted."
  }
];

export function CharactersView() {
  return (
    <div className="h-full bg-background overflow-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Cast of Characters</h2>
            <p className="text-muted-foreground">Manage your protagonists, antagonists, and supporting cast.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Add Character
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockCharacters.map((char, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <CharacterCard {...char} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}