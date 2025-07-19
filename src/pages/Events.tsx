import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import communityImage from '@/assets/community-event.jpg';

interface EventsProps {
  language: string;
}

const translations = {
  en: {
    pageTitle: 'Community Events',
    pageDesc: 'Join local e-waste drives, awareness programs, and community clean-up campaigns.',
    upcomingEvents: 'Upcoming Events',
    joinEvent: 'Join Event',
    rsvp: 'RSVP',
    eventDate: 'Date',
    eventTime: 'Time',
    eventLocation: 'Location',
    eventParticipants: 'Participants'
  },
  te: { pageTitle: 'కమ్యూనిటీ ఈవెంట్లు', pageDesc: 'స్థానిక e-వేస్ట్ డ్రైవ్‌లు, అవగాహన కార్యక్రమాలు మరియు కమ్యూనిటీ క్లీన్-అప్ క్యాంపెయిన్‌లలో చేరండి.', upcomingEvents: 'రాబోయే ఈవెంట్లు', joinEvent: 'ఈవెంట్‌లో చేరండి', rsvp: 'RSVP', eventDate: 'తేదీ', eventTime: 'సమయం', eventLocation: 'స్థానం', eventParticipants: 'పాల్గొనేవారు' },
  hi: { pageTitle: 'सामुदायिक कार्यक्रम', pageDesc: 'स्थानीय ई-वेस्ट ड्राइव, जागरूकता कार्यक्रम और सामुदायिक सफाई अभियान में शामिल हों।', upcomingEvents: 'आगामी कार्यक्रम', joinEvent: 'कार्यक्रम में शामिल हों', rsvp: 'RSVP', eventDate: 'दिनांक', eventTime: 'समय', eventLocation: 'स्थान', eventParticipants: 'प्रतिभागी' },
  ta: { pageTitle: 'சமூக நிகழ்வுகள்', pageDesc: 'உள்ளூர் ஈ-கழிவு இயக்கங்கள், விழிப்புணர்வு நிகழ்ச்சிகள் மற்றும் சமூக சுத்தம் பிரச்சாரங்களில் சேரவும்.', upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்', joinEvent: 'நிகழ்வில் சேரவும்', rsvp: 'RSVP', eventDate: 'தேதி', eventTime: 'நேரம்', eventLocation: 'இடம்', eventParticipants: 'பங்கேற்பாளர்கள்' }
};

export default function Events({ language }: EventsProps) {
  const t = translations[language as keyof typeof translations];

  const events = [
    {
      id: 1,
      title: 'E-Waste Collection Drive',
      description: 'Community e-waste collection and awareness program',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'City Park, Main Street',
      participants: 45,
      image: communityImage
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">{t.pageDesc}</p>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden shadow-medium">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <CardDescription className="text-base">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm">{event.participants} {t.eventParticipants}</span>
                      </div>
                    </div>
                    <Button className="btn-eco">{t.joinEvent}</Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}