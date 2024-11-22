import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PM Assistant",
  description: "Task management for Project Managers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const link = [
    { name: "Dashboard", href: "/" },
    { name: "Employee Management", href: "/employee" },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <nav className="hidden lg:block lg:w-64 bg-white shadow-md">
            <div className="bg-green-700 text-green-100 p-4 tracking-wide font-medium">
              <span className="text-2xl">P</span>awang{" "}
              <span className="text-2xl">M</span>eeting
            </div>
            {/* Add navigation items here */}
            <ul className="space-y-2 mt-8">
              {link.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block p-3 transition-all hover:bg-green-900 hover:text-green-100 hover:pl-6`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
