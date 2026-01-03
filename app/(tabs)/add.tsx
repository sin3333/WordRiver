import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";
import { BottomBar } from "../../components/BottomBar";

export default function AddWordScreen() {
    const [word, setWord] = useState("");
    const [note, setNote] = useState("");

    const onSave = () => {
        const w = word.trim();
        if (!w) {
            Alert.alert("入力", "単語を入力してね");
            return;
        }
        // TODO: AsyncStorage / DB に保存
        Alert.alert("保存", `「${w}」を保存（ダミー）`);
        setWord("");
        setNote("");
    };

    return (
        <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.title}>単語追加</Text>
                <Text style={styles.subtitle}>drop a word into the river</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>単語</Text>
                <TextInput
                    value={word}
                    onChangeText={setWord}
                    placeholder="例：drift"
                    placeholderTextColor={Colors.muted}
                    style={styles.input}
                />

                <Text style={[styles.label, { marginTop: 14 }]}>メモ</Text>
                <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="意味 / 例文 / 補足"
                    placeholderTextColor={Colors.muted}
                    style={[styles.input, styles.textarea]}
                    multiline
                />

                <Text onPress={onSave} style={styles.saveButton}>
                    追加
                </Text>
            </View>

            <BottomBar />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
    title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
    subtitle: { color: Colors.subtext, marginTop: 6 },
    form: { paddingHorizontal: 18, paddingTop: 10, flex: 1 },
    label: { color: Colors.subtext, fontWeight: "700", marginBottom: 8 },
    input: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
        backgroundColor: "rgba(255,255,255,0.06)",
        color: Colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },
    textarea: { minHeight: 120, textAlignVertical: "top" },
    saveButton: {
        marginTop: 18,
        textAlign: "center",
        color: "#0B2A4A",
        backgroundColor: "rgba(255,255,255,0.92)",
        paddingVertical: 14,
        borderRadius: 14,
        fontWeight: "900",
        overflow: "hidden",
    },
});
