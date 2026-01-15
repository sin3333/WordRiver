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