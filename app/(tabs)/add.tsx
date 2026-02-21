import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, Keyboard, Pressable } from "react-native";
import { Colors } from "../../theme/colors";
import { Picker } from "@react-native-picker/picker";


import { useWords } from "@/hooks/useWords";
import { FolderSelector } from "@/components/FolderSelector";
import { TopBar } from "@/components/TopBar";

export default function AddWordScreen() {
    const { addWord } = useWords();
    //const storage = useWords();
    const [word, setWord] = useState("");
    const [note, setNote] = useState("");

    const [value, setValue] = useState("a");

    const [folderId, setFolderId] = useState<string | null>(null);

    //FolderSelectorにドロップダウンメニューオープンのonoffを渡すためのstate。selectorがわでもonoff管理で使う。
    const [folderOpen, setFolderOpen] = useState(false);

    const onSave = async () => {

        const w = word.trim();
        if (!w) {
            Alert.alert("入力", "単語を入力してね");
            return;
        }
        await addWord({ word: w, note: note, folderId: folderId });
        Alert.alert("保存", `「${w}」を保存`);
        Keyboard.dismiss();
        setWord("");
        setNote("");
    };

    return (

        <Pressable onPress={() => { Keyboard.dismiss(); setFolderOpen(false); }} style={{ flex: 1 }}>
            <TopBar
                showBack={false}
            />

            <View colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>


                <View style={styles.form}>
                    <Text style={styles.label}>単語</Text>
                    <TextInput
                        value={word}
                        onChangeText={setWord}
                        placeholder="例：drift"
                        placeholderTextColor={Colors.text}
                        style={styles.input}
                    />

                    <Text style={[styles.label, { marginTop: 14 }]}>メモ</Text>
                    <TextInput
                        value={note}
                        onChangeText={setNote}
                        placeholder="意味 / 例文 / 補足"
                        placeholderTextColor={Colors.text}
                        style={[styles.input, styles.textarea]}
                        multiline
                    />



                    <View style={styles.row} >

                        <View style={styles.rowLeft}>
                            <FolderSelector value={folderId} onChange={setFolderId} open={folderOpen} setOpen={setFolderOpen} />
                        </View>

                        <Pressable onPress={onSave} style={styles.rowRight}>
                            <Text style={styles.saveButtonText}>追加</Text>
                        </Pressable>

                    </View>

                </View>

            </View>

        </Pressable>

    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: Colors.bgGeneral },
    header: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
    title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
    subtitle: { color: Colors.text, marginTop: 6 },
    form: { paddingHorizontal: 18, paddingTop: 10, flex: 1 },
    label: { color: Colors.text, fontWeight: "700", marginBottom: 8 },
    input: {
        borderRadius: 8,
        borderWidth: 0,
        borderColor: Colors.border || Colors.cardBorder,
        backgroundColor: Colors.card,
        color: Colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },
    textarea: { minHeight: 200, textAlignVertical: "top" },
    saveButton: {
        marginTop: 18,
        textAlign: "center",
        color: Colors.bgGeneral,
        backgroundColor: Colors.subtext,
        paddingVertical: 14,
        borderRadius: 8,
        fontWeight: "900",
        overflow: "hidden",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
        gap: 12, // RN 0.71+ ならOK。ダメなら下に代替書く
    },

    rowLeft: {
        flex: 1, // FolderSelectorを左側で伸ばす
    },

    rowRight: {
        minWidth: 110,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: Colors.subtext,
        alignItems: "center",
        justifyContent: "center",
    },

    saveButtonText: {
        color: Colors.bgGeneral,
        fontWeight: "900",
    },
});
