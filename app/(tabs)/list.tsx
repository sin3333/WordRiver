import React, { useMemo, useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";
import { WordCard } from "../../components/WordCard";
import { BottomBar } from "../../components/BottomBar";
import { SwipeWordRow } from "@/components/SwipeWordRow";
import type { WordItem } from "../../types/word";
import { SafeAreaView } from "react-native-safe-area-context";

import { useWords } from "../../hooks/useWords";
import { useWordStorage } from "../../hooks/useWordStorage";
import { SafeAreaContext, SafeAreaFrameContext } from "react-native-safe-area-context";

const seed: WordItem[] = [ //後で消す
    { id: "1", word: "drift", note: "漂う", createdAt: new Date() },
    { id: "2", word: "current", note: "潮流 / 流れ", createdAt: new Date(Date.now() - 86400000) },
    { id: "3", word: "abyss", note: "深淵", createdAt: new Date(Date.now() - 86400000 * 2) },
];



export default function ListScreen() {
    const { wordList, reload, removeWord, clearAll } = useWords();

    useEffect(() => { //デバッグ用
        console.log(wordList);
    }, []);


    const [q, setQ] = useState("");
    const data = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return seed;
        return seed.filter((w) => w.word.toLowerCase().includes(s) || (w.note ?? "").toLowerCase().includes(s));
    }, [q]);

    /*const reload = useCallback(async () => {
        const data = await Storage.load();
        setWordList(data);
    }, [Storage]);
*/
    const renderItem = useCallback(
        ({ item }: { item: WordItem }) => (
            <SwipeWordRow item={item} onDelete={() => removeWord(item.id)} />
        ),
        [removeWord]
    );

    useFocusEffect(
        useCallback(() => {
            void reload();
        }, [reload])
    );




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>
                <View style={styles.header}>
                    <Text style={styles.title}>検索</Text>
                    <Text style={styles.subtitle}>find a word in the current</Text>
                </View>

                <View style={styles.searchBox}>
                    <TextInput
                        value={q}
                        onChangeText={setQ}
                        placeholder="検索…"
                        placeholderTextColor={Colors.muted}
                        style={styles.input}
                    />
                </View>

                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={wordList}
                    keyExtractor={(i) => i.id}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListEmptyComponent={<Text style={styles.empty}>見つからない</Text>}
                    renderItem={renderItem}
                />

                <Button //デバッグ用
                    title="ストレージ全削除（デバッグ用）"
                    onPress={async () => {
                        await clearAll();
                        console.warn("STORAGE CLEARED");
                    }}
                />

                <BottomBar />


            </LinearGradient>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
    title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
    subtitle: { color: Colors.subtext, marginTop: 6 },
    searchBox: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 6 },
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
    listContent: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 8 },
    empty: { color: Colors.subtext, paddingHorizontal: 18, paddingTop: 18 },
});
