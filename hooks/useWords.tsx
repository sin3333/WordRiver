import { useState, React, use } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { usewordStorage } from "./useWordStorage";
import { WordItem } from "../types/word";

function useWord() {
    const storage = usewordStorage();
    const [wordList, setWordList] = useState<WordItem[]>([]);

    useEffect(() => {
        storage.load().then(setWordList);
    }, []);

    const addWord = async (WordItem: WordItem) => {
        const newWordList = [...wordList, WordItem];
        setWordList(newWordList);
        storage.save(newWordList);
    };

    return {
        wordList,
        addWord,
    }
}