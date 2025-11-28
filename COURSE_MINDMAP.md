# 📚 Dapp开发全流程实战 - 7天课程思维导图

---

## 🗺️ 思维导图结构

```
                    ┌─────────────────────────────────────────┐
                    │                                         │
                    │        中心主题                          │
                    │   从Web2到Web3，7天精通Dapp开发          │
                    │                                         │
                    └─────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┬───────────────┐
                    │               │               │               │
            ┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
            │              │ │              │ │              │ │              │
            │  基础理解     │ │  开发环境     │ │  核心技能     │ │  进阶实战     │
            │  (第1-2天)    │ │  (第3天)      │ │  (第4-5天)    │ │  (第6-7天)    │
            │              │ │              │ │              │ │              │
            └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
                   │                │                │                │
        ┌──────────┼──────────┐    │    ┌──────────┼──────────┐    │
        │          │          │    │    │          │          │    │
    ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ │ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ │
    │       │ │       │ │       │ │ │       │ │       │ │       │ │
    │子主题1│ │子主题2│ │子主题3│ │ │子主题1│ │子主题2│ │子主题3│ │
    │       │ │       │ │       │ │ │       │ │       │ │       │ │
    └───────┘ └───────┘ └───────┘ │ └───────┘ └───────┘ └───────┘ │
                                  │                                │
                          ┌───────┼───────┐              ┌────────┼────────┐
                          │       │       │              │        │        │
                      ┌───▼───┐ ┌─▼───┐ ┌─▼───┐      ┌───▼───┐ ┌─▼───┐ ┌─▼───┐
                      │       │ │     │ │     │      │       │ │     │ │     │
                      │子主题1│ │子主题│ │子主题│      │子主题1│ │子主题│ │子主题│
                      │       │ │  2  │ │  3  │      │       │ │  2  │ │  3  │
                      └───────┘ └─────┘ └─────┘      └───────┘ └─────┘ └─────┘
```

---

## 📊 详细思维导图

### 中心主题
**从Web2到Web3，7天精通Dapp开发**

---

### 分支主题一：基础理解（第1-2天）

#### 子主题1：架构革命（第一天）
- **Web2架构**
  - 浏览器 → Web服务器（前端+后端）→ 中心化数据库
  - 数据由公司或组织控制
  - 权限集中
- **Web3架构**
  - 浏览器 + 钱包 → 前端 → 提供商节点 → 智能合约 → 区块链
  - 数据公开透明
  - 逻辑由代码（合约）控制
  - 用户掌握资产
- **核心概念**
  - 钱包（MetaMask）：用户的身份和保险库（私钥管理）
  - 区块链：分布式、不可篡改的公共数据库（账本）
  - 智能合约：部署在链上的、自动执行的程序逻辑
  - 提供商/RPC节点：连接前端与区块链网络的"网关"
  - 链上交易：任何修改链上数据的操作（如转账、调用合约函数）
  - Gas费：支付给网络验证者以执行交易的计算费用

#### 子主题2：初识Dapp（第二天）
- **完整应用演示**
  - 简单存款Dapp
  - 查询余额功能
  - 提现功能
- **交互体验流程**
  - 用户通过前端界面连接钱包
  - 发起一笔交易（如存款），观察MetaMask弹窗提示（Gas费、签名）
  - 交易上链后，在前端查看状态更新
- **链上交易理解**
  - "交互"的本质：前端通过钱包向区块链发送了一笔签名的交易
  - 如何理解一笔链上交易：交易哈希、区块确认、成功/失败状态

---

### 分支主题二：开发环境（第3天）

#### 子主题1：环境搭建
- **IDE选择**
  - Remix：在线快速验证合约
  - VS Code / Cursor：本地项目开发（推荐）
- **开发框架**
  - Hardhat：用于编译、测试、部署合约
- **核心库**
  - OpenZeppelin Contracts：安全合约库
  - web3.js / ethers.js：前端交互库
- **工具**
  - MetaMask：测试钱包（浏览器扩展）

#### 子主题2：项目源码结构
- **合约目录（/contracts）**
  - Solidity智能合约代码
- **测试脚本（/test）**
  - 用JavaScript或Solidity编写合约测试用例
- **部署脚本（/scripts）**
  - 用于将合约部署到区块链的脚本
- **前端代码（/frontend）**
  - HTML, CSS, JavaScript

---

### 分支主题三：核心技能（第4-5天）

#### 子主题1：深入交互（第四天）
- **前端如何接入钱包**
  - 使用window.ethereum API检测钱包
  - 请求账户授权，获取用户地址
- **合约基础语法速览**
  - 状态变量
  - 函数
  - 事件
  - 修饰符
- **前端与合约交互的核心：ABI**
  - ABI是什么：合约接口的JSON描述，告诉前端如何调用合约函数
  - 如何调用ABI：使用web3.js/ethers.js，通过ABI和合约地址创建合约实例，然后调用其函数
    - `contract.methods.myFunction().call()` （只读，不消耗Gas）
    - `contract.methods.myFunction().send()` （写操作，需Gas和签名）

#### 子主题2：发行资产（第五天）
- **ERC20代币标准详解**
  - 为什么需要标准？确保互通性
  - 核心接口：totalSupply, balanceOf, transfer, approve, allowance等
- **编写代币合约**
  - 继承OpenZeppelin的ERC20合约，快速实现
  - 在构造函数中初始化代币名称、符号和总供应量
- **部署与验证**
  - 将代币合约部署到测试网（如Sepolia）
  - 在MetaMask中"导入代币"，通过合约地址添加自定义代币

---

### 分支主题四：进阶实战（第6-7天）

#### 子主题1：扩展功能（第六天）
- **编写业务合约（如：代币金库）**
  - 充值：用户先将代币授权给业务合约，然后业务合约将代币从用户账户转到合约地址
  - 查询余额：在合约中通过mapping记录每个用户的存款余额
  - 提现：用户从业务合约中取回自己的代币
  - 转账：实现用户间在业务合约内的代币划转
- **核心安全要点**
  - 重入攻击防护
  - 使用SafeMath或Solidity 0.8+的内置溢出检查

#### 子主题2：项目集成（第七天）
- **扩展项目功能演示**
  - 集成第五、六天的代币和业务合约，进行完整流程演示
- **深入链上交易细节**
  - 分析一笔复杂的合约交互交易在区块浏览器（Etherscan）上的详情
- **引出新话题：真实的链上代币兑换**
  - 问题：如何在不依赖中心化交易所的情况下兑换代币？
  - 答案：去中心化交易所（DEX），如Uniswap
  - 核心概念：
    - 资金池：用户存入代币形成的流动性池，是兑换的价格基础
    - 自动做市商（AMM）模型：通过数学公式x * y = k自动计算价格
    - Uniswap V2：最经典的DEX协议之一，理解其路由和配对合约的作用

---

## 📖 详细课程大纲

### 第一天：架构革命：从Web2到Web3

#### 🎯 核心目标
对比Web2与Web3架构，理解去中心化的本质

#### 📊 Web2架构（传统中心化）

```
浏览器 → Web服务器（前端+后端）→ 中心化数据库
```

**特点：**
- 数据由公司或组织控制
- 权限集中
- 单点故障风险

#### 🌐 Web3架构（去中心化）

```
浏览器 + 钱包 → 前端 → 提供商节点 → 智能合约 → 区块链
```

**特点：**
- 数据公开透明
- 逻辑由代码（合约）控制
- 用户掌握资产
- 去中心化存储

#### 🔑 核心概念详解

| 概念 | 说明 | 作用 |
|------|------|------|
| **钱包（MetaMask）** | 用户的身份和保险库 | 私钥管理、交易签名 |
| **区块链** | 分布式、不可篡改的公共数据库 | 账本记录、数据存储 |
| **智能合约** | 部署在链上的自动执行程序 | 业务逻辑、规则执行 |
| **提供商/RPC节点** | 连接前端与区块链的网关 | 网络通信、数据查询 |
| **链上交易** | 修改链上数据的操作 | 转账、调用合约函数 |
| **Gas费** | 支付给验证者的计算费用 | 激励网络维护 |

---

### 第二天：初识Dapp：完整应用演示与交互体验

#### 🎯 核心目标
获得对Dapp的直观感受，理解交互流程

#### 🎬 演示项目
- **简单存款Dapp**
  - 存款功能
  - 查询余额
  - 提现功能

#### 🔄 完整交互流程

1. **连接钱包**
   - 用户通过前端界面连接MetaMask
   - 授权账户访问

2. **发起交易**
   - 点击操作按钮（如"存款"）
   - MetaMask弹窗提示：
     - 交易详情
     - Gas费估算
     - 签名确认

3. **交易上链**
   - 等待区块确认
   - 前端状态自动更新
   - 显示交易哈希

#### 💡 核心理解

**"交互"的本质：**
- 前端通过钱包向区块链发送签名的交易
- 交易包含：函数调用、参数、Gas限制、Gas价格

**链上交易组成：**
- 交易哈希（唯一标识）
- 区块确认（网络共识）
- 成功/失败状态（执行结果）

---

### 第三天：揭秘开发：环境搭建与项目源码解析

#### 🛠️ 开发环境准备

##### IDE选择
- **Remix**：在线快速验证合约
- **VS Code / Cursor**：本地项目开发（推荐）

##### 开发框架
- **Hardhat**：编译、测试、部署合约
  ```bash
  npm install --save-dev hardhat
  npx hardhat init
  ```

##### 核心库
- **OpenZeppelin Contracts**：安全合约库
  ```bash
  npm install @openzeppelin/contracts
  ```
- **web3.js / ethers.js**：前端交互库
  ```bash
  npm install ethers
  ```

##### 工具
- **MetaMask**：测试钱包（浏览器扩展）

#### 📁 项目源码结构

```
web3-demo/
├── contracts/          # 智能合约目录
│   └── Counter.sol     # Solidity合约代码
├── test/              # 测试脚本目录
│   └── Counter.test.js # JavaScript测试用例
├── scripts/            # 部署脚本目录
│   └── deploy.js      # 合约部署脚本
├── frontend/          # 前端代码目录
│   ├── index.html     # HTML页面
│   ├── app.js         # JavaScript逻辑
│   └── style.css      # 样式文件
├── hardhat.config.js  # Hardhat配置文件
└── package.json       # 项目依赖配置
```

#### 📝 各目录作用

| 目录 | 作用 | 示例 |
|------|------|------|
| `/contracts` | 存放Solidity智能合约 | `Counter.sol`, `Token.sol` |
| `/test` | 合约测试用例 | 单元测试、集成测试 |
| `/scripts` | 部署和工具脚本 | `deploy.js`, `verify.js` |
| `/frontend` | 前端应用代码 | HTML, CSS, JavaScript |

---

### 第四天：深入交互：前端与合约的通信原理

#### 🔌 前端如何接入钱包

##### 检测钱包
```javascript
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask已安装');
} else {
  console.log('请安装MetaMask');
}
```

##### 请求账户授权
```javascript
const accounts = await window.ethereum.request({
  method: 'eth_requestAccounts'
});
const userAddress = accounts[0];
```

##### 获取用户地址
```javascript
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const address = await signer.getAddress();
```

#### 📘 合约基础语法速览

##### 状态变量
```solidity
uint256 public count;  // 公开的状态变量
address private owner; // 私有变量
```

##### 函数
```solidity
function increment() public {
    count++;
}
```

##### 事件
```solidity
event CountChanged(uint256 newCount, address changedBy);

function increment() public {
    count++;
    emit CountChanged(count, msg.sender);
}
```

##### 修饰符
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

#### 🔗 前端与合约交互的核心：ABI

##### ABI是什么？
- **Application Binary Interface**（应用二进制接口）
- JSON格式的合约接口描述
- 告诉前端如何调用合约函数

##### ABI示例
```json
[
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]
```

##### 如何使用ABI调用合约

**只读操作（call，不消耗Gas）：**
```javascript
const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider
);
const count = await contract.getCount();
```

**写操作（send，需Gas和签名）：**
```javascript
const contract = new ethers.Contract(
  contractAddress,
  abi,
  signer
);
const tx = await contract.increment();
await tx.wait(); // 等待交易确认
```

---

### 第五天：发行资产：创建自己的ERC20代币

#### 📜 ERC20代币标准详解

##### 为什么需要标准？
- **互通性**：确保所有代币遵循相同接口
- **兼容性**：钱包、交易所可以统一处理
- **可组合性**：DeFi协议可以集成任意ERC20代币

##### 核心接口

| 函数 | 说明 | 类型 |
|------|------|------|
| `totalSupply()` | 总供应量 | view |
| `balanceOf(address)` | 查询余额 | view |
| `transfer(address, uint256)` | 转账 | 交易 |
| `approve(address, uint256)` | 授权 | 交易 |
| `allowance(address, address)` | 查询授权额度 | view |
| `transferFrom(address, address, uint256)` | 代理转账 | 交易 |

#### 💻 编写代币合约

##### 使用OpenZeppelin快速实现
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, totalSupply * 10**decimals());
    }
}
```

##### 构造函数参数
- **name**：代币名称（如 "My Token"）
- **symbol**：代币符号（如 "MTK"）
- **totalSupply**：总供应量（如 1000000）

#### 🚀 部署与验证

##### 部署到测试网（Sepolia）
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

##### 在MetaMask中导入代币
1. 打开MetaMask
2. 点击"导入代币"
3. 输入合约地址
4. 自动识别代币符号和精度
5. 添加到钱包

---

### 第六天：扩展功能：实现代币业务逻辑

#### 🏦 编写业务合约（代币金库）

##### 功能设计

| 功能 | 实现方式 | 关键点 |
|------|----------|--------|
| **充值** | 1. 用户授权代币给合约<br>2. 合约从用户账户转代币到合约地址 | 需要先approve |
| **查询余额** | 使用mapping记录每个用户的存款 | `mapping(address => uint256) deposits` |
| **提现** | 用户从合约中取回自己的代币 | 检查余额，防止溢出 |
| **转账** | 用户间在合约内的代币划转 | 更新双方的mapping |

##### 合约示例结构
```solidity
contract TokenVault {
    IERC20 public token;
    mapping(address => uint256) public deposits;
    
    function deposit(uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
    }
    
    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;
        token.transfer(msg.sender, amount);
    }
}
```

#### 🔒 核心安全要点

##### 1. 重入攻击防护
```solidity
// ❌ 危险：先转账后更新状态
function withdraw(uint256 amount) external {
    token.transfer(msg.sender, amount);
    deposits[msg.sender] -= amount; // 可能被重入攻击
}

// ✅ 安全：先更新状态后转账（Checks-Effects-Interactions模式）
function withdraw(uint256 amount) external {
    require(deposits[msg.sender] >= amount, "Insufficient balance");
    deposits[msg.sender] -= amount; // 先更新状态
    token.transfer(msg.sender, amount); // 后转账
}
```

##### 2. 溢出检查
- **Solidity 0.8+**：内置溢出检查（推荐）
- **SafeMath库**：0.7及以下版本使用

```solidity
// Solidity 0.8+ 自动检查溢出
deposits[msg.sender] += amount; // 溢出会自动revert
```

##### 3. 访问控制
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
}
```

---

### 第七天：项目集成与DeFi入门

#### 🎯 扩展项目功能演示

##### 完整流程集成
1. **部署代币合约** → 获得代币地址
2. **部署业务合约** → 传入代币地址
3. **前端集成** → 连接两个合约
4. **完整流程测试**：
   - 用户授权代币
   - 充值到业务合约
   - 查询余额
   - 提现代币
   - 用户间转账

#### 🔍 深入链上交易细节

##### 区块浏览器分析（Etherscan）
访问交易哈希，查看：
- **交易状态**：成功/失败
- **Gas使用量**：实际消耗的Gas
- **Gas价格**：Gwei单位
- **交易费用**：Gas使用量 × Gas价格
- **函数调用**：调用的合约函数和参数
- **事件日志**：合约emit的事件
- **内部交易**：合约间的调用关系

#### 🌊 引出新话题：真实的链上代币兑换

##### 问题
如何在不依赖中心化交易所的情况下兑换代币？

##### 答案：去中心化交易所（DEX）

##### 核心概念

| 概念 | 说明 | 示例 |
|------|------|------|
| **资金池** | 用户存入代币形成的流动性池 | ETH/USDT池 |
| **自动做市商（AMM）** | 通过数学公式自动计算价格 | x × y = k |
| **流动性提供者（LP）** | 向池子提供代币的用户 | 获得交易手续费分成 |
| **滑点** | 大额交易导致的价格偏差 | 1%滑点保护 |

##### Uniswap V2架构

```
用户 → 前端 → Router合约 → Pair合约 → 资金池
```

**核心合约：**
- **Router**：路由合约，处理交易路径
- **Pair**：配对合约，管理两个代币的流动性池
- **Factory**：工厂合约，创建新的交易对

##### AMM价格公式：x × y = k

- **x**：池中代币A的数量
- **y**：池中代币B的数量
- **k**：恒定乘积（不变）

**价格计算：**
```
用1个ETH换USDT：
- 池子：100 ETH × 300,000 USDT = 30,000,000 (k)
- 买入1 ETH后：99 ETH × ? USDT = 30,000,000
- 新USDT数量 = 30,000,000 / 99 ≈ 303,030
- 获得USDT = 303,030 - 300,000 = 3,030 USDT
```

---

## 🎓 学习路径总结

### 知识递进关系

```
架构理解 → 直观体验 → 环境搭建 → 交互原理 
    ↓
代币发行 → 业务逻辑 → 项目集成 → DeFi入门
```

### 技能树

```
Dapp开发技能树
├── 基础理解
│   ├── Web2 vs Web3架构
│   ├── 区块链基础概念
│   └── 钱包与交易
├── 开发技能
│   ├── Solidity语法
│   ├── Hardhat框架
│   ├── 前端交互（ethers.js）
│   └── 测试与部署
├── 实战项目
│   ├── ERC20代币
│   ├── 业务合约开发
│   └── 安全最佳实践
└── 进阶方向
    ├── DeFi协议理解
    ├── DEX机制
    └── 流动性池概念
```

---

## 📚 推荐资源

### 官方文档
- [Solidity官方文档](https://docs.soliditylang.org/)
- [Hardhat文档](https://hardhat.org/docs)
- [ethers.js文档](https://docs.ethers.io/)
- [OpenZeppelin文档](https://docs.openzeppelin.com/)

### 学习平台
- [Remix IDE](https://remix.ethereum.org/) - 在线合约开发
- [Etherscan](https://etherscan.io/) - 区块浏览器
- [Uniswap文档](https://docs.uniswap.org/) - DEX协议文档

### 测试网络
- **Sepolia测试网**：获取测试ETH
- **Arbitrum Sepolia**：Layer2测试网

---

## ✅ 课程检查清单

### 第一天
- [ ] 理解Web2与Web3架构差异
- [ ] 掌握核心概念（钱包、区块链、智能合约等）

### 第二天
- [ ] 完成Dapp交互体验
- [ ] 理解链上交易流程

### 第三天
- [ ] 搭建完整开发环境
- [ ] 熟悉项目结构

### 第四天
- [ ] 掌握前端钱包接入
- [ ] 理解ABI和合约调用

### 第五天
- [ ] 成功部署ERC20代币
- [ ] 在MetaMask中导入代币

### 第六天
- [ ] 实现完整的业务合约
- [ ] 理解安全要点

### 第七天
- [ ] 完成项目集成
- [ ] 理解DeFi和DEX基础概念

---

**🎉 恭喜完成7天Dapp开发课程！现在你已经具备了从零到一构建完整Dapp的能力！**

---

*最后更新：2024年*

