export declare const audio: {
    readonly volume: number;
    readonly muted: boolean;
    readonly playing: boolean;
    readonly effectiveVolume: number;
    readonly volumePercent: number;
    readonly currentTrack: string | null;
    setVolume(value: number): void;
    toggleMute(): void;
    isMuted(): boolean;
    play(trackUrl?: string): void;
    pause(): void;
    stop(): void;
    init(): void;
    _reset(): void;
};
