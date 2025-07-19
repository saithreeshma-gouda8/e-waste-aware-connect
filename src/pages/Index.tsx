import { useState } from 'react';
import Navbar from '@/components/Navbar';
import VoiceAssistant from '@/components/VoiceAssistant';
import LiveChat from '@/components/LiveChat';
import AuthModal from '@/components/AuthModal';
import Home from '@/pages/Home';
import SubmitEWaste from '@/pages/SubmitEWaste';
import Rewards from '@/pages/Rewards';
import Events from '@/pages/Events';

const Index = () => {
  const [language, setLanguage] = useState('en');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleAuthenticate = (email: string, name?: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        isAuthenticated={isAuthenticated}
        onSignIn={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        userEmail={userEmail}
      />
      
      <Home language={language} />

      <VoiceAssistant language={language} />
      <LiveChat language={language} />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticate}
        language={language}
      />
    </div>
  );
};

export default Index;
