import React, { useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { Colors } from "@/theme/colors";
import { useWords } from "@/hooks/useWords";

type Props = {
    visible: boolean;
    onClose: () => void;
}

export function FolderPickerSheet({ visible, onClose }: Props) {
    const { store, activeFolder, setActiveFolderId } = useWords();

    const items = useMemo(() => store.folders, [store.folders]);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            {/*背景タップで閉じる*/}
            <Pressable style={styles.backdrop} onPress={onClose}>
                {/*シートタップでも閉じる*/}
                <Pressable style={styles.sheet} onPress={() => { }}>
                    <View style={styles.handle} />
                    <Text style={styles.title}>フォルダを選択</Text>

                    <FlatList
                        data={items}
                        keyExtractor={(f) => f.id}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        renderItem={({ item }) => {
                            const selected = item.id === activeFolder?.id;
                            return (
                                <Pressable
                                    style={[styles.row, selected && styles.rowSelected]}
                                    onPress={() => {
                                        setActiveFolderId(item.id);
                                        onClose();
                                    }}
                                >
                                    <Text style={styles.rowText} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    {selected && <Text style={styles.badge}>選択中</Text>}
                                </Pressable>
                            );
                        }}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    sheet: {
        backgroundColor: Colors.card,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 18,
        borderWidth: 0.2,
        borderColor: Colors.border,
        maxHeight: "70%",
    },
    handle: {
        alignSelf: "center",
        width: 44,
        height: 5,
        borderRadius: 999,
        backgroundColor: Colors.border,
        marginBottom: 10,
        opacity: 0.8,
    },
    title: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 12,
        textAlign: "center",
    },
    row: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 14,
        backgroundColor: Colors.bgGeneral,
        borderWidth: 0.2,
        borderColor: Colors.border,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    rowSelected: {
        backgroundColor: Colors.card, // 好みで
    },
    rowText: { color: Colors.text, fontSize: 16, flex: 1 },
    badge: { color: Colors.text, opacity: 0.7, fontSize: 12 },
});