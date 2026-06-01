import { TimelineItem } from "@/components/timeline-item";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { event: "The Great Sundering", time: "10,000 years ago" },
  { event: "First Dragon War", time: "500 years ago" },
  { event: "Valerius Academy Founded", time: "200 years ago" },
  { event: "Dark Rift Opens", time: "10 years ago" },
  { event: "Kira Receives Invitation", time: "2 weeks ago" },
  { event: "Story Begins: Arrival at Academy", time: "Present" },
  { event: "The Trial of Embers", time: "Future (Planned)", isLast: true }
];

export function TimelineView() {
  return (
    <div className="h-full bg-background overflow-auto p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Chronology</h2>
            <p className="text-muted-foreground">Keep your story's timeline in perfect order.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        <div className="pl-4">
          {events.map((ev, idx) => (
            <TimelineItem 
              key={idx} 
              event={ev.event} 
              time={ev.time} 
              isLast={ev.isLast} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}