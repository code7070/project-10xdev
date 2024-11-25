import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import AuthWrapper from "./(auth)/auth-wrapper";
import { Toaster } from "sonner";

const fontPrimary = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-primary",
});

const fontSecondary = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "PMS - Devscale",
  description: "The Project Management Sheet",
};

export default async function RootLayout({
  children,
  navigation,
  profileBadge,
}: Readonly<{
  children: React.ReactNode;
  navigation: React.ReactNode;
  profileBadge: React.ReactNode;
}>) {
  const cookie = await cookies();
  return (
    <html lang="en">
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} antialiased`}
      >
        <AuthWrapper token={cookie.get("pms-token")?.value || ""}>
          <div className="flex">
            {navigation}
            <div className="flex-1 flex flex-col gap-6">
              {profileBadge}
              {children}
            </div>
          </div>
        </AuthWrapper>
        <Toaster
          toastOptions={{
            classNames: {
              success: "bg-green-600 text-white",
              error: "bg-red-600 text-white",
              warning: "bg-yellow-600 text-white",
              info: "bg-blue-600 text-white",
              default: "bg-gray-600 text-white",
            },
          }}
          position="top-center"
        />
      </body>
    </html>
  );
}
