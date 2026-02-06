import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getChangelogContent } from './changelog';
import fs from 'fs';
import path from 'path';

vi.mock('fs');
vi.mock('path');

describe('getChangelogContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should parse changelog content with frontmatter', async () => {
    const mockContent = `---
title: phpMyFAQ Changelog
description: User visible changes in phpMyFAQ releases
canonical: changelog
---

## phpMyFAQ 4.1.x

### phpMyFAQ 4.1.0 - 2026-02-06 {#4.1.0}

- added new feature
- fixed bug
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    expect(result.title).toBe('phpMyFAQ Changelog');
    expect(result.description).toBe('User visible changes in phpMyFAQ releases');
    expect(result.content).toContain('phpMyFAQ 4.1.x');
    expect(result.content).toContain('added new feature');
  });

  it('should use default title and description when frontmatter is missing', async () => {
    const mockContent = `---
canonical: changelog
---

## phpMyFAQ 4.0.x

- some change
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    expect(result.title).toBe('Changelog');
    expect(result.description).toBe('User visible changes in phpMyFAQ releases');
  });

  it('should render h2 headings with mt-5 mb-3 classes', async () => {
    const mockContent = `---
title: Changelog
---

## phpMyFAQ 4.1.x
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    expect(result.content).toContain('<h2 class="mt-5 mb-3">phpMyFAQ 4.1.x</h2>');
  });

  it('should render h3 headings with anchor IDs from {#id} syntax', async () => {
    const mockContent = `---
title: Changelog
---

### phpMyFAQ 4.1.0 - 2026-02-06 {#4.1.0}
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    expect(result.content).toContain('<h3 class="mt-4 mb-2">');
    expect(result.content).toContain('<a id="4.1.0"></a>');
    expect(result.content).toContain('phpMyFAQ 4.1.0 - 2026-02-06');
  });

  it('should render lists with ms-3 class and mb-1 on items', async () => {
    const mockContent = `---
title: Changelog
---

- first item
- second item
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    expect(result.content).toContain('<ul class="ms-3">');
    expect(result.content).toContain('<li class="mb-1">first item</li>');
    expect(result.content).toContain('<li class="mb-1">second item</li>');
  });

  it('should handle complete changelog entry structure', async () => {
    const mockContent = `---
title: phpMyFAQ Changelog
description: User visible changes in phpMyFAQ releases
---

## phpMyFAQ 4.1.x

### phpMyFAQ 4.1.0-RC.4 - 2026-02-06 {#4.1.0-RC.4}

- changed PHP requirement to PHP 8.3 or later
- added configuration to edit robots.txt
- updated all translations

## phpMyFAQ 4.0.x

### phpMyFAQ 4.0.17 - 2026-01-23 {#4.0.17}

- fixed security vulnerabilities
- updated third party dependencies
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    // Check major version headings
    expect(result.content).toContain('<h2 class="mt-5 mb-3">phpMyFAQ 4.1.x</h2>');
    expect(result.content).toContain('<h2 class="mt-5 mb-3">phpMyFAQ 4.0.x</h2>');

    // Check release headings with anchors
    expect(result.content).toContain('<a id="4.1.0-RC.4"></a>');
    expect(result.content).toContain('<a id="4.0.17"></a>');

    // Check list items
    expect(result.content).toContain('changed PHP requirement to PHP 8.3 or later');
    expect(result.content).toContain('fixed security vulnerabilities');
  });

  it('should handle headings without anchor IDs', async () => {
    const mockContent = `---
title: Changelog
---

### Regular heading without ID
`;

    vi.spyOn(path, 'join').mockReturnValue('/mock/path/changelog/index.md');
    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

    const result = await getChangelogContent();

    expect(result.content).toContain('<h3>Regular heading without ID</h3>');
    expect(result.content).not.toContain('<a id=');
  });
});
