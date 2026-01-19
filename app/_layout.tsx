import React from "react";
import { Stack } from "expo-router";
import { WordsProvider } from "@/context/WordContext";

export default function RootLayout() {
  return (
    <WordsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </WordsProvider>

  );
}
