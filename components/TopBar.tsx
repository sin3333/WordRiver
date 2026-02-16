import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native"; //https://lucide.dev/guide/packages/lucide-react-native

type Props = {
    title?: string;

    folderName?: string;
    onPressFolder?: () => void;

    showBack?: boolean;
    onBackPress?: () => void;
}

export function TopBar({ title = "WordRiver", folderName, onPressFolder, showBack = true, onBackPress }: Props) {
    return (
        <View style={styles.wrap}>
            <View style={{ position: "absolute", left: 15 }}>
                {showBack && (
                    <Pressable onPress={onBackPress ?? (() => router.back())} hitSlop={10}>
                        <ChevronLeft size={30} color={Colors.text} />
                    </Pressable>
                )}

            </View>

            {folderName && onPressFolder ? (
                <Pressable onPress={onPressFolder} hitSlop={10} style={styles.center}>
                    <Text style={styles.title} numberOfLines={0}>{folderName}</Text>
                    <Text style={styles.caret}>▼</Text>
                </Pressable>
            ) : (
                <Text style={styles.title}>{title}</Text>

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        paddingTop: 15,
        paddingBottom: 12,
        backgroundColor: Colors.bgGeneral,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 0.2,
        borderBottomColor: Colors.border,
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: "800",
    },

    center: { flexDirection: "row", alignItems: "center", gap: 6, maxWidth: "70%" },
    caret: { color: Colors.text, opacity: 0.7, fontSize: 12, marginTop: 2 },


});