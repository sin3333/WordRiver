import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";


import { useWords } from "@/hooks/useWords";

export default function AddWordScreen() {
    const { addWord } = useWords();
    //const storage = useWords();
    const [word, setWord] = useState("");
    const [note, setNote] = useState("");

    const onSave = async () => {

        const w = word.trim();
        if (!w) {
            Alert.alert("入力", "単語を入力してね");
            return;
        }
        await addWord({ word: w, note: note });
        Alert.alert("保存", `「${w}」を保存`);
        Keyboard.dismiss();
        setWord("");
        setNote("");
    };

    return (

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

                <Text onPress={onSave} style={styles.saveButton}>
                    追加
                </Text>
            </View>


        </View>

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
});
