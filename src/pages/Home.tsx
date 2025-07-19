import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Recycle, Award, MapPin, Users, Smartphone, Laptop, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-ewaste.jpg';
import trackingIcon from '@/assets/tracking-icon.jpg';

interface HomeProps {
  language: string;
}

const translations = {
  en: {
    heroTitle: 'E-Waste Management',
    heroSubtitle: 'Transform your electronic waste into environmental impact. Safe disposal, real-time tracking, and rewarding experiences.',
    heroButton: 'Submit E-Waste Now',
    learnMore: 'Learn More',
    howItWorks: 'How It Works',
    step1Title: 'Submit Request',
    step1Desc: 'Fill out our simple form with your e-waste details and pickup preferences.',
    step2Title: 'Live Tracking',
    step2Desc: 'Track your pickup in real-time with GPS-based monitoring system.',
    step3Title: 'Earn Rewards',
    step3Desc: 'Get reward points for every submission and redeem exciting offers.',
    featuresTitle: 'Why Choose EcoWaste AI?',
    feature1Title: 'Smart Collection',
    feature1Desc: 'AI-powered routing for efficient and timely pickups.',
    feature2Title: 'Real-time Tracking',
    feature2Desc: 'GPS-based live tracking of your pickup vehicle.',
    feature3Title: 'Reward System',
    feature3Desc: 'Earn points and redeem discount coupons from top retailers.',
    feature4Title: 'Community Events',
    feature4Desc: 'Join local e-waste drives and awareness programs.',
    statsTitle: 'Our Environmental Impact',
    devicesCollected: 'Devices Collected',
    carbonReduced: 'CO₂ Reduced (kg)',
    usersJoined: 'Users Joined',
    rewardsGiven: 'Rewards Given',
    ctaTitle: 'Ready to Make a Difference?',
    ctaDesc: 'Join thousands of users who are making environmental impact through responsible e-waste management.',
    ctaButton: 'Get Started Today'
  },
  te: {
    heroTitle: 'E-వేస్ట్ మేనేజ్‌మెంట్',
    heroSubtitle: 'మీ ఎలక్ట్రానిక్ వ్యర్థాలను పర్యావరణ ప్రభావంగా మార్చండి. సురక్షితమైన పారవేయడం, రియల్ టైమ్ ట్రాకింగ్ మరియు రివార్డింగ్ అనుభవాలు.',
    heroButton: 'ఇప్పుడే E-వేస్ట్ సమర్పించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    step1Title: 'అభ్యర్థన సమర్పించండి',
    step1Desc: 'మీ e-వేస్ట్ వివరాలు మరియు పికప్ ప్రాధాన్యతలతో మా సాధారణ ఫారమ్‌ను పూరించండి.',
    step2Title: 'లైవ్ ట్రాకింగ్',
    step2Desc: 'GPS-ఆధారిత మానిటరింగ్ సిస్టమ్‌తో మీ పికప్‌ను రియల్ టైమ్‌లో ట్రాక్ చేయండి.',
    step3Title: 'రివార్డ్స్ సంపాదించండి',
    step3Desc: 'ప్రతి సమర్పణకు రివార్డ్ పాయింట్లు పొందండి మరియు ఉత్తేజకరమైన ఆఫర్లను రీడీమ్ చేయండి.',
    featuresTitle: 'EcoWaste AI ను ఎందుకు ఎంచుకోవాలి?',
    feature1Title: 'స్మార్ట్ కలెక్షన్',
    feature1Desc: 'సమర్థవంతమైన మరియు సకాలంలో పికప్‌ల కోసం AI-శక్తితో రూటింగ్.',
    feature2Title: 'రియల్ టైమ్ ట్రాకింగ్',
    feature2Desc: 'మీ పికప్ వాహనం యొక్క GPS-ఆధారిత లైవ్ ట్రాకింగ్.',
    feature3Title: 'రివార్డ్ సిస్టమ్',
    feature3Desc: 'పాయింట్లు సంపాదించండి మరియు టాప్ రిటైలర్ల నుండి డిస్కౌంట్ కూపన్లను రీడీమ్ చేయండి.',
    feature4Title: 'కమ్యూనిటీ ఈవెంట్లు',
    feature4Desc: 'స్థానిక e-వేస్ట్ డ్రైవ్‌లు మరియు అవగాహన కార్యక్రమాలలో చేరండి.',
    statsTitle: 'మా పర్యావరణ ప్రభావం',
    devicesCollected: 'సేకరించిన పరికరాలు',
    carbonReduced: 'తగ్గించిన CO₂ (కేజీ)',
    usersJoined: 'చేరిన వినియోగదారులు',
    rewardsGiven: 'ఇవ్వబడిన రివార్డ్స్',
    ctaTitle: 'మార్పు తేవడానికి సిద్ధంగా ఉన్నారా?',
    ctaDesc: 'బాధ్యతాయుతమైన e-వేస్ట్ మేనేజ్‌మెంట్ ద్వారా పర్యావరణ ప్రభావం చూపుతున్న వేలాది మంది వినియోగదారులతో చేరండి.',
    ctaButton: 'ఈ రోజే ప్రారంభించండి'
  },
  hi: {
    heroTitle: 'ई-वेस्ट प्रबंधन',
    heroSubtitle: 'अपने इलेक्ट्रॉनिक कचरे को पर्यावरणीय प्रभाव में बदलें। सुरक्षित निपटान, रियल-टाइम ट्रैकिंग, और पुरस्कृत अनुभव।',
    heroButton: 'अभी ई-वेस्ट जमा करें',
    learnMore: 'और जानें',
    howItWorks: 'यह कैसे काम करता है',
    step1Title: 'अनुरोध जमा करें',
    step1Desc: 'अपने ई-वेस्ट विवरण और पिकअप प्राथमिकताओं के साथ हमारा सरल फॉर्म भरें।',
    step2Title: 'लाइव ट्रैकिंग',
    step2Desc: 'GPS-आधारित निगरानी प्रणाली के साथ अपने पिकअप को रियल-टाइम में ट्रैक करें।',
    step3Title: 'पुरस्कार कमाएं',
    step3Desc: 'हर सबमिशन के लिए रिवार्ड पॉइंट्स पाएं और रोमांचक ऑफर्स रिडीम करें।',
    featuresTitle: 'EcoWaste AI क्यों चुनें?',
    feature1Title: 'स्मार्ट संग्रह',
    feature1Desc: 'कुशल और समय पर पिकअप के लिए AI-संचालित रूटिंग।',
    feature2Title: 'रियल-टाइम ट्रैकिंग',
    feature2Desc: 'आपके पिकअप वाहन की GPS-आधारित लाइव ट्रैकिंग।',
    feature3Title: 'पुरस्कार प्रणाली',
    feature3Desc: 'पॉइंट्स कमाएं और शीर्ष रिटेलर्स से डिस्काउंट कूपन रिडीम करें।',
    feature4Title: 'समुदायिक कार्यक्रम',
    feature4Desc: 'स्थानीय ई-वेस्ट ड्राइव और जागरूकता कार्यक्रमों में शामिल हों।',
    statsTitle: 'हमारा पर्यावरणीय प्रभाव',
    devicesCollected: 'एकत्रित उपकरण',
    carbonReduced: 'कम किया गया CO₂ (किग्रा)',
    usersJoined: 'शामिल हुए उपयोगकर्ता',
    rewardsGiven: 'दिए गए पुरस्कार',
    ctaTitle: 'बदलाव लाने के लिए तैयार हैं?',
    ctaDesc: 'जिम्मेदार ई-वेस्ट प्रबंधन के माध्यम से पर्यावरणीय प्रभाव बना रहे हजारों उपयोगकर्ताओं के साथ जुड़ें।',
    ctaButton: 'आज ही शुरू करें'
  },
  ta: {
    heroTitle: 'ஈ-கழிவு மேலாண்மை',
    heroSubtitle: 'உங்கள் மின்னணு கழிவுகளை சுற்றுச்சூழல் தாக்கமாக மாற்றுங்கள். பாதுகாப்பான அகற்றல், நிகழ்நேர கண்காணிப்பு மற்றும் வெகுமதி அனுபவங்கள்.',
    heroButton: 'இப்போதே ஈ-கழிவுகளை சமர்ப்பிக்கவும்',
    learnMore: 'மேலும் அறிக',
    howItWorks: 'இது எப்படி வேலை செய்கிறது',
    step1Title: 'கோரிக்கை சமர்ப்பிக்கவும்',
    step1Desc: 'உங்கள் ஈ-கழிவு விவரங்கள் மற்றும் பிக்கப் விருப்பங்களுடன் எங்கள் எளிய படிவத்தை நிரப்பவும்.',
    step2Title: 'நேரடி கண்காணிப்பு',
    step2Desc: 'GPS-அடிப்படையிலான கண்காணிப்பு அமைப்புடன் உங்கள் பிக்கப்பை நிகழ்நேரத்தில் கண்காணிக்கவும்.',
    step3Title: 'வெகுமதிகளை சம்பாதிக்கவும்',
    step3Desc: 'ஒவ்வொரு சமர்ப்பணத்திற்கும் வெகுமதி புள்ளிகளைப் பெறுங்கள் மற்றும் உற்சாகமான சலுகைகளை மீட்டெடுக்கவும்.',
    featuresTitle: 'EcoWaste AI ஐ ஏன் தேர்வு செய்ய வேண்டும்?',
    feature1Title: 'ஸ்மார்ட் சேகரிப்பு',
    feature1Desc: 'திறமையான மற்றும் சரியான நேரத்தில் பிக்கப்புகளுக்கு AI-இயங்கும் வழியமைப்பு.',
    feature2Title: 'நிகழ்நேர கண்காணிப்பு',
    feature2Desc: 'உங்கள் பிக்கப் வாகனத்தின் GPS-அடிப்படையிலான நேரடி கண்காணிப்பு.',
    feature3Title: 'வெகுமதி அமைப்பு',
    feature3Desc: 'புள்ளிகளை சம்பாதிக்கவும் மற்றும் முதன்மை சில்லறை விற்பனையாளர்களிடமிருந்து தள்ளுபடி கூப்பன்களை மீட்டெடுக்கவும்.',
    feature4Title: 'சமூக நிகழ்வுகள்',
    feature4Desc: 'உள்ளூர் ஈ-கழிவு இயக்கங்கள் மற்றும் விழிப்புணர்வு நிகழ்ச்சிகளில் சேரவும்.',
    statsTitle: 'எங்கள் சுற்றுச்சூழல் தாக்கம்',
    devicesCollected: 'சேகரிக்கப்பட்ட சாதனங்கள்',
    carbonReduced: 'குறைக்கப்பட்ட CO₂ (கிலோ)',
    usersJoined: 'சேர்ந்த பயனர்கள்',
    rewardsGiven: 'வழங்கப்பட்ட வெகுமதிகள்',
    ctaTitle: 'மாற்றத்தை ஏற்படுத்த தயாரா?',
    ctaDesc: 'பொறுப்பான ஈ-கழிவு மேலாண்மையின் மூலம் சுற்றுச்சூழல் தாக்கத்தை ஏற்படுத்தும் ஆயிரக்கணக்கான பயனர்களுடன் சேரவும்.',
    ctaButton: 'இன்றே தொடங்குங்கள்'
  }
};

export default function Home({ language }: HomeProps) {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in delay-150">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
            <Link to="/submit">
              <Button size="lg" className="btn-hero">
                {t.heroButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              {t.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.howItWorks}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center glass-card transition-smooth hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t.step1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.step1Desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center glass-card transition-smooth hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>{t.step2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.step2Desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center glass-card transition-smooth hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-success" />
                </div>
                <CardTitle>{t.step3Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.step3Desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.featuresTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center transition-smooth hover:shadow-medium hover:scale-105">
              <CardHeader>
                <Recycle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{t.feature1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature1Desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-smooth hover:shadow-medium hover:scale-105">
              <CardHeader>
                <img src={trackingIcon} alt="Tracking" className="h-12 w-12 mx-auto mb-4 rounded" />
                <CardTitle className="text-xl">{t.feature2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature2Desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-smooth hover:shadow-medium hover:scale-105">
              <CardHeader>
                <Award className="h-12 w-12 text-success mx-auto mb-4" />
                <CardTitle className="text-xl">{t.feature3Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature3Desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-smooth hover:shadow-medium hover:scale-105">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-xl">{t.feature4Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.feature4Desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.statsTitle}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">25,847</div>
              <div className="text-xl opacity-90">{t.devicesCollected}</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">18,540</div>
              <div className="text-xl opacity-90">{t.carbonReduced}</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">12,394</div>
              <div className="text-xl opacity-90">{t.usersJoined}</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3,246</div>
              <div className="text-xl opacity-90">{t.rewardsGiven}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground mb-8">{t.ctaDesc}</p>
          <Link to="/submit">
            <Button size="lg" className="btn-hero">
              {t.ctaButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}