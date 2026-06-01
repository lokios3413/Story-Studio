import { useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreateBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBookModal({ open, onOpenChange }: CreateBookModalProps) {
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("long");
  
  const handleCreate = () => {
    onOpenChange(false);
    // In a real app we'd create the book and use the new ID
    setLocation("/book/new");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Book</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up the foundation for your next masterpiece.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <Label>Book Type</Label>
            <RadioGroup defaultValue={type} onValueChange={setType} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "short", label: "Short Story" },
                { id: "medium", label: "Novella" },
                { id: "long", label: "Novel" },
                { id: "series", label: "Series" }
              ].map((t) => (
                <div key={t.id}>
                  <RadioGroupItem value={t.id} id={t.id} className="peer sr-only" />
                  <Label
                    htmlFor={t.id}
                    className="flex flex-col items-center justify-between rounded-md border border-border bg-sidebar p-3 hover:bg-sidebar/80 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-sm font-medium"
                  >
                    {t.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="e.g. The Winds of Winter" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-sidebar border-border"
              data-testid="input-book-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Primary Genre</Label>
            <Select defaultValue="fantasy">
              <SelectTrigger className="bg-sidebar border-border">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="scifi">Science Fiction</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="literary">Literary Fiction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Logline / Premise</Label>
            <Textarea 
              id="description" 
              placeholder="A brief summary of your story..."
              className="resize-none h-24 bg-sidebar border-border"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border hover:bg-sidebar">
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!title.trim()} data-testid="button-create-book-submit">
            Create Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}