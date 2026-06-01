import { 
  Book, BookOpen, Users, Globe, Clock, FileText, Settings, PanelLeftClose, PanelLeftOpen 
} from "lucide-react";
import { motion } from "framer-motion";

export type NavView = "overview" | "lore" | "characters" | "world" | "timeline" | "manuscript" | "settings";

interface WorkspaceSidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeView: NavView;
  setActiveView: (view: NavView) => void;
  bookTitle: string;
}

export function WorkspaceSidebar({ 
  collapsed, setCollapsed, activeView, setActiveView, bookTitle 
}: WorkspaceSidebarProps) {
  
  const navItems = [
    { id: "overview", label: "Book Overview", icon: Book },
    { id: "lore", label: "Lore", icon: BookOpen },
    { id: "characters", label: "Characters", icon: Users },
    { id: "world", label: "World", icon: Globe },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "manuscript", label: "Manuscript", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-full bg-sidebar border-r border-border flex flex-col text-foreground transition-all duration-300">
      <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
        {!collapsed && (
          <span className="font-semibold truncate pr-2">{bookTitle}</span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-card transition-colors shrink-0 mx-auto"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as NavView)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              } ${collapsed ? "justify-center" : "justify-start"}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-primary" : ""}`} />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-6 bg-primary rounded-r-md" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}