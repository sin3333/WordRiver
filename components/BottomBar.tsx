import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Colors } from "../theme/colors";

type Tab = { key: string; label: string; href: string };

const TABS: Tab[] = [
    { key: "play", label: "眺める", href: "/(tabs)/play" },        // main
    { key: "add", label: "追加", href: "/(tabs)/add" },
    { key: "list", label: "一覧", href: "/(tabs)/list" },
];

export function BottomBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.wrap}>
            <View style={styles.bar}>
                {TABS.map((t) => {
                    const active = isActive(pathname, t.href);
                    return (
                        <Pressable
                            key={t.key}
                            onPress={() => router.push(t.href)}
                            style={({ pressed }) => [styles.item, pressed && styles.pressed, active && styles.activeItem]}
                        >
                            <Text style={[styles.label, active && styles.activeLabel]}>{t.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

function isActive(pathname: string, href: string) {
    // treat root and /(tabs) as the same default for the main/list screen
    if (href === "/(tabs)/play") return pathname === "/(tabs)/main" || pathname === "/(tabs)" || pathname === "/";
    if (href === "/(tabs)/list") return pathname === "/(tabs)/list" || pathname === "/(tabs)" || pathname === "/";
    return pathname === href;
}

const styles = StyleSheet.create({
    wrap: {
        paddingHorizontal: 18,
        paddingBottom: 14,
        paddingTop: 10,
    },
    bar: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.22)",
        borderColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderRadius: 18,
        overflow: "hidden",
    },
    item: { flex: 1, paddingVertical: 14, alignItems: "center" },
    pressed: { opacity: 0.85 },
    activeItem: { backgroundColor: "rgba(255,255,255,0.08)" },
    label: { color: Colors.muted, fontSize: 13, fontWeight: "700" },
    activeLabel: { color: Colors.text },
});
