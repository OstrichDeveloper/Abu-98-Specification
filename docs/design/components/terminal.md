---
id: terminal
title: Terminal
---

# Terminal Component - Design Specification

## Overview

The Terminal Component is a reusable, programmatically-controllable terminal emulator that provides an authentic Windows 98 MS-DOS Prompt experience. It can operate in multiple modes: standalone DOS emulation with local command execution, or as a streaming terminal that displays output from external sources (SSH, WebSocket, etc.). The component is designed to be embedded in windows created by plugins or used standalone.

## Component Type

**Reusable Component** (not a plugin itself)

- Exported from `src/lib/components/terminal/Terminal.svelte`
- Can be embedded by any plugin or component
- Provides both declarative (props) and imperative (API) interfaces
- Self-contained with internal state management
- No dependencies on specific plugins

## Visual Design

### Appearance

```
┌──────────────────────────────────────────┐
│  Microsoft(R) Windows 98                 │
│     (C)Copyright Microsoft Corp...       │
│                                          │
│  C:\>echo Hello World                   │
│  Hello World                             │
│                                          │
│  C:\>dir                                 │
│  'dir' is not recognized...              │
│                                          │
│  C:\>█                                   │
└──────────────────────────────────────────┘
```

### Dimensions

```
Default width: 100% of container
Default height: 100% of container
Minimum dimensions: Inherited from container
Terminal padding: 16px
Scrollable: Yes
```

### Components

1. **Terminal Screen**
   - Black background (#000000)
   - Light gray text (#AAAAAA)
   - 16px padding
   - Scrollable with authentic scrollbar
   - Monospace font (Courier New, 16px)
   - White block cursor (9px × 16px)
   - Blinks at 530ms intervals

2. **Output Display**
   - Previous command history
   - Command output
   - Error messages
   - System messages

3. **Input Line** (DOS mode only)
   - Prompt (configurable, default: `C:\>`)
   - Current input text
   - Blinking cursor

4. **Cursor**
   - White block character (█)
   - Blinks on/off every 530ms
   - Positioned at input end or data end

## Color Palette

```css
/* Screen */
--terminal-bg: #000000                   /* Pure black */
--terminal-text: #AAAAAA                 /* Light gray */
--terminal-text-bright: #FFFFFF          /* Bright white */
--terminal-prompt: #FFFFFF               /* White prompt */
--terminal-error: #FFFFFF                /* Error text */

/* Cursor */
--cursor-color: #FFFFFF                  /* White */
--cursor-width: 9px
--cursor-height: 16px
--cursor-blink-rate: 530ms
```

## Typography

```css
font-family: 'Courier New', monospace;
font-size: 16px;
line-height: 19px;
letter-spacing: 0;
-webkit-font-smoothing: none;
-moz-osx-font-smoothing: grayscale;
font-smooth: never;
```

## Component Interface

### Props

```typescript
interface TerminalProps {
  // Operational mode
  mode?: 'dos' | 'stream';               // Default: 'dos'
  
  // DOS mode settings
  prompt?: string;                       // Default: 'C:\\>'
  bootMessage?: string[];                // Default: Windows 98 copyright
  enableCommandHistory?: boolean;        // Default: true
  maxHistorySize?: number;               // Default: 100
  
  // Stream mode settings
  stream?: `ReadableStream<string>`;       // External data stream
  enableInput?: boolean;                 // Allow user input in stream mode
  onInput?: (data: string) => void;      // Input callback for stream mode
  
  // Display settings
  maxLines?: number;                     // Default: 10000
  cursorBlinkRate?: number;              // Default: 530 (ms)
  autoScroll?: boolean;                  // Default: true
  
  // Command execution (DOS mode)
  commands?: CommandRegistry;            // Custom command implementations
  
  // Event handlers
  onCommand?: (command: string, args: string[]) => CommandResult;
  onReady?: () => void;
  onClear?: () => void;
}
```

### Command Registry

```typescript
interface CommandRegistry {
  [command: string]: CommandHandler;
}

interface CommandHandler {
  execute: (args: string[], context: CommandContext) => CommandResult;
  help?: string;
  syntax?: string;
}

interface CommandContext {
  terminal: TerminalAPI;
  currentDirectory?: string;
  environment?: `Record<string, string>`;
}

interface CommandResult {
  output: string[];
  exitCode: number;
  error?: string;
}
```

### Imperative API

```typescript
interface TerminalAPI {
  // Output methods
  write(text: string): void;
  writeLine(text: string): void;
  writeError(text: string): void;
  writeLines(lines: string[]): void;
  
  // Input methods (stream mode)
  sendInput(data: string): void;
  sendKeys(keys: string): void;
  
  // Control methods
  clear(): void;
  reset(): void;
  focus(): void;
  
  // Stream control
  attachStream(stream: `ReadableStream<string>`): void;
  detachStream(): void;
  
  // State queries
  getOutput(): string[];
  getHistory(): string[];
  getMode(): 'dos' | 'stream';
  
  // Command execution (DOS mode)
  executeCommand(command: string): `Promise<CommandResult>`;
}
```

### Bindings

```html
<Terminal
  bind:this={terminalRef}
  bind:api={terminalAPI}
  mode="dos"
  {commands}
/>
```

## Operating Modes

### DOS Mode

**Description**: Full MS-DOS emulation with local command execution

**Features**:
- Displays boot message on startup
- Shows command prompt (`C:\>`)
- Accepts user keyboard input
- Executes registered commands
- Maintains command history
- Up/Down arrow for history navigation
- Ctrl+C to cancel input
- Ctrl+L to clear screen

**Default Commands**:
- `echo [text...]` - Display text
- All other commands return "command not found" error

**Example**:
```html
<Terminal
  mode="dos"
  prompt="C:\>"
  commands={{
    echo: {
      execute: (args) => ({
        output: args.length > 0 ? [args.join(' ')] : [''],
        exitCode: 0
      })
    }
  }}
/>
```

### Stream Mode

**Description**: Display-only terminal that shows data from external stream

**Features**:
- No command prompt
- Displays streamed data in real-time
- Optional user input (forwarded via callback)
- No command history
- No local command execution
- Auto-scroll on new data

**Example**:
```html
<script>
  let terminalAPI;
  let websocket;
  
  async function connect() {
    websocket = new WebSocket('ws://host:port');
    
    const stream = new ReadableStream({
      start(controller) {
        websocket.onmessage = (e) => {
          controller.enqueue(e.data);
        };
        websocket.onclose = () => {
          controller.close();
        };
      }
    });
    
    terminalAPI.attachStream(stream);
  }
</script>

<Terminal
  bind:api={terminalAPI}
  mode="stream"
  enableInput={true}
  onInput={(data) => websocket.send(data)}
/>
```

## Functionality

### Boot Sequence (DOS Mode)

1. Component mounts
2. Display boot message:
   ```
   Microsoft(R) Windows 98
      (C)Copyright Microsoft Corp 1981-1999.
   
   C:\>
   ```
3. Start cursor blinking
4. Focus terminal for input
5. Fire `onReady` callback

### Input Handling (DOS Mode)

#### Character Input
- User types: character appears after prompt
- Cursor advances
- Input buffer updates

#### Backspace
- Removes last character
- Cursor moves back
- Cannot delete prompt

#### Enter Key
1. Capture current input
2. Add to command history
3. Execute command
4. Display output
5. Show new prompt
6. Clear input buffer
7. Reset cursor position

#### Arrow Keys
- **Up**: Navigate to previous command in history
- **Down**: Navigate to next command in history
- **Left/Right**: (Future) Move cursor within line

#### Control Keys
- **Ctrl+C**: Cancel input, show new prompt
- **Ctrl+L**: Clear screen
- **Ctrl+V**: Paste from clipboard

### Input Handling (Stream Mode)

#### User Input (if enabled)
- Capture keystrokes
- Forward to `onInput` callback
- No local echo (stream controls display)

#### Special Keys
- **Ctrl+C**: Forward as control character (\x03)
- **Ctrl+D**: Forward as control character (\x04)
- **Arrow keys**: Forward as ANSI sequences

### Command Execution (DOS Mode)

1. **Parse Command**
   ```typescript
   const input = "echo Hello World";
   const parts = input.trim().split(/\s+/);
   const command = parts[0].toLowerCase();  // "echo"
   const args = parts.slice(1);             // ["Hello", "World"]
   ```

2. **Lookup Handler**
   ```typescript
   const handler = commands[command];
   if (!handler) {
     return unknownCommandError(command);
   }
   ```

3. **Execute**
   ```typescript
   const result = handler.execute(args, context);
   ```

4. **Display Output**
   ```typescript
   result.output.forEach(line => writeLine(line));
   if (result.error) {
     writeError(result.error);
   }
   ```

5. **Show New Prompt**
   ```typescript
   writeLine('');
   write(prompt);
   ```

### Stream Handling (Stream Mode)

1. **Attach Stream**
   ```typescript
   async function attachStream(stream: `ReadableStream<string>`) {
     const reader = stream.getReader();
     try {
       while (true) {
         const { done, value } = await reader.read();
         if (done) break;
         write(value);
       }
     } finally {
       reader.releaseLock();
     }
   }
   ```

2. **Process Data**
   - Split on newlines
   - Handle \r\n and \r
   - Append to output buffer
   - Auto-scroll to bottom
   - Trim old lines if exceeds max

### Command History

**Storage**: Array of executed commands
**Navigation**: Up/Down arrow keys
**Persistence**: Session only (not saved)
**Limit**: Configurable (default 100)

**Example**:
```typescript
history = ["echo first", "echo second", "echo third"];
historyIndex = -1;  // Not browsing

// User presses Up
historyIndex = 2;  // "echo third"
currentInput = history[2];

// User presses Up again
historyIndex = 1;  // "echo second"
currentInput = history[1];

// User presses Down
historyIndex = 2;  // "echo third"
currentInput = history[2];

// User presses Down again
historyIndex = -1;  // Back to empty
currentInput = "";
```

### Output Buffer

**Structure**: Array of strings (one per line)
**Max Size**: Configurable (default 10000 lines)
**Trimming**: Remove oldest when limit exceeded
**Scrolling**: Auto-scroll to bottom on new output

```typescript
function addOutput(text: string) {
  const lines = text.split(/\r?\n/);
  output.push(...lines);
  
  if (output.length > maxLines) {
    output = output.slice(-maxLines);
  }
  
  if (autoScroll) {
    scrollToBottom();
  }
}
```

## Default Commands (DOS Mode)

### ECHO Command

**Syntax**: `echo [text...]`

**Description**: Display text to terminal

**Implementation**:
```typescript
{
  execute: (args) => ({
    output: args.length > 0 ? [args.join(' ')] : [''],
    exitCode: 0
  }),
  help: 'Displays messages',
  syntax: 'echo [message]'
}
```

**Examples**:
```
C:\>echo
<blank line>

C:\>echo Hello World
Hello World

C:\>echo Testing 123
Testing 123
```

### Unknown Command Handler

**Error Message**:
```
'[command]' is not recognized as an internal or external
command, operable program or batch file.
```

**Implementation**:
```typescript
function unknownCommand(command: string): CommandResult {
  return {
    output: [
      `'${command}' is not recognized as an internal or external`,
      `command, operable program or batch file.`
    ],
    exitCode: 1,
    error: 'Command not found'
  };
}
```

## State Management

### Internal State

```typescript
interface TerminalState {
  // Mode
  mode: 'dos' | 'stream';
  
  // Output
  output: string[];                    // All displayed lines
  maxLines: number;                    // Buffer limit
  
  // Input (DOS mode)
  currentInput: string;                // Current command being typed
  prompt: string;                      // Command prompt text
  
  // History (DOS mode)
  commandHistory: string[];            // Previous commands
  historyIndex: number;                // Current position in history
  maxHistorySize: number;              // History limit
  
  // Cursor
  cursorVisible: boolean;              // Blink state
  cursorBlinkRate: number;             // Blink interval (ms)
  
  // Stream (stream mode)
  stream: `ReadableStream<string>` | null;
  streamReader: ReadableStreamDefaultReader | null;
  
  // Settings
  autoScroll: boolean;
  enableInput: boolean;
  
  // References
  scrollElement: HTMLDivElement | null;
  focusElement: HTMLDivElement | null;
}
```

### Reactive State (Svelte 5)

```typescript
let mode = $state<'dos' | 'stream'>('dos');
let output = $state<string[]>([]);
let currentInput = $state('');
let commandHistory = $state<string[]>([]);
let historyIndex = $state(-1);
let cursorVisible = $state(true);
let stream = $state<ReadableStream<string> | null>(null);
let scrollElement = $state<HTMLDivElement | null>(null);

// Derived
const isInputMode = $derived(mode === 'dos');
const hasOutput = $derived(output.length > 0);
const currentLine = $derived(
  isInputMode ? `${prompt}${currentInput}` : ''
);
```

### Effects

```typescript
// Cursor blinking
$effect(() => {
  const interval = setInterval(() => {
    cursorVisible = !cursorVisible;
  }, cursorBlinkRate);
  
  return () => clearInterval(interval);
});

// Auto-scroll
$effect(() => {
  if (autoScroll && scrollElement && output.length > 0) {
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }
});

// Stream reader
$effect(() => {
  if (stream) {
    attachStreamInternal(stream);
  }
  
  return () => {
    detachStreamInternal();
  };
});
```

## Keyboard Handling

### DOS Mode

| Key | Action |
|-----|--------|
| `A-Z, 0-9, Space, Punctuation` | Type character |
| `Enter` | Execute command |
| `Backspace` | Delete last character |
| `↑` | Previous command |
| `↓` | Next command |
| `Ctrl+C` | Cancel input |
| `Ctrl+L` | Clear screen |
| `Ctrl+V` | Paste |
| `Tab` | (Future) Autocomplete |

### Stream Mode (Input Enabled)

| Key | Action |
|-----|--------|
| `Any printable` | Forward to onInput |
| `Enter` | Send \r or \n |
| `Backspace` | Send \x7F |
| `Ctrl+C` | Send \x03 |
| `Ctrl+D` | Send \x04 |
| `Arrow keys` | Send ANSI sequences |
| `Tab` | Send \t |

## Usage Examples

### Example 1: Simple DOS Terminal

```html
<script>
  import Terminal from '$lib/components/terminal/Terminal.svelte';
  
  const commands = {
    echo: {
      execute: (args) => ({
        output: args.length > 0 ? [args.join(' ')] : [''],
        exitCode: 0
      })
    }
  };
</script>

<Terminal mode="dos" {commands} />
```

### Example 2: SSH Streaming Terminal

```html
<script>
  import Terminal from '$lib/components/terminal/Terminal.svelte';
  
  let terminalAPI;
  let ws;
  
  async function connect(host, port) {
    ws = new WebSocket(`ws://${host}:${port}/ws`);
    
    const stream = new ReadableStream({
      start(controller) {
        ws.onmessage = (e) => controller.enqueue(e.data);
        ws.onclose = () => controller.close();
      }
    });
    
    terminalAPI.attachStream(stream);
  }
  
  function handleInput(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  }
</script>

<Terminal
  bind:api={terminalAPI}
  mode="stream"
  enableInput={true}
  onInput={handleInput}
/>
```

### Example 3: Custom Commands

```html
<script>
  import Terminal from '$lib/components/terminal/Terminal.svelte';
  
  const commands = {
    echo: {
      execute: (args) => ({
        output: [args.join(' ')],
        exitCode: 0
      }),
      help: 'Display a line of text',
      syntax: 'echo [text...]'
    },
    cls: {
      execute: (args, context) => {
        context.terminal.clear();
        return { output: [], exitCode: 0 };
      },
      help: 'Clear the screen',
      syntax: 'cls'
    },
    ver: {
      execute: () => ({
        output: [
          'Microsoft(R) Windows 98',
          '   [Version 4.10.2222]'
        ],
        exitCode: 0
      }),
      help: 'Display the Windows version',
      syntax: 'ver'
    }
  };
</script>

<Terminal mode="dos" {commands} />
```

### Example 4: Programmatic Control

```html
<script>
  import Terminal from '$lib/components/terminal/Terminal.svelte';
  
  let api;
  
  function demo() {
    api.writeLine('Starting demo...');
    api.writeLine('');
    
    setTimeout(() => {
      api.writeLine('Step 1 complete');
    }, 1000);
    
    setTimeout(() => {
      api.writeLine('Step 2 complete');
    }, 2000);
    
    setTimeout(() => {
      api.writeLine('Demo finished!');
    }, 3000);
  }
</script>

<button onclick={demo}>Run Demo</button>
<Terminal bind:api mode="dos" />
```

## Testing Requirements

### Unit Tests

#### Rendering
1. Renders in DOS mode with boot message
2. Renders in stream mode without boot message
3. Displays prompt in DOS mode
4. Does not display prompt in stream mode
5. Cursor is visible initially
6. Cursor blinks at specified rate

#### Input Handling (DOS mode)
7. Characters appear after prompt when typed
8. Backspace removes last character
9. Backspace does nothing on empty input
10. Enter executes command
11. Enter clears input after execution
12. Up arrow shows previous command
13. Down arrow shows next command
14. Ctrl+C cancels current input
15. Ctrl+L clears screen

#### Command Execution
16. Echo command displays text
17. Echo with no args displays blank line
18. Unknown commands show error
19. Command output appears correctly
20. New prompt appears after command
21. Custom commands execute correctly

#### History
22. Executed commands added to history
23. History limited to max size
24. Oldest commands removed when limit exceeded
25. History navigation works correctly

#### Stream Mode
26. Attaches stream correctly
27. Displays streamed data
28. Forwards input when enabled
29. Does not allow input when disabled
30. Detaches stream on unmount

#### API Methods
31. write() adds text to output
32. writeLine() adds line to output
33. clear() empties output
34. reset() returns to initial state
35. executeCommand() runs command

#### Output Buffer
36. Output limited to maxLines
37. Old lines removed when limit exceeded
38. Auto-scroll works when enabled
39. Manual scroll preserved when auto-scroll disabled

### Integration Tests

1. User types command and presses Enter → command executes
2. User navigates history with arrows → previous commands appear
3. Multiple commands build up history correctly
4. Stream mode receives and displays data
5. Stream mode forwards user input
6. Switching modes preserves appropriate state
7. Terminal works in multiple windows simultaneously

### Style Tests

1. Background is pure black
2. Text is light gray
3. Prompt is white
4. Font is Courier New 16px
5. Line height is 19px
6. Padding is 16px
7. Cursor is 9px × 16px white block
8. Terminal is scrollable
9. Content overflows properly

## Performance Considerations

- **Output Buffer**: Limit to prevent memory issues
- **Stream Processing**: Handle large data chunks efficiently
- **Render Optimization**: Batch updates, minimize re-renders
- **History Management**: Circular buffer for efficient storage
- **Cursor Blinking**: Use $effect, cleanup on unmount

## Accessibility

- **Keyboard Only**: All functionality accessible via keyboard
- **Screen Readers**: Terminal output readable
- **Focus Management**: Auto-focus on mount
- **ARIA Labels**: Proper labels for terminal regions

## Future Enhancements

- ANSI escape code support (colors, formatting)
- Tab completion
- Left/Right arrow for cursor movement
- Home/End keys
- Text selection with mouse
- Copy/paste with mouse
- Multiple color schemes
- Configurable fonts
- Command aliases
- Environment variables
- Multi-line input support

## Summary

The Terminal Component is a powerful, reusable terminal emulator that can operate in both DOS emulation mode and streaming mode. It provides a rich API for programmatic control, supports custom command implementations, and can be easily embedded in any plugin or component. The component is designed with performance, testability, and extensibility in mind, making it an ideal foundation for terminal-based applications in the Abu Web Kernel.
