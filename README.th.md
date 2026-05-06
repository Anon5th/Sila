# Sila Protocol — ระบบความโปร่งใสของวัด

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Anon5th/Sila?quickstart=1)

> เงินที่ตั้งโปรแกรมได้ เพื่อบุญในพุทธศาสนา
> ชั้นความซื่อสัตย์บนบล็อกเชนสำหรับนโยบาย e-Donation ปี 2026 ของไทย

🇬🇧 [Read this in English](./README.md)

![Sila Protocol — แดชบอร์ดสองภาษา (อังกฤษ ↔ ไทย)](./docs/demo.gif)

**👆 คลิกป้ายด้านบนเพื่อเปิดเดโมในเบราว์เซอร์ของคุณ — ไม่ต้องติดตั้งอะไรเลย ใช้เวลาเพียง ~3 นาทีจากคลิกถึงแดชบอร์ดที่ใช้งานได้** ไม่ต้องใช้ Docker ไม่ต้องใช้ Git ไม่ต้องติดตั้งเครื่องมือใดๆ บนเครื่องของคุณ ใช้เพียงบัญชี GitHub ฟรีก็พอ

Sila Protocol คือต้นแบบ (proof-of-concept) ที่แสดงให้เห็นว่าการบริจาคให้วัดไทย
สามารถตรวจสอบได้อย่างโปร่งใสบนบล็อกเชน ทุกรายจ่ายจะผ่านสมาร์ทคอนแทรกต์
ที่เป็น "กฎแห่งศีล" ซึ่งจะ **อนุมัติ** หมวดหมู่ที่เป็นบุญ (สาธารณูปโภค โรงพยาบาล
การศึกษา อาหาร) และ **revert (ย้อนกลับ)** หมวดหมู่ที่ไม่เป็นบุญ (เครื่องประดับ
การพนัน แอลกอฮอล์) ผลลัพธ์คือใบเสร็จที่แก้ไขไม่ได้สำหรับทุกบาท

โครงการนี้ Dockerize ทั้งหมดแล้ว — ผู้ตรวจสอบสามารถ clone และรันเดโมได้
**ในคลิกเดียว** โดยไม่ต้องติดตั้งเครื่องมือใดๆ

---

## 🚀 เดโมคลิกเดียว (สำหรับผู้ตรวจสอบ)

มี 3 วิธีให้รันเดโม เลือกที่สะดวกที่สุดสำหรับคุณ

### ง่ายที่สุด — เปิดใน Codespaces (ไม่ต้องติดตั้งอะไรเลย)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Anon5th/Sila?quickstart=1)

คลิกป้ายด้านบน GitHub จะสร้างสภาพแวดล้อมการพัฒนาบนคลาวด์ฟรีในเบราว์เซอร์
ของคุณ build เดโมอัตโนมัติ และเปิดแดชบอร์ดในแท็บใหม่ — **สิ่งที่ต้องการ
มีเพียงบัญชี GitHub ฟรีและเบราว์เซอร์** (Chrome, Edge, Safari, Firefox)
ใช้งานได้ทั้งบน Windows, macOS, Linux และแม้แต่บนแท็บเล็ต

### รันบนเครื่องของคุณเอง (Windows / macOS / Linux)

ถ้าต้องการรันบนเครื่องตัวเอง ติดตั้ง **Docker Desktop** ก่อน จากนั้นดับเบิลคลิก
ตัวเปิด (launcher) สำหรับระบบปฏิบัติการของคุณ

| ระบบปฏิบัติการ                       | วิธีใช้                                                                                                                          |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **Windows 10 / 11**                | ดับเบิลคลิก [`start-windows.bat`](./start-windows.bat)                                                                          |
| **macOS** (Intel + Apple Silicon)  | ดับเบิลคลิก [`start-mac.command`](./start-mac.command) *ครั้งแรก*: คลิกขวา → **Open** เพื่อข้ามคำเตือน Gatekeeper                 |
| **Linux**                          | ในเทอร์มินัล: `./start-linux.sh` (หากจำเป็นให้รัน `chmod +x start-linux.sh` หนึ่งครั้ง)                                          |

**ขั้นตอนการทำงาน:**

1. ตัวเปิดจะเริ่ม Docker Desktop หากยังไม่ได้รัน
2. มันจะ build และรันบริการทั้ง 4 ตัว (build ครั้งแรกใช้เวลา 5–10 นาที ครั้งต่อๆ ไปใช้เวลาไม่กี่วินาที)
3. เมื่อแดชบอร์ดพร้อมใช้งาน เบราว์เซอร์เริ่มต้นจะเปิดที่ **http://localhost:3000**
4. กดปุ่มใดก็ได้ในหน้าต่างตัวเปิดเพื่อ **หยุดทุกอย่างอย่างปลอดภัย**

> ไม่มีข้อมูลออกจากคอมพิวเตอร์ของคุณ ทั้ง "ธนาคาร" บล็อกเชน และเอนจิน
> ทำงานบนเครื่องคุณเองทั้งหมด ไม่มีการเรียก API ภายนอกใดๆ ยกเว้นการดึง
> Docker images ในการรันครั้งแรก

**ยังไม่มี Docker Desktop?** ติดตั้งก่อน:
[Windows / macOS](https://www.docker.com/products/docker-desktop/) ·
[Linux](https://docs.docker.com/engine/install/)

### สิ่งที่คุณจะเห็น

1. **การ์ดตัวนับในส่วนหัว** แสดงจำนวนธุรกรรมที่อนุมัติ (สีเขียว) และถูกระงับ
   (สีแดง) แบบเรียลไทม์ — ตัวเลขสีเขียวอ่านโดยตรงจากตัวแปร `approvedCount()`
   บนบล็อกเชน
2. **แถบฟีเจอร์ 3 การ์ด**: ✓ หมวดหมู่ที่อนุมัติ · 🛡 หลักศีล (The Sila Rule) ·
   ✕ หมวดหมู่ที่ถูกระงับ
3. **ปุ่มลัด 2 กลุ่ม** สำหรับธุรกรรมคลิกเดียว:
   - **เป็นประโยชน์ต่อวัด** (ค่าไฟ บริจาคโรงพยาบาล อุปกรณ์การเรียน ของชำ) — จะถูกอนุมัติ
   - **ต้องห้ามตามกฎ** (Rolex ทอง ชิปคาสิโน ค่าบาร์) — จะถูกระงับ
4. **แผงใบเสร็จล่าสุด** พร้อม tx hash บนบล็อกเชน (หรือเหตุผลที่ revert) และ QR code PromptPay ที่สร้างขึ้น
5. **บัญชีธุรกรรมเรียลไทม์** ด้านล่าง — รายการใหม่จะค่อยๆ ปรากฏแบบ fade in
6. **ปุ่มสลับภาษา EN / TH** ที่มุมขวาบน

### สิ่งที่ลองทำ

- **คลิก "จ่ายค่าไฟฟ้า"** → สีเขียว ✓ APPROVED, tx hash บนบล็อกเชน, หมายเลข block ตัวนับในหัวจะเพิ่มขึ้น
- **คลิก "นาฬิกา Rolex ทองคำ"** → สีแดง ✕ BLOCKED เหตุผล: `SILA_PROTOCOL: NON_MERIT_EXPENDITURE_DETECTED` — สัญญา revert ก่อนเงินจะเคลื่อนย้าย
- **เปิดฟอร์ม "หรือส่งรายการแบบกำหนดเอง"** แล้วลอง MCC `5912` (ร้านขายยา) — ไม่อยู่ในรายการ ก็จะถูกระงับ จากนั้นลอง `5411` (ของชำ) — อนุมัติ
- **สลับเป็นภาษาไทย** ที่มุมขวาบน — UI ทั้งหมดจะแสดงเป็นภาษาไทย (สัญญายังคงพูดภาษาอังกฤษบนสาย ตามการออกแบบ)

### การตรวจสอบแบบ Headless

เมื่อตัวเปิดทำงานแล้ว คุณยังสามารถทดสอบระบบจากเทอร์มินัลได้ด้วย:

```bash
bash scripts/demo.sh
```

มันจะรันธุรกรรมตัวอย่าง 4 รายการแล้วพิมพ์ OK / MISMATCH สำหรับแต่ละรายการ

### การแก้ไขปัญหา

| อาการ                                                                  | วิธีแก้                                                                                                              |
|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| ตัวเปิดปิดทันที                                                          | รันจากเทอร์มินัลเพื่อเห็นข้อผิดพลาด: `cmd /c start-windows.bat` หรือ `./start-mac.command`                          |
| **macOS:** "ไม่สามารถเปิดได้เนื่องจากมาจากนักพัฒนาที่ไม่ระบุตัวตน"           | คลิกขวา `start-mac.command` → **Open** → **Open** (ข้ามครั้งเดียวต่อเครื่อง สำหรับสคริปต์ที่ไม่ได้เซ็น)                  |
| **Windows:** SmartScreen เตือนเรื่อง .bat                              | คลิก **More info** → **Run anyway** (ครั้งเดียวต่อเครื่อง)                                                            |
| Port 3000 ถูกใช้อยู่แล้ว                                                 | หยุดสิ่งที่ใช้ port นั้น หรือแก้ไข `docker-compose.yml` เปลี่ยน `"3000:3000"` เป็น `"3030:3000"` แล้วรันตัวเปิดใหม่         |
| Build ครั้งแรกช้า                                                       | ปกติ — Rust + Hardhat dependencies การรันครั้งต่อๆ ไปจะใช้ image ที่แคชไว้และเริ่มในเวลา ~10 วินาที                       |
| Docker Desktop ไม่เริ่ม (Windows: "stale Unix-socket reparse point")  | รีบูต Windows หากยังไม่หาย → **Docker Desktop → Troubleshoot → Reset to factory defaults**                        |
| Engine logs `contract not found`                                       | Deployer ทำงานไม่เสร็จก่อน engine เริ่ม รัน `docker compose down` แล้วรันตัวเปิดใหม่                                   |

Exit codes จากตัวเปิด: `1` ไม่มี Docker · `2` daemon timeout · `3` build/health failure

---

## เริ่มด้วยคำสั่งเดียว (สำหรับนักพัฒนา)

หากเปิดเทอร์มินัลอยู่แล้ว:

```bash
git clone https://github.com/Anon5th/Sila.git
cd Sila
docker compose up --build
```

จากนั้นเปิด **http://localhost:3000**

Build ครั้งแรกใช้เวลาไม่กี่นาที (Rust compile + npm install) ครั้งต่อๆ ไปเร็ว

หยุด:

```bash
docker compose down -v
```

---

## สถาปัตยกรรม

```
            ┌─────────────────┐
   browser  │   Dashboard UI  │   localhost:3000
  ────────► │  (vanilla JS)   │
            └────────┬────────┘
                     │  POST /api/transaction
                     ▼
            ┌─────────────────┐
            │  Mock Bank API  │   Express + PromptPay QR
            │   (TypeScript)  │   :3000
            └────────┬────────┘
                     │  POST /verify  { mcc, amount, label }
                     ▼
            ┌─────────────────┐
            │ Integrity Engine│   Rust + Axum + Alloy
            │     (Rust)      │   :8080
            └────────┬────────┘
                     │  eth_call / eth_sendTransaction
                     ▼
            ┌─────────────────┐
            │ SilaIntegrityCore│  สมาร์ทคอนแทรกต์ Solidity
            │   on Hardhat    │   :8545 (chainId 31337)
            └─────────────────┘
```

4 container ที่จัดการโดย `docker-compose.yml`:

| บริการ        | บทบาท                                                          | Port |
|---------------|--------------------------------------------------------------|------|
| `hardhat`     | Local EVM node                                               | 8545 |
| `deployer`    | One-shot — deploy สัญญา เขียน ABI + address                  | —    |
| `engine`      | Rust HTTP service ที่คุยกับสมาร์ทคอนแทรกต์                    | 8080 |
| `mock-bank`   | Express service + dashboard UI                               | 3000 |

Deployer เขียน `/contract-out/sila.json` ลง shared volume; engine อ่านมัน
ตอน startup วิธีนี้แยก deploy timing ออกจาก binary ของ engine

---

## หลักศีล (The Sila Rule)

สมาร์ทคอนแทรกต์ `SilaIntegrityCore.sol` มาพร้อม whitelist หมวดหมู่บุญ
(Merchant Category Codes):

| MCC  | หมวดหมู่                  | สถานะ        |
|------|------------------------|--------------|
| 4900 | สาธารณูปโภค             | ✓ อนุมัติ    |
| 8062 | โรงพยาบาล               | ✓ อนุมัติ    |
| 8211 | การศึกษา                | ✓ อนุมัติ    |
| 5411 | ของชำ                  | ✓ อนุมัติ    |
| 8398 | องค์กรการกุศล            | ✓ อนุมัติ    |
| 5944 | เครื่องประดับ            | ✗ ระงับ     |
| 7995 | การพนัน                 | ✗ ระงับ     |
| 5813 | บาร์ / แอลกอฮอล์          | ✗ ระงับ     |

MCC ใดก็ตามที่ไม่อยู่ใน whitelist จะถูก revert ที่อยู่ของผู้ดูแลระบบ
(deployer) สามารถขยาย whitelist ผ่าน `addMerit(uint16, string)`

---

## ทำไมใช้ `revert` แทนการโอน?

`revert` เป็นสัญญาณที่แรงที่สุดเท่าที่จะทำได้: ธุรกรรม *ไม่สามารถ* execute
บนบล็อกเชน ไม่มี race condition ไม่มีบัญชี off-chain ที่ต้อง reconcile
ไม่มีการ "จับได้ภายหลัง" ถ้ากระเป๋าเงินของวัดถูกบังคับให้เรียก
`verifyExpenditure` ก่อนการเบิกจ่าย รายจ่ายที่ไม่เป็นบุญจะเป็นไปไม่ได้
ในเชิงโครงสร้าง

ในการ deploy สำหรับใช้งานจริง สัญญานี้จะ gate vault คลังจริง — การเรียก
expenditure และการเบิกจ่ายจะเป็น atomic ใน transaction เดียว

---

## ข้อสงวนสิทธิ์

- **เพื่อการสาธิตเท่านั้น** ไม่มีเงินจริง "ธนาคาร" เป็นของจำลอง บล็อกเชน
  เป็น Hardhat node ภายในเครื่องที่ reset ทุกครั้งที่รีสตาร์ท
- Engine ใช้ private key ของบัญชีแรกของ Hardhat ที่เป็นที่รู้จักกันดี
  **ห้าม** deploy การตั้งค่าแบบนี้บนเครือข่ายจริงเด็ดขาด
- QR codes PromptPay เป็น EMVCo payload ที่ถูกต้อง แต่ชี้ไปที่หมายเลข
  มือถือปลอม (`0899999999`) จะไม่มีการโอนเงินจริง
- ไม่มี persistence — ประวัติธุรกรรมอยู่ในหน่วยความจำและจะหายไปเมื่อรีสตาร์ท

---

## Roadmap

1. **Sandbox integration** — แทนที่ mock bank ด้วย API ของ Bank of Thailand
   regulatory sandbox เมื่อได้รับ endorsement
2. **Multi-sig administrator** — แทนที่ผู้ดูแลระบบที่เป็นผู้ deploy เพียงคนเดียว
   ด้วย multisig แบบ N-of-M (เจ้าอาวาส + คณะกรรมการฆราวาส + ผู้ตรวจสอบ)
3. **On-chain donor receipts** — mint NFT แบบ soulbound ลงในกระเป๋า
   ของผู้บริจาคเมื่อ expenditure ที่อนุมัติเกิดขึ้น เพื่อใช้เป็นหลักฐานลดหย่อนภาษี
4. **Per-temple sub-contracts** — pattern แบบ factory ให้แต่ละวัดมี rule
   engine ของตัวเองที่แยกกัน แต่ใช้เส้นทาง upgrade protocol ร่วมกัน
5. **THB stablecoin** — integrate กับ stablecoin ที่หนุนด้วย THB
   ที่ได้รับใบอนุญาตเมื่อมี one ใน Thai sandbox

---

## โครงสร้างของ repository

```
.
├── docker-compose.yml
├── README.md / README.th.md
├── contracts/                     โครงการ Hardhat (Solidity 0.8.20)
│   ├── contracts/SilaIntegrityCore.sol
│   ├── scripts/deploy.ts
│   └── hardhat.config.ts
├── engine/                        Rust Integrity Engine
│   ├── src/main.rs
│   ├── src/contract.rs            Alloy `sol!` bindings
│   ├── src/handlers.rs            Axum routes
│   └── src/state.rs
├── mock-bank/                     TypeScript Express + dashboard
│   ├── src/index.ts
│   ├── public/index.html
│   ├── public/styles.css
│   └── public/app.js
└── scripts/demo.sh                curl-based demo flow
```

---

## License

MIT — สำหรับการตรวจสอบและการใช้งาน pilot ดู `LICENSE` (TODO)
