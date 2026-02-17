import React, { createContext, useContext, useEffect, useCallback, useState, use, useMemo } from "react";
import { WordItem, WordsStore, Folder } from "../types/word";
import { ALL_FOLDER_ID, DEFAULT_FOLDER_ID } from "../types/word";
import { useWordStorage } from "../hooks/useWordStorage";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';//UUID生成用ポリフィル

type WordsContextValue = {
    store: WordsStore;
    //wordList: WordItem[];



    addFolder: (name: string) => void;
    removeFolder: (id: string) => void;
    renameFolder: (input: { id: string; name: string }) => void;
    setActiveFolderId: (id: string) => void;

    addWord: (input: { word: string; note?: string; folderId?: string }) => Promise<void>;
    removeWord: (id: string) => void;
    reload: () => Promise<void>;
    clearAll: () => Promise<void>;
    editWord: (input: { id: string; word: string; note?: string }) => Promise<void>;
    moveWord: (input: { id: string; folderId: string }) => void;

    //UI用
    visibleWords: WordItem[];
    activeFolder: Folder | null;
};

export const WordsContext = createContext<WordsContextValue | null>(null);

const initialStore: WordsStore = {
    folders: [{ id: DEFAULT_FOLDER_ID, name: '未分類', createdAt: Date.now() }],
    words: [],
    activeFolderId: ALL_FOLDER_ID,
}

export function WordsProvider({ children }: { children: React.ReactNode }) {
    const storage = useWordStorage();
    const [store, setStore] = useState<WordsStore>(initialStore);
    //const [wordList, setWordList] = useState<WordItem[]>([]);

    useEffect(() => {
        void reload();
    }, []);

    const reload = useCallback(async () => {
        const loaded = await storage.load();
        if (!loaded) {
            setStore(initialStore);
            return;
        }
        //旧データ対応：folderIdが無い単語は未分類へ
        const normalized: WordsStore = {
            folders: loaded.folders?.length ? loaded.folders : initialStore.folders,
            words: loaded.words ?? [].map(w => ({
                ...w,
                folderId: w.folderId ?? DEFAULT_FOLDER_ID,
            })),
            activeFolderId: loaded.activeFolderId ?? ALL_FOLDER_ID,
        };
        setStore(normalized);
    }, [storage]);

    useEffect(() => {
        void reload();
    }, [reload]);

    //コード整理のための関数。persistでstateとstorageの両方を更新してるだけ。
    const persist = useCallback(
        (next: WordsStore) => {
            setStore(next);
            storage.save(next);
        },
        [storage]
    );

    // 以下、フォルダー管理

    const setActiveFolderId = useCallback((id: string) => {
        persist({ ...store, activeFolderId: id });
    }, [store, persist]);

    const addFolder = useCallback((name: string) => {
        const folder: Folder = {
            id: uuidv4(),
            name: name.trim(),
            createdAt: Date.now(),
        };
        persist({ ...store, folders: [folder, ...store.folders] });
    }, [store, persist]);

    const renameFolder = useCallback(({ id, name }: { id: string; name: string }) => {
        persist({
            ...store,
            folders: store.folders.map(f => f.id === id ? { ...f, name: name.trim() || f.name } : f),
        });
    }, [store, persist]);

    const removeFolder = useCallback((id: string) => {
        //フォルダー内の単語を未分類へ移動
        const nextFolders = store.folders.filter(f => f.id !== id);
        const nextWords = store.words.map(w => (w.folderId === id ? { ...w, folderId: DEFAULT_FOLDER_ID } : w));
        const nextActiveFolderId = store.activeFolderId === id ? ALL_FOLDER_ID : store.activeFolderId;

        persist({
            ...store,
            folders: nextFolders,
            words: nextWords,
            activeFolderId: nextActiveFolderId,
        });
    }, [store, persist]);

    // 以下、単語管理


    const addWord = useCallback(
        async (input: { word: string; note?: string; folderId?: string }) => {
            const word = input.word.trim();
            if (!word) return;

            const folderId = input.folderId ?? (store.activeFolderId === ALL_FOLDER_ID ? DEFAULT_FOLDER_ID : store.activeFolderId);

            const item: WordItem = {
                id: uuidv4(),
                createdAt: Date.now(),
                word,
                note: input.note?.trim(),
                folderId,
            };

            const next = { ...store, words: [item, ...store.words] };
            persist(next);
        },
        [store, persist]
    );

    const removeWord = useCallback(
        (id: string) => {
            const next = { ...store, words: store.words.filter(w => w.id !== id) };
            persist(next);
        },
        [store, persist]
    );

    const editWord = useCallback(async ({ id, word, note }: { id: string; word: string; note?: string }) => {

        const next = {
            ...store,
            words: store.words.map(w =>
                w.id === id ? { ...w, word: word.trim(), note: note?.trim() } : w
            ),
        };
        persist(next);

    }, [store, persist]);

    const moveWord = useCallback(
        ({ id, folderId }: { id: string, folderId: string }) => {
            const next = {
                ...store,
                words: store.words.map(w => w.id === id ? { ...w, folderId } : w),
            };
            persist(next);
        }, [store, persist]);



    const clearAll = useCallback(async () => {
        await storage.allDelete();
        setStore(initialStore);
    }, [storage]);

    //UI用データ,今後usememo化しておくと良いかも？

    const activeFolder = store.activeFolderId === ALL_FOLDER_ID
        ? null
        : store.folders.find(f => f.id === store.activeFolderId) || null;

    const visibleWords = useMemo(() => {
        if (!store.activeFolderId) return store.words;
        return store.words.filter(w => w.folderId === store.activeFolderId);
    }, [store.words, store.activeFolderId]);

    //return


    return (
        <WordsContext.Provider
            value={{
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
            }}
        >
            {children}
        </WordsContext.Provider>
    )


}