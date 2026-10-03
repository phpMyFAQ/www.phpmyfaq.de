import React from 'react';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import { getSiteConfig } from '@/lib/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './tailwind.css';
import './globals.scss';

const description = 'phpMyFAQ is a mobile-friendly, feature-rich, scalable open source FAQ web app for PHP 8.3+';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteConfig().siteUrl),
  title: {
    default: 'phpMyFAQ - Open Source FAQ web application for PHP 8.3+',
    // Pages pass their own "<Page> - phpMyFAQ" title via generatePageMetadata.
    template: '%s',
  },
  description,
  // Resolves to the current page's own URL for every route.
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    siteName: 'phpMyFAQ',
    locale: 'en_US',
    title: 'phpMyFAQ - Open Source FAQ web application',
    description,
    // The image itself comes from src/app/opengraph-image.tsx.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'phpMyFAQ - Open Source FAQ web application',
    description,
  },
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