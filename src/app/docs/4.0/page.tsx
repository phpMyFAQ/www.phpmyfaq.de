'use client'

import { useEffect } from 'react'

export default function Docs40RedirectPage() {
  useEffect(() => {
    window.location.href = 'https://phpmyfaq.readthedocs.io/en/4.0/'
  }, [])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to phpMyFAQ 4.0 documentation...</p>
      <p>
        If you are not redirected automatically,{' '}
        <a href="https://phpmyfaq.readthedocs.io/en/4.0/">click here</a>.
      </p>
    </div>
  )
}
