'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Zap, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIParticles } from '@/components/effects/AIParticles';

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI Attendance',
      description: 'Automatic face recognition-based attendance tracking with 99.7% accuracy.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Gesture Recognition',
      description: 'Real-time hand gesture detection for seamless classroom interaction.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Engagement Analytics',
      description: 'Deep insights into student attention, participation, and learning patterns.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Users,
      title: 'Smart Classrooms',
      description: 'AI-powered classroom intelligence for enhanced teaching effectiveness.',
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AIParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                VEYRA
              </span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <Button variant="premium" size="sm">Get Started</Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-mesh">
        <div className="container mx-auto px-6 pt-20">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-muted-foreground">The Future of Classroom Intelligence</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                Transform Online Classrooms with{' '}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AI-Powered Intelligence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Real-time engagement analytics, automatic attendance, and intelligent insights 
                powered by cutting-edge AI technology.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="premium" size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {[
                { value: '99.7%', label: 'Accuracy' },
                { value: '50K+', label: 'Students' },
                { value: '500+', label: 'Institutions' },
                { value: '1M+', label: 'Sessions Analyzed' },
              ].map((stat, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Animated Dashboard Preview */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 gradient-mesh opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Powered by{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Advanced AI
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge AI models analyze every aspect of your classroom to provide actionable insights.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-8 group hover:scale-105 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="glass rounded-3xl p-12 md:p-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join hundreds of institutions already using VEYRA to enhance their teaching effectiveness.
            </p>
            <Button variant="premium" size="lg">
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">VEYRA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 VEYRA. All rights reserved. Built with ❤️ for education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
