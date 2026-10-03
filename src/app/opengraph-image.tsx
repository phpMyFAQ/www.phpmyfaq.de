import { ImageResponse } from 'next/og';

// Social preview card, rendered at build time into out/opengraph-image.png.
export const dynamic = 'force-static';
export const alt = 'phpMyFAQ - Open Source FAQ web application';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(150deg, #b34700 0%, #e55a00 40%, #ff6600 100%)',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 120, letterSpacing: -2 }}>
        phpMy
        <span style={{ color: 'rgba(0, 0, 0, 0.75)', fontWeight: 700 }}>FAQ</span>
      </div>
      <div style={{ fontSize: 40, opacity: 0.92, marginTop: 24 }}>Open source FAQ web application</div>
      <div style={{ fontSize: 28, opacity: 0.8, marginTop: 48 }}>Self-hosted · Free since 2001 · www.phpmyfaq.de</div>
    </div>,
    size,
  );
}