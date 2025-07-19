import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  language: string;
}

const translations = {
  en: {
    voiceAssistant: 'Voice Assistant',
    listening: 'Listening...',
    tapToSpeak: 'Tap to speak',
    speaking: 'Speaking...',
    help: 'How can I help you today?'
  },
  te: {
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    listening: 'వింటోంది...',
    tapToSpeak: 'మాట్లాడటానికి నొక్కండి',
    speaking: 'మాట్లాడుతోంది...',
    help: 'ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?'
  },
  hi: {
    voiceAssistant: 'वॉयस असिस्टेंट',
    listening: 'सुन रहा है...',
    tapToSpeak: 'बोलने के लिए टैप करें',
    speaking: 'बोल रहा है...',
    help: 'आज मैं आपकी कैसे मदद कर सकता हूं?'
  },
  ta: {
    voiceAssistant: 'குரல் உதவியாளர்',
    listening: 'கேட்கிறது...',
    tapToSpeak: 'பேச தட்டவும்',
    speaking: 'பேசுகிறது...',
    help: 'இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?'
  }
};

export default function VoiceAssistant({ language }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const t = translations[language as keyof typeof translations];

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
      // Stop listening logic here
    } else {
      setIsListening(true);
      // Start listening logic here
      // For now, simulate listening for demo
      setTimeout(() => {
        setIsListening(false);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 2000);
      }, 3000);
    }
  };

  return (
    <>
      {/* Voice Assistant Toggle Button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-eco shadow-strong"
        size="lg"
      >
        {isSpeaking ? (
          <Volume2 className="h-6 w-6" />
        ) : isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>

      {/* Voice Assistant Interface */}
      {isVisible && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 shadow-strong">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-lg">{t.voiceAssistant}</h3>
              
              <div className="space-y-2">
                {isListening && (
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                    <span className="ml-2 text-sm">{t.listening}</span>
                  </div>
                )}
                
                {isSpeaking && (
                  <div className="flex items-center justify-center space-x-2 text-accent">
                    <Volume2 className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">{t.speaking}</span>
                  </div>
                )}

                {!isListening && !isSpeaking && (
                  <p className="text-sm text-muted-foreground">{t.help}</p>
                )}
              </div>

              <Button
                onClick={handleVoiceToggle}
                className={`w-full ${isListening ? 'bg-destructive hover:bg-destructive/90' : 'btn-eco'}`}
                disabled={isSpeaking}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    {t.listening}
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    {t.tapToSpeak}
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground">
                {language === 'en' && 'Voice assistant supports English, Telugu, Hindi, and Tamil'}
                {language === 'te' && 'వాయిస్ అసిస్టెంట్ ఇంగ్లీష్, తెలుగు, హిందీ మరియు తమిళానికి మద్దతు ఇస్తుంది'}
                {language === 'hi' && 'वॉयस असिस्टेंट अंग्रेजी, तेलुगु, हिंदी और तमिल का समर्थन करता है'}
                {language === 'ta' && 'குரல் உதவியாளர் ஆங்கிலம், தெலுங்கு, ஹிந்தி மற்றும் தமிழை ஆதரிக்கிறது'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}