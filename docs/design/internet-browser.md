---
id: internet-browser
title: Internet Browser
---

# Internet Browser - Design Specification

## Overview

The Internet Browser is a Windows 98-style Internet Explorer clone that allows users to browse web content within the Abu OS 98 environment. It uses an iframe-based implementation to display external web content.

## Visual Design

### Window Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [×] Abu Internet Browser                                 [_][□][×]│
├─────────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                      │
├─────────────────────────────────────────────────────────────┤
│ [◄][►][×][↻][🏠][🔍][★][📋] Address: [________________] [Go]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    [IFRAME CONTENT]                         │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Done                                            My Computer  │
└─────────────────────────────────────────────────────────────┘
```

### Components

1. **Menu Bar**
   - File: (empty placeholder)
   - Edit: (empty placeholder)
   - View: Refresh
   - Go: Back, Forward, Home
   - Favorites: Manage bookmarks
   - Help: (empty placeholder)

2. **Toolbar**
   - Back button (◄)
   - Forward button (►)
   - Stop button (×)
   - Refresh button (↻)
   - Home button (🏠)
   - Search button (🔍)
   - Favorites button (★)
   - History button (📋)

3. **Address Bar**
   - URL input field
   - Go button

4. **Content Area**
   - iframe displaying web content
   - Loading indicator

5. **Status Bar**
   - Status text (left)
   - Zone indicator (right)

## Functionality

### Navigation

- **Back**: Navigate to previous URL in history
- **Forward**: Navigate to next URL in history
- **Stop**: Stop loading current page
- **Refresh**: Reload current page
- **Home**: Navigate to home page (default: about:blank)
- **Go**: Navigate to URL in address bar

### History Management

- Maintain navigation history (up to 50 entries)
- Support back/forward navigation
- Update button states based on history position

### Bookmarks

- Add current page to bookmarks
- View bookmarks list
- Navigate to bookmarked URL
- Remove bookmarks
- Store bookmarks in localStorage

### URL Handling

- Support http:// and https:// URLs
- Auto-prepend https:// if no protocol specified
- Display current URL in address bar
- Update address bar when navigating

### Error Handling

- Display error message for failed loads
- Handle CORS restrictions gracefully
- Show "Page cannot be displayed" for blocked content

## Data Structures

### Browser State

```typescript
interface BrowserState {
  currentUrl: string;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  showBookmarks: boolean;
}
```

### Bookmark

```typescript
interface Bookmark {
  id: string;
  title: string;
  url: string;
  dateAdded: number;
}
```

## Default Configuration

- **Window Size**: 800x600px
- **Home Page**: about:blank
- **Max History**: 50 entries
- **Default Bookmarks**: Empty

## Icon Assets

Using existing icons from the icon system:
- Browser Icon: `icon-apps-internet-internet-explorer`
- Back: `icon-ui-toolbar-back`
- Forward: `icon-ui-toolbar-forward`
- Stop: `icon-ui-toolbar-stop`
- Refresh: `icon-ui-toolbar-refresh`
- Home: `icon-ui-toolbar-home`
- Search: `icon-ui-toolbar-search`
- Favorites: `icon-ui-toolbar-favorites`
- History: `icon-ui-toolbar-history`

## Storage

- Bookmarks stored in localStorage under key `abu-browser-bookmarks`
- No session persistence (history resets on window close)

## Limitations

- iframe-based implementation subject to CORS restrictions
- Cannot access iframe content for security reasons
- Some sites may block iframe embedding (X-Frame-Options)
- No plugin support
- No download management
- No tab support (single instance per window)

## Accessibility

- All buttons have appropriate aria-labels
- Keyboard shortcuts:
  - Alt+Left: Back
  - Alt+Right: Forward
  - F5: Refresh
  - Ctrl+D: Add bookmark
  - Ctrl+L: Focus address bar

## Testing Requirements

### Unit Tests

1. Navigation functionality (back, forward, home)
2. URL handling and validation
3. History management
4. Bookmark CRUD operations
5. Button state management
6. Menu interactions

### Integration Tests

1. Window opening and closing
2. Navigation flow
3. Bookmark persistence
4. Error handling
5. Full user workflow

## Security Considerations

- **Sandbox Configuration**: iframe uses `allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox`
  - **Excludes `allow-same-origin`** to prevent sandbox escape vulnerability
  - This prevents the combination of `allow-scripts` + `allow-same-origin` which would allow embedded content to remove the sandbox attribute
  - Trade-off: Sites have limited access to their own cookies/storage, but remain functional
- Validate URLs before navigation
- No script injection into iframe
- Respect X-Frame-Options headers (browser enforced)
- Display security warnings for blocked content
