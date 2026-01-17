import React, { createContext, useContext, useEffect, useCallback, useState } from "react";
import { WordItem } from "../types/word";
import { useWordStorage } from "../hooks/useWordStorage";

type WordContextValue = {
    wordList: WordItem[];
    addWord: (input: { word: string; note?: string }) => Promise<void>;
    removeWord: (id: string) => void;
    reload: () => Promise<void>;
    clearAll: () => Promise<void>;
};

const WordsContext = createContext<WordContextValue | null>(null);

export function WordsProvider({ children }: { children: React.ReactNode }) {
    const storage = useWordStorage();
    const [WordList, setWordList] = useState<WordItem[]>([]);

    useEffect(() => {
        void reload();
    }, []);

    const reload = useCallback(async () => {
        const words = await storage.load();
        setWordList(words);
    }, [storage]);

    const addWord = useCallback(
        async (input: { word: string; note? string }) => {
            const item: WordItem = {
                id: crypto.randomUUID(),
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


}