'use client';

import { useEffect } from 'react';

export default function Docs32RedirectPage() {
  useEffect(() => {
    window.location.href = 'https://phpmyfaq.readthedocs.io/en/3.2/';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to phpMyFAQ 3.2 documentation...</p>
      <p>
        If you are not redirected automatically, <a href="https://phpmyfaq.readthedocs.io/en/3.2/">click here</a>.
      </p>
    </div>
  );
}
