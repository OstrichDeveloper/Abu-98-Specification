import type { KernelInterface, SystemInfo, CommandResult } from '../core/types.js';
/**
 * HTTPKernel - REST API client for Abu OS 98 backend
 *
 * FUTURE IMPLEMENTATION - This is a skeleton for Phase 4
 *
 * Responsibilities:
 * - Connect to abu-enterprise backend via REST API
 * - Handle network errors and retries
 * - Validate responses
 * - Provide production kernel implementation
 *
 * Future error handling will use:
 * - NetworkError
 * - ValidationError
 * - AuthorizationError
 * - ServiceUnavailableError
 */
export declare class HTTPKernel implements KernelInterface {
    private baseUrl;
    private authToken?;
    constructor(baseUrl: string, authToken?: string);
    getSystemInfo(): Promise<SystemInfo>;
    executeCommand(_cmd: string): Promise<CommandResult>;
}
