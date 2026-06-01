import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, PenTool, Eraser, FileSignature, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

const mockMessages = [
  { id: 1, role: "system", content: "I'm your AI Co-Writer. I've analyzed 'Dragon Academy' and I'm ready to help. What are we working on today?" },
  { id: 2, role: "user", content: "I'm struggling with the opening of chapter 1. Kira is arriving at the academy but it feels slow." },
  { id: 3, role: "system", content: "Let's start with action instead of observation. Instead of her looking at the gates, have her almost get trampled by a senior's dragon landing roughly in the courtyard. It establishes the danger of the academy immediately and gives her an immediate conflict." }
];

const quickActions = [
  { icon: PenTool, label: "Write Scene" },
  { icon: ArrowRight, label: "Continue" },
  { icon: Sparkles, label: "Improve" },
  { icon: FileSignature, label: "Brainstorm" },
  { icon: Eraser, label: "Rewrite" }
];

export function AIPanel() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), role: "user", content: input };
    setMessages([...messages, newMsg]);
    setInput("");
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: "system", 
        content: "That's a great direction. I can draft that scene for you if you'd like, focusing on the sensory details of the dragon's scales and the heat of the fire." 
      }]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-background border-r border-border text-foreground">
      <div className="h-14 border-b border-border flex items-center px-4 shrink-0 bg-sidebar">
        <Tabs defaultValue="cowriter" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card h-9">
            <TabsTrigger value="author" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Author</TabsTrigger>
            <TabsTrigger value="cowriter" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Co-Writer</TabsTrigger>
            <TabsTrigger value="editor" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Editor</TabsTrigger>
            <TabsTrigger value="doctor" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Doctor</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 shrink-0 border border-border mt-1">
                  {msg.role === "system" ? (
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-sidebar text-muted-foreground">AX</AvatarFallback>
                  )}
                </Avatar>
                <div className={`rounded-xl p-3 text-sm max-w-[85%] ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card border border-border text-card-foreground"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border bg-sidebar shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-none hide-scrollbar">
          {quickActions.map((action, idx) => (
            <Button key={idx} variant="outline" size="sm" className="h-7 text-xs bg-card border-border shrink-0 rounded-full text-muted-foreground hover:text-foreground">
              <action.icon className="h-3 w-3 mr-1" /> {action.label}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI co-writer..." 
            className="bg-card border-border h-10"
          />
          <Button size="icon" onClick={handleSend} className="h-10 w-10 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}