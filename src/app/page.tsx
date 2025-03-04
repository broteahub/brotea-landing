"use client";

import { useState, useEffect, FormEvent } from "react";
import { create } from "zustand";
import { motion } from "framer-motion";
import { Menu, X, Instagram, MessageCircle, Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./components/LanguageSwitcher";
import TranslatedText from "./components/TranslatedText";
import { useTranslation } from "./hooks/useTranslation";

// Estado para el formulario con Zustand
const useNewsletterStore = create<{
  fullname: string;
  email: string;
  option: string;
  setFullname: (v: string) => void;
  setEmail: (v: string) => void;
  setOption: (v: string) => void;
  reset: () => void;
}>((set) => ({
  fullname: "",
  email: "",
  option: "",
  setFullname: (v) => set({ fullname: v }),
  setEmail: (v) => set({ email: v }),
  setOption: (v) => set({ option: v }),
  reset: () => set({ fullname: "", email: "", option: "" }),
}));

// Tipos de la data de contenido
interface BodyData {
  header: { title: string; subtitle: string; cta: { text: string; link: string } };
  about: { title: string; description: string };
  recruitment: { title: string; description: string };
}

// Datos de marca con imágenes en base64 y enlaces
const brand = {
  logo_base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAApElEQVR4nO3YMQrCQBBF4a79VyZshL2gBL2eAkSxCbIGXIFX/4LWErwLjjgAtby38Sc2ZY14SlX4z04qfEzDx4CO9DoOp22n+qJMAx6RCvKICk1XQpOW6rIn7PKiZIg7Sd4+AbXz9csCF+KOnysIT4XOh3QPxz7RCrFo31y38wN3wfL8f+ANn2UkCwe/C1fM1C4cf83feRNzo3lN2h3MCc+AAAAAElFTkSuQmCC",
  ios_badge_base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAYAAABPyJ5iAAAAsUlEQVR4nO2XwQnCMBAFfUNURkSgRFgAd4FM9ydzTktEn3n4Z7CBsHA8LALmdkuyFJdUGQOAWZ6+QCC7EhmECdEsa/hz90Vgg4h7J7hNkUZ6k6Q4GnuMiBEn9gTiGUnz1GBCTC2Wzgp22l+jZhEiG5Zq2LCI2ftmU6D2pW+v8dhZ6yvgaRZqlztM07lt8ex2CUG3Y0J9QEELd1+7d37WrscA8bTR2T3m02+AAAAAElFTkSuQmCC",
  android_badge_base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAUCAYAAABrkQGwAAAAt0lEQVR4nO3YwQ3CMBiF4ScYx8K0FhFENmGEh2LOyOOyH+BFoKGCy0c4gY2zN6iJJfWyTZic5jylXlskTE/Gnu+IRkZ/NzbGPGU+ihEmc3yaTJlpSGQ6hSNOAA9oyEUuQR5ocjtHPJwo7vY/tp6zdEH4H+XbLkT0+u+Z6a/2bzyDLp01uePnw26/OtZlq2OMgczr6WsASlsvsh03nTUAAAAASUVORK5CYII=",
  facebook_icon_base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAlklEQVR4nO2UPQ7CQAyF3UCQzMw3O2IQ44AX8N26RSZxg3i81vAwihzXD0zh9FNoKQnFny5PLy/IBIcH1DOv7/HqCCKw16b9B/4sck1CGEbBIYtJzyu7QHk4KBCuKCElQoL3tiP6WD9z2kRKgo8sTJEihN8+P6nHT8OfW/dNV01dyuW0uZ2b5KNk8Q98RmfkAAAAAElFTkSuQmCC",
  twitter_icon_base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAl0lEQVR4nO2UMQ6CQBCF7SJ8zMXGkhOFi5dJdUGcYi/0DW0jMQs8O/OIQSBep3SYHnXWY40qAOW0Kkq7a+XL5PTnz2AHmEQCGi9AcRhNhbAi46EKKDe5RG2y7yilvYgQorYdARSPpFD6zovldajbDS1E+5Rf47ACqXqjKx+3q+rfUXHUnIL7JRx3HAP1yspp1oy7KAAAAAElFTkSuQmCC",
  instagram_icon_base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAnElEQVR4nO2U0Q2CQBCG78uS6YNT0EAl1Jb1HjoMrTpxVZLFY6FZ/gH3TjYyJ+0yY54hSSSk3fMzsJ+Ac+vboAsEVIIShAPfw6+CTu7gII3sALJQSBaSZkCq0FwjWkDLg7JZTHStAArU0lBUfP9iXj80+tM3gKp8A8yfa+xr/MIS2sIc/W80WMPhbT7WWXAAAAABJRU5ErkJggg==",
  telegram_url: "https://t.me/broteaofficial",
  twitter_url: "https://x.com/broteaofficial",
  instagram_url: "https://www.instagram.com/broteaofficial",
  support_email: "hello@brotea.xyz",
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState<BodyData | null>(null);

  const { locale, isLoaded } = useTranslation();

  // Function to fetch content
  const fetchContent = async () => {
    if (!isLoaded) return;
    
    try {
      // Fetch content with the current locale
      const res = await fetch(`/api/content?locale=${locale}`);
      if (!res.ok) throw new Error("Error fetching content");
      const jsonData = await res.json();
      console.log('Fetched content for locale:', locale, jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching content:", error);
      // Fallback data
      setData({
        header: {
          title: locale === 'en' ? 
            "Connections that flourish, ideas that transform." : 
            "Brotea conecta talento y oportunidades",
          subtitle: locale === 'en' ?
            "Where talent and opportunities meet to create a more inclusive future." :
            "Impulsando el desarrollo de estudiantes y emprendedores a través de la colaboración y la tecnología.",
          cta: { 
            text: locale === 'en' ? "Join Brotea" : "Únete a Brotea", 
            link: "https://t.me/broteaofficial" 
          },
        },
        about: {
          title: locale === 'en' ? "What is Brotea?" : "¿Qué es Brotea?",
          description: locale === 'en' ?
            "Brotea was born to connect talent and opportunities, driving the development of students and entrepreneurs through collaboration and technology." :
            "Brotea nace para conectar talento y oportunidades, impulsando el desarrollo de estudiantes y emprendedores a través de la colaboración y la tecnología.",
        },
        recruitment: {
          title: locale === 'en' ? "Join Brotea" : "Únete a Brotea",
          description: locale === 'en' ?
            "If you're a student, technology expert, or have tools that can contribute to the community, we want to meet you." :
            "Si eres estudiante, experto en tecnología o tienes herramientas que pueden aportar a la comunidad, queremos conocerte.",
        },
      });
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchContent();
  }, [locale, isLoaded, fetchContent]); // Re-fetch when locale changes

  // Listen for locale changes
  useEffect(() => {
    // Re-fetch content when locale changes
    const handleLocaleChange = () => {
      fetchContent();
    };

    // Add event listener for the custom event
    window.addEventListener('localeChange', handleLocaleChange);
    
    return () => {
      window.removeEventListener('localeChange', handleLocaleChange);
    };
  }, [locale, isLoaded, fetchContent]); // Re-create the event listener when locale changes

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About us" },
    { id: "how", label: "How it works" },
    { id: "stories", label: "Stories" },
    { id: "join", label: "Join us" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#8180FF]">
      <nav className="p-6 relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-[32px] tracking-wider text-[#1A1F2C]">
              <Image 
                src="/assets/images/BROTEA_LOGO-SECUNDARIO_BLANCO_B_1_500px_2.png"
                alt="Brotea Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </Link>
            <button
              className="md:hidden bg-[#0F0F1E] p-2 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[#1A1F2C] hover:text-[#1A1F2C]/80 transition-colors"
                >
                  <TranslatedText textKey={`common.${item.id === 'home' ? 'home' : item.id === 'about' ? 'about' : item.id === 'how' ? 'howItWorks' : item.id === 'stories' ? 'stories' : 'joinUsNav'}`} />
                </button>
              ))}
              <button
                onClick={() => scrollToSection("newsletter")}
                className="bg-[#0F0F1E] text-white px-6 py-2 rounded-full hover:bg-[#0F0F1E]/90"
              >
                <TranslatedText textKey="common.joinUs" />
              </button>
              <LanguageSwitcher />
            </div>
          </div>
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
                    <TranslatedText textKey={`common.${item.id === 'home' ? 'home' : item.id === 'about' ? 'about' : item.id === 'how' ? 'howItWorks' : item.id === 'stories' ? 'stories' : 'joinUsNav'}`} />
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("newsletter")}
                  className="bg-[#E6FFA9] text-black px-6 py-2 rounded-xl text-left transition-colors hover:bg-[#E6FFA9]/90"
                >
                  <TranslatedText textKey="common.joinUs" />
                </button>
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
          {/* Hero */}
          <motion.section
            key={locale} // Add key to force re-render when locale changes
            id="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#E6FFA9] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div className="z-10 relative">
                <h1 className="text-[32px] md:text-[52px] leading-tight font-medium text-black mb-4 font-pp-neue-machina">
                  {data?.header?.title || "Conexiones que brotan, ideas que transforman."}
                </h1>
                <p className="text-[16px] md:text-[18px] text-black/80 mb-6 font-pp-neue-machina">
                  {data?.header?.subtitle ||
                    "Donde talento y oportunidades se encuentran para crear un futuro más inclusivo."}
                </p>
              </div>
              <div className="relative h-64 md:h-80 mt-8 md:mt-0 overflow-hidden">
                <Image
                  src="/assets/images/BROTEA_ILUSTRACION_2025_A.webp"
                  alt="Ilustración Brotea"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.section>

          {/* Academy 8180FF */}
          <motion.section
            id="academy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-64 md:h-96"
          >
            <div className="absolute inset-0">
              <Image
                src="/assets/images/academy.webp"
                alt="Academy Background"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center"
                priority
              />
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 8px)",
                  opacity: 0.2,
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8180FF]/40 to-[#8180FF]/40  flex flex-col items-center justify-center p-6 md:p-12">
              <h2 className="pixel-text text-[80px] md:text-[100px] text-[#E6FFA9] text-center">
                Academy
              </h2>
              <button className="bg-[#0F0F1E] text-white px-6 py-2 rounded-xl hover:bg-[#0F0F1E]/90">
                <TranslatedText textKey="academy.discoverMore" />
              </button>
            </div>
          </motion.section>

          {/* Info Cards */}
          <section id="about" className="md:grid md:grid-cols-2 md:gap-6 space-y-6 md:space-y-0 mb-6">
            <motion.div
              key={`about-${locale}`} // Add key to force re-render when locale changes
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
                  href={brand.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#E6FFA9] text-[#1A1F2C] px-6 py-3 rounded-full hover:scale-105"
                >
                  <TranslatedText textKey="about.discoverHere" />
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
                  <TranslatedText textKey="project.title1" />
                  <br />
                  <TranslatedText textKey="project.title2" />
                </h3>
                <Link
                  href={brand.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#E6FFA9] text-[#1A1F2C] px-6 py-3 rounded-full hover:scale-105"
                >
                  <TranslatedText textKey="project.discoverHow" />
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Grow */}
          <motion.section
            id="grow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-64 md:h-96"
          >
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6FFA9]/50 to-[#8180FF]/70 flex flex-col items-center justify-center p-6 md:p-12">
              <h2 className="pixel-text text-[80px] md:text-[120px] text-[#E6FFA9] mb-6 text-center shadow-lg">
                GROW
              </h2>
              <button className="bg-[#0F0F1E] text-white px-6 py-2 rounded-xl hover:bg-[#0F0F1E]/90">
                <TranslatedText textKey="grow.discoverHow" />
              </button>
            </div>
          </motion.section>

          {/* How */}
          <section id="how" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
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
              <span className="pixel-text text-[#FF8BA7] text-3xl md:text-5xl lg:text-8xl">lead</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 aspect-square flex items-center justify-center"
            >
              <span className="pixel-text text-[#E6FFA9] text-3xl md:text-5xl lg:text-8xl">learn</span>
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

          {/* Join */}
          <motion.section
            key={`join-${locale}`} // Add key to force re-render when locale changes
            id="join"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-6 font-pp-neue-machina">
                {data?.recruitment?.title || "Únete a Brotea"}
              </h2>
              <p className="text-[16px] md:text-[18px] text-white/90 mb-6 font-pp-neue-machina">
                {data?.recruitment?.description ||
                  "Si eres estudiante, experto en tecnología o tienes herramientas que puedan aportar a la comunidad, queremos conocerte."}
              </p>
              <button
                onClick={() => window.open(brand.twitter_url, "_blank")}
                className="bg-[#E6FFA9] text-[#1A1F2C] px-6 py-3 rounded-full hover:scale-105"
              >
                <TranslatedText textKey="join.joinNow" />
              </button>
            </div>
          </motion.section>

          {/* Newsletter */}
          <motion.section
            id="newsletter"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 md:p-12 mt-4 text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold font-pp-neue-machina text-[#E6FFA9]">
                  <TranslatedText textKey="newsletter.title" />
                </h3>
                <p className="text-lg text-white/90 max-w-xl">
                  <TranslatedText textKey="newsletter.description" />
                </p>
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4 mt-6">
                    <div className="w-12 h-12 rounded-full bg-[#E6FFA9] flex items-center justify-center">
                      <span className="text-[#0F0F1E] font-bold">1</span>
                    </div>
                    <p className="text-white">
                      <TranslatedText textKey="newsletter.benefits.first" />
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="w-12 h-12 rounded-full bg-[#E6FFA9] flex items-center justify-center">
                      <span className="text-[#0F0F1E] font-bold">2</span>
                    </div>
                    <p className="text-white">
                      <TranslatedText textKey="newsletter.benefits.second" />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <NewsletterForm />
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function NewsletterForm() {
  const { fullname, email, option, setFullname, setEmail, setOption, reset } = useNewsletterStore();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error en el envío");
      setStatus("success");
      reset();
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setShowErrorModal(true);
    }
  };

  const { t } = useTranslation();
  
  return (
    <>
      <div className="bg-[#1A1F2C] p-6 md:p-8 rounded-2xl shadow-xl w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#E6FFA9]">
              <TranslatedText textKey="newsletter.form.fullname" />
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#E6FFA9] transition-all text-sm md:text-base"
              type="text"
              name="fullname"
              minLength={5}
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder={t("newsletter.form.fullnamePlaceholder")}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#E6FFA9]">
              <TranslatedText textKey="newsletter.form.email" />
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#E6FFA9] transition-all text-sm md:text-base"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.form.emailPlaceholder")}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#E6FFA9]">
              <TranslatedText textKey="newsletter.form.option" />
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#E6FFA9] transition-all text-sm md:text-base"
              name="option"
              required
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="">{t("newsletter.form.optionPlaceholder")}</option>
              <option value="quiero aprender con brotea">{t("newsletter.form.options.learn")}</option>
              <option value="quiero aportar como mentor en brotea">{t("newsletter.form.options.mentor")}</option>
              <option value="quiero donar herramientas a brotea">{t("newsletter.form.options.donate")}</option>
            </select>
          </div>
          <button
            type="submit"
            className={`px-6 py-3 rounded-xl font-semibold text-base md:text-lg transition-all mt-2 ${
              status === "loading"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#E6FFA9] text-[#1A1F2C] hover:scale-105 hover:shadow-lg"
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <TranslatedText textKey="common.sending" />
              </div>
            ) : (
              <TranslatedText textKey="newsletter.form.subscribe" />
            )}
          </button>
          {status === "success" && (
            <div className="bg-green-500/20 border border-green-500 text-green-500 p-3 rounded-xl text-center text-sm">
              <TranslatedText textKey="common.success" />
            </div>
          )}
        </form>
      </div>
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-red-600 mb-2">
              <TranslatedText textKey="common.error" />
            </h3>
            <p className="text-gray-700 mb-4">
              <TranslatedText textKey="common.errorMessage" />
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  setStatus("idle");
                }}
                className="bg-[#0F0F1E] text-white px-4 py-2 rounded-xl hover:bg-[#0F0F1E]/80"
              >
                <TranslatedText textKey="common.close" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F0F1E] text-white p-6 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
            <span className="pixel-text text-[#0F0F1E] text-sm">B</span>
          </div>
          <div className="flex items-center space-x-1">
            <Copyright className="w-4 h-4 text-white" />
            <span className="font-pp-neue-machina text-sm md:text-base">
              {new Date().getFullYear()} Brotea. <TranslatedText textKey="footer.rights" />
            </span>
          </div>
        </div>
        <div className="flex space-x-6">
          <a href={brand.telegram_url} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-white hover:text-[#E6FFA9] transition-colors">
            <MessageCircle className="w-6 h-6" />
          </a>
          <a href={brand.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:text-[#E6FFA9] transition-colors">
            <X className="w-6 h-6" />
          </a>
          <a href={brand.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-[#E6FFA9] transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
