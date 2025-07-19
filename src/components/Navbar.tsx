import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogIn, LogOut, Recycle } from 'lucide-react';

interface NavbarProps {
  language: string;
  onLanguageChange: (language: string) => void;
  isAuthenticated: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  userEmail?: string;
}

const translations = {
  en: {
    home: 'Home',
    submit: 'Submit E-Waste',
    about: 'About Us',
    rewards: 'Rewards',
    events: 'Events',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    language: 'Language'
  },
  te: {
    home: 'హోమ్',
    submit: 'ఈ-వేస్ట్ సమర్పించండి',
    about: 'మా గురించి',
    rewards: 'రివార్డ్స్',
    events: 'ఈవెంట్లు',
    signIn: 'సైన్ ఇన్',
    signOut: 'సైన్ అవుట్',
    language: 'భాష'
  },
  hi: {
    home: 'होम',
    submit: 'ई-वेस्ट जमा करें',
    about: 'हमारे बारे में',
    rewards: 'रिवार्ड्स',
    events: 'इवेंट्स',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    language: 'भाषा'
  },
  ta: {
    home: 'முகப்பு',
    submit: 'ஈ-கழிவு சமர்ப்பிக்கவும்',
    about: 'எங்களைப் பற்றி',
    rewards: 'வெகுமதிகள்',
    events: 'நிகழ்வுகள்',
    signIn: 'உள்நுழையவும்',
    signOut: 'வெளியேறவும்',
    language: 'மொழி'
  }
};

export default function Navbar({ language, onLanguageChange, isAuthenticated, onSignIn, onSignOut, userEmail }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language as keyof typeof translations];

  const navigationItems = [
    { path: '/', label: t.home },
    { path: '/submit', label: t.submit },
    { path: '/about', label: t.about },
    { path: '/rewards', label: t.rewards },
    { path: '/events', label: t.events },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-primary">EcoWaste AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `link-underline font-medium transition-smooth ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Language Selector & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
              </SelectContent>
            </Select>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-32 truncate">{userEmail}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.signOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onSignIn} className="btn-eco">
                <LogIn className="h-4 w-4 mr-2" />
                {t.signIn}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-2 font-medium transition-smooth ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              
              <div className="pt-4 border-t space-y-4">
                <Select value={language} onValueChange={onLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="te">తెలుగు</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="ta">தமிழ்</SelectItem>
                  </SelectContent>
                </Select>

                {isAuthenticated ? (
                  <Button variant="outline" onClick={onSignOut} className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.signOut}
                  </Button>
                ) : (
                  <Button onClick={onSignIn} className="w-full btn-eco">
                    <LogIn className="h-4 w-4 mr-2" />
                    {t.signIn}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}