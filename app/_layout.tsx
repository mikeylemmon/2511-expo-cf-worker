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

  console.log("[app/_layout.tsx]: serverFunc:", { isPending }, funcState);
  useEffect(() => {
    startTransition(async () => {
      try {
        console.log("[app/_layout.tsx]: calling /hello... (API route)");
        const resp = await fetch("/hello");
        const hello = await resp.json();
        console.log("[app/_layout.tsx]: hello response:", hello);
      } catch (error) {
        console.error("[app/_layout.tsx]: /hello error:", { error });
      }

      try {
        console.log("[app/_layout.tsx]: calling serverFunc...");
        const resp = await serverFunc({ foo: "hoo" });
        console.log("[app/_layout.tsx]: serverFunc response:", resp);
        setFuncState(resp);
      } catch (error) {
        console.error("[app/_layout.tsx]: serverFunc error:", { error });
        setFuncState({ error: (error as Error).message });
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
