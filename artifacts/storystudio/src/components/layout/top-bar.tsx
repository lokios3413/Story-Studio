import { Feather, Search, Bell } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">StoryStudio</span>
        </Link>
        <div className="hidden md:flex relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search books, lore, characters..." 
            className="pl-9 bg-card border-border h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <Avatar className="h-8 w-8 border border-border">
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">AX</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}