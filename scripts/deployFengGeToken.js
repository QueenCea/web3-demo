const hre = require("hardhat");

async function main() {
  console.log("🚀 开始部署 FengGeToken (ERC20)...");

  // 代币参数（可按需修改或换成环境变量）
  const initialSupply = hre.ethers.parseUnits("1000000", 18); // 100万 FENG
  const cap = hre.ethers.parseUnits("10000000", 18); // 上限 1000 万 FENG

  console.log("🔧 初始化合约工厂...");
  const FengGeToken = await hre.ethers.getContractFactory("FengGeToken");

  console.log("📦 正在部署 FengGeToken...");
  const token = await FengGeToken.deploy(initialSupply, cap);
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  const owner = await token.owner();
  const network = await hre.ethers.provider.getNetwork();

  console.log("✅ FengGeToken 部署成功!");
  console.log("📍 合约地址:", tokenAddress);
  console.log("👤 所有者地址:", owner);
  console.log("🌐 网络:", network.name);
  console.log("🆔 链ID:", network.chainId.toString());
  console.log("🔢 初始供应量:", (await token.totalSupply()).toString());
  console.log("🎯 供应上限:", cap.toString());

  console.log("\n📌 使用提示:");
  console.log("1. 在前端或脚本中引用上面的合约地址与 ABI 进行交互");
  console.log("2. 需要更多测试代币可使用 mint (仅所有者) 或留言获取");
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

