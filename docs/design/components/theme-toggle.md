---
id: theme-toggle
title: Theme Toggle
---

# Theme Toggle Component

## Overview

The Theme Toggle is a system tray icon that allows users to switch between light and dark themes. It's a simple clickable icon that toggles the theme and updates its appearance to reflect the current theme.

## Icon Specifications

### Dimensions

```
Icon size: 16x16px
Button size: 20x20px (16px icon + 2px padding on each side)
Height: 20px (fits in 22px system tray)
```

### Colors

Icon colors depend on the current theme and the icon style chosen.

#### Light Theme Icon

```css
--theme-icon-color: #000000    /* Black icon (if SVG) */
```

Shows: Sun icon, or "Light mode" bulb

#### Dark Theme Icon

```css
--theme-icon-color: #FFFFFF    /* White icon (if SVG) */
```

Shows: Moon icon, or "Dark mode" bulb

## Icon Variants

### Sun/Moon Icons (Recommended)

**Light Theme (Sun icon):**
- Sun with rays
- Indicates current theme is light
- Click to switch to dark

**Dark Theme (Moon icon):**
- Crescent moon
- Indicates current theme is dark
- Click to switch to light

### Bulb Icons (Alternative)

**Light Theme (Light bulb on):**
- Illuminated bulb
- Yellow/white color
- Click to switch to dark

**Dark Theme (Light bulb off):**
- Dark bulb
- Gray color
- Click to switch to light

### Toggle Switch Icon (Alternative)

- Shows toggle switch
- Position indicates current theme
- Click to toggle

## States

### Normal
- Icon visible
- Reflects current theme
- Cursor: pointer

### Hover
**No hover state** - Windows 98 did not have hover effects

### Pressed
- Icon shifts 1px down and 1px right (optional)
- Theme switches instantly

## Behavior

### Click
1. User clicks theme icon
2. Theme toggles immediately (light ↔ dark)
3. Icon updates to reflect new theme
4. All UI components update colors
5. Theme preference saved to localStorage

### Theme Persistence
```javascript
// Save theme preference
localStorage.setItem('win98-theme', 'dark');

// Load theme on startup
const savedTheme = localStorage.getItem('win98-theme') || 'light';
applyTheme(savedTheme);
```

### Icon Update
Icon should update immediately when theme changes:
```javascript
function updateThemeIcon(theme) {
  const icon = document.querySelector('.win98-theme-icon img');
  if (theme === 'light') {
    icon.src = '/icons/theme-sun.png';
    icon.alt = '';
  } else {
    icon.src = '/icons/theme-moon.png';
    icon.alt = '';
  }
}
```

## Accessibility

### ARIA Attributes
```html
<button
  class="win98-system-tray__icon win98-theme-toggle"
  aria-label="Toggle theme. Current theme: Light"
  aria-pressed="false"
>
```

### Screen Reader
- Announces as "Toggle theme button"
- Announces current theme
- Announces when theme changes

### Keyboard
- Tab → Focus theme toggle
- Space or Enter → Toggle theme
- Focus visible indicator

## Usage Examples

### Theme Toggle (Light Theme Active)
```html
<button 
  class="win98-system-tray__icon win98-theme-toggle" 
  aria-label="Toggle theme. Current theme: Light"
  data-theme="light"
>
  <img src="/icons/theme-sun.png" alt="" width="16" height="16">
</button>
```

### Theme Toggle (Dark Theme Active)
```html
<button 
  class="win98-system-tray__icon win98-theme-toggle" 
  aria-label="Toggle theme. Current theme: Dark"
  data-theme="dark"
>
  <img src="/icons/theme-moon.png" alt="" width="16" height="16">
</button>
```

### With Tooltip
```html
<button 
  class="win98-system-tray__icon win98-theme-toggle" 
  title="Toggle theme (currently Light)"
  aria-label="Toggle theme. Current theme: Light"
>
  <img src="/icons/theme-sun.png" alt="" width="16" height="16">
</button>
```

## CSS Implementation

```scss
.win98-theme-toggle {
  // Uses system tray icon styles
  // See system-tray.md
  
  img {
    transition: none; // No transition in Windows 98
  }
  
  &:active {
    img {
      transform: translate(1px, 1px);
    }
  }
}
```

## Theme Switching Logic

```javascript
class ThemeToggle {
  constructor() {
    this.currentTheme = this.loadTheme();
    this.applyTheme(this.currentTheme);
  }
  
  loadTheme() {
    return localStorage.getItem('win98-theme') || 'light';
  }
  
  saveTheme(theme) {
    localStorage.setItem('win98-theme', theme);
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcon(theme);
    this.currentTheme = theme;
  }
  
  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
    
    // Announce to screen readers
    this.announceThemeChange(newTheme);
  }
  
  updateIcon(theme) {
    const icon = document.querySelector('.win98-theme-toggle img');
    const button = document.querySelector('.win98-theme-toggle');
    
    if (theme === 'light') {
      icon.src = '/icons/theme-sun.png';
      button.setAttribute('aria-label', 'Toggle theme. Current theme: Light');
    } else {
      icon.src = '/icons/theme-moon.png';
      button.setAttribute('aria-label', 'Toggle theme. Current theme: Dark');
    }
  }
  
  announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Theme changed to ${theme}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
  }
}

// Initialize
const themeToggle = new ThemeToggle();
document.querySelector('.win98-theme-toggle').addEventListener('click', () => {
  themeToggle.toggle();
});
```

## Theme Icon Assets

### Sun Icon (Light Theme)
- 16x16px
- Black color (light theme)
- Sun with 8 rays
- Circular center

### Moon Icon (Dark Theme)
- 16x16px
- White color (dark theme)
- Crescent shape
- Tilted approximately 45°

## Testing Requirements

### Visual Tests
- Verify icon is 16x16px
- Verify icon updates when theme changes
- Verify icon color correct for theme
- Verify icon renders clearly (pixelated)

### Interaction Tests
- Click toggles theme
- Theme switches immediately
- Icon updates immediately
- All components update colors
- Theme persists after refresh

### Persistence Tests
- Theme saved to localStorage
- Theme loaded on page load
- Theme persists across sessions
- Theme preference respected

### Accessibility Tests
- Screen reader announces button
- Screen reader announces current theme
- Screen reader announces theme changes
- Keyboard activation works
- ARIA label updates with theme

## Notes

- Theme toggle is in system tray (right side of taskbar)
- Icon reflects CURRENT theme (sun for light, moon for dark)
- Click toggles to the OTHER theme
- Theme switch is instant, no animation
- Theme preference saved to localStorage
- All CSS custom properties update on theme change
- Icon is 16x16px
- No hover effects in Windows 98
- Optional: Add tooltip showing current theme
- Optional: Add keyboard shortcut (e.g., Ctrl+Shift+T)
- Theme applies to entire OS (all windows, desktop, taskbar, etc.)
