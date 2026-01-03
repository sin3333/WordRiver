import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  // BottomBarは各画面の下に置く（カスタムUIしやすい）
  // Tabs自体はヘッダーやジェスチャーだけ提供してもらう
  return (
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
  );
}
