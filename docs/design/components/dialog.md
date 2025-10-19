---
id: dialog
title: Dialog
---

# Dialog Component

## Overview

Dialogs are modal or modeless windows that display forms, settings, or complex interactions. Unlike message boxes, dialogs can contain custom content including form fields, lists, and complex layouts.

## Visual Specifications

### Dimensions

```
Min width: 200px
Max width: 600px (or custom)
Min height: 150px
Max height: 80vh
Width/Height: Customizable based on content
```

### Colors

#### Light Theme

```css
--dialog-bg: #C0C0C0              /* Gray background */
--dialog-text: #000000            /* Black text */
--dialog-border-light: #FFFFFF    /* Top/left border */
--dialog-border-dark: #808080     /* Bottom/right border */
--dialog-border-shadow: #000000   /* Outer shadow border */
```

#### Dark Theme

```css
--dialog-bg: #1A1A2E              /* Dark background */
--dialog-text: #FFFFFF            /* White text */
--dialog-border-light: #404050    /* Top/left border */
--dialog-border-dark: #0A0A15     /* Bottom/right border */
--dialog-border-shadow: #000000   /* Outer shadow border */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

## Dialog Types

### Modal Dialog
- Blocks interaction with parent windows
- Must be dismissed before continuing
- Z-index: 1000+
- Dimmed backdrop (optional)
- Focus trapped within dialog

### Modeless Dialog
- Allows interaction with parent windows
- Can be left open while working
- Z-index: Same as regular windows (100-999)
- No backdrop
- Focus not trapped

## Dialog Structure

```
┌─────────────────────────────────────┐
│ Dialog Title                    [×] │ ← Titlebar
├─────────────────────────────────────┤
│                                     │
│   [Content Area]                    │
│   - Form fields                     │ ← Custom Content
│   - Controls                        │
│   - Lists                           │
│   - etc.                            │
│                                     │
├─────────────────────────────────────┤
│              [ OK ] [ Cancel ]      │ ← Button Row
└─────────────────────────────────────┘
```

### Components

1. **Titlebar** - See titlebar.md
   - Dialog title
   - Close button (×)
   - Draggable

2. **Content Area**
   - Flexible layout
   - Can contain any controls
   - Padding: 8-12px
   - May be scrollable

3. **Button Row** (optional but common)
   - OK, Cancel, Apply, etc.
   - Right-aligned
   - 6px gap between buttons
   - 8-12px from bottom

## Common Dialog Layouts

### Form Dialog
```
┌─────────────────────────────────┐
│ Settings                    [×] │
├─────────────────────────────────┤
│ Name:     [____________]        │
│ Email:    [____________]        │
│ Phone:    [____________]        │
│                                 │
│ ☐ Remember me                   │
│                                 │
│          [ OK ] [ Cancel ]      │
└─────────────────────────────────┘
```

### Tabbed Dialog
```
┌─────────────────────────────────┐
│ Properties                  [×] │
├─────────────────────────────────┤
│ [General] [Details] [Advanced]  │ ← Tab buttons
│ ─────────                       │
│                                 │
│   Tab content area              │
│                                 │
│          [ OK ] [ Cancel ]      │
└─────────────────────────────────┘
```

### List Dialog
```
┌─────────────────────────────────┐
│ Open File                   [×] │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ file1.txt                   │ │
│ │ file2.txt                   │ │
│ │ file3.txt                   │ │
│ └─────────────────────────────┘ │
│                                 │
│ File name: [____________]       │
│                                 │
│          [ Open ] [ Cancel ]    │
└─────────────────────────────────┘
```

## Dialog Patterns

### Confirmation Dialog
- Simple message
- Yes/No or OK/Cancel buttons
- Modal
- Auto-focuses default button

### Settings/Properties Dialog
- Multiple form fields
- Tabs for different categories (optional)
- OK applies and closes
- Cancel closes without saving
- Apply button saves without closing (optional)

### File Dialog
- File/folder browser
- File name input
- File type filter
- Open/Save buttons

### Progress Dialog
- Shows operation progress
- Progress bar
- Status text
- Cancel button (optional)
- Modal during operation

## States

### Modal
- Backdrop dims background
- Blocks parent interaction
- Z-index 1000+
- Focus trapped

### Modeless
- No backdrop
- Parent windows interactive
- Z-index 100-999
- Focus not trapped

### Dragging
- Click titlebar to drag
- Dialog moves with cursor
- Constrained to viewport

### Resizable (Optional)
- Resize handles on edges
- Respects min/max dimensions
- Content reflows

## Behavior

### Opening
1. Dialog appears (centered or at position)
2. Backdrop appears (if modal)
3. Focus moves to first input or default button
4. Parent windows become inactive (if modal)

### Closing
**Via Button:**
- Button action executes
- Dialog closes
- Focus returns to parent

**Via Close Button (×):**
- Same as Cancel button
- Or prompts to save if changes made

**Via Escape Key:**
- Same as Cancel button

**Via Clicking Backdrop (Modal):**
- Optional: Close dialog
- Or: Do nothing (keep dialog open)

### Form Submission
- Enter key submits form (if in input field)
- Tab cycles through form fields
- Shift+Tab cycles backwards

### Validation
- Validate on OK click
- Show error messages inline
- Keep dialog open if validation fails
- Focus first invalid field

## Accessibility

### ARIA Attributes

**Modal dialog:**
```html
<div
  class="win98-dialog"
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
```

**Modeless dialog:**
```html
<div
  class="win98-dialog"
  role="dialog"
  aria-modal="false"
  aria-labelledby="dialog-title"
>
```

### Screen Reader
- Announces as "Dialog"
- Reads dialog title
- Reads description (if provided)
- Announces form labels and errors

### Keyboard Navigation
- Tab cycles through interactive elements
- Shift+Tab cycles backwards
- Enter submits form or activates button
- Escape closes dialog
- Focus trapped (if modal)

### Focus Management
- Focus moves to dialog when opened
- Focus returns to trigger when closed
- First input or button receives initial focus
- Focus trapped within modal dialogs

## Usage Examples

### Basic Modal Dialog
```html
<div class="win98-modal-backdrop"></div>

<div class="win98-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <div class="win98-titlebar">
    <h1 id="dialog-title" class="win98-titlebar__text">Settings</h1>
    <div class="win98-titlebar__buttons">
      <button class="win98-titlebar-button" aria-label="Close">×</button>
    </div>
  </div>
  
  <div class="win98-dialog__content">
    <div class="field">
      <label for="username">Username:</label>
      <input type="text" id="username" class="win98-input">
    </div>
    
    <div class="field">
      <label for="email">Email:</label>
      <input type="email" id="email" class="win98-input">
    </div>
  </div>
  
  <div class="win98-dialog__buttons">
    <button class="win98-button primary">OK</button>
    <button class="win98-button">Cancel</button>
  </div>
</div>
```

### Tabbed Dialog
```html
<div class="win98-dialog" role="dialog">
  <div class="win98-titlebar">
    <h1 class="win98-titlebar__text">Properties</h1>
    <div class="win98-titlebar__buttons">
      <button class="win98-titlebar-button" aria-label="Close">×</button>
    </div>
  </div>
  
  <div class="win98-dialog__tabs">
    <button class="win98-tab win98-tab--active">General</button>
    <button class="win98-tab">Details</button>
    <button class="win98-tab">Advanced</button>
  </div>
  
  <div class="win98-dialog__content">
    <!-- Tab content here -->
  </div>
  
  <div class="win98-dialog__buttons">
    <button class="win98-button primary">OK</button>
    <button class="win98-button">Cancel</button>
    <button class="win98-button">Apply</button>
  </div>
</div>
```

### Progress Dialog
```html
<div class="win98-dialog" role="dialog" aria-modal="true">
  <div class="win98-titlebar">
    <h1 class="win98-titlebar__text">Copying Files</h1>
  </div>
  
  <div class="win98-dialog__content">
    <p>Copying file 3 of 10...</p>
    <progress class="win98-progress" value="30" max="100"></progress>
    <p class="status">document.txt</p>
  </div>
  
  <div class="win98-dialog__buttons">
    <button class="win98-button">Cancel</button>
  </div>
</div>
```

## CSS Implementation

```scss
.win98-dialog {
  position: fixed;
  min-width: 200px;
  max-width: 600px;
  min-height: 150px;
  max-height: 80vh;
  
  display: flex;
  flex-direction: column;
  
  background: var(--dialog-bg);
  
  border-top: 1px solid var(--dialog-border-light);
  border-left: 1px solid var(--dialog-border-light);
  border-right: 1px solid var(--dialog-border-shadow);
  border-bottom: 1px solid var(--dialog-border-shadow);
  
  box-shadow:
    inset 1px 1px 0 var(--dialog-border-light),
    inset -1px -1px 0 var(--dialog-border-dark),
    2px 2px 0 rgba(0, 0, 0, 0.5);
  
  z-index: 1000;
  
  &__content {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    padding: 0 12px 12px;
    flex-shrink: 0;
  }
  
  &__tabs {
    display: flex;
    gap: 2px;
    padding: 4px 4px 0;
    border-bottom: 2px solid var(--dialog-border-dark);
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  label {
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--dialog-text);
  }
}
```

## Positioning

### Centered Dialog
```javascript
function centerDialog(dialog) {
  const dialogRect = dialog.getBoundingClientRect();
  
  dialog.style.left = `${(window.innerWidth - dialogRect.width) / 2}px`;
  dialog.style.top = `${(window.innerHeight - dialogRect.height) / 2}px`;
}
```

## Testing Requirements

### Visual Tests
- Verify min/max dimensions enforced
- Verify window chrome (3px border)
- Verify button alignment
- Verify content scrolls if needed
- Verify both theme colors

### Modal Tests
- Modal dialog blocks parent interaction
- Backdrop visible
- Focus trapped in dialog
- Escape closes dialog

### Interaction Tests
- Click OK executes action and closes
- Click Cancel closes without action
- Close button (×) closes dialog
- Drag titlebar moves dialog
- Form submission works

### Keyboard Tests
- Tab cycles through fields and buttons
- Enter submits form
- Escape closes dialog
- All controls keyboard accessible

### Accessibility Tests
- Screen reader announces dialog
- Screen reader announces title
- Focus management correct
- ARIA attributes correct
- Form labels announced

## Notes

- Dialogs can be modal or modeless
- Modal dialogs have z-index 1000+
- Modeless dialogs have z-index 100-999 (same as windows)
- Content area is flexible and scrollable
- Buttons are right-aligned with 6px gaps
- Dialog can contain any controls (inputs, checkboxes, lists, etc.)
- Tab stops include all interactive elements
- Enter key submits if in form context
- Escape key closes dialog (same as Cancel)
- Dialogs appear instantly (no animation)
- Centered by default or positioned at specific location
- Can be dragged by titlebar
- Optional: Resizable with resize handles
