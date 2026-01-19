import { useContext } from "react";
import { WordsContext } from "../context/WordContext";

export function useWords() {
    const ctx = useContext(WordsContext);
    if (!ctx) {
        throw new Error("useWords must be used within a WordsProvider");
    }
    return ctx;
}