
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Plus, List, LogOut, FileBarChart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  forceActivePath?: string; // Optional prop for testing/non-router contexts
}

const Layout: React.FC<LayoutProps> = ({ children, forceActivePath }) => {
  // Use React Router hooks safely
  let location;
  let navigate;
  
  try {
    location = useLocation();
    navigate = useNavigate();
  } catch (e) {
    // Fallback for usage outside router context (like tests)
    location = { pathname: forceActivePath || '/' };
    navigate = () => console.warn("Navigation not available in this context");
  }
  
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    try {
      navigate("/login");
    } catch (e) {
      console.warn("Navigation failed, likely outside router context");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-primary">ZakatApp</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1.5",
                  isActive("/") ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <Home size={16} />
                <span>Overview</span>
              </Link>
              <Link 
                to="/list" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1.5",
                  isActive("/list") ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <List size={16} />
                <span>Records</span>
              </Link>
              <Link 
                to="/add" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1.5",
                  isActive("/add") ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <Plus size={16} />
                <span>Input</span>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1.5 text-muted-foreground hover:text-destructive"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container py-8 md:py-12 px-4 md:px-6 mb-20 md:mb-0">
        {children}
      </main>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg">
        <nav className="flex justify-around">
          <Link 
            to="/" 
            className={cn(
              "flex flex-col items-center p-3 transition-colors",
              isActive("/") ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            to="/list" 
            className={cn(
              "flex flex-col items-center p-3 transition-colors",
              isActive("/list") ? "text-primary" : "text-muted-foreground"
            )}
          >
            <List size={20} />
            <span className="text-xs mt-1">Records</span>
          </Link>
          <Link 
            to="/add" 
            className={cn(
              "flex flex-col items-center p-3 transition-colors",
              isActive("/add") ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Plus size={20} />
            <span className="text-xs mt-1">Input</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
