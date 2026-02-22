import React, { use, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "@/theme/colors";
import { useWords } from "@/hooks/useWords";
import { AddFolderModal } from "./AddFolderModal";
import { store } from "expo-router/build/global-state/router-store";


type Props = {
    value: string | null;
    onChange: (folderId: string | null) => void;
    open: boolean;
    setOpen: (v: boolean) => void;
}

const ADD_NEW = "_ADD_NEW_";

export function FolderSelector({ value, onChange, open, setOpen }: Props) {
    const { store, addFolder } = useWords();



    //ライブラリの都合で、選択肢の配列はstateで持つ必要がある
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);

    const [addOpen, setAddOpen] = useState(false);
    const [newName, setNewName] = useState("");

    //選択一覧の最後に新規フォルダ追加の項目を入れる
    const foldersKey = useMemo(() => {
        return store.folders.map(f => `${f.id}:${f.name}`).join("|");
    }, [store.folders]);

    useEffect(() => {
        const next = [
            ...store.folders.map(f => ({ label: f.name, value: f.id })),
            { label: "＋ 新しいフォルダを追加", value: ADD_NEW },
        ];
        setItems(next);
    }, [foldersKey]);

    return (
        <>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={value ?? undefined}
                setValue={(cb) => {
                    const next = cb(value);

                    if (next === ADD_NEW) {
                        setOpen(false);
                        setAddOpen(true);
                        return value ?? undefined;
                    }

                    onChange(next ?? null);
                    return next;
                }}
                items={items}
                setItems={setItems}
                placeholder="フォルダを選択"
                listMode="SCROLLVIEW"
                style={styles.picker}
                dropDownContainerStyle={styles.dropdown}
                textStyle={styles.text}
                placeholderStyle={styles.placeholder}
            />

            {/* 新規フォルダ追加用のモーダル */}
            <AddFolderModal
                visible={addOpen}
                onClose={() => setAddOpen(false)}
                onAdd={(name) => addFolder(name)}
            />
        </>
    );

}

const styles = StyleSheet.create({
    picker: {
        borderRadius: 14,
        borderWidth: 0.2,
        borderColor: Colors.border,
        backgroundColor: Colors.card,
        minHeight: 48,
    },
    dropdown: {
        borderRadius: 14,
        borderWidth: 0.2,
        borderColor: Colors.border,
        backgroundColor: Colors.card,
    },
    text: { color: Colors.text, fontSize: 16 },
    placeholder: { color: Colors.text },

    backdrop: {
        flex: 1,
        backgroundColor: Colors.bgGeneral,
        justifyContent: "center",
        padding: 18,
    },
    modalCard: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 0.2,
        borderColor: Colors.border,
    },
    modalTitle: { color: Colors.text, fontSize: 18, fontWeight: "800", marginBottom: 10 },
    input: {
        borderRadius: 14,
        borderWidth: 0.2,
        borderColor: Colors.border,
        backgroundColor: Colors.bgGeneral,
        color: Colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },
    modalRow: { flexDirection: "row", gap: 10, marginTop: 12, justifyContent: "flex-end" },
    btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
    btnGhost: { backgroundColor: "transparent", borderWidth: 0.2, borderColor: Colors.border },
    btnPrimary: { backgroundColor: Colors.BottomBar },
    btnText: { color: Colors.text, fontWeight: "700" },
});