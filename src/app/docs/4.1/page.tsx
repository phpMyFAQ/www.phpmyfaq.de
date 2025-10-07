'use client'

import { useEffect } from 'react'

export default function Docs41RedirectPage() {
  useEffect(() => {
    window.location.href = 'https://phpmyfaq.readthedocs.io/en/main/'
  }, [])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to phpMyFAQ 4.1 documentation...</p>
      <p>
        If you are not redirected automatically,{' '}
        <a href="https://phpmyfaq.readthedocs.io/en/main/">click here</a>.
      </p>
    </div>
  )
}
