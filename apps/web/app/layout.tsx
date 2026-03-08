import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "../styles/multiverse.css";
// IMPORTANT: This import is required for the calendar grid to align correctly
import "react-day-picker/dist/style.css"; 
import { ThemeProvider } from "@/components/theme-provider";
import { MultiverseThemeSync } from "@/components/multiverse-theme-sync";
import { Analytics } from "@vercel/analytics/next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Zoltraak | Multiverse Productivity",
  description: "A gamified productivity OS with reality-warping themes.",
  authors: [{ name: "Vyas" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} dark`} data-theme="zenith" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased selection:bg-primary/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Synchronizes the Zustand theme to the HTML data-theme attribute */}
          <MultiverseThemeSync />
          
          {/* Navbar removed. Pages will now render full-screen starting from the top. */}
          <main className="min-h-screen">
            {children}
          </main>
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}