import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs } from "expo-router";

import { BottomBar } from "../../components/BottomBar";
import { Colors } from "@/theme/colors";
import { TopBar } from "@/components/TopBar";

export default function TabsLayout() {
  // BottomBarは各画面の下に置く（カスタムUIしやすい）
  // Tabs自体はヘッダーやジェスチャーだけ提供してもらう
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TopBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },


        }}
      >
        <Tabs.Screen name="play" />
        <Tabs.Screen name="add" />
        <Tabs.Screen name="list" />
      </Tabs>



      <BottomBar />
    </GestureHandlerRootView >
  );
}
