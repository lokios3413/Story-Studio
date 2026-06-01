import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { WorkspaceSidebar, NavView } from "@/components/workspace/sidebar";
import { AIPanel } from "@/components/workspace/ai-panel";
import { ManuscriptPanel } from "@/components/workspace/manuscript-panel";
import { LoreView } from "@/components/workspace/lore-view";
import { CharactersView } from "@/components/workspace/characters-view";
import { WorldView } from "@/components/workspace/world-view";
import { TimelineView } from "@/components/workspace/timeline-view";
import { SettingsView } from "@/components/workspace/settings-view";

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
    <div className="h-screen w-full bg-background overflow-hidden flex">
      {/* Sidebar Panel - Fixed width or resizable based on state */}
      <div 
        className="shrink-0 transition-all duration-300 ease-in-out"
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
      <div className="flex-1 min-w-0 h-full">
        {renderMainContent()}
      </div>
    </div>
  );
}