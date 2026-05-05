import axios from "axios";

const ENGINE_URL = process.env.ENGINE_URL || "http://engine:8080";

export interface EngineVerifyRequest {
  mcc: number;
  amount: number;
  label: string;
}

export interface EngineVerifyResponse {
  status: "approved" | "blocked" | "error";
  mcc: number;
  amount: number;
  label: string;
  reason?: string | null;
  tx_hash?: string | null;
  block?: number | null;
  category?: string | null;
}

export interface HistoryEntry {
  timestamp: string;
  mcc: number;
  amount: number;
  label: string;
  status: string;
  reason?: string | null;
  tx_hash?: string | null;
  block?: number | null;
  category?: string | null;
}

const client = axios.create({
  baseURL: ENGINE_URL,
  timeout: 15000,
});

export async function verifyOnEngine(req: EngineVerifyRequest): Promise<EngineVerifyResponse> {
  const r = await client.post<EngineVerifyResponse>("/verify", req);
  return r.data;
}

export async function getHistory(): Promise<HistoryEntry[]> {
  const r = await client.get<HistoryEntry[]>("/history");
  return r.data;
}

export async function getHealth(): Promise<unknown> {
  const r = await client.get("/health");
  return r.data;
}
