import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native"; //https://lucide.dev/guide/packages/lucide-react-native

export function TopBar() {
    return (
        <View style={styles.wrap}>
            <View style={{ position: "absolute", left: 15 }}>
                {router.canGoBack() && (
                    <Pressable onPress={() => router.back()} hitSlop={10}>
                        <ChevronLeft size={30} color={Colors.text} />
                    </Pressable>
                )}
            </View>
            <Text style={styles.title}>WordRiver</Text>
        </View>
    )
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
});