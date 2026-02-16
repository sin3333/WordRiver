import React, { use, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "@/theme/colors";
import { useWords } from "@/hooks/useWords";
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
            <Modal visible={addOpen} transparent animationType="fade" onRequestClose={() => setAddOpen(false)}>
                <Pressable style={styles.backdrop} onPress={() => setAddOpen(false)}>
                    <Text style={styles.modalTitle}>新しいフォルダを追加</Text>
                    <TextInput
                        value={newName}
                        onChangeText={setNewName}
                        placeholder="フォルダ名"
                        placeholderTextColor={Colors.text}
                        style={styles.input}
                    />

                    <View style={styles.modalRow}>
                        <Pressable
                            onPress={() => setAddOpen(false)}
                            style={[styles.btn, styles.btnGhost]}>
                            <Text style={styles.btnText}>キャンセル</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                const name = newName.trim();
                                if (!name) return;

                                addFolder(name);

                                // ⚠️ addFolder が id を返さない設計なら、
                                // 追加後に「最後のフォルダを選択」みたいに store.folders を見て選ぶ必要がある。
                                // ここは一旦「追加して閉じる」だけにしてる。

                                setAddOpen(false);
                                setNewName("");
                            }}
                            style={[styles.btn, styles.btnPrimary]}>
                            <Text style={styles.btnText}>追加</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
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
        backgroundColor: "rgba(0,0,0,0.3)",
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