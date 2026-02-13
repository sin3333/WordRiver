export type Folder = {
    id: string;
    name: string;
    createdAt: number;
};

export type WordItem = {
    id: string;
    word: string;
    note?: string;
    createdAt: number; // ISO
    folderId: string;
};

export type WordsStore = {
    folders: Folder[];
    words: WordItem[];
    activeFolderId: string;
}

export const DEFAULT_FOLDER_ID = 'default';
export const ALL_FOLDER_ID = 'all';