import React, { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import { Default_stream_config } from '@/config/streamConfig'

import { useStreamLane } from "@/hooks/useStreamLane";
import { StreamText } from "@/components/StreamText";
import { useWords } from '@/hooks/useWords';
import { TopBar } from "@/components/TopBar";
import { FolderPickerSheet } from "@/components/FolderPickerSheet";
import { WordItem } from "@/types/word";
import { WordDetailModal } from "@/components/WordModalDetail";





function makePlayId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function WordListScreen() {



  const { width, height } = useWindowDimensions();
  const cfg = Default_stream_config;

  const { pickRandomWord } = useWords();

  //トップバーのフォルダ名表示用
  const { activeFolder, store, visibleWords } = useWords();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const [selected, setSelected] = useState<WordItem | null>(null); //ワードをタップして詳細Modalを表示するスイッチにもなっている。



  const { y, active, start } = useStreamLane({
    cfg,
    screenHeight: height,
  });


  const lane0 = useStreamLane({ cfg, screenHeight: height });  //レーン生成
  const lane1 = useStreamLane({ cfg, screenHeight: height });
  const lane2 = useStreamLane({ cfg, screenHeight: height });
  const lane3 = useStreamLane({ cfg, screenHeight: height });


  const lanes = useMemo(() => [lane0, lane1, lane2, lane3], [lane0, lane1, lane2, lane3]);

  const lanePickIndex = useCallback(() => { //空いてるレーンをランダムに選ぶ
    const free = lanes
      .map((lane, i) => (lane.active ? -1 : i))
      .filter(i => i !== -1);

    if (free.length === 0) return null;


    return free[Math.floor(Math.random() * free.length)];



  }, [lanes]);



  //WordRefを使う

  const visibleWordsRef = useRef<WordItem[]>([]);
  useEffect(() => {
    visibleWordsRef.current = visibleWords;
  }, [visibleWords]);

  const spawnOne = useCallback(() => {
    const list = visibleWordsRef.current;
    //console.log("spawnOne", list.length);
    if (list.length === 0) return;

    const laneIndex = lanePickIndex();
    if (laneIndex === null) return;

    const item = list[Math.floor(Math.random() * list.length)];
    //console.log("spawnOne item", item.word);

    lanes[laneIndex].start({
      id: makePlayId(),
      wordItemId: item.id,
      word: item.word,
      laneIndex,
      createdAt: Date.now(),
      durationMs: cfg.baseDurationMs,
    });


  }, [lanes, lanePickIndex]);



  const CommentWidth = width * cfg.maxwidthRatio;


  useEffect(() => {
    const t = setInterval(() => {
      spawnOne();
    }, 1500);

    return () => clearInterval(t);
  }, [spawnOne]);



  useEffect(() => {
    //if (visibleWords.length === 0) return;
    //単一レーン処理
    //runWord();
    //複数レーンになったときの処理
    spawnOne();
  }, [height, visibleWords.length]);



  //locations={[0, 0.26, 0.56, 1]}
  return (


    <>
      <TopBar
        folderName={activeFolder?.name ?? "未分類"}
        onPressFolder={() => setSheetOpen(true)}
        showBack={false}
      />



      <LinearGradient colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom2, Colors.bgBottom]} locations={Colors.locations} style={styles.root} >




        <View style={styles.absoluteFill}>

          {lanes.map((lane, i) =>
            lane.active ? (

              <StreamText
                key={`lane-${i}`}
                text={lane.active?.word || ""}
                x={cfg.lanePaddingLeft + i * cfg.laneGap}
                width={CommentWidth}
                y={lane.y}
                visible={true}
                onPress={() => {
                  if (!lane.active) return;
                  const wordItem = store.words.find(w => w.id === lane.active?.wordItemId);
                  if (wordItem) setSelected(wordItem);
                }}
              />

            ) : null
          )}
        </View>

        <WordDetailModal
          visible={selected !== null}
          wordText={selected?.word ?? ""}
          wordNote={selected?.note ?? ""}
          onClose={() => setSelected(null)}
        />


        <FolderPickerSheet
          visible={sheetOpen}
          onClose={() => setSheetOpen(false)}
        />
      </LinearGradient>
    </>

  );
}

const styles = StyleSheet.create({
  root: { flex: 1, },
  header: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
  title: { color: Colors.text, fontSize: 22, fontWeight: "800" },
  subtitle: { color: Colors.text, marginTop: 6 },
  listContent: { paddingHorizontal: 18, paddingTop: 6, paddingBottom: 8 },

  absoluteFill: {
    position: 'absolute',
    overflow: "hidden",
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
