import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting",
  description: "Hızlı ve ücretsiz görüntülü toplantı",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container">
          <header className="glass header">
            <div className="brand">
              <span className="badge">Live</span>
              <span>Meeting</span>
            </div>
            <nav className="row">
              <a className="btn-ghost btn" href="/">Ana Sayfa</a>
              {/* istersen buraya Docs/About koyabilirsin */}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
