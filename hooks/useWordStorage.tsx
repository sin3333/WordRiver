import { useState, React } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WordItem } from "../types/word";
import { WordStorage } from "@/storage/WordStorage";

export function useWordStorage() {

    return {
        load: async (): Promise<WordItem[]> => {
            try {
                const value = await AsyncStorage.getItem('WordStorage');
                if (value !== null) {
                    return JSON.parse(value) as WordItem[];
                }
                return [];
            } catch (e) {
                console.log('読み込みエラー:', e);
            }
        },
        save: async (WordItem: WordItem[]) => { },
    };

}