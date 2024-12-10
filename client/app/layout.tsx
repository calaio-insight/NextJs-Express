import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import  "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NavbarComponent } from "./components/navbar.component";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Junk Drawer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarComponent />
        <Container className={'mt-3'}>
          {children}
        </Container>
      </body>
    </html>
  );
}
