export type StreamItem = {
    id: string;
    wordItemId: string; //wordItemのID
    word: string;
    laneIndex: number;
    createdAt: number;
    durationMs: number;
}

export type StreamConfig = {
    baseDurationMs: number;
    fromOffsetY: number; //画面下スタート位置
    toOffsetY: number; //画面上終了位置
    lanePaddingLeft: number;
    MaxWidthRatio: number; //画面の最大幅割合。文字の最大幅
};