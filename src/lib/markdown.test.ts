import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMarkdownContent, getHandlebarsContent } from './markdown';
import fs from 'fs';
import path from 'path';

vi.mock('fs');
vi.mock('path');
vi.mock('gray-matter');
vi.mock('marked');

describe('getMarkdownContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if file does not exist', () => {
    vi.mocked(path.join).mockReturnValue('/mock/path/file.md');
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = getMarkdownContent('file.md');

    expect(result).toBeNull();
  });

  it('should return null on error', () => {
    vi.mocked(path.join).mockReturnValue('/mock/path/file.md');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('Read error');
    });

    const result = getMarkdownContent('file.md');

    expect(result).toBeNull();
  });
});

describe('getHandlebarsContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if file does not exist', () => {
    vi.mocked(path.join).mockReturnValue('/mock/path/file.hbs');
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = getHandlebarsContent('file.hbs');

    expect(result).toBeNull();
  });

  it('should return null on error', () => {
    vi.mocked(path.join).mockReturnValue('/mock/path/file.hbs');
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('Read error');
    });

    const result = getHandlebarsContent('file.hbs');

    expect(result).toBeNull();
  });
});
