import { useState, React } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WordItem } from "../types/word";
import { STORAGE_KEY } from "../storage/WordStorage";

export function useWordStorage() {

    return {

        load: async (): Promise<WordItem[]> => {
            try {
                const value = await AsyncStorage.getItem(STORAGE_KEY);
                if (value !== null) {
                    return JSON.parse(value) as WordItem[];
                }
                return [];
            } catch (e) {
                console.log('読み込みエラー:', e);
            }
        },

        save: async (items: WordItem[]): Promise<void> => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            } catch (e) {
                console.log('保存エラー:', e);
            }
        },

        delete: async (id: string): Promise<void> => {
            const current = await load();
            const updated = current.filter(item => item.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        },

        allDelete: async (): Promise<void> => {
            try {
                await AsyncStorage.removeItem(STORAGE_KEY);
            } catch (e) {
                console.log('削除エラー:', e);
            }

            console.log('Done.')
        },

    }
};

