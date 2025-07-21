"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// Removed Menu import - now handled by Navigation component
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TranslatedText from "../components/TranslatedText";
import { useTranslation } from "../hooks/useTranslation";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

export default function Stories() {
  // We don't need to destructure anything from useTranslation for this component
  useTranslation();

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "services", label: "Services", href: "https://global.brotea.xyz", isExternal: true },
    { id: "stories", label: "Stories", href: "/stories" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#8180FF]">
      <Navigation 
        navItems={navItems}
      />

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

      <Footer 
        variant="navigation"
        showCopyrightIcon={false}
      />
    </div>
  );
}
