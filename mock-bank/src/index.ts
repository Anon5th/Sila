import express, { Request, Response } from "express";
import path from "path";
import { buildPromptPayQrDataUrl } from "./qr";
import { verifyOnEngine, getHistory, getHealth } from "./engineClient";

const PORT = parseInt(process.env.PORT || "3000", 10);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const eng = await getHealth();
    res.json({ ok: true, engine: eng });
  } catch (e: any) {
    res.status(503).json({ ok: false, error: e?.message ?? String(e) });
  }
});

app.get("/api/history", async (_req: Request, res: Response) => {
  try {
    const data = await getHistory();
    res.json(data);
  } catch (e: any) {
    res.status(503).json({ error: e?.message ?? String(e) });
  }
});

app.get("/api/qr", async (req: Request, res: Response) => {
  const amount = parseFloat((req.query.amount as string) || "0");
  if (!isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: "amount must be a positive number" });
  }
  try {
    const dataUrl = await buildPromptPayQrDataUrl(amount);
    res.json({ amount, qr: dataUrl });
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? String(e) });
  }
});

app.post("/api/transaction", async (req: Request, res: Response) => {
  const { mcc, amount, label } = req.body ?? {};
  if (typeof mcc !== "number" || typeof amount !== "number" || typeof label !== "string") {
    return res.status(400).json({ error: "expected { mcc:number, amount:number, label:string }" });
  }
  try {
    const [verify, qr] = await Promise.all([
      verifyOnEngine({ mcc, amount, label }),
      buildPromptPayQrDataUrl(amount).catch(() => null),
    ]);
    res.json({ ...verify, qr });
  } catch (e: any) {
    res.status(502).json({ status: "error", reason: e?.message ?? String(e) });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`[mock-bank] listening on :${PORT}`);
  console.log(`[mock-bank] ENGINE_URL=${process.env.ENGINE_URL || "http://engine:8080"}`);
});
