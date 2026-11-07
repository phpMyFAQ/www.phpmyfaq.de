import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ColorField from './ColorField';
import { TOKENS } from '@/lib/themeBuilder/tokens';

const primary = TOKENS.find((t) => t.name === '--bs-primary')!;

describe('ColorField', () => {
  it('shows the current value in both inputs', () => {
    render(<ColorField token={primary} value="#083c83" onChange={() => {}} />);
    expect(screen.getByLabelText('Primary picker')).toHaveValue('#083c83');
    expect(screen.getByLabelText('Primary hex value')).toHaveValue('#083c83');
  });

  it('commits a valid hex value typed into the text field', () => {
    const onChange = vi.fn<(value: string) => void>();
    render(<ColorField token={primary} value="#083c83" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Primary hex value'), { target: { value: '#FF6600' } });
    expect(onChange).toHaveBeenCalledWith('#ff6600');
  });

  it('rejects short hex and rgb() input and marks the field invalid', () => {
    const onChange = vi.fn<(value: string) => void>();
    render(<ColorField token={primary} value="#083c83" onChange={onChange} />);
    const text = screen.getByLabelText('Primary hex value');
    fireEvent.change(text, { target: { value: '#abc' } });
    fireEvent.change(text, { target: { value: 'rgb(0,0,0)' } });
    expect(onChange).not.toHaveBeenCalled();
    expect(text).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Use a six-digit hex colour like #083c83')).toBeInTheDocument();
  });

  it('commits the colour picker value', () => {
    const onChange = vi.fn<(value: string) => void>();
    render(<ColorField token={primary} value="#083c83" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Primary picker'), { target: { value: '#112233' } });
    expect(onChange).toHaveBeenCalledWith('#112233');
  });
});