---
id: kernel-interface
title: Kernel Interface
---

# Kernel Interface Specification

## Overview

The Kernel Interface defines the contract between the OS shell and the backend system. It provides an abstraction layer allowing multiple implementations: MockKernel (in-memory simulation) for development/testing, and HTTPKernel (REST API client) for production.

## Design Principles

1. **Interface-Based** - Single interface, multiple implementations
2. **Swappable** - Change implementation without OS code changes
3. **Async-First** - All operations return Promises
4. **Type-Safe** - Full TypeScript types for requests/responses
5. **Error Handling** - Consistent error format across implementations
6. **Testable** - Easy to mock for unit tests

## KernelInterface

### Interface Definition

```
interface KernelInterface {
  getSystemInfo(): `Promise<SystemInfo>`
  executeCommand(cmd: string): `Promise<CommandResult>`
}
```

### SystemInfo Schema

```
{
  osName: string,                // e.g. "Abu OS 98"
  version: string,               // e.g. "1.0.0"
  uptime: number,                // Seconds since boot
  totalMemory: number,           // MB
  usedMemory: number,            // MB
}
```

### CommandResult Schema

```
{
  exitCode: number,              // 0 = success, non-zero = error
  stdout: string,                // Standard output
  stderr: string,                // Standard error
  executionTime: number          // Milliseconds
}
```

## MockKernel Implementation

### Purpose

- Development: Immediate feedback without backend
- Testing: Predictable, controllable responses
- Demo: Fully functional OS without server

### Behavior

**getSystemInfo():**
```
Returns:
  osName: "Abu OS 98"
  version: "1.0.0"
  uptime: Time since MockKernel instantiation (seconds)
  totalMemory: 2048 MB (constant)
  usedMemory: Random 500-1500 MB (simulated)
  
Latency: 50-100ms (simulated network delay)
Error rate: 0% (always succeeds)
```

**executeCommand(cmd):**
```
Supported Commands:
  "ping {host}":
    Success (host = valid domain):
      exitCode: 0
      stdout: "Reply from {host}: bytes=32 time=15ms TTL=64"
    Failure (host = invalid):
      exitCode: 1
      stderr: "Ping request could not find host {host}"
  
  "dir":
    Success:
      exitCode: 0
      stdout: "Volume in drive C has no label.\n Directory of C:\\\n\n..."
  
  "ipconfig":
    Success:
      exitCode: 0
      stdout: "Windows IP Configuration\n\n Ethernet adapter...\n IPv4 Address: 192.168.1.100"
  
  Unknown command:
    exitCode: 127
    stderr: "'{cmd}' is not recognized as an internal or external command"

Latency: 100-300ms per command
Error rate: 0% (always returns result, may have exitCode != 0)
```

### State Management

**MockKernel maintains:**
- Boot timestamp (for uptime calculation)
- Command history (for future features)
- Memory usage (random walk simulation)

**Does not maintain:**
- Actual process state
- File system state
- Network connections

### Error Simulation

**Future: Simulate failures for testing**
```
MockKernel.setErrorRate(0.1)    // 10% of calls fail
MockKernel.setLatency(500, 1000) // 500-1000ms latency
```

## HTTPKernel Implementation (Future)

### Purpose

- Production: Connect to actual abu-enterprise backend
- Multi-user: Access real system state
- Persistent: Commands affect actual server state

### Endpoints

**GET /api/system/info**
```
Request: None
Response: SystemInfo
Status Codes:
  200: Success
  503: Service Unavailable
```

**POST /api/system/command**
```
Request:
  {
    command: string
  }
  
Response: CommandResult
Status Codes:
  200: Success (check exitCode in response)
  400: Invalid command format
  403: Unauthorized command
  503: Service Unavailable
```

### Behavior

**getSystemInfo():**
```
HTTP GET /api/system/info

Success:
  Parse JSON response
  Validate schema
  Return SystemInfo

Failure:
  Network error → throw NetworkError
  503 status → throw ServiceUnavailableError
  Invalid JSON → throw ParseError
```

**executeCommand(cmd):**
```
HTTP POST /api/system/command
Body: {"command": "{cmd}"}

Success:
  Parse JSON response
  Return CommandResult (even if exitCode != 0)

Failure:
  Network error → throw NetworkError
  400 status → throw ValidationError
  403 status → throw AuthorizationError
  503 status → throw ServiceUnavailableError
```

### Error Handling

| HTTP Status | Error Class | Retry? |
|-------------|-------------|--------|
| Network failure | NetworkError | Yes (exponential backoff) |
| 400 Bad Request | ValidationError | No |
| 403 Forbidden | AuthorizationError | No |
| 503 Service Unavailable | ServiceUnavailableError | Yes (after delay) |

### Retry Strategy

**Retryable Errors:**
- NetworkError
- ServiceUnavailableError (503)

**Retry Logic:**
```
Attempt 1: Immediate
Attempt 2: Wait 1s
Attempt 3: Wait 2s
Attempt 4: Wait 4s
Max attempts: 4

After 4 failures: Throw error to caller
```

### Authentication (Future)

```
HTTPKernel(baseUrl, authToken)

Headers:
  Authorization: Bearer {authToken}

401 Unauthorized → Emit event for re-authentication
```

### Request Timeout

```
Timeout: 30 seconds
On timeout: Abort request, throw TimeoutError
```

## Kernel Provider

### Provider Pattern

**Application chooses kernel at startup:**

```typescript
// Development/Demo
const kernel = new MockKernel();

// Production
const kernel = new HTTPKernel('https://api.example.com');

// Testing
const kernel = new TestKernel();
```

**Inject into OS:**
```typescript
<Shell kernel={kernel} plugins={plugins} />
```

**OS uses kernel:**
```typescript
// In any plugin or OS component
const info = await kernel.getSystemInfo();
const result = await kernel.executeCommand('ping google.com');
```

### Context Access

Kernel available via context (Svelte):

```typescript
// Set in Shell.svelte
setContext('kernel', kernel);

// Access in any child component
const kernel = getContext<KernelInterface>('kernel');
```

### Testing with MockKernel

**Unit tests:**
```typescript
test('system info when fetched then displays uptime', async () => {
  const kernel = new MockKernel();
  const info = await kernel.getSystemInfo();
  
  expect(info.uptime).toBeGreaterThan(0);
  expect(info.osName).toBe('Abu OS 98');
});
```

**Component tests:**
```typescript
test('SystemInfo component displays kernel data', async () => {
  const kernel = new MockKernel();
  const { getByText } = render(SystemInfo, { kernel });
  
  await waitFor(() => {
    expect(getByText(/Abu OS 98/)).toBeInTheDocument();
  });
});
```

## Error Schemas

### Base Error

```
class KernelError extends Error {
  code: string                   // Error code (e.g. "NETWORK_ERROR")
  details?: unknown              // Additional error context
}
```

### Specific Errors

**NetworkError:**
```
code: "NETWORK_ERROR"
message: "Failed to connect to kernel"
details: {
  url: string,
  originalError: Error
}
```

**ValidationError:**
```
code: "VALIDATION_ERROR"
message: "Invalid command format"
details: {
  command: string,
  reason: string
}
```

**AuthorizationError:**
```
code: "AUTHORIZATION_ERROR"
message: "Unauthorized to execute command"
details: {
  command: string,
  requiredPermission: string
}
```

**ServiceUnavailableError:**
```
code: "SERVICE_UNAVAILABLE"
message: "Backend service unavailable"
details: {
  retryAfter: number             // Seconds
}
```

**TimeoutError:**
```
code: "TIMEOUT_ERROR"
message: "Request timed out after {timeout}ms"
details: {
  timeout: number,
  url: string
}
```

## Performance Targets

### MockKernel

```
getSystemInfo(): 50-100ms
executeCommand(): 100-300ms

Memory: < 1MB
CPU: Negligible (no heavy computation)
```

### HTTPKernel

```
getSystemInfo(): Network RTT + 50ms
executeCommand(): Network RTT + 100-5000ms (depends on command)

Timeout: 30 seconds
Connection pooling: Yes (browser handles)
```

## Future Enhancements

### File System Operations

```
interface FileSystemKernel extends KernelInterface {
  readFile(path: string): `Promise<FileContent>`
  writeFile(path: string, content: string): Promise<void>
  listDirectory(path: string): `Promise<DirectoryEntry[]>`
  deleteFile(path: string): Promise<void>
}
```

### Process Management

```
interface ProcessKernel extends KernelInterface {
  listProcesses(): `Promise<Process[]>`
  killProcess(pid: number): Promise<void>
  getProcessInfo(pid: number): `Promise<ProcessInfo>`
}
```

### Network Management

```
interface NetworkKernel extends KernelInterface {
  getNetworkInterfaces(): `Promise<NetworkInterface[]>`
  getConnectionStatus(): `Promise<ConnectionStatus>`
  pingHost(host: string): `Promise<PingResult>`
}
```

### Event Streaming

```
interface EventKernel extends KernelInterface {
  subscribe(event: string, callback: (data: unknown) => void): () => void
}

Events:
  - system.memory.low
  - system.cpu.high
  - network.disconnect
  - process.started
  - process.exited
```

## Testing Requirements

### MockKernel Tests

**System Info:**
- getSystemInfo() → returns valid SystemInfo
- getSystemInfo() uptime → increases over time
- getSystemInfo() memory → within bounds (0-2048 MB)

**Command Execution:**
- executeCommand('ping google.com') → exitCode 0
- executeCommand('ping invalid') → exitCode 1, stderr populated
- executeCommand('dir') → exitCode 0, stdout populated
- executeCommand('unknown') → exitCode 127, stderr populated

**Latency:**
- getSystemInfo() → completes in `< 200`ms
- executeCommand() → completes in `< 500`ms

### HTTPKernel Tests (Future)

**Success Cases:**
- getSystemInfo() with 200 response → parses correctly
- executeCommand() with 200 response → parses correctly

**Error Cases:**
- Network failure → throws NetworkError
- 503 response → throws ServiceUnavailableError
- Invalid JSON response → throws ParseError

**Retry:**
- Network failure → retries with exponential backoff
- 503 error → retries after delay
- 400 error → does not retry

### Integration Tests

**Kernel Swap:**
- Switch from MockKernel to HTTPKernel → OS continues working
- All components using kernel → work with both implementations

**Error Handling:**
- Kernel error → displays error in UI
- Retry → shows loading state
- Final failure → shows error message

## Security Considerations

### Command Validation

**MockKernel:**
- No security risk (client-side only)
- Whitelist known commands for consistency

**HTTPKernel:**
- Server validates all commands
- Client cannot bypass server validation
- Never trust client-provided commands

### Authentication

**HTTPKernel:**
- All requests include auth token
- Token stored securely (httpOnly cookie recommended)
- Token refresh on expiration

### Data Sanitization

**Input:**
- Validate command strings before sending
- Escape special characters
- Prevent command injection

**Output:**
- Sanitize stdout/stderr before rendering
- Prevent XSS in output display
- Limit output length (prevent DoS)

## Summary

Kernel Interface provides:

- **Abstraction** - Single interface, multiple implementations
- **MockKernel** - In-memory simulation for dev/test
- **HTTPKernel** - REST API client for production (future)
- **Type Safety** - Full TypeScript throughout
- **Error Handling** - Consistent error classes
- **Testability** - Easy mocking for unit tests
- **Swappable** - Change implementation without code changes

All schemas, behaviors, and error conditions precisely defined for implementation.
