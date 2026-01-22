import React from "react";
import { Stack } from "expo-router";
import { WordsProvider } from "@/context/WordContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WordsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </WordsProvider>
    </SafeAreaProvider>
  );
}
