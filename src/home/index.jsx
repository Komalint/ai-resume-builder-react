import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { 
  Edit, 
  Share2, 
  Sparkles, 
  PlayCircle, 
  ArrowRight, 
  MousePointer2, 
  Wand2, 
  Download,
  CheckCircle2,
  Layout,
  ShieldCheck
} from 'lucide-react'
import React from 'react'

function Home() {
  return (
    <div className="bg-white selection:bg-primary/10 selection:text-primary">
      <Header />
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-20 pb-12 lg:pt-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-100/50 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-slate-600">The future of job hunting is here</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8">
            Build a Resume that <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Gets You Hired.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
            Harness the power of <b>Gemini AI</b> to create professional, ATS-optimized resumes in minutes. Smart suggestions, instant formatting, and recruiter-approved templates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all gap-3">
                Build My Resume <ArrowRight className="w-5 h-5"/>
              </Button>
            </Link>
            
            <a href="https://www.youtube.com/watch?v=RiUh_8VTGYM" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-slate-50 gap-3">
                <PlayCircle className="w-5 h-5 text-primary"/> Watch Demo
              </Button>
            </a>  
          </div>

          {/* Product Preview Mockup */}
          <div className="relative max-w-5xl mx-auto">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-3xl blur opacity-15" />
             <div className="relative rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden shadow-indigo-100">
                <img 
                  src="/Banner-Image.png" 
                  alt="AI Resume Builder Dashboard" 
                  className="w-full object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* --- POWERED BY SECTION --- */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">
            Built with World-Class Technology
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Gemini_logo.svg" alt="Gemini AI" className="h-7 md:h-9" />
             <img src="https://strapi.io/assets/strapi-logo-dark.svg" alt="Strapi" className="h-7 md:h-9" />
             <img src="https://clerk.com/_next/static/media/logo.2e3d3a04.svg" alt="Clerk" className="h-7 md:h-9" />
             <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-800 tracking-tighter">
                <span className="text-blue-500">React</span>
                <span className="text-slate-300">/</span>
                <span className="text-teal-500">Tailwind</span>
             </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">Create your resume in 3 simple steps</h3>
            <p className="text-lg text-slate-600">Our AI-driven workflow simplifies the complex task of resume writing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
             {/* Decorative Path Line for Desktop */}
            <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-[2px] bg-slate-100 -z-0" />
            
            <StepItem 
              number="01"
              Icon={MousePointer2}
              title="Input Details"
              desc="Fill in your work history and education. Our smart forms guide you through every field."
            />
            <StepItem 
              number="02"
              Icon={Wand2}
              title="AI Magic"
              desc="Gemini AI generates powerful bullet points and summaries tailored to your target job."
            />
            <StepItem 
              number="03"
              Icon={Download}
              title="Export PDF"
              desc="Pick a template, customize the theme, and download your recruiter-ready resume."
            />
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Powerful features to give you an <span className="text-primary text-glow">unfair advantage.</span>
              </h2>
              <div className="space-y-6">
                <FeatureCheck title="ATS-Friendly Templates" desc="Resumes designed to pass through every Applicant Tracking System." />
                <FeatureCheck title="Real-time Customization" desc="Change colors, fonts, and layouts instantly with live preview." />
                <FeatureCheck title="AI-Powered Suggestions" desc="Smart phrasing that highlights your achievements, not just tasks." />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <FeatureCardSmall Icon={Layout} title="Modern Layouts" />
               <FeatureCardSmall Icon={ShieldCheck} title="Data Privacy" />
               <FeatureCardSmall Icon={Edit} title="Easy Editor" />
               <FeatureCardSmall Icon={Share2} title="Social Sharing" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">Ready to boost your career?</h2>
        <Link to="/dashboard">
          <Button size="lg" className="h-16 px-12 rounded-2xl text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/30">
            Get Started For Free
          </Button>
        </Link>
        <p className="mt-6 text-slate-400 text-sm">No credit card required • Unlimited AI generations</p>
      </section>
    </div>
  )
}

// --- HELPER COMPONENTS ---

function StepItem({ number, Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10 group">
      <div className="h-20 w-20 bg-white border-2 border-slate-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-500">
        <Icon className="h-10 w-10 text-primary" />
        <span className="absolute -top-2 -right-2 h-8 w-8 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
          {number}
        </span>
      </div>
      <h4 className="text-2xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

function FeatureCheck({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 bg-primary/20 p-1 rounded-full h-fit">
        <CheckCircle2 className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h5 className="font-bold text-xl mb-1">{title}</h5>
        <p className="text-slate-400">{desc}</p>
      </div>
    </div>
  )
}

function FeatureCardSmall({ Icon, title }) {
  return (
    <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/10 transition-colors cursor-default">
      <Icon className="h-8 w-8 text-primary mb-4" />
      <h5 className="font-bold text-lg">{title}</h5>
    </div>
  )
}

export default Home