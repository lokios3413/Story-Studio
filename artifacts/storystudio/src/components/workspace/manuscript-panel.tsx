import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, Type } from "lucide-react";

export function ManuscriptPanel() {
  const [content, setContent] = useState(
    "The iron gates of Valerius Academy loomed over Kira, their wrought-iron bars twisted into the shapes of battling dragons. Ash from the nearby peak drifted down like gray snow, settling on her worn leather satchel. She was the first commoner to receive an invitation in three centuries.\n\n\"Move!\" a voice shouted from above.\n\nKira barely had time to look up before a massive shadow blotted out the sun. A crimson-scaled drake crashed into the courtyard not ten feet from where she stood, its talons tearing chunks from the ancient cobblestones. A gust of heat washed over her, smelling of sulfur and ozone.\n\nA rider slipped smoothly from the saddle, his pristine academy uniform stark against the dragon's scales. He didn't even look at Kira as he tossed his reigns to a stable hand.\n\nWelcome to dragon riding school, she thought, brushing ash from her shoulder."
  );

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [content]);

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <div className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0 bg-background sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Select defaultValue="ch1">
            <SelectTrigger className="w-[200px] bg-transparent border-transparent hover:bg-card shadow-none text-base font-semibold focus:ring-0 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="ch1">Chapter 1: The Arrival</SelectItem>
              <SelectItem value="ch2">Chapter 2: First Flight</SelectItem>
              <SelectItem value="ch3">Chapter 3: The Rival</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="text-sm font-medium flex items-center gap-1.5">
            <Type className="h-4 w-4" />
            {wordCount} words
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#0a0c10]">
        <div className="max-w-[800px] mx-auto py-12 px-8 sm:px-12 md:px-16 min-h-full">
          <Textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[800px] w-full resize-none border-none focus-visible:ring-0 p-0 text-lg leading-relaxed text-foreground/90 bg-transparent shadow-none"
            style={{ 
              fontFamily: 'var(--font-serif)',
              lineHeight: '1.8'
            }}
          />
        </div>
      </div>
    </div>
  );
}