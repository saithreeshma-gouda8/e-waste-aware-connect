import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface LiveChatProps {
  language: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const translations = {
  en: {
    liveChat: 'Live Chat Support',
    typePlaceholder: 'Type your message...',
    send: 'Send',
    welcomeMessage: 'Hello! How can I help you with e-waste management today?',
    botResponses: [
      'I can help you with submitting e-waste, tracking pickups, and managing rewards.',
      'To schedule a pickup, please visit our Submit E-Waste page.',
      'You can track your current pickups in real-time from your dashboard.',
      'Earn reward points for every e-waste submission!',
      'Our team collects all types of electronic devices safely.'
    ]
  },
  te: {
    liveChat: 'లైవ్ చాట్ సపోర్ట్',
    typePlaceholder: 'మీ సందేశాన్ని టైప్ చేయండి...',
    send: 'పంపండి',
    welcomeMessage: 'హలో! ఈ రోజు ఈ-వేస్ట్ మేనేజ్‌మెంట్‌తో నేను మీకు ఎలా సహాయం చేయగలను?',
    botResponses: [
      'ఈ-వేస్ట్ సమర్పించడం, పికప్‌లను ట్రాక్ చేయడం మరియు రివార్డ్‌లను నిర్వహించడంలో నేను మీకు సహాయం చేయగలను.',
      'పికప్ షెడ్యూల్ చేయడానికి, దయచేసి మా Submit E-Waste పేజీని సందర్శించండి.',
      'మీ ప్రస్తుత పికప్‌లను మీ డ్యాష్‌బోర్డ్ నుండి రియల్ టైమ్‌లో ట్రాక్ చేయవచ్చు.',
      'ప్రతి ఈ-వేస్ట్ సమర్పణకు రివార్డ్ పాయింట్లు సంపాదించండి!',
      'మా బృందం అన్ని రకాల ఎలక్ట్రానిక్ పరికరాలను సురక్షితంగా సేకరిస్తుంది.'
    ]
  },
  hi: {
    liveChat: 'लाइव चैट सपोर्ट',
    typePlaceholder: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    welcomeMessage: 'नमस्ते! आज मैं ई-वेस्ट प्रबंधन में आपकी कैसे मदद कर सकता हूं?',
    botResponses: [
      'मैं ई-वेस्ट जमा करने, पिकअप ट्रैक करने और रिवार्ड प्रबंधित करने में आपकी मदद कर सकता हूं।',
      'पिकअप शेड्यूल करने के लिए, कृपया हमारे Submit E-Waste पेज पर जाएं।',
      'आप अपने डैशबोर्ड से अपने वर्तमान पिकअप को वास्तविक समय में ट्रैक कर सकते हैं।',
      'हर ई-वेस्ट सबमिशन के लिए रिवार्ड पॉइंट्स कमाएं!',
      'हमारी टीम सभी प्रकार के इलेक्ट्रॉनिक उपकरणों को सुरक्षित रूप से एकत्र करती है।'
    ]
  },
  ta: {
    liveChat: 'நேரடி அரட்டை ஆதரவு',
    typePlaceholder: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
    send: 'அனுப்பவும்',
    welcomeMessage: 'வணக்கம்! இன்று ஈ-கழிவு மேலாண்மையில் நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    botResponses: [
      'ஈ-கழிவுகளை சமர்ப்பிப்பது, பிக்கப்புகளை கண்காணிப்பது மற்றும் வெகுமதிகளை நிர்வகிப்பது ஆகியவற்றில் நான் உங்களுக்கு உதவ முடியும்.',
      'பிக்கப் திட்டமிட, தயவுசெய்து எங்கள் Submit E-Waste பக்கத்தைப் பார்வையிடவும்.',
      'உங்கள் டாஷ்போர்டில் இருந்து உங்கள் தற்போதைய பிக்கப்புகளை நிகழ்நேரத்தில் கண்காணிக்கலாம்.',
      'ஒவ்வொரு ஈ-கழிவு சமர்ப்பணத்திற்கும் வெகுமதி புள்ளிகளைப் பெறுங்கள்!',
      'எங்கள் குழு அனைத்து வகையான மின்னணு சாதனங்களையும் பாதுகாப்பாக சேகரிக்கிறது.'
    ]
  }
};

export default function LiveChat({ language }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Initialize with welcome message
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: t.welcomeMessage,
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, t.welcomeMessage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: t.botResponses[Math.floor(Math.random() * t.botResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full btn-eco shadow-strong"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-24 left-6 z-40 w-80 h-96 shadow-strong">
          <CardHeader className="p-4 bg-primary text-primary-foreground">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>{t.liveChat}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isUser && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        {message.isUser && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.typePlaceholder}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm" className="btn-eco">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}