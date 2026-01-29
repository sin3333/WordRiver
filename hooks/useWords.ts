import { useCallback, useContext } from "react";
import { WordsContext } from "../context/WordContext";
import { WordItem } from "@/types/word";

export function useWords() {
    const ctx = useContext(WordsContext);
    if (!ctx) {
        throw new Error("useWords must be used within a WordsProvider");
    }

    const { wordList, reload, removeWord, clearAll } = ctx;


    const pickRandomWord = useCallback((): WordItem | null => {
        if (wordList.length === 0) return null;
        const i = Math.floor(Math.random() * wordList.length);
        return wordList[i];
    }, [wordList]);





    //return ctx;

    return { wordList, reload, removeWord, clearAll, pickRandomWord };
}