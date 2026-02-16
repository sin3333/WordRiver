import React from "react";
import { Stack } from "expo-router";
import { WordsProvider } from "@/context/WordContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/theme/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.bgGeneral }}
          edges={["top"]}
        >
          <WordsProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="list/[folderId]" />
            </Stack>
          </WordsProvider>
        </SafeAreaView>

        <SafeAreaView style={{ backgroundColor: Colors.BottomBar }} edges={["bottom"]} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
