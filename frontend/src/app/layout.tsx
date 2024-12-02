import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import AuthWrapper from "./(app)/auth-wrapper";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  return (
    <html lang="en">
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} antialiased`}
      >
        <AuthWrapper token={cookie.get("pms-token")?.value || ""}>
          {children}
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
