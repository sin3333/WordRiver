import { useCallback, useMemo, useState } from 'react';
import type { StreamConfig } from '../types/streamItemTypes';
import { useSharedValue, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { StreamItem } from '../types/streamItemTypes';

type Params = {
    cfg: StreamConfig;
    screenHeight: number;
};

export function useStreamLane({ cfg, screenHeight }: Params) {
    const y = useSharedValue(screenHeight + cfg.fromOffsetY);
    const [active, setActive] = useState<StreamItem | null>(null);

    const start = useCallback((item: StreamItem) => {
        y.value = screenHeight + cfg.fromOffsetY;
        setActive(item);



        y.value = withTiming(
            -cfg.toOffsetY,
            { duration: item.durationMs, easing: Easing.linear },
            (finished) => {
                "worklet";

                if (finished) {
                    scheduleOnRN(setActive, null);
                }


            }
        );
    }, [cfg.baseDurationMs, cfg.fromOffsetY, cfg.toOffsetY, screenHeight, y]);

    const api = useMemo(() => ({ y, active, start, setActive }), [y, active, start]); //ここでこの関数の再計算を防ぐ

    return api; //最終的に返すのはこれだけ。↑でセットした関数群
}
