---
id: clock
title: Clock
---

# Clock Component

## Overview

The Clock component displays the current time in the system tray, located at the far right of the taskbar. It's a simple text display showing hours and minutes with AM/PM indicator (12-hour format) or 24-hour format.

## Visual Specifications

### Dimensions

```
Width: Auto (based on text content, typically 60-70px)
Height: 18px (fits within 22px system tray height)
Padding: 2px 4px
No border
```

### Colors

#### Light Theme

```css
--clock-text: #000000          /* Black text */
--clock-bg: #C0C0C0            /* Gray background (same as taskbar) */
```

#### Dark Theme

```css
--clock-text: #FFFFFF          /* White text */
--clock-bg: #1A1A2E            /* Dark background (same as taskbar) */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
Text align: center
```

## Time Formats

### 12-Hour Format (Default)
```
Examples:
12:00 AM
12:34 AM
1:23 PM
11:59 PM
```

Format string: `h:mm A`
- h: Hours (1-12)
- mm: Minutes (00-59)
- A: AM/PM indicator

### 24-Hour Format (Optional)
```
Examples:
00:00
01:23
13:45
23:59
```

Format string: `HH:mm`
- HH: Hours (00-23)
- mm: Minutes (00-59)

### Date Display (Tooltip - Optional)
On hover or click, optionally show full date:
```
Monday, October 14, 2025
```

## States

### Normal
- Current time displayed
- Updates every minute (on the minute)
- Black text (light) or white text (dark)

### Hover
**No visual hover state** - Windows 98 did not have hover effects

### Clicked (Optional)
- May show calendar/date popup
- Or open Date/Time Properties dialog
- Clock itself doesn't change appearance

## Behavior

### Time Updates
- Updates every 1 minute (not every second)
- Updates occur at the top of each minute (e.g., 12:34:00, 12:35:00)
- No seconds displayed

```javascript
// Update at top of each minute
const now = new Date();
const secondsUntilNextMinute = 60 - now.getSeconds();

setTimeout(() => {
  updateClock();
  // Then update every 60 seconds
  setInterval(updateClock, 60000);
}, secondsUntilNextMinute * 1000);
```

### Click Behavior (Optional)

**Single Click:**
- No action (default)
- Or show calendar popup

**Double Click:**
- Open Date/Time Properties dialog
- Shows calendar, time zone settings

**Right Click:**
- Context menu with "Adjust Date/Time"

## Accessibility

### ARIA Attributes
```html
<div
  class="win98-clock"
  role="timer"
  aria-live="off"
  aria-label="Current time: 12:34 PM"
>
```

### Screen Reader
- Announces as "Current time"
- Reads time value
- Updates announced only when focused (aria-live="off")
- Avoids interrupting user every minute

### Keyboard
- Not typically keyboard-focusable
- If made focusable, Tab would focus it

## Usage Examples

### Basic Clock (12-Hour)
```html
<div class="win98-clock" aria-label="Current time: 12:34 PM">
  12:34 PM
</div>
```

### 24-Hour Format
```html
<div class="win98-clock" aria-label="Current time: 13:45">
  13:45
</div>
```

### With Tooltip
```html
<div 
  class="win98-clock" 
  title="Monday, October 14, 2025"
  aria-label="Current time: 3:15 PM, Monday, October 14, 2025"
>
  3:15 PM
</div>
```

### As Button (Clickable)
```html
<button 
  class="win98-clock" 
  aria-label="Current time: 12:34 PM. Click to open date and time properties."
  role="button"
>
  12:34 PM
</button>
```

## CSS Implementation

```scss
.win98-clock {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  height: 18px;
  padding: 2px 4px;
  min-width: 60px;
  
  background: var(--clock-bg);
  color: var(--clock-text);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: 400;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  text-align: center;
  
  user-select: none;
  white-space: nowrap;
  
  // If clickable
  &--clickable {
    cursor: pointer;
    
    &:active {
      position: relative;
      top: 1px;
      left: 1px;
    }
  }
}
```

## Time Formatting Functions

```javascript
// 12-hour format
function format12Hour(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  return `${hours}:${minutes} ${ampm}`;
}

// 24-hour format
function format24Hour(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
}

// Full date for tooltip
function formatFullDate(date) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}
```

## Calendar Popup (Optional)

If clicking clock opens a calendar:

```
Position: Above taskbar, aligned to right edge
Size: ~200px wide, ~180px high
Content: Calendar grid showing current month
Z-index: 9999
```

## Testing Requirements

### Visual Tests
- Verify text is 11px, MS Sans Serif
- Verify correct color in both themes
- Verify padding (2px 4px)
- Verify text centered
- Verify no border

### Functional Tests
- Time updates every minute
- Time format correct (12-hour or 24-hour)
- Updates occur at top of each minute
- Time stays accurate over long periods
- Timezone respected

### Format Tests
- 12-hour format shows AM/PM
- 12-hour format: 12:xx AM for midnight hour
- 12-hour format: 12:xx PM for noon hour
- 24-hour format: 00:xx for midnight hour
- Minutes always 2 digits (leading zero)

### Accessibility Tests
- Screen reader announces time
- ARIA label includes full time
- aria-live="off" prevents interruptions
- Tooltip shows full date (if implemented)

## Notes

- Clock updates every 1 minute, not every second
- No seconds are displayed (Windows 98 standard)
- Default format is 12-hour with AM/PM
- Text color changes based on theme
- No border or background (transparent, same as taskbar)
- Width is auto-sized based on text length
- Clock is always right-most element in system tray
- In Windows 98, clicking clock did nothing by default
- Modern implementations may add calendar popup
- Time format can be configurable (12h vs 24h)
- Must respect user's system timezone
