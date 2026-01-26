import React, { useMemo, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";
import { WordCard } from "../../components/WordCard";
import { BottomBar } from "../../components/BottomBar";
import type { WordItem } from "../../types/word";

import { Default_stream_config } from '@/config/streamConfig'
import { useStreamLane } from "@/hooks/useStreamLane";
import { StreamText } from "@/components/StreamText"

const seed: WordItem[] = [
  //TODO
];

export default function WordListScreen() {
  const { width, height } = useWindowDimensions();
  const cfg = Default_stream_config;

  const { y, visible, start } = useStreamLane({
    cfg,
    screenHeight: height,
  });

  const laneX = cfg.lanePaddingLeft;
  const CommentWidth = width * cfg.maxwidthRatio;

  useEffect(() => {
    //単一レーン処理
    start();
    //複数レーンになったときの処理
  }, [height]);


  return (

    <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Play</Text>
        <Text style={styles.subtitle}>words drifting in the deep</Text>
      </View>

      <StreamText
        text='hello world'
        x={laneX}
        width={CommentWidth}
        y={y}
        visible={visible}
      />



      <BottomBar />
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'space-between' },
  header: { paddingHorizontal: 18, paddingTop: 0, paddingBottom: 10 },
  title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
  subtitle: { color: Colors.subtext, marginTop: 6 },
  listContent: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 8 },

  button: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0,15)",
    zIndex: 10,
  },
  bottonText: { fontSize: 14 },

}
);
