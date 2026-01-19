import React, { createContext, useContext, useEffect, useCallback, useState } from "react";
import { WordItem } from "../types/word";
import { useWordStorage } from "../hooks/useWordStorage";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';//UUID生成用ポリフィル

type WordsContextValue = {
    wordList: WordItem[];
    addWord: (input: { word: string; note?: string }) => Promise<void>;
    removeWord: (id: string) => void;
    reload: () => Promise<void>;
    clearAll: () => Promise<void>;
};

export const WordsContext = createContext<WordsContextValue | null>(null);

export function WordsProvider({ children }: { children: React.ReactNode }) {
    const storage = useWordStorage();
    const [wordList, setWordList] = useState<WordItem[]>([]);

    useEffect(() => {
        void reload();
    }, []);

    const reload = useCallback(async () => {
        const words = await storage.load();
        setWordList(words);
    }, [storage]);

    const addWord = useCallback(
        async (input: { word: string; note?: string }) => {
            const item: WordItem = {
                id: uuidv4(),
                createdAt: Date.now(),
                word: input.word.trim(),
                note: input.note?.trim(),
            };
            setWordList(prev => {
                const newList = [item, ...prev]
                storage.save(newList);
                return newList;
            });
        },
        [storage]
    );

    const removeWord = useCallback(
        (id: string) => {
            setWordList(prev => {
                const newList = prev.filter(w => w.id !== id);
                storage.save(newList);
                return newList;
            });
        },
        [storage]
    );

    const clearAll = useCallback(async () => {
        await storage.allDelete();
        setWordList([]);
    }, [storage]);

    return (
        <WordsContext.Provider value={{ wordList, addWord, removeWord, reload, clearAll }}
        >
            {children}
        </WordsContext.Provider>
    )


}