import React, { useState, useEffect } from "react";
import { useWordStorage } from "./useWordStorage";
import { WordItem } from "../types/word";

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function useWords() {
    const storage = useWordStorage();
    const [wordList, setWordList] = useState<WordItem[]>([]);

    useEffect(() => {
        storage.load().then(setWordList);
    }, []);

    const addWord = async (input: { word: string; note?: string }) => {
        const item: WordItem = { id: makeId(), createdAt: Date.now(), word: input.word.trim(), note: input.note?.trim() };
        const newWordList = [item, ...wordList];
        setWordList(newWordList);
        storage.save(newWordList);
    };

    const removeWord = async (id: string) => {
        setWordList(prev => prev.filter(word => word.id !== id));
        await storage.delete(id);
    }

    return {
        wordList,
        setWordList,
        addWord,
        removeWord,
    }
}