import type { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Explore workouts and build your personal fitness plan.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#0c0d0f]">
        <PlanProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}