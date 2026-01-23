import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Colors } from "../theme/colors";
import { Play, Plus, List } from "lucide-react-native"; //https://lucide.dev/guide/packages/lucide-react-native

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

                    return (

                        <Pressable
                            key={t.key}
                            onPress={() => router.push(t.href)}
                            style={({ pressed }) => [styles.item, pressed && styles.pressed, active && styles.activeItem]}
                        >
                            {renderIcon(t.key, active)}

                            {active && <Text style={[styles.label, active && styles.activeLabel]}>{active && t.label}</Text>}

                        </Pressable>

                    );
                })}

            </View>
        </View>
    );
}

function renderIcon(key: string, active: boolean): JSX.Element {

    return (
        <View>
            {key === "play" && <Play style={[styles.icon]} strokeWidth={active ? 4 : 2} />}
            {key === "add" && <Plus style={[styles.icon]} strokeWidth={active ? 4 : 2} />}
            {key === "list" && <List style={[styles.icon]} strokeWidth={active ? 4 : 2} />}
        </View>
    )

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
        paddingBottom: 10,
        paddingTop: 10,
    },
    bar: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.22)",
        borderColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
        height: 64
    },
    item: { flex: 1, paddingVertical: 14, alignItems: "center", justifyContent: 'center', },
    pressed: { opacity: 0.85 },
    activeItem: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
    label: { color: Colors.muted },
    activeLabel: { color: Colors.text, fontSize: 11, fontWeight: "700" },
    icon: { color: Colors.muted, },
});
