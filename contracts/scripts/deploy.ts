import { ethers, artifacts } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("[deploy] Deploying SilaIntegrityCore...");

  const Factory = await ethers.getContractFactory("SilaIntegrityCore");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  const artifact = await artifacts.readArtifact("SilaIntegrityCore");

  const out = {
    address,
    abi: artifact.abi,
    deployedAt: new Date().toISOString(),
    chainId: 31337,
  };

  const outDir = process.env.CONTRACT_OUT_DIR || "/contract-out";
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "sila.json");
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2));

  console.log(`[deploy] SilaIntegrityCore deployed at ${address}`);
  console.log(`[deploy] Wrote ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
