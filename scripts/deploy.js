const hre = require("hardhat");

async function main() {
  console.log("开始部署 Counter 合约...");

  // 获取合约工厂
  const Counter = await hre.ethers.getContractFactory("Counter");

  // 部署合约
  console.log("正在部署合约...");
  const counter = await Counter.deploy();

  // 等待部署完成 (ethers v6语法)
  await counter.waitForDeployment();

  console.log("✅ Counter 合约部署成功!");
  console.log("📍 合约地址:", await counter.getAddress());
  console.log("🏗️  部署者地址:", await counter.owner());
  
  // 获取当前网络信息 (ethers v6语法)
  const network = await hre.ethers.provider.getNetwork();
  console.log("🌐 网络:", network.name);
  console.log("🆔 链ID:", network.chainId.toString());

  // 验证合约初始状态
  const initialCount = await counter.getCount();
  console.log("🔢 初始计数值:", initialCount.toString());

  console.log("\n📝 使用说明:");
  console.log("1. 将合约地址复制到前端 app.js 文件中的 CONTRACT_ADDRESS 变量");
  console.log("2. 或者在浏览器控制台中运行: setContractAddress('" + counter.address + "')");
  console.log("3. 确保你的 MetaMask 连接到相同的网络");
  
  return counter.address;
}

// 如果直接运行此脚本，则执行部署
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ 部署失败:", error);
      process.exit(1);
    });
}

module.exports = main;
