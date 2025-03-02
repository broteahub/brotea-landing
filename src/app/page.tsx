"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define types para nuestro contenido
interface BodyData {
  header: {
    title: string;
    subtitle: string;
    cta: {
      text: string;
      link: string;
    };
  };
  about: {
    title: string;
    description: string;
  };
  recruitment: {
    title: string;
    description: string;
  };
}

// Colores
const COLORS = {
  primary: "#9b87f5",
  secondary: "#FF8BA7",
  accent: "#CAFF00",
  dark: "#0F0F1E",
  text: "#1A1F2C",
  white: "#FFFFFF",
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [data, setData] = useState<BodyData | null>(null);

  useEffect(() => {
    // Cargar datos de /api/content
    const fetchData = async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading content:", error);
        // Datos por defecto si falla la carga
        setData({
          header: {
            title: "Brotea conecta talento y oportunidades",
            subtitle:
              "Impulsando el desarrollo de estudiantes y emprendedores a través de la colaboración y la tecnología.",
            cta: {
              text: "Únete a Brotea",
              link: "https://t.me/broteaofficial",
            },
          },
          about: {
            title: "¿Qué es Brotea?",
            description:
              "Brotea nace para conectar talento y oportunidades, impulsando el desarrollo de estudiantes y emprendedores a través de la colaboración y la tecnología.",
          },
          recruitment: {
            title: "Únete a Brotea",
            description:
              "Si eres estudiante, experto en tecnología o tienes herramientas que pueden aportar a la comunidad, queremos conocerte.",
          },
        });
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Items de navegación
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About us" },
    { id: "how", label: "How it works" },
    { id: "stories", label: "Stories" },
    { id: "join", label: "Join us" },
  ];

  return (
    <div className="min-h-screen bg-[#9b87f5]">
      {/* Navigation */}
      <nav className="p-6 relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-[32px] tracking-wider text-[#1A1F2C]">
              <div className="pixel-text text-[28px] text-[#1A1F2C]">Brotea</div>
            </Link>

            {/* Botón de menú móvil */}
            <button
              className="md:hidden bg-[#0F0F1E] p-2 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Menú Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[#1A1F2C] hover:text-[#1A1F2C]/80 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button className="bg-[#0F0F1E] text-white px-6 py-2 rounded-full transition-colors hover:bg-[#0F0F1E]/90">
                Join us
              </button>
            </div>
          </div>

          {/* Menú Mobile */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute left-0 right-0 top-full mt-2 p-4 bg-[#0F0F1E] rounded-xl mx-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white hover:text-white/80 text-left transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button className="bg-[#CAFF00] text-black px-6 py-2 rounded-xl text-left transition-colors hover:bg-[#CAFF00]/90">
                  Join us
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
        {/* Hero Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#CAFF00] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
        >
          <div className="md:grid md:grid-cols-2 md:gap-12">
            <div className="z-10 relative">
              <h1 className="text-[32px] md:text-[52px] leading-tight font-medium text-black mb-4 font-pp-neue-machina">
                {data?.header?.title ||
                  "Conexiones que brotan, ideas que transforman."}
              </h1>
              <p className="text-[16px] md:text-[18px] text-black/80 mb-6 font-pp-neue-machina">
                {data?.header?.subtitle ||
                  "Donde talento y oportunidades se encuentran para crear un futuro más inclusivo."}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => scrollToSection("join")}
                  className="bg-[#0F0F1E] text-white px-6 py-3 rounded-full transition-transform hover:scale-105"
                >
                  {data?.header?.cta?.text || "Join us"}
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="bg-white text-[#1A1F2C] px-6 py-3 rounded-full transition-transform hover:scale-105"
                >
                  Descubre más
                </button>
              </div>
            </div>

            {/* Contenedor con tamaño fijo en mobile y en desktop */}
            <div className="relative h-64 md:h-80 mt-8 md:mt-0 overflow-hidden">
              <Image
                src="/assets/images/conecta.webp"
                alt="Ilustración Brotea"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.section>

        {/* Academy Section - Centrada como GROW */}
        <motion.section
          id="academy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-64 md:h-96"
        >
          {/* Imagen de fondo con object-cover */}
          <div className="absolute inset-0">
            <Image
              src="/assets/images/academy.webp"
              alt="Academy Background"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center"
              priority
            />
            {/* Patrón de líneas sobre la imagen */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 8px)",
                opacity: 0.2,
              }}
            ></div>
          </div>
          {/* Overlay con degradado y contenido centrado */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/70 to-[#9b87f5]/70 flex flex-col items-center justify-center p-6 md:p-12">
            <h2 className="pixel-text text-[60px] md:text-[80px] text-[#CAFF00] mb-6 text-center">
              Academy
            </h2>
            <button className="bg-[#0F0F1E] text-white px-6 py-2 rounded-xl transition-colors hover:bg-[#0F0F1E]/90">
              Descubre más
            </button>
          </div>
        </motion.section>

        {/* Info Cards Grid - Sin imágenes */}
        <section
          id="about"
          className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0 mb-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#FF8BA7] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-[24px] md:text-[32px] leading-tight font-medium mb-6 text-[#1A1F2C] font-pp-neue-machina">
                {data?.about?.title || "¿Qué es Brotea?"}
              </h3>
              <Link
                href="https://brotea.org/about"
                className="inline-block bg-[#CAFF00] text-[#1A1F2C] px-6 py-3 rounded-full transition-transform hover:scale-105"
              >
                Descúbrelo aquí
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#FF8BA7] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-[24px] md:text-[32px] leading-tight font-medium mb-6 text-[#1A1F2C] font-pp-neue-machina">
                ¿Tienes un proyecto?
                <br />
                Brotea te ayuda.
              </h3>
              <button className="bg-[#CAFF00] text-[#1A1F2C] px-6 py-3 rounded-full transition-transform hover:scale-105">
                Descubre como aquí
              </button>
            </div>
          </motion.div>
        </section>

        {/* Grow Section */}
        <motion.section
          id="grow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-64 md:h-96"
        >
          {/* Imagen de fondo con object-cover */}
          <div className="absolute inset-0">
            <Image
              src="/assets/images/grow.webp"
              alt="Grow"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center"
              priority
            />
          </div>
          {/* Overlay con degradado */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#CAFF00]/50 to-[#9b87f5]/70 flex flex-col items-center justify-center p-6 md:p-12">
            <h2 className="pixel-text text-[60px] md:text-[80px] text-[#CAFF00] mb-6 text-center shadow-lg">
              GROW
            </h2>
            <button className="bg-[#0F0F1E] text-white px-6 py-2 rounded-xl transition-colors hover:bg-[#0F0F1E]/90">
              Descubre cómo puedes crecer aquí
            </button>
          </div>
        </motion.section>

        {/* Feature Cards Grid */}
        <section
          id="how"
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-4 aspect-square overflow-hidden relative"
          >
            <Image
              src="/assets/images/BROTEA_FOTOGRAFIA_24.webp"
              alt="Feature"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 aspect-square overflow-hidden relative"
          >
            <Image
              src="/assets/images/BROTEA_FOTOGRAFIA_10.webp"
              alt="Feature"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 aspect-square flex items-center justify-center"
          >
            <span className="pixel-text text-[#FF8BA7] text-xl md:text-2xl">
              lead
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 aspect-square flex items-center justify-center"
          >
            <span className="pixel-text text-[#CAFF00] text-xl md:text-2xl">
              learn
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 aspect-square overflow-hidden relative"
          >
            <Image
              src="/assets/images/BROTEA_FOTOGRAFIA_21.webp"
              alt="Feature"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </motion.div>
        </section>

        {/* Join Us Section */}
        <motion.section
          id="join"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-6 font-pp-neue-machina">
              {data?.recruitment?.title || "Join us"}
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/90 mb-6 font-pp-neue-machina">
              {data?.recruitment?.description ||
                "Únete a nuestra comunidad y forma parte de la transformación."}
            </p>
            <button className="bg-[#CAFF00] text-[#1A1F2C] px-6 py-3 rounded-full transition-transform hover:scale-105">
              Únete ahora
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
