import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { serverFunc, ServerFuncState } from "@/actions/server-func";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState, useTransition } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [funcState, setFuncState] = useState<ServerFuncState>({ foo: "bar" });
  const [isPending, startTransition] = useTransition();
  console.log("serverFunc:", { isPending }, funcState);
  useEffect(() => {
    startTransition(async () => {
      try {
        const resp = await serverFunc({ foo: "hoo" });
        console.log("serverFunc response:", resp);
        setFuncState(resp);
      } catch (error) {
        console.error("serverFunc error:", { error });
      }
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
