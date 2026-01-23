import React from "react";
import { Stack } from "expo-router";
import { WordsProvider } from "@/context/WordContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgTop }}>
        <WordsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </WordsProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
