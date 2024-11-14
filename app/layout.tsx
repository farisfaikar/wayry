import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/nav/navbar"
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from "react"

export const metadata: Metadata = {
  title: "Why Are You Repeating Yourself?",
  description: "A questionable app to track repeating sentences!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [theme, setTheme] = useState<string>(() => {
    // Check for saved theme preference in local storage
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"; // default to dark theme
    }
    return "dark"; // fallback for server-side rendering
  });

  useEffect(() => {
    // Apply theme to the body
    document.body.className = theme;
    // Save the theme in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
          <main className="mx-auto max-w-2xl p-5 pt-16">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
