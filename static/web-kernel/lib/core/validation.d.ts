import { type Position, type Size, type Bounds, type WindowState, type StoredState } from './types.js';
/**
 *
 * @param value
 */
export declare function validatePosition(value: unknown): Position;
/**
 *
 * @param value
 */
export declare function validateSize(value: unknown): Size;
/**
 *
 * @param value
 */
export declare function validateBounds(value: unknown): Bounds;
/**
 *
 * @param value
 */
export declare function validateWindowState(value: unknown): WindowState;
/**
 *
 * @param value
 */
export declare function validateVolume(value: unknown): number;
/**
 *
 * @param value
 */
export declare function validateStoredState(value: unknown): StoredState;
/**
 *
 * @param id
 */
export declare function validatePluginId(id: unknown): string;
/**
 *
 * @param version
 */
export declare function validateSemanticVersion(version: unknown): string;
