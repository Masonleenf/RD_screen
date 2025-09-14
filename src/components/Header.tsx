import { Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <div>
                <div className="font-semibold">EnF Advisor</div>
                <div className="text-xs text-muted-foreground">R&D Earning Screener</div>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm hover:text-primary transition-colors">Dashboard</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Companies</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Technologies</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Analytics</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button className="md:hidden" variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}