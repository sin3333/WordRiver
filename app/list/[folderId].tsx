import React, { useMemo, useState, useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, } from "react-native";
import { useFocusEffect } from "expo-router";
import { Colors } from "../../theme/colors";
import { SwipeWordRow } from "@/components/SwipeWordRow";
import type { WordItem } from "../../types/word";
import { router, useLocalSearchParams } from "expo-router";

import { useWords } from "../../hooks/useWords";
import { TopBar } from "@/components/TopBar";


export default function ListScreen() {
    const { folderId: rawFolderId } = useLocalSearchParams<{ folderId: string }>();
    const folderId = Array.isArray(rawFolderId) //URLクエリに複数値が入る可能性はほぼ無いが、一応配列だったら先頭を取る
        ? rawFolderId[0]
        : rawFolderId;

    const { store, reload, removeWord } = useWords();

    const words = useMemo(() => {
        return store.words.filter(w => w.folderId === folderId);
    }, [store.words, folderId]);

    const [q, setQ] = useState("");
    const data = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return words;
        return words.filter((w) => w.word.toLowerCase().includes(s) || (w.note ?? "").toLowerCase().includes(s));
    }, [q, words]);

    const renderItem = useCallback(
        ({ item }: { item: WordItem }) => (
            <Pressable onPress={() => router.push({ pathname: "/edit/[id]", params: { id: item.id } })}>
                <SwipeWordRow item={item} onDelete={() => removeWord(item.id)} />
            </Pressable>
        ),
        [removeWord]
    );

    useFocusEffect(
        useCallback(() => {
            void reload();
        }, [reload])
    );

    return (
        <View style={styles.root}>
            <TopBar />

            <View style={styles.searchBox}>
                <TextInput
                    value={q}
                    onChangeText={setQ}
                    placeholder="検索…"
                    placeholderTextColor={Colors.text}
                    style={styles.input}
                />
            </View>

            <FlatList
                contentContainerStyle={styles.listContent}
                data={data}
                keyExtractor={(i) => i.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={<Text style={styles.empty}>見つからない</Text>}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: Colors.bgGeneral },
    header: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
    title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
    subtitle: { color: Colors.text, marginTop: 6 },
    searchBox: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 6 },
    input: {
        borderRadius: 14,
        borderWidth: 0.2,
        borderColor: Colors.border,
        backgroundColor: Colors.card,
        color: Colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },
    listContent: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 8 },
    empty: { color: Colors.text, paddingHorizontal: 18, paddingTop: 18 },
});
