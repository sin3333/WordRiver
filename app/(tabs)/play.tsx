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


  const lane0 = useStreamLane({ cfg, screenHeight: height, });  //レーン生成
  const lane1 = useStreamLane({ cfg, screenHeight: height, });
  const lane2 = useStreamLane({ cfg, screenHeight: height, });
  const lane3 = useStreamLane({ cfg, screenHeight: height, });

  const lanes = [lane0, lane1, lane2, lane3,];

  const lanePickIndex = () => { //空いてるレーンをランダムに選ぶ
    const free = lanes
      .map((lane, i) => (lane.active ? -1 : i))
      .filter(i => i !== -1);

    if (free.length === 0) return null;

    return free[Math.floor(Math.random() * free.length)];
  }

  const spawn = () => {
    const w = pickRandomWord();
    if (!w) return;

    const laneIndex = lanePickIndex();
    if (laneIndex === null) return;

    lanes[laneIndex].start({
      id: makePlayId(),
      word: w.word,
      laneIndex,
      createdAt: Date.now(),
      durationMs: cfg.baseDurationMs,
    })
  }


  const CommentWidth = width * cfg.maxwidthRatio;

  /* あとで消す
  const laneX = cfg.lanePaddingLeft;
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
  */

  useEffect(() => {
    //単一レーン処理
    //runWord();
    //複数レーンになったときの処理
    spawn();
  }, [height]);

  useEffect(() => {
    const id = setInterval(() => {
      const w = pickRandomWord();
      if (!w) return;

      const laneIndex = lanePickIndex();
      if (laneIndex === null) return;

      lanes[laneIndex].start({
        id: makePlayId(),
        word: w.word,
        laneIndex,
        createdAt: Date.now(),
        durationMs: cfg.baseDurationMs,
      });
    }, 1800);

    return () => clearInterval(id);
  }, [pickRandomWord, cfg.baseDurationMs, lanes])

  //locations={[0, 0.26, 0.56, 1]}
  return (

    <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom2, Colors.bgBottom]} locations={Colors.locations} style={styles.root}>



      <View style={styles.absoluteFill} pointerEvents="none">

        {lanes.map((lane, i) =>
          lane.active ? (

            <StreamText
              key={lane.active.id}
              text={lane.active?.word || ""}
              x={cfg.lanePaddingLeft + i * cfg.laneGap}
              width={CommentWidth}
              y={lane.y}
              visible={true}
            />

          ) : null
        )}
      </View>



    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  root: { flex: 1, },
  header: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
  title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
  subtitle: { color: Colors.text, marginTop: 6 },
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
