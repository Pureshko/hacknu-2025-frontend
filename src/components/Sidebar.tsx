import { NavLink } from "react-router-dom";
import { LayoutDashboard, Database, TrendingUp, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/objects", icon: Database, label: "Objects" },
  { to: "/analysis", icon: TrendingUp, label: "Analysis" },
  { to: "/export", icon: Download, label: "Export" },
];

const SidebarContent = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          MyTravel AI
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Tourism Data Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-sm font-medium mb-1">Total Objects</div>
          <div className="text-2xl font-bold text-primary">1,524</div>
          <div className="text-xs text-muted-foreground mt-1">+127 this week</div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          MyTravel AI
        </h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <aside className="hidden lg:block w-64 border-r border-border bg-card h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
