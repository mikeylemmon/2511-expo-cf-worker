"use server";
import "server-only";

export type ServerFuncState = {
  error?: string;
  foo?: string;
  bar?: string;
};

export async function serverFunc({
  foo,
}: ServerFuncState): Promise<ServerFuncState> {
  console.log("[actions/server-func.ts]:", { foo });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    foo: "hi",
    bar: "baz",
  };
}
