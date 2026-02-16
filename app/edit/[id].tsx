import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, Keyboard, Pressable } from "react-native";
import { Colors } from "@/theme/colors";

import { router, useLocalSearchParams } from "expo-router";

import { useWords } from "@/hooks/useWords";
import { TopBar } from "@/components/TopBar";

export default function EditWordScreen() {
    //const EditWordScreen = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const { store, editWord, removeWord } = useWords();

    const target = store.words.find(w => w.id === id);

    const [inputWord, setWord] = useState(target?.word || "");
    const [inputNote, setNote] = useState(target?.note || "");

    const onSave = async () => {
        await editWord({ id, word: inputWord, note: inputNote });
        Alert.alert("編集", `「${inputWord}」を編集しました`);
        router.back();
    };

    const onDelete = () => {
        removeWord(id);
        Alert.alert("削除", `「${target?.word}」を削除しました`);
        router.back();
    };

    return (

        <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>

            <TopBar />

            <View colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>


                <View style={styles.form}>
                    <Text style={styles.label}>単語</Text>
                    <TextInput
                        value={inputWord}
                        onChangeText={setWord}
                        placeholder="例：drift"
                        placeholderTextColor={Colors.text}
                        style={styles.input}
                    />

                    <Text style={[styles.label, { marginTop: 14 }]}>メモ</Text>
                    <TextInput
                        value={inputNote}
                        onChangeText={setNote}
                        placeholder="意味 / 例文 / 補足"
                        placeholderTextColor={Colors.text}
                        style={[styles.input, styles.textarea]}
                        multiline
                    />

                    <Text onPress={onSave} style={styles.saveButton}>
                        編集
                    </Text>
                    <Text onPress={onDelete} style={styles.deleteButton}>
                        削除
                    </Text>
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
    deleteButton: {
        marginTop: 18,
        textAlign: "center",
        color: Colors.text,
        backgroundColor: Colors.redAlert,
        paddingVertical: 14,
        borderRadius: 8,
        fontWeight: "900",
        overflow: "hidden",
        justifyContent: "space-between",
    },
});
