'use client';

import { useId, useState } from 'react';
import { isHexColor, type TokenDefinition } from '@/lib/themeBuilder/tokens';
import styles from './ThemeBuilder.module.scss';

export interface ColorFieldProps {
  token: TokenDefinition;
  value: string | undefined;
  onChange: (value: string) => void;
}

// One colour token: a native colour picker and a hex text field kept in sync.
// Only a complete #rrggbb value is committed; while the text is invalid the
// previous colour stays active and the field is marked invalid.
export default function ColorField({ token, value, onChange }: ColorFieldProps) {
  const hintId = useId();
  // The draft holds what was typed while it is not a valid colour yet. Once a
  // valid value is committed, or the value changes from outside (reset, URL),
  // the field shows the committed value again.
  const [draft, setDraft] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState(value);
  if (value !== previousValue) {
    setPreviousValue(value);
    setDraft(null);
  }
  const text = draft ?? value ?? '';
  const invalid = text !== '' && !isHexColor(text);

  const commit = (next: string) => {
    if (isHexColor(next)) {
      setDraft(null);
      onChange(next.toLowerCase());
    } else {
      setDraft(next);
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>
        <span>{token.label}</span>
        <small>{token.description}</small>
      </label>
      <div className={styles.fieldInputs}>
        <input
          type="color"
          aria-label={`${token.label} picker`}
          value={value ?? '#000000'}
          onChange={(event) => commit(event.target.value)}
        />
        <input
          type="text"
          aria-label={`${token.label} hex value`}
          aria-invalid={invalid ? 'true' : undefined}
          aria-describedby={invalid ? hintId : undefined}
          className={styles.hexInput}
          value={text}
          maxLength={7}
          spellCheck={false}
          onChange={(event) => commit(event.target.value)}
        />
      </div>
      {invalid && (
        <p id={hintId} className={styles.fieldHint}>
          Use a six-digit hex colour like #083c83
        </p>
      )}
    </div>
  );
}