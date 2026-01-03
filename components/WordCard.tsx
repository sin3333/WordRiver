import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";
import type { WordItem } from "../types/word";

export function WordCard({
    item,
    onPress,
}: {
    item: WordItem;
    onPress?: () => void;
}) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View style={styles.row}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
            </View>

            {item.note ? <Text style={styles.note} numberOfLines={2}>{item.note}</Text> : null}
        </Pressable>
    );
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
        borderColor: Colors.cardBorder,
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        gap: 8,
    },
    pressed: { transform: [{ scale: 0.99 }], opacity: 0.9 },
    row: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" },
    word: { color: Colors.text, fontSize: 18, fontWeight: "700", letterSpacing: 0.2 },
    date: { color: Colors.muted, fontSize: 12 },
    note: { color: Colors.subtext, fontSize: 13, lineHeight: 18 },
});
