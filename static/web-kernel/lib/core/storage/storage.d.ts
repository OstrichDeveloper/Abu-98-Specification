import { type StoredState } from '../types.js';
/**
 *
 */
export declare function isStorageAvailable(): boolean;
/**
 *
 */
export declare function load(): StoredState | null;
/**
 *
 * @param state
 */
export declare function save(state: StoredState): boolean;
/**
 *
 */
export declare function clear(): void;
/**
 *
 */
export declare function createDefaultState(): StoredState;
