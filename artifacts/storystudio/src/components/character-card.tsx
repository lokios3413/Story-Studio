import { Users, Info, Shield, Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CharacterCardProps {
  name: string;
  age: number;
  role: string;
  appearance: string;
  personality: string;
  goals: string;
  fears: string;
  secrets: string;
}

export function CharacterCard({
  name, age, role, appearance, personality, goals, fears, secrets
}: CharacterCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors flex flex-col">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">Age: {age}</div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{role}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 flex-1 space-y-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <Eye className="h-3.5 w-3.5" /> Appearance
            </div>
            <p>{appearance}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <Heart className="h-3.5 w-3.5" /> Personality
            </div>
            <p>{personality}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <Shield className="h-3.5 w-3.5" /> Goals
            </div>
            <p>{goals}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <Info className="h-3.5 w-3.5" /> Fears & Secrets
            </div>
            <p>{fears} / {secrets}</p>
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-border/50">
          <Button variant="outline" className="w-full border-border bg-sidebar hover:bg-sidebar/80 text-foreground">
            Edit Character
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}