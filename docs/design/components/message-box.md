---
id: message-box
title: Message Box
---

# Message Box Component

## Overview

Message boxes are modal dialog windows that display messages, warnings, or errors to the user and request a response. They are system-level dialogs that block interaction with other windows until dismissed.

## Visual Specifications

### Dimensions

```
Min width: 200px
Max width: 400px
Width: Auto (based on message length)
Min height: 100px
Height: Auto (based on content)
Padding: 12px
```

### Colors

#### Light Theme

```css
--message-box-bg: #C0C0C0              /* Gray background */
--message-box-text: #000000            /* Black text */
--message-box-border-light: #FFFFFF    /* Top/left border */
--message-box-border-dark: #808080     /* Bottom/right border */
--message-box-border-shadow: #000000   /* Outer shadow border */
```

#### Dark Theme

```css
--message-box-bg: #1A1A2E              /* Dark background */
--message-box-text: #FFFFFF            /* White text */
--message-box-border-light: #404050    /* Top/left border */
--message-box-border-dark: #0A0A15     /* Bottom/right border */
--message-box-border-shadow: #000000   /* Outer shadow border */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

## Message Box Structure

```
┌─────────────────────────────────────┐
│ ⚠ Warning                       [×] │ ← Titlebar
├─────────────────────────────────────┤
│                                     │
│  [!]  Are you sure you want to     │ ← Icon + Message
│       delete this file?            │
│                                     │
│                                     │
│              [ OK ] [ Cancel ]      │ ← Buttons
│                                     │
└─────────────────────────────────────┘
```

### Components

1. **Titlebar** - See titlebar.md
   - Title text (e.g., "Error", "Warning", "Information")
   - Close button (×)
   - Can be dragged to move dialog

2. **Content Area**
   - System icon (left, 32x32px)
   - Message text (right)
   - 12px padding around content

3. **Button Area**
   - One or more buttons
   - Right-aligned
   - 6px gap between buttons
   - 12px from bottom

## Message Box Types

### Information (MB_ICONINFORMATION)
- **Icon:** Blue "i" in circle
- **Title:** "Information" (or custom)
- **Sound:** Asterisk beep
- **Buttons:** OK

### Warning (MB_ICONWARNING)
- **Icon:** Yellow triangle with "!"
- **Title:** "Warning" (or custom)
- **Sound:** Exclamation beep
- **Buttons:** OK, or Yes/No, or OK/Cancel

### Error (MB_ICONERROR)
- **Icon:** Red circle with "×"
- **Title:** "Error" (or custom)
- **Sound:** Critical stop beep
- **Buttons:** OK

### Question (MB_ICONQUESTION)
- **Icon:** Blue circle with "?"
- **Title:** "Question" (or custom)
- **Sound:** Question beep
- **Buttons:** Yes/No, or Yes/No/Cancel

### Plain (No Icon)
- **Icon:** None
- **Title:** Custom
- **Sound:** None
- **Buttons:** Customizable

## Button Configurations

### MB_OK
- Single OK button
- Default for info/error messages

### MB_OKCANCEL
- OK button (default)
- Cancel button
- Used for confirmations

### MB_YESNO
- Yes button (default)
- No button
- Used for questions

### MB_YESNOCANCEL
- Yes button (default)
- No button
- Cancel button
- Used for save prompts

### MB_RETRYCANCEL
- Retry button (default)
- Cancel button
- Used for error recovery

## Button Layout

Buttons are right-aligned with consistent spacing:

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │
│          [Button1] [Button2] [Btn3] │
│                                     │
└─────────────────────────────────────┘
              ↑         ↑
           6px gap   6px gap
```

- Right-aligned in button area
- 6px horizontal gap between buttons
- All buttons same height (23px)
- Min button width: 75px

## States

### Modal
- Blocks interaction with parent windows
- Dims background (optional)
- Z-index: 1000+ (above windows, below context menus)
- Focus trapped within message box

### Positioned
- Centered on screen (default)
- Or centered on parent window
- Can be dragged by titlebar

## Behavior

### Opening
1. Message box appears centered
2. Background dims (optional)
3. Beep sound plays (based on type)
4. Focus moves to default button
5. Parent windows become inactive

### Button Interaction
**Click default button:**
- Return button value
- Close message box
- Restore parent window focus

**Click other button:**
- Return button value
- Close message box
- Restore parent window focus

**Close button (×):**
- Same as Cancel button (if present)
- Or same as No button (if Cancel not present)
- Or closes with no return value

### Keyboard Shortcuts
- `Enter` → Click default button (primary button)
- `Escape` → Click Cancel button (or close)
- `Y` → Click Yes button
- `N` → Click No button
- `Tab` → Cycle through buttons
- `Space` → Click focused button

### Dragging
- Click and drag titlebar → Move message box
- Message box stays within screen bounds

### Default Button
- One button designated as default
- Shown with bold text (optional) or thicker border
- Activated by Enter key
- Usually rightmost button (OK, Yes) or first button shown

## Accessibility

### ARIA Attributes
```html
<div
  class="win98-message-box"
  role="alertdialog"
  aria-labelledby="message-box-title"
  aria-describedby="message-box-text"
  aria-modal="true"
>
```

### Screen Reader
- Announces as "Alert dialog" or "Dialog"
- Reads title
- Reads message text
- Announces button labels
- Announces default button

### Keyboard Navigation
- Full keyboard accessible
- Tab cycles through buttons
- Enter activates default button
- Escape dismisses dialog
- Letter keys activate buttons (Y/N)

### Focus Management
- Focus moves to message box when opened
- Focus trapped within message box
- Focus returns to trigger element when closed

## Usage Examples

### Information Message Box
```html
<div class="win98-message-box" role="alertdialog" aria-modal="true">
  <div class="win98-titlebar">
    <h1 class="win98-titlebar__text">Information</h1>
    <div class="win98-titlebar__buttons">
      <button class="win98-titlebar-button" aria-label="Close">×</button>
    </div>
  </div>
  
  <div class="win98-message-box__content">
    <img src="/icons/info.png" alt="" class="win98-message-box__icon" width="32" height="32">
    <p class="win98-message-box__text">
      Operation completed successfully.
    </p>
  </div>
  
  <div class="win98-message-box__buttons">
    <button class="win98-button primary">OK</button>
  </div>
</div>
```

### Warning with Yes/No
```html
<div class="win98-message-box" role="alertdialog" aria-modal="true">
  <div class="win98-titlebar">
    <h1 class="win98-titlebar__text">Warning</h1>
    <div class="win98-titlebar__buttons">
      <button class="win98-titlebar-button" aria-label="Close">×</button>
    </div>
  </div>
  
  <div class="win98-message-box__content">
    <img src="/icons/warning.png" alt="" class="win98-message-box__icon" width="32" height="32">
    <p class="win98-message-box__text">
      Are you sure you want to delete this file?
    </p>
  </div>
  
  <div class="win98-message-box__buttons">
    <button class="win98-button primary">Yes</button>
    <button class="win98-button">No</button>
  </div>
</div>
```

### Error Message Box
```html
<div class="win98-message-box" role="alertdialog" aria-modal="true">
  <div class="win98-titlebar">
    <h1 class="win98-titlebar__text">Error</h1>
    <div class="win98-titlebar__buttons">
      <button class="win98-titlebar-button" aria-label="Close">×</button>
    </div>
  </div>
  
  <div class="win98-message-box__content">
    <img src="/icons/error.png" alt="" class="win98-message-box__icon" width="32" height="32">
    <p class="win98-message-box__text">
      An unexpected error occurred. Please try again.
    </p>
  </div>
  
  <div class="win98-message-box__buttons">
    <button class="win98-button primary">OK</button>
  </div>
</div>
```

## CSS Implementation

```scss
.win98-message-box {
  position: fixed;
  min-width: 200px;
  max-width: 400px;
  min-height: 100px;
  
  display: flex;
  flex-direction: column;
  
  background: var(--message-box-bg);
  
  border-top: 1px solid var(--message-box-border-light);
  border-left: 1px solid var(--message-box-border-light);
  border-right: 1px solid var(--message-box-border-shadow);
  border-bottom: 1px solid var(--message-box-border-shadow);
  
  box-shadow:
    inset 1px 1px 0 var(--message-box-border-light),
    inset -1px -1px 0 var(--message-box-border-dark),
    2px 2px 0 rgba(0, 0, 0, 0.5);
  
  z-index: 1000;
  
  &__content {
    display: flex;
    gap: 12px;
    padding: 12px;
    flex: 1;
  }
  
  &__icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    align-self: flex-start;
    
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  &__text {
    flex: 1;
    margin: 0;
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--message-box-text);
    line-height: 1.4;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
  }
  
  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    padding: 0 12px 12px;
  }
}

// Modal backdrop (optional)
.win98-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
```

## JavaScript API

```javascript
class MessageBox {
  static show(options) {
    const {
      title = 'Message',
      message,
      icon = 'info', // 'info', 'warning', 'error', 'question', null
      buttons = ['OK'], // Array of button labels
      defaultButton = 0, // Index of default button
      onClose = () => {}
    } = options;
    
    const messageBox = this.create(title, message, icon, buttons, defaultButton);
    this.center(messageBox);
    document.body.appendChild(messageBox);
    
    this.playSound(icon);
    
    return new Promise((resolve) => {
      messageBox.addEventListener('close', (event) => {
        resolve(event.detail.button);
        messageBox.remove();
        onClose(event.detail.button);
      });
    });
  }
  
  static alert(message, title = 'Information') {
    return this.show({ title, message, icon: 'info', buttons: ['OK'] });
  }
  
  static confirm(message, title = 'Confirm') {
    return this.show({ 
      title, 
      message, 
      icon: 'question', 
      buttons: ['Yes', 'No'],
      defaultButton: 0
    });
  }
  
  static error(message, title = 'Error') {
    return this.show({ title, message, icon: 'error', buttons: ['OK'] });
  }
}

// Usage:
await MessageBox.alert('File saved successfully!');

const result = await MessageBox.confirm('Delete this file?');
if (result === 'Yes') {
  deleteFile();
}
```

## System Icons

Standard message box icons (32x32px):
- **info.png** - Blue "i" in circle
- **warning.png** - Yellow triangle with "!"
- **error.png** - Red circle with "×"
- **question.png** - Blue circle with "?"

## Testing Requirements

### Visual Tests
- Verify min/max dimensions
- Verify icon is 32x32px
- Verify button alignment (right)
- Verify button spacing (6px)
- Verify window chrome (3px border)
- Verify both theme colors

### Modal Tests
- Message box blocks parent windows
- Background dims (if implemented)
- Focus trapped in message box
- Can't interact with parent until closed

### Interaction Tests
- Click button closes and returns value
- Enter activates default button
- Escape closes dialog
- Close button (×) closes dialog
- Drag titlebar moves dialog

### Keyboard Tests
- Tab cycles through buttons
- Enter activates default button
- Escape closes dialog
- Y/N activate Yes/No buttons
- Space activates focused button

### Accessibility Tests
- Screen reader announces dialog
- Screen reader reads message
- Screen reader announces buttons
- Focus trapped correctly
- Focus returns after close
- ARIA attributes correct

## Notes

- Message boxes are ALWAYS modal
- Z-index 1000+ (above normal windows)
- Icon is 32x32px (larger than menu icons)
- Buttons are right-aligned with 6px gaps
- Default button is usually rightmost (OK, Yes)
- Enter key activates default button
- Escape key activates Cancel or closes
- Sound plays based on message type
- Message box appears instantly (no animation)
- Can be dragged by titlebar
- Width auto-sizes based on message length (200-400px)
- Multiple message boxes can be shown (stack with increasing z-index)
