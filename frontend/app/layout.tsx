import type { Metadata } from "next";
import { Poppins, Open_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["400", "600"],
  variable: "--font-opensans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Java para desarrolladores .NET - JConf 2026",
  description: "Demostración en vivo: API de Tareas con ASP.NET Core y Spring Boot",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${openSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
