import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Share2, Settings as SettingsIcon } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { WorkspaceSidebar, NavView } from "@/components/workspace/sidebar";
import { AIPanel } from "@/components/workspace/ai-panel";
import { ManuscriptPanel } from "@/components/workspace/manuscript-panel";
import { LoreView } from "@/components/workspace/lore-view";
import { CharactersView } from "@/components/workspace/characters-view";
import { WorldView } from "@/components/workspace/world-view";
import { TimelineView } from "@/components/workspace/timeline-view";
import { SettingsView } from "@/components/workspace/settings-view";

const viewNames: Record<NavView, string> = {
  overview: "Overview",
  lore: "Lore",
  characters: "Characters",
  world: "World",
  timeline: "Timeline",
  manuscript: "Manuscript",
  settings: "Settings",
};

export default function BookWorkspace() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<NavView>("manuscript");

  const renderMainContent = () => {
    switch (activeView) {
      case "lore": return <LoreView />;
      case "characters": return <CharactersView />;
      case "world": return <WorldView />;
      case "timeline": return <TimelineView />;
      case "settings": return <SettingsView />;
      case "overview": return <div className="p-8 text-muted-foreground">Overview coming soon.</div>;
      case "manuscript":
      default:
        // When manuscript is active, show the 2-panel (AI + Editor) layout in the remaining space
        return (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <AIPanel />
            </ResizablePanel>
            <ResizableHandle className="w-1 bg-border/50 hover:bg-primary transition-colors cursor-col-resize" />
            <ResizablePanel defaultSize={65}>
              <ManuscriptPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        );
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Workspace Top Bar */}
      <div className="h-[44px] shrink-0 bg-sidebar border-b border-border flex items-center justify-between px-4 z-10">
        <div className="flex-1 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group" data-testid="button-back-dashboard">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Link>
        </div>
        
        <div className="flex-1 flex justify-center text-sm font-medium">
          <span className="text-muted-foreground">StoryStudio</span>
          <span className="mx-2 text-muted-foreground/50">/</span>
          <span className="text-muted-foreground">Dragon Academy</span>
          <span className="mx-2 text-muted-foreground/50">/</span>
          <span className="text-foreground">{viewNames[activeView]}</span>
        </div>

        <div className="flex-1 flex justify-end items-center gap-3">
          <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-card transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-card transition-colors">
            <SettingsIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex min-h-0">
        {/* Sidebar Panel - Fixed width or resizable based on state */}
        <div 
          className="shrink-0 transition-all duration-300 ease-in-out border-r border-border"
          style={{ width: sidebarCollapsed ? '60px' : '240px' }}
        >
          <WorkspaceSidebar 
            collapsed={sidebarCollapsed} 
            setCollapsed={setSidebarCollapsed} 
            activeView={activeView}
            setActiveView={setActiveView}
            bookTitle="Dragon Academy" 
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 h-full bg-background">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}