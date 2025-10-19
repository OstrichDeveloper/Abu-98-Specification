---
id: ie-exact-specification
title: Ie Exact Specification
---

# Windows 98 Internet Explorer 5.0 - Exact Visual Specification

## Overview

This document specifies the exact visual appearance of Internet Explorer 5.0 as it appeared in Windows 98, based on historical screenshots, documentation, and Windows 98 design guidelines.

## Window Structure

```
┌─[×] Internet - Microsoft Internet Explorer──────────────[_][□][×]┐
├─────────────────────────────────────────────────────────────────────┤
│ File  Edit  View  Favorites  Tools  Help                           │ Menu Bar
├─────────────────────────────────────────────────────────────────────┤
│ [◄][►][■][↻][🏠]  │ [🔍] Search [★] Favorites [📜] History         │ Standard Buttons Toolbar
├─────────────────────────────────────────────────────────────────────┤
│ Address │▼│ [                                              ] [Go]   │ Address Bar
├─────────────────────────────────────────────────────────────────────┤
│ Links   ▼ │ [ Best of the Web ] [ Channel Guide ] [ Customize... ]│ Links Bar (optional)
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        [CONTENT AREA]                               │
│                                                                     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ Done                                                   Local intranet│ Status Bar
└─────────────────────────────────────────────────────────────────────┘
```

## 1. Menu Bar Specifications

### Structure
- **Menus**: File | Edit | View | Favorites | Tools | Help
- **Height**: 18px (excluding border)
- **Background**: `#C0C0C0` (Windows button face color)
- **Font**: MS Sans Serif, 11px, regular weight
- **Text Color**: Black (#000000)
- **Border**: None on sides, 1px solid `#808080` (button shadow) on bottom

### Menu Items
- **Padding**: 4px horizontal, 3px vertical
- **Spacing**: 0px between items (tight)
- **Alignment**: Left-aligned with 2px offset from left edge

### Hover State
- **Background**: `#000080` (Navy blue - Windows highlight)
- **Text Color**: White (#FFFFFF)
- **Border**: 1px solid transparent

### Underlined Mnemonics
- File: **F**ile
- Edit: **E**dit
- View: **V**iew
- Favorites: **a** (Favorites)
- Tools: **T**ools
- Help: **H**elp

### Menu Contents

#### File Menu
- New
  - Window (Ctrl+N)
  - Message...
  - Post...
  - Contact...
  - Internet Call...
- Open... (Ctrl+O)
- Edit
- Save (Ctrl+S)
- Save As...
- ───────────── (separator)
- Page Setup...
- Print... (Ctrl+P)
- Print Preview
- ───────────── (separator)
- Send
  - Page by Email...
  - Link by Email...
  - Shortcut to Desktop
- Import and Export...
- Properties
- ───────────── (separator)
- Work Offline
- ───────────── (separator)
- Close

#### Edit Menu
- Cut (Ctrl+X)
- Copy (Ctrl+C)
- Paste (Ctrl+V)
- ───────────── (separator)
- Select All (Ctrl+A)
- ───────────── (separator)
- Find (on This Page)... (Ctrl+F)

#### View Menu
- Toolbars
  - Standard Buttons
  - Address Bar
  - Links
  - ───────────── (separator)
  - Customize...
- Status Bar
- Explorer Bar
  - Search (Ctrl+E)
  - Favorites (Ctrl+I)
  - History (Ctrl+H)
  - Channels
  - ───────────── (separator)
  - Tip of the Day
- ───────────── (separator)
- Go To
  - Back (Alt+Left Arrow)
  - Forward (Alt+Right Arrow)
  - Up One Level
  - Home Page (Alt+Home)
- Stop (Esc)
- Refresh (F5)
- ───────────── (separator)
- Text Size
  - Largest
  - Larger
  - Medium (•)
  - Smaller
  - Smallest
- Encoding
- ───────────── (separator)
- Source
- Full Screen (F11)

#### Favorites Menu
- Add to Favorites... (Ctrl+D)
- Organize Favorites...
- ───────────── (separator)
- Links
- ───────────── (separator)
- [User bookmarks appear here]

#### Tools Menu
- Mail and News
  - Read Mail
  - New Message... (Ctrl+Shift+M)
  - Send a Link...
  - Send Page...
  - Read News
- Synchronize...
- Windows Update
- ───────────── (separator)
- Show Related Links
- ───────────── (separator)
- Internet Options...

#### Help Menu
- Contents and Index
- Tip of the Day
- For Netscape Users
- Online Support
- ───────────── (separator)
- Send Feedback
- ───────────── (separator)
- About Internet Explorer

## 2. Standard Buttons Toolbar

### Toolbar Container
- **Height**: 38px total (includes 2px padding top/bottom)
- **Background**: `#C0C0C0`
- **Border Top**: 1px solid `#FFFFFF` (highlight)
- **Border Bottom**: 1px solid `#808080` (shadow)
- **Padding**: 2px all around

### Button Specifications
- **Size**: 23x22px (width x height)
- **Spacing**: 1px between buttons
- **Style**: Raised 3D button effect
  - Border Top/Left: 1px solid `#FFFFFF` (highlight)
  - Border Right/Bottom: 1px solid `#808080` (shadow)
  - Inner Border Right/Bottom: 1px solid `#000000` (dark shadow)

### Button States
- **Normal**: Raised, gray background
- **Hover**: Slightly lighter gray, raised
- **Pressed**: Inverted borders (appears sunken)
  - Border Top/Left: 1px solid `#808080`
  - Border Right/Bottom: 1px solid `#FFFFFF`
- **Disabled**: Grayed out icon, no interaction

### Standard Buttons (Left to Right)

1. **Back** ◄
   - Icon: Left-pointing arrow
   - Tooltip: "Back (Alt+Left Arrow)"
   - Disabled when: No previous page in history

2. **Forward** ►
   - Icon: Right-pointing arrow
   - Tooltip: "Forward (Alt+Right Arrow)"
   - Disabled when: No next page in history

3. **Stop** ■
   - Icon: Red X or stop sign
   - Tooltip: "Stop (Esc)"
   - Disabled when: Not loading

4. **Refresh** ↻
   - Icon: Circular arrows
   - Tooltip: "Refresh (F5)"

5. **Home** 🏠
   - Icon: House
   - Tooltip: "Home (Alt+Home)"

6. **Separator** (3px gray vertical bar with shadow)

7. **Search** 🔍
   - Icon: Magnifying glass
   - Text: "Search"
   - Button width: 55px
   - Tooltip: "Search the Web (Ctrl+E)"

8. **Favorites** ★
   - Icon: Star with folder
   - Text: "Favorites"
   - Button width: 65px
   - Tooltip: "Favorites (Ctrl+I)"

9. **History** 📜
   - Icon: Clock with paper
   - Text: "History"
   - Button width: 55px
   - Tooltip: "History (Ctrl+H)"

10. **Separator**

11. **Fullscreen** (optional)
    - Icon: Window maximize
    - Tooltip: "Full Screen (F11)"

12. **Mail** ✉ (optional)
    - Icon: Envelope
    - Text: "Mail"
    - Dropdown arrow
    - Tooltip: "Mail"

13. **Print** 🖨 (optional)
    - Icon: Printer
    - Tooltip: "Print (Ctrl+P)"

14. **Edit** ✏ (optional)
    - Icon: Notepad
    - Tooltip: "Edit"

## 3. Address Bar

### Container
- **Height**: 24px total
- **Background**: `#C0C0C0`
- **Border Top**: 1px solid `#FFFFFF`
- **Border Bottom**: 1px solid `#808080`
- **Padding**: 3px vertical, 4px horizontal

### Components (Left to Right)

1. **Label "Address"**
   - Font: MS Sans Serif, 11px
   - Color: Black
   - Padding Right: 4px

2. **Dropdown Arrow**
   - Size: 16x16px
   - Style: Combobox dropdown button
   - Border: Sunken 3D effect

3. **URL Input Field**
   - Background: White (#FFFFFF)
   - Border: 2px sunken (inset style)
     - Top/Left: 1px `#808080`, 1px `#000000`
     - Bottom/Right: 1px `#FFFFFF`, 1px `#C0C0C0`
   - Font: MS Sans Serif, 11px
   - Padding: 2px 4px
   - Height: 18px (internal)
   - Icon: Small page/document icon on left (16x16px)
   - Flex: 1 (takes remaining space)

4. **Go Button**
   - Text: "Go"
   - Width: 35px
   - Height: 22px
   - Style: Standard raised button
   - Margin Left: 2px

## 4. Links Bar (Optional Toolbar)

### Container
- **Height**: 22px
- **Background**: `#C0C0C0`
- **Border**: Same as Address Bar
- **Display**: Can be hidden via View > Toolbars > Links

### Components

1. **Label "Links"**
   - Font: MS Sans Serif, 11px, bold
   - Padding: 2px 4px

2. **Dropdown Arrow**
   - Small down arrow (▼)
   - Opens overflow menu

3. **Link Buttons**
   - Text-based buttons
   - Padding: 2px 8px
   - Border: 1px solid transparent
   - Hover: Raised 3D effect
   - Style: Flat until hover

### Default Links
- "Best of the Web"
- "Channel Guide"
- "Customize Links"
- "Free HotMail"
- "Internet Start"
- "Microsoft"

## 5. Status Bar

### Container
- **Height**: 20px
- **Background**: `#C0C0C0`
- **Border Top**: 1px solid `#FFFFFF` (highlight)
- **Border Bottom**: None (window edge)

### Components (Left to Right)

1. **Status Text Area**
   - Flex: 1
   - Font: MS Sans Serif, 11px
   - Color: Black
   - Padding: 2px 6px
   - Border Right: 1px sunken separator
   - Text examples:
     - "Done"
     - "Opening page..."
     - "Opening page http://example.com..."
     - "Downloading picture from site..."

2. **Zone Indicator**
   - Width: ~100px
   - Text: "Internet" or "Local intranet" or "Trusted sites" or "Restricted sites"
   - Icon: Small padlock (if secure) or zone icon
   - Border: Sunken panel appearance
   - Padding: 2px 6px

3. **Progress Bar** (appears during loading)
   - Width: ~120px
   - Height: 14px
   - Shows animated progress

## 6. Colors and Styling

### Windows 98 System Colors
```css
--color-button-face: #C0C0C0;           /* Main gray background */
--color-button-highlight: #FFFFFF;       /* Top/left borders (light) */
--color-button-shadow: #808080;          /* Bottom/right borders (medium) */
--color-button-dark-shadow: #000000;     /* Darkest shadow */
--color-button-text: #000000;            /* Text on buttons */
--color-window: #FFFFFF;                 /* Window background */
--color-window-text: #000000;            /* Text in windows */
--color-highlight: #000080;              /* Selected items (navy) */
--color-highlight-text: #FFFFFF;         /* Text on selected items */
--color-gray-text: #808080;              /* Disabled text */
--color-3d-light: #E0E0E0;              /* Lighter 3D highlight */
```

### Font Specifications
```css
font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, Arial, sans-serif;
font-size: 11px;
font-smooth: never;
-webkit-font-smoothing: none;
-moz-osx-font-smoothing: grayscale;
```

### Border Effects
- **Raised (Outset)**:
  - Top/Left: 1px `#FFFFFF`, then 1px `#C0C0C0`
  - Bottom/Right: 1px `#000000`, then 1px `#808080`

- **Sunken (Inset)**:
  - Top/Left: 1px `#808080`, then 1px `#000000`
  - Bottom/Right: 1px `#FFFFFF`, then 1px `#C0C0C0`

- **Flat with Shadow**:
  - Bottom only: 1px `#808080`

## 7. Interactive Behaviors

### Menu Dropdown
- **Trigger**: Click or Alt+[mnemonic key]
- **Animation**: Instant (no fade)
- **Shadow**: 2px offset, semi-transparent black
- **Border**: 1px solid `#000000`
- **Background**: `#C0C0C0`
- **Item Height**: 20px
- **Item Padding**: 4px 20px 4px 24px
- **Hover**: Navy background, white text
- **Disabled**: Gray text, no hover
- **Separator**: 1px height with dual-tone line
- **Checkmark**: 16x16px on left (if checked)
- **Submenu Arrow**: ► on right (if has submenu)

### Toolbar Buttons
- **Click Effect**: Visual "press" (sunken for 100ms)
- **Dropdown Buttons**: Small down arrow on right side
- **Dropdown Menu**: Similar to menu bar dropdowns

### Address Bar
- **Autocomplete**: Dropdown with history/suggestions
- **Icon**: Changes based on protocol (http, https, ftp, file)
- **Enter Key**: Navigates to entered URL
- **Ctrl+Enter**: Adds www. and .com

## 8. Measurements Summary

| Element | Height | Notes |
|---------|--------|-------|
| Title Bar | 20px | System controlled |
| Menu Bar | 18px | Plus 1px bottom border |
| Standard Toolbar | 38px | Includes padding and borders |
| Address Bar | 24px | Includes padding and borders |
| Links Bar | 22px | Optional |
| Status Bar | 20px | Plus 1px top border |
| **Total Chrome** | **~122px** | Without links bar: ~100px |

## 9. Icon Specifications

### Toolbar Icons
- **Size**: 16x16px (at 96 DPI)
- **Style**: 
  - 16-color or 256-color palette
  - Flat appearance (not glossy)
  - 1px black outline on complex shapes
  - Dithered gradients
  - Transparent background

### Required Icons
1. Back arrow (left-pointing green arrow)
2. Forward arrow (right-pointing green arrow)
3. Stop (red X or stop sign)
4. Refresh (green circular arrows)
5. Home (house with chimney)
6. Search (magnifying glass)
7. Favorites (yellow star with folder)
8. History (clock face with paper)
9. Fullscreen (window maximize)
10. Mail (envelope)
11. Print (printer)
12. Edit (notepad with pencil)

## 10. Accessibility

### Keyboard Navigation
- **Alt**: Activates menu bar
- **Alt + [Letter]**: Opens specific menu
- **Tab**: Moves focus through elements
- **Ctrl+L**: Focus address bar
- **F6**: Cycle through frames
- **Alt+D**: Select address bar text

### Screen Reader
- All buttons have accessible names
- Status bar provides live updates
- Menu items announce state (checked, disabled)

## Implementation Notes

1. Use actual Windows 98 system fonts if available
2. Pixel-perfect alignment is critical
3. No CSS animations or transitions (instant state changes)
4. Maintain 1px precision on all borders
5. Use 96 DPI as base resolution
6. Test at 800x600 resolution (common in Windows 98 era)
7. Ensure proper color degradation for 16-bit color displays
