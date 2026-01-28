import { useCallback, useMemo, useState } from 'react';
import type { StreamConfig } from '../types/streamItemTypes';
import { useSharedValue, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

type Params = {
    cfg: StreamConfig;
    screenHeight: number;
};

export function useStreamLane({ cfg, screenHeight }: Params) {
    const y = useSharedValue(screenHeight + cfg.fromOffsetY);
    const [visible, setVisible] = useState(true);

    const start = useCallback((durationMs?: number) => {
        y.value = screenHeight + cfg.fromOffsetY;
        setVisible(true);

        const d = durationMs ?? cfg.baseDurationMs;

        y.value = withTiming(
            -cfg.toOffsetY,
            { duration: d, easing: Easing.linear },
            (finished) => {
                "worklet";

                if (finished) {
                    scheduleOnRN(setVisible, false);
                }


            }
        );
    }, [cfg.baseDurationMs, cfg.fromOffsetY, cfg.toOffsetY, screenHeight, y]);

    const api = useMemo(() => ({ y, visible, start, setVisible }), [y, visible, start]); //ここでこの関数の再計算を防ぐ

    return api; //最終的に返すのはこれだけ。↑でセットした関数群
}
