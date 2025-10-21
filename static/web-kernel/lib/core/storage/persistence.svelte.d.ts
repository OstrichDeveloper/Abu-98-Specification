import type { StoredState } from '../types.js';
/**
 *
 */
export declare function restoreState(): StoredState;
/**
 *
 * @param state
 * @param immediate
 */
export declare function persistState(state: StoredState, immediate?: boolean): void;
/**
 *
 */
export declare function cancelPendingPersist(): void;
/**
 *
 * @param state
 */
export declare function flushPendingPersist(state: StoredState): void;
