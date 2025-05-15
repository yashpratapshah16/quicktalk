import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FirebaseProvider } from "@/context/firebaseContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { LogoutDialogProvider } from "@/context/LogoutContext";
import LogoutDialog from "@/components/LogoutDialog";
import { ProfileDialogProvider } from "@/context/ProfileContext";
import ProfileDailog from "@/components/ProfileDailog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuikTalk",
  description: "QuickTalk chat with friends or person online to find new friends or make new connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[var(--app-height)] overflow-hidden `}
      >
        <Toaster />
        <FirebaseProvider>
          <AuthProvider>
            <LogoutDialogProvider>
              <LogoutDialog />
              <ProfileDialogProvider>
                <ProfileDailog />
                {children}
              </ProfileDialogProvider>
            </LogoutDialogProvider>
          </AuthProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
