import type { KernelInterface, SystemInfo, CommandResult } from '../core/types.js';
export declare class MockKernel implements KernelInterface {
    private bootTimestamp;
    constructor();
    getSystemInfo(): Promise<SystemInfo>;
    executeCommand(cmd: string): Promise<CommandResult>;
    private handlePing;
    private delay;
}
