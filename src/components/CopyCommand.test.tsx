import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CopyCommand from './CopyCommand';

describe('CopyCommand', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the command and copies it to the clipboard', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyCommand command="docker pull example" label="Copy the command" />);
    expect(screen.getByText('docker pull example')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Copy the command' });
    expect(button).toHaveTextContent('Copy');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(writeText).toHaveBeenCalledWith('docker pull example');
    expect(button).toHaveTextContent('Copied');
  });

  it('keeps working when the clipboard is unavailable', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockRejectedValue(new Error('denied'));
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyCommand command="docker pull example" label="Copy the command" />);
    const button = screen.getByRole('button', { name: 'Copy the command' });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toHaveTextContent('Copy');
  });
});