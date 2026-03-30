import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Brain, ShieldCheck, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: FileText,
    title: 'Document Upload',
    description: 'Drag and drop your PDFs, Word docs, or text files. We handle the rest.',
  },
  {
    icon: Brain,
    title: 'Smart AI Answers',
    description: 'Get context-aware responses that actually understand your notes.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Hallucination',
    description: 'Answers come only from your uploaded materials. No made-up information.',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Your knowledge, enhanced. Study smarter with AI that knows your content.',
  },
];

const floatingElements = [
  { delay: 0, x: '10%', y: '20%', size: 60 },
  { delay: 1, x: '80%', y: '15%', size: 40 },
  { delay: 2, x: '70%', y: '70%', size: 50 },
  { delay: 0.5, x: '15%', y: '75%', size: 35 },
  { delay: 1.5, x: '50%', y: '85%', size: 45 },
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTryDemo = () => {
    if (user) {
      navigate('/chat');
    } else {
      navigate('/auth');
    }
  };

  const handleUploadNotes = () => {
    if (user) {
      navigate('/upload');
    } else {
      navigate('/auth?signup=true');
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <Navbar />

      {/* Floating Background Elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/5 blur-xl pointer-events-none"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Powered by AI</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your AI Study Companion
              <br />
              <span className="text-gradient">Powered by Your Notes</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Upload your documents and get smart, accurate answers instantly. 
              Study smarter, not harder.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="glow text-lg px-8 py-6 rounded-2xl group"
                onClick={handleTryDemo}
              >
                Try Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-2xl border-border/50 hover:border-primary/50 hover:bg-primary/5"
                onClick={handleUploadNotes}
              >
                Upload Notes
              </Button>
            </div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="glass-strong rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-secondary rounded-full w-3/4" />
                  <div className="h-4 bg-secondary rounded-full w-1/2" />
                  <div className="h-4 bg-secondary rounded-full w-5/6" />
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4 justify-end">
                <div className="flex-1 space-y-3 max-w-md">
                  <div className="h-4 bg-primary/30 rounded-full w-full" />
                  <div className="h-4 bg-primary/30 rounded-full w-2/3" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary/50" />
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to <span className="text-gradient">study better</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Our AI understands your notes and helps you learn faster
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-strong rounded-3xl p-8 group cursor-pointer transition-all duration-300 hover:border-primary/30"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:glow-sm transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to transform your studying?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of students who are already learning smarter with RAG Tutor.
              </p>
              <Button
                size="lg"
                className="glow text-lg px-10 py-6 rounded-2xl"
                onClick={handleUploadNotes}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold">RAG Tutor</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 RAG Tutor. Built for students, by students.
          </p>
        </div>
      </footer>
    </div>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
