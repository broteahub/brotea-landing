"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TranslatedText from "../components/TranslatedText";
import { useTranslation } from "../hooks/useTranslation";

export default function Stories() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // We don't need to destructure anything from useTranslation for this component
  useTranslation();

  // This function is used in the JSX below but we're not actually using it
  // Keeping it commented for reference
  /*
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };
  */

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "services", label: "Services", href: "https://global.brotea.xyz" },
    { id: "corePartner", label: "Core Partner", href: "https://meredigroup.brotea.xyz" },
    { id: "stories", label: "Stories", href: "/stories" },
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
            {navItems.map((item) => {
                // Helper function to get the translation key
                const getTranslationKey = (id: string) => {
                  if (id === "home") return "common.home";
                  if (id === "about") return "common.about";
                  if (id === "services") return "common.services";
                  if (id === "corePartner") return "common.corePartner";
                  if (id === "how") return "common.howItWorks";
                  if (id === "stories") return "common.stories";
                  return "common.joinUsNav";
                };
                
                return ['home','services', 'stories', 'corePartner' ].includes(item.id) ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-[#1A1F2C] hover:text-[#1A1F2C]/80 transition-colors"
                  >
                    <TranslatedText textKey={getTranslationKey(item.id)} />
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-[#1A1F2C] hover:text-[#1A1F2C]/80 transition-colors"
                  >
                    <TranslatedText textKey={getTranslationKey(item.id)} />
                  </button>
                );
              })}
              <Link
                href="/#newsletter"
                className="bg-[#0F0F1E] text-white px-6 py-2 rounded-full hover:bg-[#0F0F1E]/90"
              >
                <TranslatedText textKey="common.joinUs" />
              </Link>
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
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`text-white hover:text-white/80 text-left transition-colors ${
                      item.id === "stories" ? "font-bold" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TranslatedText textKey={`common.${item.id === 'home' ? 'home' : item.id === 'about' ? 'about' : item.id === 'how' ? 'howItWorks' : item.id === 'stories' ? 'stories' : 'joinUsNav'}`} />
                  </Link>
                ))}
                <Link
                  href="/#newsletter"
                  className="bg-[#E6FFA9] text-black px-6 py-2 rounded-xl text-left transition-colors hover:bg-[#E6FFA9]/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TranslatedText textKey="common.joinUs" />
                </Link>
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 py-8">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#E6FFA9] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div className="z-10 relative">
                <h1 className="text-[32px] md:text-[52px] leading-tight font-medium text-black mb-4 font-pp-neue-machina">
                  <TranslatedText textKey="stories.pageTitle" />
                </h1>
                <p className="text-[16px] md:text-[18px] text-black/80 mb-6 font-pp-neue-machina">
                  <TranslatedText textKey="stories.pageSubtitle" />
                </p>
              </div>
              <div className="relative h-64 md:h-80 mt-8 md:mt-0 overflow-hidden">
                <Image
                  src="/assets/images/BROTEA_FOTOGRAFIA_21.webp"
                  alt="Brotea Stories"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.section>

          {/* Cristhian's Story */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div className="col-span-1 mb-6 md:mb-0">
                <div className="relative h-64 md:h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/images/stories/cristhian-ethdenver-story.jpeg"
                    alt="Cristhian's Story"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="text-[28px] md:text-[36px] font-medium text-[#1A1F2C] mb-4 font-pp-neue-machina">
                  <TranslatedText textKey="stories.cristhian.title" />
                </h2>
                <div className="prose prose-lg text-[#1A1F2C] max-w-none">
                  <p>
                    <TranslatedText textKey="stories.cristhian.content1" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.cristhian.content2" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.cristhian.content3" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.cristhian.content4" />
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* José's Story */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#FF8BA7] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div className="col-span-1 mb-6 md:mb-0">
                <div className="relative h-64 md:h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/images/BROTEA_FOTOGRAFIA_10.webp"
                    alt="José's Story"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="text-[28px] md:text-[36px] font-medium text-[#1A1F2C] mb-4 font-pp-neue-machina">
                  <TranslatedText textKey="stories.jose.title" />
                </h2>
                <div className="prose prose-lg text-[#1A1F2C] max-w-none">
                  <p>
                    <TranslatedText textKey="stories.jose.content1" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.jose.content2" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.jose.content3" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.jose.content4" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.jose.content5" />
                  </p>
                  <p>
                    <TranslatedText textKey="stories.jose.content6" />
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0F0F1E] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden"
          >
            <div className="text-center">
              <h2 className="text-[28px] md:text-[36px] font-medium text-white mb-4 font-pp-neue-machina">
                <TranslatedText textKey="stories.cta.title" />
              </h2>
              <p className="text-[16px] md:text-[18px] text-white/80 mb-6 max-w-2xl mx-auto">
                <TranslatedText textKey="stories.cta.subtitle" />
              </p>
              <Link
                href="/#newsletter"
                className="inline-block bg-[#E6FFA9] text-[#1A1F2C] px-6 py-3 rounded-full hover:scale-105"
              >
                <TranslatedText textKey="join.joinNow" />
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="bg-[#0F0F1E] text-white p-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
              <span className="pixel-text text-[#0F0F1E] text-sm">B</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-pp-neue-machina text-sm md:text-base">
                {new Date().getFullYear()} Brotea. <TranslatedText textKey="footer.rights" />
              </span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-[#E6FFA9] transition-colors">
              <TranslatedText textKey="common.home" />
            </Link>
            <Link href="/#about" className="text-white hover:text-[#E6FFA9] transition-colors">
              <TranslatedText textKey="common.about" />
            </Link>
            <Link href="/stories" className="text-white hover:text-[#E6FFA9] transition-colors font-bold">
              <TranslatedText textKey="common.stories" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
