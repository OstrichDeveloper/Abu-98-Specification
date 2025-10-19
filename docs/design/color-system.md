---
id: color-system
title: Color System
sidebar_position: 3
---

# Abu OS Color System

Single source of truth for all colors in the Abu OS ecosystem.

## Philosophy

The Abu OS color system is designed to faithfully recreate the Windows 98 aesthetic while providing clear semantic meaning and consistent usage across all components.

## Color Palette

### System Colors

#### Windows Blue {#windows-blue}
- **Hex**: `#000080`
- **Usage**: Title bars, active window borders, system highlights
- **Purpose**: Primary brand color, indicates active state

#### Button Face {#button-face}
- **Hex**: `#C0C0C0`
- **Usage**: Button backgrounds, dialog backgrounds, control surfaces
- **Purpose**: Default control background

#### Button Shadow {#button-shadow}
- **Hex**: `#808080`
- **Usage**: Button shadows, control borders (bottom/right)
- **Purpose**: Creates 3D depth effect

#### Button Highlight {#button-highlight}
- **Hex**: `#FFFFFF`
- **Usage**: Button highlights, control borders (top/left)
- **Purpose**: Creates 3D raised effect

#### Button Dark Shadow {#button-dark-shadow}
- **Hex**: `#000000`
- **Usage**: Outer control borders, strong shadows
- **Purpose**: Maximum contrast for edges

### Text Colors

#### Window Text {#window-text}
- **Hex**: `#000000`
- **Usage**: Default text color
- **Purpose**: Primary text

#### Gray Text {#gray-text}
- **Hex**: `#808080`
- **Usage**: Disabled text
- **Purpose**: Indicates disabled state

### Desktop Colors

#### Desktop {#desktop}
- **Hex**: `#008080`
- **Usage**: Desktop background (teal)
- **Purpose**: Classic Windows 98 desktop color

## Usage Guidelines

### In Component Documentation

Always reference colors by name with a hyperlink:

```markdown
Background: [Button Face](#button-face)
Border: [Button Shadow](#button-shadow)
```

### In Code

```css
.button {
  background-color: #C0C0C0; /* Button Face */
  border-top: 1px solid #FFFFFF; /* Button Highlight */
  border-left: 1px solid #FFFFFF; /* Button Highlight */
  border-bottom: 1px solid #808080; /* Button Shadow */
  border-right: 1px solid #808080; /* Button Shadow */
}
```

## Semantic Colors

- **Active**: [Windows Blue](#windows-blue)
- **Inactive**: [Button Face](#button-face)
- **Disabled**: [Gray Text](#gray-text)
- **Focus**: [Windows Blue](#windows-blue)
- **Hover**: Slight variation of base color

## Accessibility

While recreating the Windows 98 aesthetic, ensure sufficient contrast ratios where possible:

- Text on [Button Face](#button-face): Use [Window Text](#window-text) (black)
- Text on [Windows Blue](#windows-blue): Use white for maximum contrast
- Disabled text: [Gray Text](#gray-text) on [Button Face](#button-face)

