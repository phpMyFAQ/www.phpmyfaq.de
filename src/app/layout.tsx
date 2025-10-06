import type { Metadata } from "next";
import ClientLayout from '@/components/ClientLayout'
import "./globals.scss";

export const metadata: Metadata = {
  title: "phpMyFAQ - Open Source FAQ web application for PHP 8.2+",
  description: "phpMyFAQ is a mobile-friendly, feature-rich, scalable open source FAQ web app for PHP 8.2+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
