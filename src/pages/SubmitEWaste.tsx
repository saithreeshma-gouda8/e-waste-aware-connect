import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon, Clock, MapPin, Smartphone, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SubmitEWasteProps {
  language: string;
}

const translations = {
  en: {
    pageTitle: 'Submit E-Waste Request',
    pageDesc: 'Schedule a pickup for your electronic devices. We handle everything from collection to safe disposal.',
    formTitle: 'E-Waste Pickup Form',
    fullName: 'Full Name',
    deviceType: 'Device Type',
    brand: 'Brand Name',
    condition: 'Device Condition',
    pickupAddress: 'Pickup Address',
    pickupDate: 'Pickup Date',
    pickupTime: 'Pickup Time',
    additionalNotes: 'Additional Notes',
    submitButton: 'Schedule Pickup',
    namePlaceholder: 'Enter your full name',
    brandPlaceholder: 'Enter device brand (e.g., Samsung, Apple)',
    addressPlaceholder: 'Enter complete pickup address',
    notesPlaceholder: 'Any special instructions or additional devices...',
    selectDevice: 'Select device type',
    selectCondition: 'Select condition',
    selectDate: 'Pick a date',
    selectTime: 'Select time slot',
    devices: {
      mobile: 'Mobile Phone',
      laptop: 'Laptop',
      tablet: 'Tablet',
      tv: 'Television',
      monitor: 'Computer Monitor',
      printer: 'Printer',
      keyboard: 'Keyboard/Mouse',
      other: 'Other Electronics'
    },
    conditions: {
      working: 'Working',
      partial: 'Partially Working',
      damaged: 'Damaged',
      notWorking: 'Not Working'
    },
    timeSlots: {
      morning: '9:00 AM - 12:00 PM',
      afternoon: '1:00 PM - 4:00 PM',
      evening: '5:00 PM - 8:00 PM'
    },
    successTitle: 'Pickup Scheduled Successfully!',
    successMessage: 'Your pickup is scheduled. Live pickup tracking will begin shortly.',
    confirmationSent: 'Confirmation email has been sent to your registered email.',
    trackingInfo: 'You can track your pickup in real-time once our team starts the collection process.',
    backToHome: 'Back to Home'
  },
  te: {
    pageTitle: 'ఈ-వేస్ట్ అభ్యర్థన సమర్పించండి',
    pageDesc: 'మీ ఎలక్ట్రానిక్ పరికరాల కోసం పికప్ షెడ్యూల్ చేయండి. సేకరణ నుండి సురక్షిత పారవేయడం వరకు మేము అన్నింటినీ నిర్వహిస్తాము.',
    formTitle: 'ఈ-వేస్ట్ పికప్ ఫారమ్',
    fullName: 'పూర్తి పేరు',
    deviceType: 'పరికర రకం',
    brand: 'బ్రాండ్ పేరు',
    condition: 'పరికర స్థితి',
    pickupAddress: 'పికప్ చిరునామా',
    pickupDate: 'పికప్ తేదీ',
    pickupTime: 'పికప్ సమయం',
    additionalNotes: 'అదనపు గమనికలు',
    submitButton: 'పికప్ షెడ్యూల్ చేయండి',
    namePlaceholder: 'మీ పూర్తి పేరు నమోదు చేయండి',
    brandPlaceholder: 'పరికర బ్రాండ్ నమోదు చేయండి (ఉదా: Samsung, Apple)',
    addressPlaceholder: 'పూర్తి పికప్ చిరునామా నమోదు చేయండి',
    notesPlaceholder: 'ఏవైనా ప్రత్యేక సూచనలు లేదా అదనపు పరికరాలు...',
    selectDevice: 'పరికర రకాన్ని ఎంచుకోండి',
    selectCondition: 'స్థితిని ఎంచుకోండి',
    selectDate: 'తేదీని ఎంచుకోండి',
    selectTime: 'సమయ స్లాట్‌ను ఎంచుకోండి',
    devices: {
      mobile: 'మొబైల్ ఫోన్',
      laptop: 'ల్యాప్‌టాప్',
      tablet: 'టాబ్లెట్',
      tv: 'టెలివిజన్',
      monitor: 'కంప్యూటర్ మానిటర్',
      printer: 'ప్రింటర్',
      keyboard: 'కీబోర్డ్/మౌస్',
      other: 'ఇతర ఎలక్ట్రానిక్స్'
    },
    conditions: {
      working: 'పని చేస్తోంది',
      partial: 'కొంతవరకు పని చేస్తోంది',
      damaged: 'దెబ్బతిన్నది',
      notWorking: 'పని చేయడం లేదు'
    },
    timeSlots: {
      morning: '9:00 AM - 12:00 PM',
      afternoon: '1:00 PM - 4:00 PM',
      evening: '5:00 PM - 8:00 PM'
    },
    successTitle: 'పికప్ విజయవంతంగా షెడ్యూల్ అయింది!',
    successMessage: 'మీ పికప్ షెడ్యూల్ అయింది. లైవ్ పికప్ ట్రాకింగ్ త్వరలో ప్రారంభమవుతుంది.',
    confirmationSent: 'మీ రిజిస్టర్డ్ ఇమెయిల్‌కు నిర్ధారణ ఇమెయిల్ పంపబడింది.',
    trackingInfo: 'మా బృందం సేకరణ ప్రక్రియను ప్రారంభించిన తర్వాత మీరు మీ పికప్‌ను రియల్ టైమ్‌లో ట్రాక్ చేయవచ్చు.',
    backToHome: 'హోమ్‌కు తిరిగి వెళ్ళండి'
  },
  hi: {
    pageTitle: 'ई-वेस्ट अनुरोध जमा करें',
    pageDesc: 'अपने इलेक्ट्रॉनिक उपकरणों के लिए पिकअप शेड्यूल करें। हम संग्रह से सुरक्षित निपटान तक सब कुछ संभालते हैं।',
    formTitle: 'ई-वेस्ट पिकअप फॉर्म',
    fullName: 'पूरा नाम',
    deviceType: 'उपकरण प्रकार',
    brand: 'ब्रांड नाम',
    condition: 'उपकरण की स्थिति',
    pickupAddress: 'पिकअप पता',
    pickupDate: 'पिकअप दिनांक',
    pickupTime: 'पिकअप समय',
    additionalNotes: 'अतिरिक्त टिप्पणियां',
    submitButton: 'पिकअप शेड्यूल करें',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    brandPlaceholder: 'डिवाइस ब्रांड दर्ज करें (जैसे Samsung, Apple)',
    addressPlaceholder: 'पूरा पिकअप पता दर्ज करें',
    notesPlaceholder: 'कोई विशेष निर्देश या अतिरिक्त उपकरण...',
    selectDevice: 'उपकरण प्रकार चुनें',
    selectCondition: 'स्थिति चुनें',
    selectDate: 'दिनांक चुनें',
    selectTime: 'समय स्लॉट चुनें',
    devices: {
      mobile: 'मोबाइल फोन',
      laptop: 'लैपटॉप',
      tablet: 'टैबलेट',
      tv: 'टेलीविजन',
      monitor: 'कंप्यूटर मॉनिटर',
      printer: 'प्रिंटर',
      keyboard: 'कीबोर्ड/माउस',
      other: 'अन्य इलेक्ट्रॉनिक्स'
    },
    conditions: {
      working: 'काम कर रहा है',
      partial: 'आंशिक रूप से काम कर रहा है',
      damaged: 'क्षतिग्रस्त',
      notWorking: 'काम नहीं कर रहा'
    },
    timeSlots: {
      morning: '9:00 AM - 12:00 PM',
      afternoon: '1:00 PM - 4:00 PM',
      evening: '5:00 PM - 8:00 PM'
    },
    successTitle: 'पिकअप सफलतापूर्वक शेड्यूल हो गया!',
    successMessage: 'आपका पिकअप शेड्यूल हो गया है। लाइव पिकअप ट्रैकिंग जल्द ही शुरू हो जाएगी।',
    confirmationSent: 'आपके पंजीकृत ईमेल पर पुष्टिकरण ईमेल भेजा गया है।',
    trackingInfo: 'हमारी टीम संग्रह प्रक्रिया शुरू करने के बाद आप अपने पिकअप को रियल-टाइम में ट्रैक कर सकते हैं।',
    backToHome: 'घर वापस जाएं'
  },
  ta: {
    pageTitle: 'ஈ-கழிவு கோரிக்கையை சமர்ப்பிக்கவும்',
    pageDesc: 'உங்கள் மின்னணு சாதனங்களுக்கு பிக்கப் திட்டமிடுங்கள். சேகரிப்பு முதல் பாதுகாப்பான அகற்றல் வரை நாங்கள் அனைத்தையும் கையாளுகிறோம்.',
    formTitle: 'ஈ-கழிவு பிக்கப் படிவம்',
    fullName: 'முழு பெயர்',
    deviceType: 'சாதன வகை',
    brand: 'பிராண்ட் பெயர்',
    condition: 'சாதன நிலை',
    pickupAddress: 'பிக்கப் முகவரி',
    pickupDate: 'பிக்கப் தேதி',
    pickupTime: 'பிக்கப் நேரம்',
    additionalNotes: 'கூடுதல் குறிப்புகள்',
    submitButton: 'பிக்கப் திட்டமிடுங்கள்',
    namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    brandPlaceholder: 'சாதன பிராண்டை உள்ளிடவும் (எ.கா: Samsung, Apple)',
    addressPlaceholder: 'முழுமையான பிக்கப் முகவரியை உள்ளிடவும்',
    notesPlaceholder: 'ஏதேனும் சிறப்பு அறிவுரைகள் அல்லது கூடுதல் சாதனங்கள்...',
    selectDevice: 'சாதன வகையை தேர்ந்தெடுக்கவும்',
    selectCondition: 'நிலையை தேர்ந்தெடுக்கவும்',
    selectDate: 'தேதியை தேர்வு செய்யவும்',
    selectTime: 'நேர இடைவேளையை தேர்ந்தெடுக்கவும்',
    devices: {
      mobile: 'மொபைல் போன்',
      laptop: 'லேப்டாப்',
      tablet: 'டேப்லெட்',
      tv: 'தொலைக்காட்சி',
      monitor: 'கணினி மானிட்டர்',
      printer: 'அச்சுப்பொறி',
      keyboard: 'கீபோர்ட்/மவுஸ்',
      other: 'பிற மின்னணுவியல்'
    },
    conditions: {
      working: 'வேலை செய்கிறது',
      partial: 'ஓரளவு வேலை செய்கிறது',
      damaged: 'சேதமடைந்தது',
      notWorking: 'வேலை செய்யவில்லை'
    },
    timeSlots: {
      morning: '9:00 AM - 12:00 PM',
      afternoon: '1:00 PM - 4:00 PM',
      evening: '5:00 PM - 8:00 PM'
    },
    successTitle: 'பிக்கப் வெற்றிகரமாக திட்டமிடப்பட்டது!',
    successMessage: 'உங்கள் பிக்கப் திட்டமிடப்பட்டுள்ளது. நேரடி பிக்கப் கண்காணிப்பு விரைவில் தொடங்கும்.',
    confirmationSent: 'உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சலுக்கு உறுதிப்படுத்தல் மின்னஞ்சல் அனுப்பப்பட்டுள்ளது.',
    trackingInfo: 'எங்கள் குழு சேகரிப்பு செயல்முறையைத் தொடங்கியதும் உங்கள் பிக்கப்பை நிகழ்நேரத்தில் கண்காணிக்கலாம்.',
    backToHome: 'வீட்டிற்கு திரும்பு'
  }
};

export default function SubmitEWaste({ language }: SubmitEWasteProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    fullName: '',
    deviceType: '',
    brand: '',
    condition: '',
    pickupAddress: '',
    pickupTime: '',
    additionalNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: t.successTitle,
        description: t.successMessage,
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-muted/30">
        <Card className="max-w-2xl mx-auto m-6 shadow-strong">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-success mb-4">{t.successTitle}</h1>
            <p className="text-lg text-muted-foreground mb-6">{t.successMessage}</p>
            
            <div className="space-y-4 text-left bg-muted/50 p-6 rounded-lg mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>{t.confirmationSent}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{t.trackingInfo}</span>
              </div>
            </div>

            <Button asChild className="btn-eco">
              <a href="/">{t.backToHome}</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">{t.pageDesc}</p>
        </div>

        {/* Form */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-6 w-6 text-primary" />
              <span>{t.formTitle}</span>
            </CardTitle>
            <CardDescription>
              {t.pageDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.fullName} *</Label>
                <Input
                  id="fullName"
                  placeholder={t.namePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>

              {/* Device Type and Brand */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{t.deviceType} *</Label>
                  <Select
                    value={formData.deviceType}
                    onValueChange={(value) => handleInputChange('deviceType', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectDevice} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile">{t.devices.mobile}</SelectItem>
                      <SelectItem value="laptop">{t.devices.laptop}</SelectItem>
                      <SelectItem value="tablet">{t.devices.tablet}</SelectItem>
                      <SelectItem value="tv">{t.devices.tv}</SelectItem>
                      <SelectItem value="monitor">{t.devices.monitor}</SelectItem>
                      <SelectItem value="printer">{t.devices.printer}</SelectItem>
                      <SelectItem value="keyboard">{t.devices.keyboard}</SelectItem>
                      <SelectItem value="other">{t.devices.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">{t.brand}</Label>
                  <Input
                    id="brand"
                    placeholder={t.brandPlaceholder}
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                  />
                </div>
              </div>

              {/* Device Condition */}
              <div className="space-y-4">
                <Label>{t.condition} *</Label>
                <RadioGroup
                  value={formData.condition}
                  onValueChange={(value) => handleInputChange('condition', value)}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="working" id="working" />
                    <Label htmlFor="working" className="text-sm">{t.conditions.working}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />
                    <Label htmlFor="partial" className="text-sm">{t.conditions.partial}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="damaged" id="damaged" />
                    <Label htmlFor="damaged" className="text-sm">{t.conditions.damaged}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="notWorking" id="notWorking" />
                    <Label htmlFor="notWorking" className="text-sm">{t.conditions.notWorking}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Pickup Address */}
              <div className="space-y-2">
                <Label htmlFor="address">{t.pickupAddress} *</Label>
                <Textarea
                  id="address"
                  placeholder={t.addressPlaceholder}
                  value={formData.pickupAddress}
                  onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Pickup Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{t.pickupDate} *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>{t.selectDate}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>{t.pickupTime} *</Label>
                  <Select
                    value={formData.pickupTime}
                    onValueChange={(value) => handleInputChange('pickupTime', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectTime} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{t.timeSlots.morning}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="afternoon">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{t.timeSlots.afternoon}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="evening">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{t.timeSlots.evening}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">{t.additionalNotes}</Label>
                <Textarea
                  id="notes"
                  placeholder={t.notesPlaceholder}
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full btn-hero" size="lg">
                <MapPin className="mr-2 h-5 w-5" />
                {t.submitButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}