"use server";
import "server-only";

const log = console.log.bind(console, "[actions/server-func.ts]:");

export type ServerResponse = {
  error?: string;
  success?: boolean;
};

export async function serverFunc(): Promise<ServerResponse> {
  log("Waiting 2 seconds...");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  log("Returning success");
  return {
    success: true,
  };
}
