import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import Sidebar from "../components/ui/sidebar";
import { SidebarItem } from "../components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ScanLine,
  Stethoscope,
  FileText,
  MessageSquare,
  Bell,
  Settings
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Clinic Dashboard",
  description: "Medical clinic administration system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 flex h-screen`}
      >
        <div className="flex w-full h-full">
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Overview"
              active={true}
              alert={undefined}
            />
            <SidebarItem
              icon={<Users size={20} />}
              text="Patients"
              active={false}
              alert={undefined}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              text="Appointments"
              active={false}
              alert={undefined}
            />
            
            <SidebarItem
              icon={<ScanLine size={20} />}
              text="Scan"
              active={false}
              alert={undefined}
            />
            <div className="mt-auto">
              <SidebarItem
              icon={<FileText size={20} />}
              text="Prescription"
              active={false}
              alert={undefined}
              />
              
            </div>
          </Sidebar>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}