import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal, Cpu } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: '#home', label: 'HUB' },
    { href: '#about', label: 'DATA' },
    { href: '#experience', label: 'LOGS' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#skills', label: 'TECH' },
    { href: '#contact', label: 'Signal' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-dark-bg/80 backdrop-blur-md border-b border-neon-blue/20'
          : 'bg-transparent'
        }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="group flex items-center gap-2 text-2xl font-bold font-tech text-white"
          >
            <Terminal className="text-neon-blue group-hover:animate-pulse" />
            <span className="tracking-widest group-hover:text-neon-blue transition-colors">RG_V2</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="relative px-4 py-2 text-sm font-mono text-gray-400 hover:text-neon-blue transition-colors duration-200 group overflow-hidden"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-neon-blue/10 transform -skew-x-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-neon-blue hover:bg-neon-blue/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 bg-dark-surface/95 backdrop-blur-xl border border-neon-blue/30 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all font-mono"
                >
                  <Cpu size={16} className="text-neon-purple" />
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
