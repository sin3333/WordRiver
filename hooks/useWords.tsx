import React, { useState, useEffect } from "react";
import { useWordStorage } from "./useWordStorage";
import { WordItem } from "../types/word";

export function useWords() {
    const storage = useWordStorage();
    const [wordList, setWordList] = useState<WordItem[]>([]);

    useEffect(() => {
        storage.load().then(setWordList);
    }, []);

    const addWord = async (WordItem: WordItem) => {
        const newWordList = [...wordList, WordItem];
        setWordList(newWordList);
        storage.save(newWordList);
    };

    const removeWord = async (id: string) => {
        setWordList(prev => prev.filter(word => word.id !== id));
        await storage.delete(id);
    }

    return {
        wordList,
        addWord,
        removeWord,
    }
}