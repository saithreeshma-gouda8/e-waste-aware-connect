import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Award, TrendingUp, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RewardsProps {
  language: string;
}

const translations = {
  en: {
    pageTitle: 'Rewards Dashboard',
    pageDesc: 'Track your reward points and redeem exciting offers from top retailers.',
    currentPoints: 'Current Points',
    pointsToNext: 'Points to next reward',
    redeemAt: 'Redeem at 100 points',
    availableCoupons: 'Available Coupons',
    redemptionHistory: 'Redemption History',
    redeemButton: 'Redeem Now',
    copyCoupon: 'Copy Code',
    earnMore: 'Earn More Points',
    howToEarn: 'How to Earn Points',
    earnStep1: '25 points per e-waste submission',
    earnStep2: '10 bonus points for community events',
    earnStep3: '50 points for referring friends',
    retailers: {
      amazon: 'Amazon',
      flipkart: 'Flipkart',
      meesho: 'Meesho'
    },
    coupons: {
      amazon10: '₹500 Amazon Voucher',
      flipkart10: '₹500 Flipkart Voucher',
      meesho15: '₹300 Meesho Voucher'
    },
    couponDesc: {
      amazon10: 'Valid on electronics purchases above ₹2000',
      flipkart10: 'Valid on all categories above ₹1500',
      meesho15: 'Valid on fashion and home items'
    },
    redeemed: 'Redeemed',
    availableIn: 'Available in',
    days: 'days',
    copiedToClipboard: 'Coupon code copied to clipboard!',
    redeemSuccess: 'Coupon redeemed successfully!'
  },
  te: {
    pageTitle: 'రివార్డ్స్ డాష్‌బోర్డ్',
    pageDesc: 'మీ రివార్డ్ పాయింట్లను ట్రాక్ చేయండి మరియు టాప్ రిటైలర్ల నుండి ఉత్తేజకరమైన ఆఫర్లను రీడీమ్ చేయండి.',
    currentPoints: 'ప్రస్తుత పాయింట్లు',
    pointsToNext: 'తదుపరి రివార్డ్‌కు పాయింట్లు',
    redeemAt: '100 పాయింట్లలో రీడీమ్ చేయండి',
    availableCoupons: 'అందుబాటులో ఉన్న కూపన్లు',
    redemptionHistory: 'రీడంప్షన్ చరిత్ర',
    redeemButton: 'ఇప్పుడే రీడీమ్ చేయండి',
    copyCoupon: 'కోడ్ కాపీ చేయండి',
    earnMore: 'మరిన్ని పాయింట్లు సంపాదించండి',
    howToEarn: 'పాయింట్లు ఎలా సంపాదించాలి',
    earnStep1: 'ప్రతి e-వేస్ట్ సమర్పణకు 25 పాయింట్లు',
    earnStep2: 'కమ్యూనిటీ ఈవెంట్లకు 10 బోనస్ పాయింట్లు',
    earnStep3: 'స్నేహితులను రిఫర్ చేయడానికి 50 పాయింట్లు',
    retailers: {
      amazon: 'Amazon',
      flipkart: 'Flipkart',
      meesho: 'Meesho'
    },
    coupons: {
      amazon10: '₹500 Amazon వౌచర్',
      flipkart10: '₹500 Flipkart వౌచర్',
      meesho15: '₹300 Meesho వౌచర్'
    },
    couponDesc: {
      amazon10: '₹2000 పైన ఎలక్ట్రానిక్స్ కొనుగోలులకు చెల్లుబాటు',
      flipkart10: '₹1500 పైన అన్ని వర్గాలకు చెల్లుబాటు',
      meesho15: 'ఫ్యాషన్ మరియు హోమ్ ఐటమ్‌లకు చెల్లుబాటు'
    },
    redeemed: 'రీడీమ్ చేయబడింది',
    availableIn: 'అందుబాటులో ఉంది',
    days: 'రోజులు',
    copiedToClipboard: 'కూపన్ కోడ్ క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!',
    redeemSuccess: 'కూపన్ విజయవంతంగా రీడీమ్ చేయబడింది!'
  },
  hi: {
    pageTitle: 'रिवार्ड्स डैशबोर्ड',
    pageDesc: 'अपने रिवार्ड पॉइंट्स को ट्रैक करें और टॉप रिटेलर्स से रोमांचक ऑफर्स रिडीम करें।',
    currentPoints: 'वर्तमान पॉइंट्स',
    pointsToNext: 'अगले रिवार्ड के लिए पॉइंट्स',
    redeemAt: '100 पॉइंट्स पर रिडीम करें',
    availableCoupons: 'उपलब्ध कूपन',
    redemptionHistory: 'रिडेम्पशन इतिहास',
    redeemButton: 'अभी रिडीम करें',
    copyCoupon: 'कोड कॉपी करें',
    earnMore: 'और पॉइंट्स कमाएं',
    howToEarn: 'पॉइंट्स कैसे कमाएं',
    earnStep1: 'प्रत्येक ई-वेस्ट सबमिशन के लिए 25 पॉइंट्स',
    earnStep2: 'कम्युनिटी इवेंट्स के लिए 10 बोनस पॉइंट्स',
    earnStep3: 'दोस्तों को रेफर करने के लिए 50 पॉइंट्स',
    retailers: {
      amazon: 'Amazon',
      flipkart: 'Flipkart',
      meesho: 'Meesho'
    },
    coupons: {
      amazon10: '₹500 Amazon वाउचर',
      flipkart10: '₹500 Flipkart वाउचर',
      meesho15: '₹300 Meesho वाउचर'
    },
    couponDesc: {
      amazon10: '₹2000 से अधिक इलेक्ट्रॉनिक्स खरीदारी पर वैध',
      flipkart10: '₹1500 से अधिक सभी श्रेणियों पर वैध',
      meesho15: 'फैशन और होम आइटम्स पर वैध'
    },
    redeemed: 'रिडीम किया गया',
    availableIn: 'उपलब्ध है',
    days: 'दिन',
    copiedToClipboard: 'कूपन कोड क्लिपबोर्ड पर कॉपी किया गया!',
    redeemSuccess: 'कूपन सफलतापूर्वक रिडीम किया गया!'
  },
  ta: {
    pageTitle: 'வெகுமதிகள் டாஷ்போர்ட்',
    pageDesc: 'உங்கள் வெகுமதி புள்ளிகளைக் கண்காணித்து, முதன்மை சில்லறை விற்பனையாளர்களிடமிருந்து உற்சாகமான சலுகைகளை மீட்டெடுக்கவும்.',
    currentPoints: 'தற்போதைய புள்ளிகள்',
    pointsToNext: 'அடுத்த வெகுமதிக்கான புள்ளிகள்',
    redeemAt: '100 புள்ளிகளில் மீட்டெடுக்கவும்',
    availableCoupons: 'கிடைக்கும் கூப்பன்கள்',
    redemptionHistory: 'மீட்டெடுப்பு வரலாறு',
    redeemButton: 'இப்போதே மீட்டெடுக்கவும்',
    copyCoupon: 'குறியீட்டை நகலெடு',
    earnMore: 'அதிக புள்ளிகள் சம்பாதிக்கவும்',
    howToEarn: 'புள்ளிகள் எப்படி சம்பாதிப்பது',
    earnStep1: 'ஒவ்வொரு ஈ-கழிவு சமர்ப்பணத்திற்கும் 25 புள்ளிகள்',
    earnStep2: 'சமூக நிகழ்வுகளுக்கு 10 போனஸ் புள்ளிகள்',
    earnStep3: 'நண்பர்களை பரிந்துரைப்பதற்கு 50 புள்ளிகள்',
    retailers: {
      amazon: 'Amazon',
      flipkart: 'Flipkart',
      meesho: 'Meesho'
    },
    coupons: {
      amazon10: '₹500 Amazon வௌச்சர்',
      flipkart10: '₹500 Flipkart வௌச்சர்',
      meesho15: '₹300 Meesho வௌச்சர்'
    },
    couponDesc: {
      amazon10: '₹2000க்கு மேல் மின்னணுவியல் வாங்குதலுக்கு செல்லுபடியாகும்',
      flipkart10: '₹1500க்கு மேல் அனைத்து வகைகளுக்கும் செல்லுபடியாகும்',
      meesho15: 'ஃபேஷன் மற்றும் வீட்டு பொருட்களுக்கு செல்லுபடியாகும்'
    },
    redeemed: 'மீட்டெடுக்கப்பட்டது',
    availableIn: 'கிடைக்கும்',
    days: 'நாட்கள்',
    copiedToClipboard: 'கூப்பன் குறியீடு கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது!',
    redeemSuccess: 'கூப்பன் வெற்றிகரமாக மீட்டெடுக்கப்பட்டது!'
  }
};

export default function Rewards({ language }: RewardsProps) {
  const t = translations[language as keyof typeof translations];
  const { toast } = useToast();

  const userPoints = 85;
  const pointsToNext = 100 - userPoints;
  const progressPercentage = (userPoints / 100) * 100;

  const availableCoupons = [
    {
      id: 1,
      retailer: 'amazon',
      title: t.coupons.amazon10,
      description: t.couponDesc.amazon10,
      points: 100,
      code: 'EWASTE500AMZ',
      available: true
    },
    {
      id: 2,
      retailer: 'flipkart',
      title: t.coupons.flipkart10,
      description: t.couponDesc.flipkart10,
      points: 100,
      code: 'EWASTE500FKT',
      available: false,
      availableIn: 5
    },
    {
      id: 3,
      retailer: 'meesho',
      title: t.coupons.meesho15,
      description: t.couponDesc.meesho15,
      points: 75,
      code: 'EWASTE300MSH',
      available: true
    }
  ];

  const redemptionHistory = [
    {
      id: 1,
      coupon: '₹200 Amazon Voucher',
      redeemedOn: '2024-01-15',
      points: 50
    },
    {
      id: 2,
      coupon: '₹300 Flipkart Voucher',
      redeemedOn: '2024-01-10',
      points: 75
    }
  ];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: t.copiedToClipboard,
      description: `Code: ${code}`,
    });
  };

  const handleRedeem = (couponTitle: string) => {
    toast({
      title: t.redeemSuccess,
      description: couponTitle,
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">{t.pageDesc}</p>
        </div>

        {/* Current Points Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center gradient-card shadow-medium">
            <CardHeader>
              <Award className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">{userPoints}</CardTitle>
              <CardDescription>{t.currentPoints}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t.pointsToNext}</span>
                <Badge variant="secondary">{pointsToNext} points</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground">{t.redeemAt}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Earn Points */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-success" />
              <span>{t.howToEarn}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">25</span>
                </div>
                <p className="text-sm">{t.earnStep1}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-accent">10</span>
                </div>
                <p className="text-sm">{t.earnStep2}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-success">50</span>
                </div>
                <p className="text-sm">{t.earnStep3}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Available Coupons */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Gift className="h-6 w-6 text-primary" />
              <span>{t.availableCoupons}</span>
            </h2>

            <div className="space-y-6">
              {availableCoupons.map((coupon) => (
                <Card key={coupon.id} className={`transition-smooth ${coupon.available ? 'hover:shadow-medium' : 'opacity-60'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span>{coupon.title}</span>
                          <Badge variant={coupon.available ? "default" : "secondary"}>
                            {coupon.points} pts
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {coupon.description}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={coupon.retailer === 'amazon' ? 'default' : 
                                coupon.retailer === 'flipkart' ? 'secondary' : 'outline'}
                      >
                        {t.retailers[coupon.retailer as keyof typeof t.retailers]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {coupon.available ? (
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleRedeem(coupon.title)}
                          className="btn-eco flex-1"
                          disabled={userPoints < coupon.points}
                        >
                          {t.redeemButton}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyCoupon(coupon.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="secondary">
                        {t.availableIn} {coupon.availableIn} {t.days}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Redemption History */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Star className="h-6 w-6 text-accent" />
              <span>{t.redemptionHistory}</span>
            </h2>

            <div className="space-y-4">
              {redemptionHistory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{item.coupon}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.redeemedOn).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{t.redeemed}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          -{item.points} pts
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {redemptionHistory.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No redemptions yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}