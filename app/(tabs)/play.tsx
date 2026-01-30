import React, { useMemo, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../theme/colors";
import { WordCard } from "../../components/WordCard";
import type { WordItem } from "../../types/word";

import { Default_stream_config } from '@/config/streamConfig'
import { StreamItem } from "@/types/streamItemTypes"
import { useStreamLane } from "@/hooks/useStreamLane";
import { StreamText } from "@/components/StreamText";
import { useWords } from '@/hooks/useWords';
import { createStreamItem } from "@/hooks/createStreamItem";



function makePlayId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function WordListScreen() {
  const { width, height } = useWindowDimensions();
  const cfg = Default_stream_config;

  const { pickRandomWord } = useWords();

  const { y, active, start } = useStreamLane({
    cfg,
    screenHeight: height,
  });

  const laneX = cfg.lanePaddingLeft;
  const CommentWidth = width * cfg.maxwidthRatio;

  const runWord = (() => {
    const picked = pickRandomWord();
    if (!picked) return;

    const item: StreamItem = {
      id: makePlayId(),
      word: picked.word,
      laneIndex: 0,
      createdAt: Date.now(),
      durationMs: cfg.baseDurationMs,
    }
    start(item);
  })

  useEffect(() => {
    //単一レーン処理
    runWord();
    //複数レーンになったときの処理
  }, [height]);

  useEffect(() => {
    const id = setInterval(() => {
      if (active) return;
      const w = pickRandomWord();
      if (!w) return;

      start(createStreamItem({
        word: w.word,
        laneIndex: 0,
        durationMs: cfg.baseDurationMs,
      }));
    }, 1200);

    return () => clearInterval(id);
  }, [active, start, pickRandomWord, cfg.baseDurationMs])


  return (

    <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]} style={styles.root}>

      <View style={styles.header}>
        <Text style={styles.title}>Play</Text>
        <Text style={styles.subtitle}>words drifting in the deep</Text>
      </View>

      <View style={styles.absoluteFill} pointerEvents="none">
        {active && (
          <StreamText
            text={active.word}
            x={laneX}
            width={CommentWidth}
            y={y}
            visible={true}
          />
        )}
      </View>



    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  root: { flex: 1, },
  header: { paddingHorizontal: 18, paddingTop: 0, paddingBottom: 10 },
  title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
  subtitle: { color: Colors.subtext, marginTop: 6 },
  listContent: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 8 },

  absoluteFill: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

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
