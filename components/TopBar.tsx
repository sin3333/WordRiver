import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";

export function TopBar() {
    return (
        <View style={styles.wrap}>
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