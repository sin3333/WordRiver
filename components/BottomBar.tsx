import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Colors } from "../theme/colors";
import { Play, Plus, List } from "lucide-react-native";

type Tab = { key: string; label: string; href: string };

const TABS: Tab[] = [
    { key: "play", label: "眺める", href: "/play" },        // main
    { key: "add", label: "追加", href: "/add" },
    { key: "list", label: "一覧", href: "/list" },
];

export function BottomBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.wrap}>

            <View style={styles.bar}>
                {TABS.map((t) => {
                    const active = isActive(pathname, t.href);
                    console.log("pathname=", pathname, "href=", t.href, "active=", active);

                    return (

                        <Pressable
                            key={t.key}
                            onPress={() => router.push(t.href)}
                            style={({ pressed }) => [styles.item, pressed && styles.pressed, active && styles.activeItem]}
                        >
                            {active && t.key === "play" && <Play />}
                            {active && t.key === "add" && <Plus />}
                            {active && t.key === "list" && <List />}
                            <Text style={[styles.label, active && styles.activeLabel]}>{t.label}</Text>

                        </Pressable>

                    );
                })}

            </View>
        </View>
    );
}

function isActive(pathname: string | null, href: string) {
    if (!pathname) return false;
    // strip query/hash
    const p = pathname.split(/[?#]/)[0];

    // play is the default (root) screen
    if (href === "/(tabs)/play") return p === "/(tabs)/play" || p === "/(tabs)" || p === "/" || p.startsWith("/(tabs)/play");

    // list is a separate screen; match itself and its nested subroutes
    if (href === "/(tabs)/list") return p === "/(tabs)/list" || p.startsWith("/(tabs)/list");

    // generic: match exact or sub-paths (e.g., /foo and /foo/bar)
    return p === href || p.startsWith(href + "/");
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
    activeItem: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
    label: { color: Colors.muted, fontSize: 13, fontWeight: "700" },
    activeLabel: { color: Colors.text },
});
