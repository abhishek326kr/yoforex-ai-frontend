import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import {
  Zap,
  Brain,
  TrendingUp,
  BarChart3,
  Shield,
  Globe,
  Smartphone,
  Clock,
  DollarSign,
  Target,
  Activity,
  ArrowRight,
  Play,
  Star,
  Users,
  Award,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Cpu,
  Database,
  Wifi,
  Lock,
  Eye,
  BarChart,
  PieChart,
  LineChart
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze market patterns in real-time",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: TrendingUp,
    title: "Real-time Signals",
    description: "Get instant trading signals with high accuracy predictions",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Shield,
    title: "Secure Trading",
    description: "Bank-grade security with encrypted transactions and data protection",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Access to major forex pairs and international markets 24/7",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: Smartphone,
    title: "Mobile Trading",
    description: "Trade anywhere with our responsive mobile-optimized platform",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Continuous market monitoring and automated trading capabilities",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  }
];

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Win Rate", value: "89%", icon: Target },
  { label: "Daily Signals", value: "1.2K+", icon: Activity },
  { label: "Markets", value: "150+", icon: Globe }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Trader",
    content: "YoForex AI has revolutionized my trading strategy. The AI signals are incredibly accurate!",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Day Trader",
    content: "The real-time analysis and automated features have increased my profits by 300%.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emma Davis",
    role: "Investment Manager",
    content: "Best trading platform I've ever used. The security features give me complete peace of mind.",
    rating: 5,
    avatar: "ED"
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for beginners",
    features: [
      "Basic AI Signals",
      "5 Trading Pairs",
      "Email Support",
      "Mobile App Access",
      "Basic Analytics"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "For serious traders",
    features: [
      "Advanced AI Signals",
      "All Trading Pairs",
      "Priority Support",
      "Advanced Analytics",
      "Custom Alerts",
      "Portfolio Management"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    description: "For institutions",
    features: [
      "Custom AI Models",
      "API Access",
      "Dedicated Support",
      "White-label Solutions",
      "Advanced Reporting",
      "Multi-account Management"
    ],
    popular: false
  }
];

export function Landing() {
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-glass border-b border-border/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">YoForex AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => setLocation("/auth")}
              >
                Login
              </Button>
              <Button
                className="bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                onClick={() => setLocation("/auth")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="secondary" className="bg-gradient-profit text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered Trading
                </Badge>
                <Badge variant="secondary" className="bg-gradient-primary text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Real-time Signals
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Revolutionize Your
                <span className="text-gradient-primary"> Trading</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the future of forex trading with AI-powered analysis, real-time signals, 
                and automated strategies that deliver consistent profits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:bg-gradient-primary/90 text-white text-lg px-8 py-6"
                  onClick={() => setLocation("/auth")}
                >
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/30 hover:bg-muted/20 text-white text-lg px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-white">
              Why Choose <span className="text-gradient-primary">YoForex AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced platform combines cutting-edge AI technology with professional trading tools
              to give you the edge in the forex market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-gradient-glass border-border/20 shadow-glass p-6 space-y-4 hover:shadow-glow transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`p-3 rounded-lg w-fit ${feature.bgColor}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Interface Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-white">
              Professional <span className="text-gradient-primary">Trading Interface</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our intuitive and powerful trading platform designed for both beginners and professionals.
            </p>
          </div>

          <div className="relative">
            <Card className="bg-gradient-glass border-border/20 shadow-glass p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Preview */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">EUR/USD - Live Chart</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        BUY
                      </Badge>
                      <Badge variant="secondary">89% Confidence</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/20 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Interactive Trading Chart</p>
                    </div>
                  </div>
                </div>

                {/* AI Signals */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">AI Signals</h3>
                  <div className="space-y-3">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">GBP/JPY</span>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                          SELL
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Entry: 189.45</div>
                        <div>Target: 188.20</div>
                        <div>Confidence: 82%</div>
                      </div>
                    </div>
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">USD/CAD</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          BUY
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>Entry: 1.3612</div>
                        <div>Target: 1.3648</div>
                        <div>Confidence: 76%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-white">
              What Our <span className="text-gradient-primary">Traders Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful traders who trust YoForex AI for their trading decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-glass border-border/20 shadow-glass p-6 space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-white">
              Choose Your <span className="text-gradient-primary">Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with our free trial and upgrade as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gradient-glass border-border/20 shadow-glass p-6 space-y-6 ${
                  plan.popular ? 'border-primary/50 shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-primary hover:bg-gradient-primary/90 text-white'
                      : 'bg-muted/20 hover:bg-muted/30 text-white border-border/30'
                  }`}
                  onClick={() => setLocation("/auth")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            Ready to Start <span className="text-gradient-primary">Trading</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of traders who are already profiting with YoForex AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white text-lg px-8 py-6"
              onClick={() => setLocation("/auth")}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/30 hover:bg-muted/20 text-white text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-gradient-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">YoForex AI</span>
              </div>
              <p className="text-muted-foreground">
                Advanced AI-powered trading platform for professional forex traders.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Trading Signals</div>
                <div>AI Analysis</div>
                <div>Portfolio Management</div>
                <div>Risk Management</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Live Chat</div>
                <div>Email Support</div>
                <div>Documentation</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Risk Disclosure</div>
                <div>Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 YoForex AI. All rights reserved. Trading involves risk.
          </div>
        </div>
      </footer>
    </div>
  );
} 