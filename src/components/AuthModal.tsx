import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (email: string, name?: string) => void;
  language: string;
}

const translations = {
  en: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    welcome: 'Welcome Back',
    createAccount: 'Create Account',
    signInDesc: 'Enter your credentials to access your account',
    signUpDesc: 'Create a new account to get started',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    signInButton: 'Sign In',
    signUpButton: 'Create Account',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    namePlaceholder: 'Enter your full name',
    confirmPasswordPlaceholder: 'Confirm your password'
  },
  te: {
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    welcome: 'తిరిగి స్వాగతం',
    createAccount: 'ఖాతా సృష్టించండి',
    signInDesc: 'మీ ఖాతాను యాక్సెస్ చేయడానికి మీ వివరాలను నమోదు చేయండి',
    signUpDesc: 'ప్రారంభించడానికి కొత్త ఖాతాను సృష్టించండి',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    fullName: 'పూర్తి పేరు',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    signInButton: 'సైన్ ఇన్',
    signUpButton: 'ఖాతా సృష్టించండి',
    emailPlaceholder: 'మీ ఇమెయిల్ నమోదు చేయండి',
    passwordPlaceholder: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    namePlaceholder: 'మీ పూర్తి పేరు నమోదు చేయండి',
    confirmPasswordPlaceholder: 'మీ పాస్‌వర్డ్ నిర్ధారించండి'
  },
  hi: {
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    welcome: 'वापस स्वागत है',
    createAccount: 'खाता बनाएं',
    signInDesc: 'अपने खाते तक पहुंचने के लिए अपनी जानकारी दर्ज करें',
    signUpDesc: 'शुरू करने के लिए एक नया खाता बनाएं',
    email: 'ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    signInButton: 'साइन इन',
    signUpButton: 'खाता बनाएं',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें'
  },
  ta: {
    signIn: 'உள்நுழையவும்',
    signUp: 'பதிவு செய்யவும்',
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    createAccount: 'கணக்கை உருவாக்கவும்',
    signInDesc: 'உங்கள் கணக்கை அணுக உங்கள் விவரங்களை உள்ளிடவும்',
    signUpDesc: 'தொடங்க புதிய கணக்கை உருவாக்கவும்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    fullName: 'முழு பெயர்',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    signInButton: 'உள்நுழையவும்',
    signUpButton: 'கணக்கை உருவாக்கவும்',
    emailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    confirmPasswordPlaceholder: 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்'
  }
};

export default function AuthModal({ isOpen, onClose, onAuthenticate, language }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const t = translations[language as keyof typeof translations];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticate(signInForm.email);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpForm.password === signUpForm.confirmPassword) {
      onAuthenticate(signUpForm.email, signUpForm.fullName);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">EcoWaste AI</DialogTitle>
          <DialogDescription className="text-center">
            {t.signInDesc}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t.signIn}</TabsTrigger>
            <TabsTrigger value="signup">{t.signUp}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{t.welcome}</CardTitle>
                <CardDescription>{t.signInDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        className="pl-10"
                        value={signInForm.email}
                        onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t.passwordPlaceholder}
                        className="pl-10 pr-10"
                        value={signInForm.password}
                        onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-eco">
                    {t.signInButton}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{t.createAccount}</CardTitle>
                <CardDescription>{t.signUpDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t.fullName}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder={t.namePlaceholder}
                        className="pl-10"
                        value={signUpForm.fullName}
                        onChange={(e) => setSignUpForm({ ...signUpForm, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        className="pl-10"
                        value={signUpForm.email}
                        onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t.passwordPlaceholder}
                        className="pl-10 pr-10"
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t.confirmPasswordPlaceholder}
                        className="pl-10 pr-10"
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-eco">
                    {t.signUpButton}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}