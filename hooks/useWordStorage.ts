import { useCallback, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WordsStore } from "../types/word";
import { STORAGE_KEY } from "../storage/WordStorage";

export function useWordStorage() {

    const load = useCallback(async (): Promise<WordsStore | null> => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                return JSON.parse(value) as WordsStore;
            }
            return null;
        } catch (e) {
            console.log('読み込みエラー:', e);
            return null;
        }
    }, []);

    const save = useCallback(async (store: WordsStore): Promise<void> => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        } catch (e) {
            console.log('保存エラー:', e);
        }
    }, []);

    const allDelete = useCallback(async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.log('削除エラー:', e);
        }
        console.log('Done.');
    }, []);

    return useMemo(() => ({ load, save, allDelete }), [load, save, allDelete]);
}
