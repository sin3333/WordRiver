import type { StreamItem } from "@/types/streamItemTypes";

function makeId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createStreamItem(params: {
    word: string;
    laneIndex: number;
    durationMs: number;
}): StreamItem {
    return {
        id: makeId(),
        word: params.word,
        laneIndex: params.laneIndex,
        createdAt: Date.now(),
        durationMs: params.durationMs,
    };
}