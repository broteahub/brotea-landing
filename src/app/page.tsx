"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#9b87f5]">
      {/* Navigation */}
      <nav className="p-6 relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
<Link href="/" className="text-[32px] font-bold tracking-wider text-white">
  Brotea
</Link>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden bg-[#1A1F2C] p-2 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-white/80">Home</button>
              <button onClick={() => scrollToSection('academy')} className="text-white hover:text-white/80">Academy</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-white/80">About us</button>
              <button onClick={() => scrollToSection('grow')} className="text-white hover:text-white/80">Grow</button>
              <button className="bg-[#1A1F2C] text-white px-6 py-2 rounded-xl">
                Join us
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute left-0 right-0 top-full mt-2 p-4 bg-[#1A1F2C] rounded-xl mx-4"
            >
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-white hover:text-white/80 text-left">Home</button>
                <button onClick={() => scrollToSection('academy')} className="text-white hover:text-white/80 text-left">Academy</button>
                <button onClick={() => scrollToSection('about')} className="text-white hover:text-white/80 text-left">About us</button>
                <button onClick={() => scrollToSection('grow')} className="text-white hover:text-white/80 text-left">Grow</button>
                <button className="bg-[#CAFF00] text-black px-6 py-2 rounded-xl text-left">
                  Join us
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Hero Section */}
        <motion.div 
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#CAFF00] rounded-[24px] md:rounded-[32px] p-6 md:p-12"
        >
          <div className="md:grid md:grid-cols-2 md:gap-12">
            <div>
              <h1 className="text-[32px] md:text-[52px] leading-tight font-medium text-black mb-4">
                Conexiones que brotan, ideas que transforman.
              </h1>
              <p className="text-[16px] md:text-[18px] text-black/80 mb-6">
                Donde talento y oportunidades se encuentran para crear un futuro más inclusivo.
              </p>
              <div className="hidden md:flex space-x-4">
                <button className="bg-[#1A1F2C] text-white px-6 py-3 rounded-xl">
                  Join us
                </button>
                <button className="bg-white/90 text-black px-6 py-3 rounded-xl">
                  Descubre más
                </button>
              </div>
            </div>
            <div className="relative h-32 md:h-full mt-4 md:mt-0">
              <Image 
                src="/images/hero-illustration.png"
                alt="Ilustración Brotea"
                width={500}
                height={500}
                className="absolute right-0 bottom-0 h-full object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Academy Section */}
        <motion.div 
          id="academy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-[#7E69AB] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
        >
          <h2 className="pixel-text text-[40px] md:text-[64px] text-[#CAFF00] mb-6">Academy</h2>
          <button className="bg-[#1A1F2C] text-white px-4 py-2 rounded-xl">
            Descubre más
          </button>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 8px)'
            }}></div>
          </div>
        </motion.div>

        {/* Info Cards Grid */}
        <div id="about" className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#FFDEE2] rounded-[24px] md:rounded-[32px] p-6 md:p-12"
          >
            <h3 className="text-[24px] md:text-[32px] leading-tight font-medium mb-6">
              ¿Qué hacemos?<br/>¿Quienes somos?
            </h3>
            <button className="bg-[#CAFF00] text-black px-4 py-2 rounded-xl">
              Descubrelo aquí
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#FFDEE2] rounded-[24px] md:rounded-[32px] p-6 md:p-12"
          >
            <h3 className="text-[24px] md:text-[32px] leading-tight font-medium mb-6">
              ¿Tienes un proyecto?<br/>Brotea te ayuda.
            </h3>
            <button className="bg-[#CAFF00] text-black px-4 py-2 rounded-xl">
              Descubre como aquí
            </button>
          </motion.div>
        </div>

        {/* Grow Section */}
        <motion.div 
          id="grow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative rounded-[24px] md:rounded-[32px] overflow-hidden"
        >
          <Image 
            src="/images/grow-image.png"
            alt="Grow"
            width={1200}
            height={400}
            className="w-full h-48 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-12">
            <h2 className="pixel-text text-[40px] md:text-[64px] text-[#CAFF00] mb-6">GROW</h2>
            <button className="bg-[#1A1F2C] text-white px-4 py-2 rounded-xl w-fit">
              Descubre cómo puedes crecer aquí
            </button>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#1A1F2C] rounded-[24px] md:rounded-[32px] p-6 aspect-square flex items-center justify-center"
          >
            <span className="pixel-text text-[#CAFF00] text-xl md:text-2xl">lead</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#1A1F2C] rounded-[24px] md:rounded-[32px] p-6 aspect-square flex items-center justify-center"
          >
            <span className="pixel-text text-[#CAFF00] text-xl md:text-2xl">learn</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#1A1F2C] rounded-[24px] md:rounded-[32px] p-6 aspect-square flex items-center justify-center md:col-span-2"
          >
            <Image 
              src="/images/feature-image.png"
              alt="Feature"
              width={600}
              height={300}
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
