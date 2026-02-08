import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable"; //https://github.com/reactwg/react-native-new-architecture/discussions/15
import type { WordItem } from "@/types/word";
import { Colors } from "@/theme/colors";

function RightActions({ onDelete }: { onDelete: () => void }) {
    return (
        <Pressable onPress={onDelete} style={styles.deleteAction}>
            <Text style={styles.deleteText}>削除</Text>
        </Pressable>
    );
}

export function SwipeWordRow({
    item,
    onDelete,
}: {
    item: WordItem;
    onDelete: () => void;
}) {
    return (

        <Swipeable
            renderRightActions={() => <RightActions onDelete={onDelete} />}
            overshootRight={false}
        >
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.word}>{item.word}</Text>
                    <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
                </View>

                {item.note ? <Text style={styles.note} numberOfLines={2}>{item.note}</Text> : null}
            </View>
        </Swipeable>

    )
}

function formatDate(iso: string) {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}/${m}/${day}`;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderWidth: 0,
        borderColor: Colors.border,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 14,
        gap: 8,
        flexDirection: "column",
    },
    row: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" },
    word: { fontSize: 16, fontWeight: "600", color: Colors.text },
    date: { fontSize: 12, opacity: 0.7, color: Colors.text },
    note: { marginTop: 4, opacity: 0.7, color: Colors.text },
    deleteAction: {
        width: 88,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ce4663",
    },
    deleteText: { color: "white", fontWeight: "700" },
});