# Fix for Astro Deployment Error

## Problem
Your Astro app is failing with: `ThemeToggle is not defined`

## Solution

### Step 1: Find the BaseLayout file
Look for a file like `src/layouts/BaseLayout.astro` or similar.

### Step 2: Check the ThemeToggle import
Make sure you have this import at the top:

```astro
---
import ThemeToggle from '../components/ThemeToggle.astro';
// or wherever your ThemeToggle component is located
---
```

### Step 3: Create ThemeToggle component if missing
Create `src/components/ThemeToggle.astro`:

```astro
---
// ThemeToggle.astro
---

<button id="theme-toggle" type="button" aria-label="Toggle theme">
  <svg class="sun-icon" width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
  <svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>

<script>
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  window.localStorage.setItem('theme', theme);

  const handleToggleClick = () => {
    const element = document.documentElement;
    element.classList.toggle('dark');

    const isDark = element.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  document.getElementById('theme-toggle')?.addEventListener('click', handleToggleClick);
</script>

<style>
  #theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .sun-icon {
    display: none;
  }
  
  :global(.dark) .sun-icon {
    display: block;
  }
  
  .moon-icon {
    display: block;
  }
  
  :global(.dark) .moon-icon {
    display: none;
  }
</style>
```

### Step 4: Update astro.config.mjs
Make sure your config looks like this:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});
```

### Step 5: Update package.json
Add Node.js version requirement:

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Step 6: Redeploy
Commit and push these changes to GitHub. The deployment should work now!

## Quick Fix Commands

If you have Git installed, run:
```bash
git add .
git commit -m "fix: add ThemeToggle component"
git push
```

Otherwise, manually upload the fixed files to GitHub.
