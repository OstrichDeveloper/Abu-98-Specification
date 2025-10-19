---
id: ssh-terminal
title: Ssh Terminal
---

# SSH Terminal Plugin - Design Specification

## Overview

The SSH Terminal Plugin is a composite plugin that demonstrates the power of the Abu Web Kernel plugin system. It provides SSH connectivity by creating a connection dialog window and dynamically spawning terminal windows that stream SSH sessions via WebSocket (ttyd). This plugin showcases multi-window management, custom business logic, and integration with the Terminal Component.

## Plugin Type

**Composite Plugin** using the enhanced plugin system

- **ID**: `ssh-terminal`
- **Type**: `composite`
- **Windows**: Connection Dialog + Dynamic Terminal instances
- **Components**: Terminal (from component registry)

## Architecture

```
┌─────────────────────────────────────────┐
│        SSH Terminal Plugin              │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────┐  ┌───────────────┐ │
│  │   Connection   │  │   Terminal    │ │
│  │     Dialog     │─▶│   Window 1    │ │
│  └────────────────┘  └───────────────┘ │
│         │            ┌───────────────┐  │
│         │            │   Terminal    │  │
│         └───────────▶│   Window 2    │  │
│                      └───────────────┘  │
│                                         │
│  ┌────────────────────────────────────┐│
│  │    Connection Manager              ││
│  │  - WebSocket creation              ││
│  │  - Stream management               ││
│  │  - Connection tracking             ││
│  │  - Error handling                  ││
│  └────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Windows

### 1. Connection Dialog

**Purpose**: Collect SSH connection details from user

**Specifications**:
- **Window ID**: `connection-dialog`
- **Title**: "SSH Connection"
- **Icon**: `icon-network-network-connections`
- **Size**: 400px × 320px
- **Resizable**: No
- **Singleton**: Yes (only one connection dialog at a time)

**UI Layout**:
```
┌────────────────────────────────────┐
│ SSH Connection             [_][□][×]│
├────────────────────────────────────┤
│  ┌──────────────────────────────┐ │
│  │                              │ │
│  │  Host:                       │ │
│  │  ┌────────────────────────┐  │ │
│  │  │ 192.168.0.254          │  │ │
│  │  └────────────────────────┘  │ │
│  │                              │ │
│  │  Port:                       │ │
│  │  ┌────────────────────────┐  │ │
│  │  │ 7681                   │  │ │
│  │  └────────────────────────┘  │ │
│  │                              │ │
│  │  Username:                   │ │
│  │  ┌────────────────────────┐  │ │
│  │  │ abu                    │  │ │
│  │  └────────────────────────┘  │ │
│  │                              │ │
│  │  ┌─────────┐  ┌──────────┐  │ │
│  │  │ Connect │  │  Cancel  │  │ │
│  │  └─────────┘  └──────────┘  │ │
│  │                              │ │
│  └──────────────────────────────┘ │
└────────────────────────────────────┘
```

**Fields**:
- **Host**: Text input (default: `192.168.0.254`)
- **Port**: Text input (default: `7681`)
- **Username**: Text input (default: `abu`)
- **Connect Button**: Primary action
- **Cancel Button**: Close dialog

### 2. Terminal Window

**Purpose**: Display SSH session stream

**Specifications**:
- **Window ID**: Generated dynamically (`terminal-{uuid}`)
- **Title**: `SSH - \{username\}@\{host\}:\{port\}`
- **Icon**: `icon-ui-misc-ms-dos`
- **Size**: 640px × 480px
- **Resizable**: Yes
- **Multiple Instances**: Yes

**Content**:
- Embeds Terminal Component in stream mode
- Black background with light gray text
- Displays SSH output in real-time
- Accepts keyboard input
- Forwards input to SSH via WebSocket

## Plugin State

```typescript
interface SSHTerminalState {
  // Active connections
  connections: `Map<string, ConnectionInfo>`;
  
  // Connection dialog state
  dialogOpen: boolean;
  
  // Last used connection details (for convenience)
  lastHost: string;
  lastPort: string;
  lastUsername: string;
}

interface ConnectionInfo {
  instanceId: string;
  host: string;
  port: number;
  username: string;
  websocket: WebSocket;
  connected: boolean;
  bytesReceived: number;
  connectedAt: number;
}
```

## Functionality

### Connection Flow

```
┌──────────────────┐
│  User opens SSH  │
│   Terminal icon  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Plugin opens    │
│ Connection Dialog│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  User fills form │
│  and clicks      │
│  Connect         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Plugin creates  │
│  WebSocket to    │
│  ttyd server     │
└────────┬─────────┘
         │
         ├─ Success
         │  ┌────────────────┐
         │  │  Opens Terminal│
         │  │  Window with   │
         │  │  SSH stream    │
         │  └────────────────┘
         │
         └─ Failure
            ┌────────────────┐
            │  Shows error   │
            │  message in    │
            │  dialog        │
            └────────────────┘
```

### Connection Process

1. **Validate Input**
   - Check host is not empty
   - Check port is valid number (1-65535)
   - Check username is not empty

2. **Create WebSocket**
   ```typescript
   const wsUrl = `ws://${host}:${port}/ws`;
   const ws = new WebSocket(wsUrl);
   ```

3. **Handle Connection Events**
   ```typescript
   ws.onopen = () => {
     // Create terminal window
     const terminalId = openTerminalWindow(host, port, username, ws);
     // Store connection info
     connections.set(terminalId, {
       instanceId: terminalId,
       host, port, username,
       websocket: ws,
       connected: true,
       bytesReceived: 0,
       connectedAt: Date.now()
     });
   };
   
   ws.onerror = (error) => {
     // Show error in dialog
     showError(`Connection failed: ${error.message}`);
   };
   
   ws.onclose = () => {
     // Close terminal window
     closeTerminalWindow(terminalId);
     // Remove connection info
     connections.delete(terminalId);
   };
   ```

4. **Create Terminal Window**
   ```typescript
   const terminalId = context.windowManager.open('terminal', {
     title: `SSH - ${username}@${host}:${port}`,
     size: { width: 640, height: 480 },
     props: {
       mode: 'stream',
       enableInput: true,
       onInput: (data: string) => {
         if (ws.readyState === WebSocket.OPEN) {
           ws.send(data);
         }
       }
     }
   });
   ```

5. **Set Up Data Stream**
   ```typescript
   const stream = new ReadableStream({
     start(controller) {
       ws.onmessage = (event) => {
         const data = event.data;
         controller.enqueue(data);
         
         // Track bytes
         const conn = connections.get(terminalId);
         if (conn) {
           conn.bytesReceived += data.length;
         }
       };
       
       ws.onclose = () => {
         controller.close();
       };
     }
   });
   
   // Attach stream to terminal
   const window = context.windowManager.getWindow(terminalId);
   window.props.api.attachStream(stream);
   ```

### Disconnect Flow

**User closes terminal window**:
1. Window close event fired
2. Plugin receives `onWindowClosed` callback
3. Plugin closes WebSocket
4. Removes connection from map

**Connection drops**:
1. WebSocket `onclose` fires
2. Plugin closes terminal window
3. Removes connection from map

**User clicks Disconnect** (if status bar added):
1. Plugin closes WebSocket
2. WebSocket close triggers terminal window close
3. Connection removed from map

### Error Handling

**Connection Errors**:
- WebSocket fails to connect
- Show error in dialog: "Failed to connect to \{host\}:\{port\}"
- Keep dialog open for retry

**Stream Errors**:
- WebSocket error during session
- Show error in terminal: "Connection error occurred"
- Close terminal after delay

**Invalid Input**:
- Empty host
- Invalid port
- Empty username
- Show validation error in dialog

## Component Code Structure

### Plugin Definition

```typescript
// src/lib/plugins/ssh-terminal/index.ts

import type { CompositePlugin, PluginContext, PluginInstance } from '@/types';
import ConnectionDialog from './ConnectionDialog.svelte';

export const sshTerminalPlugin: CompositePlugin = {
  id: 'ssh-terminal',
  name: 'SSH Terminal',
  version: '1.0.0',
  description: 'Connect to remote systems via SSH over WebSocket (ttyd)',
  author: 'Abu Enterprise',
  type: 'composite',
  
  windows: [
    {
      id: 'connection-dialog',
      component: ConnectionDialog,
      defaultTitle: 'SSH Connection',
      defaultIcon: 'icon-network-network-connections',
      defaultSize: { width: 400, height: 320 },
      isResizable: false,
      isSingleton: true
    }
  ],
  
  main: (context: PluginContext): PluginInstance => {
    return new SSHTerminalInstance(context);
  }
};
```

### Plugin Instance

```typescript
// src/lib/plugins/ssh-terminal/SSHTerminalInstance.ts

class SSHTerminalInstance implements PluginInstance {
  private context: PluginContext;
  private connections: `Map<string, ConnectionInfo>`;
  private dialogId: string | null;
  
  constructor(context: PluginContext) {
    this.context = context;
    this.connections = new Map();
    this.dialogId = null;
  }
  
  activate() {
    // Open connection dialog
    this.dialogId = this.context.windowManager.open('connection-dialog', {
      props: {
        onConnect: this.handleConnect.bind(this),
        onCancel: this.handleCancel.bind(this)
      }
    });
  }
  
  async handleConnect(host: string, port: number, username: string) {
    try {
      // Validate input
      if (!host || !username) {
        throw new Error('Host and username are required');
      }
      
      if (port < 1 || port > 65535) {
        throw new Error('Port must be between 1 and 65535');
      }
      
      // Create WebSocket
      const wsUrl = `ws://${host}:${port}/ws`;
      const ws = new WebSocket(wsUrl);
      
      // Wait for connection
      await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
        
        // Timeout after 10 seconds
        setTimeout(() => reject(new Error('Connection timeout')), 10000);
      });
      
      // Create terminal window
      const terminalId = await this.createTerminalWindow(host, port, username, ws);
      
      // Store connection
      this.connections.set(terminalId, {
        instanceId: terminalId,
        host, port, username,
        websocket: ws,
        connected: true,
        bytesReceived: 0,
        connectedAt: Date.now()
      });
      
      // Close dialog
      if (this.dialogId) {
        this.context.windowManager.close(this.dialogId);
        this.dialogId = null;
      }
      
    } catch (error) {
      // Show error in dialog
      this.context.events.emit('ssh-error', {
        message: error.message
      });
    }
  }
  
  async createTerminalWindow(
    host: string,
    port: number,
    username: string,
    ws: WebSocket
  ): `Promise<string>` {
    // Open terminal window
    const terminalId = this.context.windowManager.open('terminal', {
      title: `SSH - ${username}@${host}:${port}`,
      size: { width: 640, height: 480 },
      props: {
        mode: 'stream',
        enableInput: true,
        onInput: (data: string) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
          }
        }
      }
    });
    
    // Create data stream
    const stream = new ReadableStream({
      start: (controller) => {
        ws.onmessage = (event) => {
          controller.enqueue(event.data);
          
          const conn = this.connections.get(terminalId);
          if (conn) {
            conn.bytesReceived += event.data.length;
          }
        };
        
        ws.onclose = () => {
          controller.close();
          this.handleDisconnect(terminalId);
        };
        
        ws.onerror = () => {
          controller.error(new Error('Connection error'));
        };
      }
    });
    
    // Get terminal API and attach stream
    const window = this.context.windowManager.getWindow(terminalId);
    const terminalAPI = window.props.api;
    terminalAPI.attachStream(stream);
    
    return terminalId;
  }
  
  handleDisconnect(terminalId: string) {
    const conn = this.connections.get(terminalId);
    if (conn) {
      if (conn.websocket.readyState !== WebSocket.CLOSED) {
        conn.websocket.close();
      }
      this.connections.delete(terminalId);
      this.context.windowManager.close(terminalId);
    }
  }
  
  handleCancel() {
    if (this.dialogId) {
      this.context.windowManager.close(this.dialogId);
      this.dialogId = null;
    }
  }
  
  onWindowClosed(windowId: string, instanceId: string) {
    // Clean up connection when terminal closes
    if (this.connections.has(instanceId)) {
      this.handleDisconnect(instanceId);
    }
  }
  
  deactivate() {
    // Close all connections
    for (const [terminalId] of this.connections) {
      this.handleDisconnect(terminalId);
    }
    
    // Close dialog if open
    if (this.dialogId) {
      this.context.windowManager.close(this.dialogId);
      this.dialogId = null;
    }
  }
  
  destroy() {
    this.deactivate();
    this.connections.clear();
  }
}
```

### Connection Dialog Component

```html
<!-- src/lib/plugins/ssh-terminal/ConnectionDialog.svelte -->

<script lang="ts">
  interface Props {
    onConnect: (host: string, port: number, username: string) => void;
    onCancel: () => void;
  }
  
  let { onConnect, onCancel }: Props = $props();
  
  let host = $state('192.168.0.254');
  let port = $state('7681');
  let username = $state('abu');
  let error = $state('');
  let connecting = $state(false);
  
  function handleConnect() {
    error = '';
    connecting = true;
    
    try {
      const portNum = parseInt(port, 10);
      onConnect(host, portNum, username);
    } catch (e) {
      error = e.message;
      connecting = false;
    }
  }
  
  function handleCancel() {
    onCancel();
  }
</script>

<div class="ssh-dialog">
  <div class="dialog-content">
    {#if error}
      <div class="error-message">
        {error}
      </div>
    {/if}
    
    <div class="form-group">
      <label for="host">Host:</label>
      <input
        id="host"
        type="text"
        bind:value={host}
        disabled={connecting}
        placeholder="192.168.0.254"
      />
    </div>
    
    <div class="form-group">
      <label for="port">Port:</label>
      <input
        id="port"
        type="text"
        bind:value={port}
        disabled={connecting}
        placeholder="7681"
      />
    </div>
    
    <div class="form-group">
      <label for="username">Username:</label>
      <input
        id="username"
        type="text"
        bind:value={username}
        disabled={connecting}
        placeholder="abu"
      />
    </div>
    
    <div class="button-row">
      <button onclick={handleConnect} disabled={connecting}>
        {connecting ? 'Connecting...' : 'Connect'}
      </button>
      <button onclick={handleCancel} disabled={connecting}>
        Cancel
      </button>
    </div>
  </div>
</div>

<style>
  .ssh-dialog {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #C0C0C0;
    padding: 16px;
  }
  
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .error-message {
    background: #C00000;
    color: #FFFFFF;
    padding: 8px;
    border: 1px solid #000000;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .form-group label {
    font-weight: bold;
    font-size: 11px;
  }
  
  .form-group input {
    padding: 3px 4px;
    border: 2px solid;
    border-color: #808080 #FFFFFF #FFFFFF #808080;
    font-family: 'MS Sans Serif', Arial, sans-serif;
    font-size: 11px;
  }
  
  .button-row {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
  
  button {
    padding: 4px 16px;
    border: 2px solid;
    border-color: #FFFFFF #000000 #000000 #FFFFFF;
    background: #C0C0C0;
    font-family: 'MS Sans Serif', Arial, sans-serif;
    font-size: 11px;
    min-width: 75px;
    cursor: pointer;
  }
  
  button:hover:not(:disabled) {
    background: #D0D0D0;
  }
  
  button:active:not(:disabled) {
    border-color: #000000 #FFFFFF #FFFFFF #000000;
  }
  
  button:disabled {
    color: #808080;
    cursor: not-allowed;
  }
</style>
```

## Testing Requirements

### Unit Tests

1. Plugin activates and opens connection dialog
2. Connection validation works correctly
3. WebSocket creation with correct URL
4. Terminal window created on successful connection
5. Error shown on connection failure
6. Connection info stored in map
7. WebSocket closed when terminal closes
8. All connections closed on deactivate
9. Dialog closes after successful connection
10. Cancel button closes dialog

### Integration Tests

1. Full connection workflow (dialog → terminal)
2. Multiple simultaneous connections
3. Connection failure handling
4. Terminal window receives SSH data
5. User input forwarded to SSH
6. Connection cleanup on window close
7. Plugin state persists correctly

## Desktop Integration

### Desktop Icon

**Label**: "SSH Terminal"  
**Icon**: `icon-network-network-connections`  
**Action**: Open connection dialog

### Start Menu Entry

**Path**: Programs → Accessories → Communications → SSH Terminal  
**Icon**: `icon-network-network-connections`  
**Action**: Open connection dialog

## Configuration

### Stored Settings (localStorage)

```typescript
interface SSHSettings {
  lastHost: string;
  lastPort: string;
  lastUsername: string;
  recentConnections: Array<{
    host: string;
    port: string;
    username: string;
    lastUsed: number;
  }>;
}
```

## Future Enhancements

- **Reconnect**: Attempt to reconnect on disconnect
- **Connection History**: Remember recent connections
- **Profiles**: Save named connection profiles
- **SFTP**: File transfer capabilities
- **Port Forwarding**: SSH tunnel management
- **Multiple Sessions**: Tabbed terminal windows
- **Key Authentication**: SSH key support
- **Status Bar**: Show connection info in terminal
- **Connection Manager**: List and manage active connections

## Summary

The SSH Terminal Plugin demonstrates the power of the composite plugin system by creating a multi-window SSH application. It shows how plugins can manage complex workflows, create dynamic windows, stream data, and provide a complete user experience. The plugin serves as a reference implementation for developers building their own composite plugins.
