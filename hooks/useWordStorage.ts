import { useState, React } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WordItem } from "../types/word";
import { STORAGE_KEY } from "../storage/WordStorage";

export function useWordStorage() {

    const load = async (): Promise<WordItem[]> => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                return JSON.parse(value) as WordItem[];
            }
            return [];
        } catch (e) {
            console.log('読み込みエラー:', e);
            return [];
        }
    };

    const save = async (items: WordItem[]): Promise<void> => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.log('保存エラー:', e);
        }
    };

    const remove = async (id: string): Promise<void> => {
        const current = await load();
        const updated = current.filter(item => item.id !== id);

        console.log("DELETE id:", id); // デバッグ用
        console.log("LEN:", current.length, "->", updated.length); // デバッグ用
        await save(updated);
    };

    const allDelete = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.log('削除エラー:', e);
        }

        console.log('Done.')
    };



    return { load, save, remove, allDelete, }
};

