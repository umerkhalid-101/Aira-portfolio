import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Mail, Linkedin, Instagram, ArrowDown, ArrowLeft } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Nav = () => {
  const links = [
    { name: 'HOME', href: '/' },
    { name: 'WORK', href: '/work' },
    { name: 'PLAYGROUND', href: '/playground' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:px-10 md:py-8 mix-blend-difference text-white">
      <div className="flex gap-8">
        {links.map((link) => (
          <Link 
            key={link.name} 
            to={link.href} 
            className="text-[10px] font-bold tracking-widest hover:italic transition-all"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-1.5 border border-white/30 rounded-full">
          <p className="text-[10px] font-mono tracking-widest opacity-60 uppercase">AIRA RAZI</p>
        </div>
      </div>
    </nav>
  );
};

const SectionHeader = ({ subtitle, title, count, centered = true }: { subtitle: string, title: string, count?: string, centered?: boolean }) => (
  <div className={cn(
    "py-20 border-b border-ink flex flex-col gap-4",
    centered ? "items-center text-center" : "items-start text-left"
  )}>
    <p className="text-xs font-bold tracking-widest uppercase opacity-60">{subtitle}</p>
    <h2 className="text-huge flex items-baseline gap-4">
      {title}
      {count && <span className="text-[0.2em] font-mono align-top">({count})</span>}
    </h2>
  </div>
);

const Tile = ({ title, category, year, href = "#" }: { title: string, category: string, year: string, href?: string }) => (
  <motion.a 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    href={href}
    className="group block w-full border-b border-ink py-12 md:py-20 hover:bg-ink hover:text-bg transition-colors duration-500 px-6 md:px-10 overflow-hidden"
  >
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-mono tracking-widest opacity-60 uppercase">{category} — {year}</p>
        <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none group-hover:italic transition-all duration-500">
          {title}
        </h3>
      </div>
      <div className="text-right">
        <span className="text-sm font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform inline-block">
          Discover More
        </span>
      </div>
    </div>
  </motion.a>
);

const Footer = () => (
  <footer className="p-10 border-t border-ink flex flex-col md:flex-row justify-between items-center gap-6">
    <p className="text-[10px] font-mono tracking-widest opacity-40 uppercase">© 2026 AIRA RAZI — ALL RIGHTS RESERVED</p>
    <div className="flex gap-10">
      <Link to="/" className="text-[10px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100">Home</Link>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100">Back to top</button>
    </div>
  </footer>
);

// --- Data ---

const PROJECTS = [
  {
    id: 'colabs',
    title: 'COLABS',
    category: 'Photography & Direction',
    year: '2024',
    description: 'A visual exploration of collaborative spaces and the people who inhabit them. This project captures the essence of shared creativity and the dynamic energy of modern workspaces.',
    coverImage: 'https://lh3.googleusercontent.com/d/1zgc_2NAmcNHz9YbIr0dcKld1AGrWcrJl',
    videoHero: true,
    theme: {
      bg: '#fafafa',
      accent: '#000000',
      text: '#1a1a1a'
    },
    media: [
      { type: 'image', id: '1_YcPCwqsUWnvyP3sPyRU29Ul2VVxvhRT' },
      { type: 'image', id: '1DYrH_KRYQ6BUITa_9QdVYREKmUHakxMZ' },
      { type: 'image', id: '1YcikPZLVFbNvSFEfTqK9YqFHdiAZjAj9' },
      { type: 'image', id: '1uhLvgt-9iaqNOIT3LRyd7ah0QiaNnChG' },
      { type: 'video', id: '1pcwjJU6ia3s4PfpcHL8aY1LscW_4xgu6' },
      { type: 'video', id: '1bKN2p5Ar4kq25j7HqaIJg6u7MkZAAR3R' },
      { type: 'video', id: '1kcLIrAy3_yVA2VWCq7B6GCMmqW593_fW' },
      { type: 'video', id: '1Py2DccS-ixOFoFQEY890A_-hpmZQHab3' },
      { type: 'video', id: '154PWSfKLaLrMhG_wBBHd7cvMIbjrGrxP' }
    ]
  },
  { 
    id: 'shoplanes', 
    title: 'SHOPLANES', 
    category: 'Content Strategy', 
    year: '2025',
    description: 'Defining the digital voice for a premium retail experience. Shoplanes is where modern commerce meets sophisticated design, creating a seamless bridge between brand and consumer.',
    coverImage: 'https://lh3.googleusercontent.com/d/1kjbY4rtd5MLQB1ubY5EzxfnCb4nOKuvy',
    videoHero: false,
    theme: {
      bg: '#f0f4f8',
      accent: '#2d5a27',
      text: '#1a202c'
    },
    media: [
      { type: 'image', id: '1kjbY4rtd5MLQB1ubY5EzxfnCb4nOKuvy' },
      { type: 'video', id: '1sn2BM7syBxXLK1rCJVt1zjB-AO_SXAWC' },
      { type: 'video', id: '1Ma1xzjiJEMCmy9Gb3iA0KQHSee8LbavH' },
      { type: 'video', id: '180Vu7Ek4pqfyhFEaTZP04iMtitAJON0T' }
    ]
  },
  { 
    id: 'beechtree', 
    title: 'BEECHTREE', 
    category: 'Product Design', 
    year: '2024',
    description: 'Crafting a seamless shopping journey for a leading fashion brand. Beechtree focuses on organic growth and sustainable design patterns, blending traditional aesthetics with modern digital commerce.',
    coverImage: 'https://lh3.googleusercontent.com/d/1WXRwc7Vt8gGPul7xNwDHAGPBe0mvaRNN',
    videoHero: true,
    theme: {
      bg: '#fdfbf7',
      accent: '#8c7851',
      text: '#4a3f35'
    },
    media: [
      { type: 'image', id: '1WXRwc7Vt8gGPul7xNwDHAGPBe0mvaRNN' },
      { type: 'image', id: '1RGNFTep5t1aAhtWzcqSdkNMrEFEZlVBT' },
      { type: 'image', id: '1TghFDS1aTASJtrfw2V2GUunfSpI-6gLX' },
      { type: 'image', id: '1Quafy0DnkqdbYSNaUrvcym_7z20e7CG7' },
      { type: 'image', id: '1vkaphQIfmKwhPSrdSRDfd2PWopwTracM' },
      { type: 'image', id: '1HUCqkZnHXbjgZBOObSNxrhi19eDNChzY' },
      { type: 'image', id: '1NUic-wTpdeX2OCMP_h2OK3y2sNBb55fG' },
      { type: 'image', id: '1_urvvTgIgvqP7p8nKnIJLQdWOYiori9Q' },
      { type: 'video', id: '1LR9iQyv4bP8AHg3VnpiThPbqe2xLQqZ0' }
    ]
  },
  { 
    id: 'mondsub', 
    title: 'MONDSUB', 
    category: 'Skincare & Branding', 
    year: '2026',
    description: 'Elevating skincare through minimalist design and authentic visual storytelling. Mondsub combines clinical precision with a clean, modern aesthetic.',
    coverImage: 'https://lh3.googleusercontent.com/d/1k8SCdvXyLw3APRNgPRaAKLgqICZeO07I',
    videoHero: false,
    theme: {
      bg: '#f8f9fa',
      accent: '#2b2d42',
      text: '#1a1a1a'
    },
    media: [
      { type: 'image', id: '1mbIU3mQnpf4VG-9TU3YFEDNwrHb67yon' },
      { type: 'image', id: '1jVldC0aMRfNjsHukvH0i3g2UGUdLMU_r' },
      { type: 'image', id: '1skJhI_ZQ3Dy6cOpCSsW9RWkX-pXYzdHV' },
      { type: 'image', id: '1YfvTVtPZM9VNsf2SJA5oXxAsFdilMH5C' },
      { type: 'video', id: '1gyBipDM2CJLMf68V58oQM5gilIt8GeDe' },
      { type: 'image', id: '1wKKo5ZxsYjoi6qXBbldwFA1ZOUeCXPe0' },
      { type: 'image', id: '1v29kpjVU7rDmz9TazswNqtrM9_aDL97p' },
      { type: 'image', id: '12qEjoVOCQqcamk6D4W12wJgragRtiBrj' }
    ]
  },
  { 
    id: 'fashion-reels', 
    title: 'FASHION REELS', 
    category: 'Creative Direction', 
    year: '2023',
    description: 'Dynamic short-form content that captures the pulse of modern fashion. High energy, bold transitions, and trend-setting visuals designed for the digital age.',
    coverImage: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bG43NTNhcDFpNjBlbWtrNXUzemFqOXJ4bWVyanVwcGo0azlqNHoyayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QHwf11y2ZfFSM/giphy.gif',
    videoHero: false,
    theme: {
      bg: '#0a0a0a',
      accent: '#ffffff',
      text: '#e5e5e5'
    },
    media: [
      { type: 'video', id: '17VZCwZ5BwqOk4sS_cXsL-bwDfHkIJL2g' },
      { type: 'video', id: '130EG_WnGoTJ2rRUgjgnry8uFnhB1e--x' },
      { type: 'video', id: '1Vd3FHPveBjhYR5k4ngIHWZBL6JgczraX' },
      { type: 'video', id: '1vjyypN9YUWERugLQSkY-Y7RX9VNg5kxo' },
      { type: 'video', id: '1JzdjVCztiRq3JZr91vXwhNoSRKRn3HA7' },
      { type: 'video', id: '1rd6yHsE2GwYO429n2epmUAlGL-gN_VmK' },
      { type: 'video', id: '1_i4byIq2lcoN84SeJqMAg5MNWYEaWqo-' },
      { type: 'video', id: '1rKAlscg591eic9G4cxmrmPwUZ76mK3Fz' },
      { type: 'video', id: '1_7-cv28Sf5L7uhbH7_juo3h8OMKmGXRd' },
      { type: 'video', id: '1RJk6QfD3MJV0mCQFAEP2vR_I82Q0QGUm' },
      { type: 'video', id: '1X36fLT1yjZ5snoVQ-dLrec0dBRfAnMN-' }
    ]
  }
];

// --- Pages ---

const Home = () => {
  const heroRef = React.useRef(null);
  const workRef = React.useRef(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const { scrollYProgress: workScroll } = useScroll({
    target: workRef,
    offset: ["start end", "center center"]
  });
  
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const workImageOpacity = useTransform(workScroll, [0, 1], [0, 0.6]);
  const workScale = useTransform(workScroll, [0, 1], [1.1, 1]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4 p-4"
    >
      {/* Hero Tile */}
      <section 
        ref={heroRef}
        className="relative h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-white border border-ink/10 rounded-3xl"
      >
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0 opacity-40 grayscale mix-blend-multiply"
        >
          <img 
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnlrNnFuNGJvMHJjOW5pNmdubGdmYTNxMnd5OHhidzZtbXFtcGZ4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a90RWQguS2ywYcgKII/giphy.gif" 
            alt="Background" 
            className="w-full h-full object-cover scale-125"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-2"
        >
          <h1 className="text-huge">HELLO</h1>
          <h1 className="text-huge italic">NICE TO</h1>
          <h1 className="text-huge">MEET YOU</h1>
        </motion.div>
        
        <div className="absolute bottom-10 flex flex-col items-center gap-2 z-10">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">Please Scroll</p>
        </div>
      </section>

      {/* Work Tile */}
      <Link 
        to="/work" 
        ref={workRef}
        className="group relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden bg-white rounded-3xl border border-ink/10"
      >
        <motion.div 
          style={{ opacity: workImageOpacity, scale: workScale }}
          className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1MvPASCMV57SRXerH5JrNydb0qMiYgEzw" 
            alt="Work" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="relative z-10 flex flex-col gap-4 text-ink group-hover:text-white transition-colors duration-500">
          <p className="text-xs font-bold tracking-widest uppercase opacity-60">2023—2025</p>
          <h2 className="text-huge group-hover:italic transition-all">WORK</h2>
          <h2 className="text-huge">(5)</h2>
        </div>
      </Link>

      {/* Playground Tile */}
      <Link to="/playground" className="group relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden bg-white rounded-3xl border border-ink/10">
        <div className="relative z-10 flex flex-col gap-4">
          <p className="text-xs font-bold tracking-widest uppercase opacity-60">FUN WORKS ALONG THE WAY</p>
          <h2 className="text-huge group-hover:italic transition-all">PLAY-</h2>
          <h2 className="text-huge">GROUND</h2>
        </div>
      </Link>

      {/* About Tile */}
      <a href="#about" className="group relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden bg-white rounded-3xl border border-ink/10">
        <div className="relative z-10 flex flex-col gap-4">
          <p className="text-xs font-bold tracking-widest uppercase opacity-60">LET'S GET TO KNOW EACH OTHER</p>
          <h2 className="text-huge group-hover:italic transition-all">ABOUT</h2>
        </div>
      </a>

      {/* About Content Section (Hidden until scroll or separate) */}
      <section id="about" className="py-40 px-6 md:px-10 bg-white border border-ink/10 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-6xl font-bold tracking-tight leading-tight uppercase">
            I'm Aira, a Content Designer who believes in <span className="italic">pushing culture</span> and challenging standards through <span className="italic">creativity</span>, collaboration and lots of coffee.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 md:px-10 text-center flex flex-col items-center gap-10 bg-white border border-ink/10 rounded-3xl">
        <h2 className="text-huge hover:italic cursor-pointer transition-all">HOLLA AT ME</h2>
        <div className="flex flex-col gap-4">
          <a href="mailto:hello@airarazi.com" className="text-2xl md:text-4xl font-black tracking-tighter uppercase hover:italic transition-all">
            HELLO@AIRARAZI.COM
          </a>
          <div className="flex justify-center gap-8 mt-10">
            <a href="#" className="text-xs font-bold tracking-widest uppercase hover:italic">LinkedIn</a>
            <a href="#" className="text-xs font-bold tracking-widest uppercase hover:italic">Instagram</a>
            <a href="#" className="text-xs font-bold tracking-widest uppercase hover:italic">Twitter</a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const WorksPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.96 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1], // easeOutCubic
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="pt-32 min-h-screen bg-white pb-40"
    >
      <div className="px-6 md:px-10 mb-20">
        <SectionHeader subtitle="2023—2025" title="WORKS" count={PROJECTS.length.toString()} centered={false} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
          >
            <Link 
              to={`/work/${project.id}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100"
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full relative"
              >
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-10 left-10 right-10 z-10 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] font-mono tracking-widest uppercase mb-2">{project.category} — {project.year}</p>
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">{project.title}</h2>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) return <div className="h-screen flex items-center justify-center">Project not found</div>;

  const theme = project.theme || { bg: '#ffffff', text: '#141414', accent: '#141414' };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: theme.bg, color: theme.text }}
      className="min-h-screen pt-32 transition-colors duration-700"
    >
      {/* Header */}
      <section className="px-6 md:px-10 mb-20">
        <div className="flex flex-col gap-6">
          <Link to="/work" className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity" style={{ color: theme.text }}>
            <ArrowLeft className="w-3 h-3" /> Back to Works
          </Link>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono tracking-widest uppercase opacity-60">{project.category} — {project.year}</p>
            <h1 className="text-huge leading-none tracking-tighter uppercase" style={{ color: theme.accent }}>{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Hero Image / Video */}
      <section className="px-6 md:px-10 mb-20">
        <div className="aspect-video w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl relative">
          {project.videoHero && project.media && project.media.find(m => m.type === 'video') ? (
            <iframe 
              src={`https://drive.google.com/file/d/${project.media.find(m => m.type === 'video')?.id}/preview`}
              className="absolute inset-0 w-full h-full border-0"
              allow="fullscreen"
            />
          ) : (
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </section>

      {/* Description */}
      <section className="px-6 md:px-10 mb-40 max-w-5xl">
        <p className="text-2xl md:text-5xl font-bold tracking-tight leading-tight uppercase">
          {project.description || "Project description coming soon. We are currently updating our portfolio with the latest works and case studies."}
        </p>
      </section>

      {/* Media Grid */}
      {project.media && project.media.length > 0 && (
        <section className="px-6 md:px-10 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.media.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "overflow-hidden rounded-3xl bg-neutral-100 relative shadow-lg",
                  item.type === 'video' 
                    ? "aspect-[9/16] md:row-span-2" 
                    : (i % 5 === 0 ? "md:col-span-2 aspect-video" : "aspect-square")
                )}
              >
                {item.type === 'video' ? (
                  <div className="absolute inset-0 bg-black overflow-hidden">
                    <iframe 
                      src={`https://drive.google.com/file/d/${item.id}/preview`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="fullscreen"
                    />
                  </div>
                ) : (
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${item.id}`} 
                    alt={`${project.title} ${i}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Link */}
      <section className="border-t border-ink/10 py-40 px-6 md:px-10 flex flex-col items-center gap-10">
        <p className="text-xs font-bold tracking-widest uppercase opacity-40">Next Project</p>
        <Link 
          to={`/work/${PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].id}`}
          className="text-huge hover:italic transition-all text-center leading-none tracking-tighter"
          style={{ color: theme.accent }}
        >
          {PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].title}
        </Link>
      </section>
    </motion.div>
  );
};

const PlaygroundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="px-6 md:px-10">
        <SectionHeader subtitle="FUN WORKS ALONG THE WAY" title="PLAY-GROUND" />
      </div>
      <div className="flex flex-col">
        <Tile title="AI Ethics" category="Article" year="2024" />
        <Tile title="Microcopy" category="Case Study" year="2023" />
        <Tile title="Automation" category="Workshop" year="2023" />
        <Tile title="Future of UX" category="Talk" year="2022" />
      </div>
    </motion.div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-bg selection:bg-ink selection:text-bg">
        <Nav />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorksPage />} />
            <Route path="/work/:id" element={<ProjectDetailPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}
