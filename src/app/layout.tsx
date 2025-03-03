import type { Metadata } from "next";
import { Space_Grotesk, Press_Start_2P } from "next/font/google";
import "./global.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

// Note: PP Neue Machina and Biform Pixel are loaded via @font-face in global.css

export const metadata: Metadata = {
  title: "Brotea",
  description: "Conexiones que brotan, ideas que transforman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Note: We can't use useTranslation hook here because this is a Server Component
  // The language will be updated client-side by the LanguageSwitcher component
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${spaceGrotesk.variable} ${pressStart2P.variable} bg-[#8180FF]`}>
        {children}
      </body>
    </html>
  );
}
