import { Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import enfLogo from 'figma:asset/9e83dc34211650951fe133d0ab6a914555b40652.png';

type PageType = 'dashboard' | 'companies' | 'technologies' | 'analytics';

interface HeaderProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <img 
                src={enfLogo} 
                alt="EnF advisor" 
                className="h-16 w-auto"
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onPageChange('dashboard')}
              className={`text-sm hover:text-primary transition-colors ${
                currentPage === 'dashboard' ? 'text-primary font-medium' : ''
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onPageChange('companies')}
              className={`text-sm hover:text-primary transition-colors ${
                currentPage === 'companies' ? 'text-primary font-medium' : ''
              }`}
            >
              Companies
            </button>
            <button 
              onClick={() => onPageChange('technologies')}
              className={`text-sm hover:text-primary transition-colors ${
                currentPage === 'technologies' ? 'text-primary font-medium' : ''
              }`}
            >
              Technologies
            </button>
            <button 
              onClick={() => onPageChange('analytics')}
              className={`text-sm hover:text-primary transition-colors ${
                currentPage === 'analytics' ? 'text-primary font-medium' : ''
              }`}
            >
              Analytics
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Sign in
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