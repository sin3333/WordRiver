import React, { useMemo, useState, useCallback, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, } from "react-native";
import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";
import { WordCard } from "../../components/WordCard";
import { FolderCard } from "@/components/FolderCard";
import type { Folder, WordItem } from "../../types/word";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useWords } from "../../hooks/useWords";
import { useWordStorage } from "../../hooks/useWordStorage";


//const seed: WordItem[] = [ //後で消す
//
//];



export default function ListScreen() {
    const { store, reload, removeFolder, clearAll } = useWords();

    useEffect(() => { //デバッグ用
        console.log(store.folders);
    }, []);


    const [q, setQ] = useState("");
    const data = useMemo(() => {
        //
    }, [q]);

    /*const reload = useCallback(async () => {
        const data = await Storage.load();
        setWordList(data);
    }, [Storage]);
*/
    const renderItem = useCallback(
        ({ item }: { item: Folder }) => (
            <Pressable onPress={() => router.push({ pathname: "/list/[folderId]", params: { folderId: item.id } })}>
                <FolderCard item={item} onDelete={() => removeFolder(item.id)} />
            </Pressable>
        ),
        [removeFolder]
    );

    useFocusEffect(
        useCallback(() => {
            void reload();
        }, [reload])
    );




    return (

        <View style={styles.root}>


            <View style={styles.searchBox}>
                <TextInput
                    value={q}
                    onChangeText={setQ}
                    placeholder="検索…"
                    placeholderTextColor={Colors.text}
                    style={styles.input}
                />
            </View>

            <FlatList
                contentContainerStyle={styles.listContent}
                data={store.folders}
                keyExtractor={(i) => i.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={<Text style={styles.empty}>見つからない</Text>}
                renderItem={renderItem}
            />

        </View>


    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: Colors.bgGeneral },
    header: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
    title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
    subtitle: { color: Colors.text, marginTop: 6 },
    searchBox: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 6 },
    input: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.border || Colors.cardBorder,
        backgroundColor: Colors.card,
        color: Colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,

        borderWidth: 0.2,
        borderColor: Colors.border
    },
    listContent: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 8 },
    empty: { color: Colors.text, paddingHorizontal: 18, paddingTop: 18 },
});




/*
            <Button 
                title="ストレージ全削除（デバッグ用）"
                onPress={async () => {
                    await clearAll();
                    console.warn("STORAGE CLEARED");
                }}
            />

*/