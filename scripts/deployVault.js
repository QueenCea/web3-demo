const hre = require("hardhat");

async function main() {
  console.log("🏦 开始部署 TokenVault...");

  const Vault = await hre.ethers.getContractFactory("TokenVault");
  const vault = await Vault.deploy();
  await vault.waitForDeployment();

  const address = await vault.getAddress();
  const owner = await vault.owner();
  const network = await hre.ethers.provider.getNetwork();

  console.log("✅ TokenVault 部署成功!");
  console.log("📍 合约地址:", address);
  console.log("👤 所有者:", owner);
  console.log("🌐 网络:", network.name);
  console.log("🆔 链ID:", network.chainId.toString());

  console.log("\n📌 使用说明:");
  console.log("1. 用户调用 deposit(token, amount) 前，先让 ERC20 approve 给金库地址");
  console.log("2. 金库内部的转账使用 transfer(token, to, amount)");
  console.log("3. withdraw(token, amount) 可取回自己的余额");
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ 部署失败:", error);
      process.exit(1);
    });
}

module.exports = main;

