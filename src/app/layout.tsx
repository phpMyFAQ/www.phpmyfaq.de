import React from 'react';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

export const metadata: Metadata = {
  title: 'phpMyFAQ - Open Source FAQ web application for PHP 8.2+',
  description: 'phpMyFAQ is a mobile-friendly, feature-rich, scalable open source FAQ web app for PHP 8.2+',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
