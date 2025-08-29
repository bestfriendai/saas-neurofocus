import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  Target, 
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Calendar,
  BarChart3,
  Timer,
  Focus,
  Shield,
  Sparkles,
  Award,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LandingPage: React.FC = () => {

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "ADHD-Optimized Task Management",
      description: "Break down overwhelming projects into ADHD-friendly micro-tasks with smart prioritization.",
      color: "text-focus-500"
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Pomodoro & Focus Sessions",
      description: "Customizable focus timers with break reminders designed for neurodivergent productivity.",
      color: "text-green-500"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Visual Time Blocking",
      description: "Intuitive calendar interface that makes time management visual and less overwhelming.",
      color: "text-purple-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Productivity Analytics",
      description: "Track your patterns, energy levels, and focus trends to optimize your workflow.",
      color: "text-yellow-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Habit Tracking",
      description: "Build consistent routines with gentle reminders and streak tracking.",
      color: "text-red-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your productivity patterns and ADHD needs.",
      color: "text-blue-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer with ADHD",
      avatar: "SC",
      rating: 5,
      content: "NeuroFocus finally gave me a system that works WITH my ADHD brain, not against it. My productivity has increased 3x!"
    },
    {
      name: "Marcus Thompson",
      role: "Entrepreneur",
      avatar: "MT",
      rating: 5,
      content: "The time blocking feature is a game-changer. I can actually see my day instead of feeling overwhelmed by endless tasks."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Clinical Psychologist",
      avatar: "ER",
      rating: 5,
      content: "I recommend NeuroFocus to all my ADHD clients. It's the first tool that truly understands neurodivergent productivity."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic task management",
        "Simple Pomodoro timer",
        "Up to 3 projects",
        "Basic habit tracking",
        "7-day productivity history"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Focus Pro",
      price: "$12",
      period: "month",
      description: "For serious productivity gains",
      features: [
        "Unlimited tasks & projects",
        "Advanced focus sessions",
        "Visual time blocking",
        "Comprehensive analytics",
        "AI-powered insights",
        "Calendar integrations",
        "Advanced habit tracking",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Team",
      price: "$8",
      period: "user/month",
      description: "For ADHD-friendly teams",
      features: [
        "Everything in Focus Pro",
        "Team collaboration",
        "Shared projects",
        "Team analytics",
        "Admin controls",
        "Custom integrations",
        "Priority support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-focus-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">NeuroFocus</span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <Button variant="outline" size="sm">Sign In</Button>
              <Button variant="focus" size="sm">Start Free Trial</Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="gradient-mesh absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <Badge variant="focus" size="lg" className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Built for ADHD Brains
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Task Management That
              <span className="text-gradient block">Actually Works</span>
              <span className="text-muted-foreground text-2xl md:text-3xl block mt-2">
                for ADHD Minds
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stop fighting your ADHD. Start working with it. NeuroFocus combines time blocking, 
              focus sessions, and habit tracking designed specifically for neurodivergent productivity.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button variant="focus" size="xl" className="group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Cancel anytime
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="glass" className="p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="focus">Live Demo</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">See NeuroFocus in Action</h3>
                  <p className="text-muted-foreground mb-6">
                    Watch how ADHD-friendly design makes productivity feel effortless instead of overwhelming.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Focus className="w-5 h-5 text-focus-500 mr-3" />
                      <span>Visual task breakdown</span>
                    </div>
                    <div className="flex items-center">
                      <Timer className="w-5 h-5 text-green-500 mr-3" />
                      <span>Customizable focus sessions</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-purple-500 mr-3" />
                      <span>Real-time productivity insights</span>
                    </div>
                  </div>
                  
                  <Button variant="focus" className="group">
                    Try Interactive Demo
                    <Play className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="bg-neurofocus-900 rounded-lg p-6 border">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Today's Focus</h4>
                        <Badge variant="success">3/5 completed</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="line-through text-muted-foreground">Review project requirements</span>
                        </div>
                        <div className="flex items-center p-3 bg-focus-500/10 rounded-lg border-l-4 border-focus-500">
                          <Timer className="w-5 h-5 text-focus-500 mr-3 animate-spin" />
                          <span>Write API documentation</span>
                          <Badge variant="focus" size="sm" className="ml-auto">25:00</Badge>
                        </div>
                        <div className="flex items-center p-3 bg-muted/50 rounded-lg border-l-4 border-muted">
                          <Clock className="w-5 h-5 text-muted-foreground mr-3" />
                          <span>Team standup meeting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Features Designed for
              <span className="text-gradient block">ADHD Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every feature is built with neurodivergent productivity patterns in mind, 
              helping you work with your brain's natural rhythms.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card variant="hover" className="p-6 h-full">
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 rounded-lg bg-current/10 flex items-center justify-center mb-4 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Trusted by ADHD Professionals</h2>
            <p className="text-muted-foreground">Join thousands who've transformed their productivity</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-focus-500 mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Users</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">250%</div>
              <div className="text-muted-foreground">Avg. Productivity Increase</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">4.9/5</div>
              <div className="text-muted-foreground">User Rating</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Real stories from people with ADHD who've transformed their productivity</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card variant="glass" className="p-6 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-focus-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Simple, ADHD-Friendly Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your productivity journey</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card 
                  variant={plan.popular ? "focus" : "default"} 
                  className={`p-6 relative h-full ${plan.popular ? 'ring-2 ring-focus-500' : ''}`}
                >
                  {plan.popular && (
                    <Badge variant="focus" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant={plan.popular ? "focus" : "outline"} 
                      className="w-full"
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="glass" className="p-12 relative overflow-hidden">
              <div className="gradient-radial absolute inset-0 opacity-50" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your
                  <span className="text-gradient block">ADHD Productivity?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of ADHD professionals who've already discovered 
                  a productivity system that actually works with their brain.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button variant="focus" size="xl" className="group">
                    Start Your Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="xl">
                    Schedule Demo
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-500" />
                    14-day free trial
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    ADHD-friendly design
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-500" />
                    30-day money back
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-focus-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">NeuroFocus</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Task management and productivity tools designed specifically for ADHD minds.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">ADHD Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Productivity Tips</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 NeuroFocus. Made with ❤️ for the ADHD community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;