import { serverFunc, ServerResponse } from "@/actions/server-func";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const log = console.log.bind(console, "[app/(tabs)/index.tsx]:");

type ServerCallState = ServerResponse & { pending?: boolean };

function useApiRoute(): ServerCallState {
  const [data, setData] = useState<ServerCallState>({ pending: true });
  useEffect(() => {
    setData({ pending: true });
    (async () => {
      try {
        const resp = await fetch("/hello");
        const respData = await resp.json();
        setData(respData as ServerResponse);
      } catch (error) {
        console.error(error);
        setData({ error: `${(error as Error).message ?? error}` });
      }
    })();
  }, []);
  return data;
}

function useServerFunc(): ServerCallState {
  const [data, setData] = useState<ServerCallState>({ pending: true });
  useEffect(() => {
    setData({ pending: true });
    (async () => {
      try {
        const resp = await serverFunc();
        setData(resp);
      } catch (error) {
        console.error(error);
        setData({ error: `${(error as Error).message ?? error}` });
      }
    })();
  }, []);
  return data;
}

export default function HomeScreen() {
  const apiRoute = useApiRoute();
  const rsf = useServerFunc();
  const backgroundColor = useThemeColor({}, "background");

  log("apiRoute state:", apiRoute);
  log("serverFunc state:", rsf);

  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={{
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">expo-server</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedView style={{ flexDirection: "row", gap: 4 }}>
          <ThemedText>API Route (hello+api):</ThemedText>
          <ThemedText
            type="defaultSemiBold"
            style={{
              color: apiRoute.pending
                ? "blue"
                : apiRoute.error
                ? "red"
                : "green",
            }}
          >
            {apiRoute.pending
              ? `Pending...`
              : apiRoute.error
              ? `Error: ${apiRoute.error}`
              : `Success`}
          </ThemedText>
        </ThemedView>

        <ThemedView style={{ flexDirection: "row", gap: 4 }}>
          <ThemedText>Server Function (serverFunc):</ThemedText>
          <ThemedText
            type="defaultSemiBold"
            style={{
              color: rsf.pending ? "blue" : rsf.error ? "red" : "green",
            }}
          >
            {rsf.pending
              ? `Pending...`
              : rsf.error
              ? `Error: ${rsf.error}`
              : `Success`}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
