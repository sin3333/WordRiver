import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";
import { WordCard } from "../../components/WordCard";
import { BottomBar } from "../../components/BottomBar";
import type { WordItem } from "../../types/word";
import { SafeAreaView } from "react-native-safe-area-context";

const seed: WordItem[] = [
  { id: "1", word: "単語", note: "深海みたいに静かに流れるUI", createdAt: new Date().toISOString() },
  { id: "2", word: "sample", note: "タップで詳細に行く…など後で拡張", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", word: "drift", note: "漂う / ゆっくり流れる", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
];

export default function WordListScreen() {
  const data = useMemo(() => seed, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.title}>単語一覧</Text>
          <Text style={styles.subtitle}>words drifting in the deep</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <WordCard item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />

        <BottomBar />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
  title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
  subtitle: { color: Colors.subtext, marginTop: 6 },
  listContent: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 8 },
});
