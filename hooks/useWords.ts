import { useCallback, useContext } from "react";
import { WordsContext } from "../context/WordContext";
import { WordItem } from "@/types/word";

export function useWords() {
    const ctx = useContext(WordsContext);
    if (!ctx) {
        throw new Error("useWords must be used within a WordsProvider");
    }

    const {
        store,
        addFolder,
        renameFolder,
        removeFolder,
        setActiveFolderId,
        addWord,
        removeWord,
        editWord,
        moveWord,
        reload,
        clearAll,
        visibleWords,
        activeFolder,
    } = ctx;


    const pickRandomWord = useCallback((): WordItem | null => {
        if (visibleWords.length === 0) return null;
        const i = Math.floor(Math.random() * visibleWords.length);
        return visibleWords[i];
    }, [visibleWords]);




    return {
        store,
        activeFolder,
        visibleWords,
        reload,
        removeWord,
        clearAll,
        pickRandomWord,
        addWord,
        editWord,
        moveWord,
        addFolder,
        renameFolder,
        removeFolder,
        setActiveFolderId
    };
}