// @ts-ignore - promptpay-qr ships without bundled types
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

const TEMPLE_PROMPTPAY_ID = process.env.TEMPLE_PROMPTPAY_ID || "0899999999";

export async function buildPromptPayQrDataUrl(amount: number): Promise<string> {
  const payload: string = generatePayload(TEMPLE_PROMPTPAY_ID, { amount });
  const dataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 240,
  });
  return dataUrl;
}
