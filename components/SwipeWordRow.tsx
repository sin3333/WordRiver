import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable"; //https://github.com/reactwg/react-native-new-architecture/discussions/15
import type { WordItem } from "@/types/word";

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
            overShootRight={false}
        >
            <View style={styles.row}>
                <Text style={styles.word}>{item.word}</Text>
                {!!item.note && <Text style={styles.note}>{item.note}</Text>}
            </View>

        </Swipeable>
    )
}

const styles = StyleSheet.create({
    row: { padding: 14, backgroundColor: "white" },
    word: { fontSize: 16, fontWeight: "600" },
    note: { marginTop: 4, opacity: 0.7 },
    deleteAction: {
        width: 88,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e11d48",
    },
    deleteText: { color: "white", fontWeight: "700" },
});