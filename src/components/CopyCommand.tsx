'use client';

import { useState } from 'react';
import styles from './CopyCommand.module.scss';

// A one-line shell command with a copy button, e.g. a docker pull.
export default function CopyCommand({ command, label }: { command: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied: the command stays selectable as text.
    }
  };

  return (
    <div className={styles.wrapper}>
      <code className={styles.command}>
        <span className={styles.prompt} aria-hidden="true">
          $
        </span>
        {command}
      </code>
      <button type="button" className={styles.button} onClick={copy} aria-label={label}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}