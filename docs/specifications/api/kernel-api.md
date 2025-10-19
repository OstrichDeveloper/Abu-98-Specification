---
id: kernel-api
title: Kernel Api
---

# Kernel API Specification

## KernelInterface

```typescript
interface KernelInterface {
  getSystemInfo(): `Promise<SystemInfo>`;
  executeCommand(cmd: string): `Promise<CommandResult>`;
}
```

## SystemInfo

```typescript
interface SystemInfo {
  osName: string;                // e.g. "Abu OS 98"
  version: string;               // e.g. "1.0.0"
  uptime: number;                // Seconds since boot
  totalMemory: number;           // MB
  usedMemory: number;            // MB
}
```

## CommandResult

```typescript
interface CommandResult {
  exitCode: number;              // 0 = success, non-zero = error
  stdout: string;                // Standard output
  stderr: string;                // Standard error
  executionTime: number;         // Milliseconds
}
```

## Implementations

### MockKernel

```typescript
class MockKernel implements KernelInterface {
  async getSystemInfo(): `Promise<SystemInfo>`;
  async executeCommand(cmd: string): `Promise<CommandResult>`;
}
```

### HTTPKernel (Future)

```typescript
class HTTPKernel implements KernelInterface {
  constructor(baseUrl: string, authToken?: string);
  async getSystemInfo(): `Promise<SystemInfo>`;
  async executeCommand(cmd: string): `Promise<CommandResult>`;
}
```

## Usage

```typescript
// Create kernel instance
const kernel = new MockKernel();

// Get system info
const info = await kernel.getSystemInfo();
console.log(info.osName); // "Abu OS 98"

// Execute command
const result = await kernel.executeCommand('ping google.com');
if (result.exitCode === 0) {
  console.log(result.stdout);
} else {
  console.error(result.stderr);
}
```

See `/docs/architecture/kernel-interface.md` for detailed specifications.
