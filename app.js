// 合约ABI - 这个需要从编译后的合约中获取
const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "changedBy",
                "type": "address"
            }
        ],
        "name": "CountChanged",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "decrement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reset",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "setCount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const TOKEN_VAULT_ABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const ERC20_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// 合约地址 - 部署后需要更新这个地址
let CONTRACT_ADDRESS = "0xB3A7Afd9b3aaF13eba67dEb620961fa4aEbD5c2b"; // 已部署的计数器合约地址
let TOKEN_VAULT_ADDRESS = "0x0eFa0bA145F17BB3654E1Cb0aDb0d64011e31BDa"; // 金库合约地址，部署后更新

// 全局变量
let provider;
let signer;
let contract;
let vaultContract;
let userAddress;
const tokenDecimalsCache = {};

// DOM 元素
const connectWalletBtn = document.getElementById('connectWallet');
const disconnectWalletBtn = document.getElementById('disconnectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddressSpan = document.getElementById('walletAddress');
const networkNameSpan = document.getElementById('networkName');
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');
const refreshBtn = document.getElementById('refreshBtn');
const setCountInput = document.getElementById('setCountInput');
const setCountBtn = document.getElementById('setCountBtn');
const statusDiv = document.getElementById('status');
const contractAddressSpan = document.getElementById('contractAddress');
const tokenVaultAddressSpan = document.getElementById('tokenVaultAddress');
const tokenAddressInput = document.getElementById('tokenAddressInput');
const vaultAmountInput = document.getElementById('vaultAmountInput');
const vaultTransferAmountInput = document.getElementById('vaultTransferAmountInput');
const vaultRecipientInput = document.getElementById('vaultRecipientInput');
const depositBtn = document.getElementById('depositBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const transferBtn = document.getElementById('transferBtn');
const refreshVaultBtn = document.getElementById('refreshVaultBtn');
const vaultBalanceSpan = document.getElementById('vaultBalance');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经连接钱包
    checkWalletConnection();
    
    // 绑定事件监听器
    connectWalletBtn.addEventListener('click', connectWallet);
    disconnectWalletBtn.addEventListener('click', disconnectWallet);
    incrementBtn.addEventListener('click', incrementCounter);
    decrementBtn.addEventListener('click', decrementCounter);
    resetBtn.addEventListener('click', resetCounter);
    refreshBtn.addEventListener('click', refreshCount);
    setCountBtn.addEventListener('click', setCounter);
    depositBtn.addEventListener('click', depositToVault);
    withdrawBtn.addEventListener('click', withdrawFromVault);
    transferBtn.addEventListener('click', transferWithinVault);
    refreshVaultBtn.addEventListener('click', refreshVaultBalance);
    
    // 如果有合约地址，更新显示
    if (CONTRACT_ADDRESS) {
        contractAddressSpan.textContent = CONTRACT_ADDRESS;
    }
    
    if (TOKEN_VAULT_ADDRESS) {
        tokenVaultAddressSpan.textContent = TOKEN_VAULT_ADDRESS;
    }
});

// 检查钱包连接状态
async function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await initializeWeb3();
            }
        } catch (error) {
            console.error('检查钱包连接时出错:', error);
        }
    }
}

// 连接钱包
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        showStatus('请安装 MetaMask 钱包!', 'error');
        return;
    }

    try {
        showStatus('正在连接钱包...', 'warning');
        
        // 请求连接钱包
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        await initializeWeb3();
        
        showStatus('钱包连接成功!', 'success');
    } catch (error) {
        console.error('连接钱包失败:', error);
        showStatus('连接钱包失败: ' + error.message, 'error');
    }
}

// 初始化Web3
async function initializeWeb3() {
    try {
        // 创建provider和signer (ethers v6语法)
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        userAddress = await signer.getAddress();
        
        // 获取网络信息
        const network = await provider.getNetwork();
        
        // 更新UI
        updateWalletInfo(userAddress, network.name);
        
        // 如果有合约地址，初始化合约
        if (CONTRACT_ADDRESS) {
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            enableButtons();
            await refreshCount();
            
            // 监听合约事件
            listenToContractEvents();
        } else {
            showStatus('请先设置合约地址', 'warning');
        }

        if (TOKEN_VAULT_ADDRESS) {
            vaultContract = new ethers.Contract(TOKEN_VAULT_ADDRESS, TOKEN_VAULT_ABI, signer);
            tokenVaultAddressSpan.textContent = TOKEN_VAULT_ADDRESS;
            setVaultControlsEnabled(true);
        } else {
            setVaultControlsEnabled(false);
        }
        
        // 监听账户变化
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
    } catch (error) {
        console.error('初始化Web3失败:', error);
        showStatus('初始化Web3失败: ' + error.message, 'error');
    }
}

// 更新钱包信息显示
function updateWalletInfo(address, networkName) {
    walletAddressSpan.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
    networkNameSpan.textContent = networkName || '未知';
    walletInfo.classList.remove('hidden');
    connectWalletBtn.textContent = '✅ 钱包已连接';
    connectWalletBtn.disabled = true;
    disconnectWalletBtn.classList.remove('hidden');
    disconnectWalletBtn.disabled = false;
}

// 启用按钮
function enableButtons() {
    incrementBtn.disabled = false;
    decrementBtn.disabled = false;
    resetBtn.disabled = false;
    refreshBtn.disabled = false;
    setCountInput.disabled = false;
    setCountBtn.disabled = false;
    setVaultControlsEnabled(!!vaultContract);
}

// 禁用按钮
function disableButtons() {
    incrementBtn.disabled = true;
    decrementBtn.disabled = true;
    resetBtn.disabled = true;
    refreshBtn.disabled = true;
    setCountInput.disabled = true;
    setCountBtn.disabled = true;
    setVaultControlsEnabled(false);
}

// 断开钱包连接
function disconnectWallet() {
    if (contract && contract.removeAllListeners) {
        contract.removeAllListeners();
    }

    if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
    }

    provider = null;
    signer = null;
    contract = null;
    vaultContract = null;
    userAddress = null;

    walletInfo.classList.add('hidden');
    connectWalletBtn.textContent = '🦊 连接 MetaMask 钱包';
    connectWalletBtn.disabled = false;
    disconnectWalletBtn.classList.add('hidden');

    disableButtons();
    counterValue.textContent = '-';
    vaultBalanceSpan.textContent = '-';
    showStatus('钱包已断开连接', 'warning');
}

// 增加计数
async function incrementCounter() {
    if (!contract) return;
    
    try {
        showStatus('正在增加计数...', 'warning');
        
        const tx = await contract.increment();
        showStatus('交易已发送，等待确认...', 'warning');
        
        await tx.wait();
        showStatus('计数增加成功!', 'success');
        
        await refreshCount();
    } catch (error) {
        console.error('增加计数失败:', error);
        showStatus('增加计数失败: ' + error.message, 'error');
    }
}

// 减少计数
async function decrementCounter() {
    if (!contract) return;
    
    try {
        showStatus('正在减少计数...', 'warning');
        
        const tx = await contract.decrement();
        showStatus('交易已发送，等待确认...', 'warning');
        
        await tx.wait();
        showStatus('计数减少成功!', 'success');
        
        await refreshCount();
    } catch (error) {
        console.error('减少计数失败:', error);
        showStatus('减少计数失败: ' + error.message, 'error');
    }
}

// 重置计数
async function resetCounter() {
    if (!contract) return;
    
    try {
        showStatus('正在重置计数...', 'warning');
        
        const tx = await contract.reset();
        showStatus('交易已发送，等待确认...', 'warning');
        
        await tx.wait();
        showStatus('计数重置成功!', 'success');
        
        await refreshCount();
    } catch (error) {
        console.error('重置计数失败:', error);
        showStatus('重置计数失败: ' + error.message, 'error');
    }
}

// 设置计数
async function setCounter() {
    if (!contract) return;
    
    const newCount = setCountInput.value;
    if (!newCount || newCount < 0) {
        showStatus('请输入有效的计数值', 'error');
        return;
    }
    
    try {
        showStatus('正在设置计数...', 'warning');
        
        const tx = await contract.setCount(newCount);
        showStatus('交易已发送，等待确认...', 'warning');
        
        await tx.wait();
        showStatus('计数设置成功!', 'success');
        
        setCountInput.value = '';
        await refreshCount();
    } catch (error) {
        console.error('设置计数失败:', error);
        showStatus('设置计数失败: ' + error.message, 'error');
    }
}

// 刷新计数显示
async function refreshCount() {
    if (!contract) return;
    
    try {
        const count = await contract.getCount();
        counterValue.textContent = count.toString();
    } catch (error) {
        console.error('获取计数失败:', error);
        showStatus('获取计数失败: ' + error.message, 'error');
    }
}

// 监听合约事件
function listenToContractEvents() {
    if (!contract) return;
    
    contract.on('CountChanged', (newCount, changedBy) => {
        console.log('计数已改变:', newCount.toString(), '改变者:', changedBy);
        counterValue.textContent = newCount.toString();
        
        if (changedBy.toLowerCase() === userAddress.toLowerCase()) {
            showStatus('你的操作已确认!', 'success');
        } else {
            showStatus('计数被其他用户更改', 'warning');
        }
    });
}

// 显示状态消息
function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.classList.remove('hidden');
    
    // 3秒后自动隐藏成功消息
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 3000);
    }
}

// 处理账户变化
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // 用户断开了钱包连接
        walletInfo.classList.add('hidden');
        connectWalletBtn.textContent = '🦊 连接 MetaMask 钱包';
        connectWalletBtn.disabled = false;
        disconnectWalletBtn.classList.add('hidden');
        disableButtons();
        counterValue.textContent = '-';
        showStatus('钱包已断开连接', 'warning');
    } else {
        // 用户切换了账户
        initializeWeb3();
    }
}

// 处理网络变化
function handleChainChanged(chainId) {
    // 网络变化时重新加载页面
    window.location.reload();
}

// 设置合约地址的函数（用于动态设置）
function setContractAddress(address) {
    CONTRACT_ADDRESS = address;
    contractAddressSpan.textContent = address;
    
    if (signer) {
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        enableButtons();
        refreshCount();
        listenToContractEvents();
        showStatus('合约已连接!', 'success');
    }
}

function setVaultAddress(address) {
    TOKEN_VAULT_ADDRESS = address;
    tokenVaultAddressSpan.textContent = address || '请先部署金库合约';

    if (signer && address) {
        vaultContract = new ethers.Contract(TOKEN_VAULT_ADDRESS, TOKEN_VAULT_ABI, signer);
        setVaultControlsEnabled(true);
        showStatus('金库合约已连接!', 'success');
    } else {
        vaultContract = null;
        setVaultControlsEnabled(false);
    }
}

function setVaultControlsEnabled(enabled) {
    const inputs = [
        tokenAddressInput,
        vaultAmountInput,
        vaultTransferAmountInput,
        vaultRecipientInput
    ];
    const buttons = [
        depositBtn,
        withdrawBtn,
        transferBtn,
        refreshVaultBtn
    ];

    inputs.forEach(input => {
        if (input) {
            input.disabled = !enabled;
            if (!enabled) {
                input.value = '';
            }
        }
    });

    buttons.forEach(btn => {
        if (btn) {
            btn.disabled = !enabled;
        }
    });

    if (!enabled && vaultBalanceSpan) {
        vaultBalanceSpan.textContent = '-';
    }
}

function validateAddress(address) {
    return typeof address === 'string' && ethers.isAddress(address);
}

async function depositToVault() {
    if (!await ensureVaultReady()) return;

    const tokenAddress = tokenAddressInput.value.trim();
    const amount = vaultAmountInput.value.trim();

    if (!validateAddress(tokenAddress)) {
        showStatus('请输入有效的代币地址', 'error');
        return;
    }

    if (!amount || Number(amount) <= 0) {
        showStatus('请输入有效的充值数量', 'error');
        return;
    }

    try {
        const { tokenContract, decimals } = await getTokenContract(tokenAddress);
        const parsedAmount = ethers.parseUnits(amount, decimals);
        const allowance = await tokenContract.allowance(userAddress, TOKEN_VAULT_ADDRESS);

        if (allowance < parsedAmount) {
            showStatus('授权金库使用代币...', 'warning');
            const approveTx = await tokenContract.approve(TOKEN_VAULT_ADDRESS, parsedAmount);
            await approveTx.wait();
        }

        showStatus('正在充值到金库...', 'warning');
        const tx = await vaultContract.deposit(tokenAddress, parsedAmount);
        await tx.wait();
        showStatus('充值成功!', 'success');
        await refreshVaultBalance();
    } catch (error) {
        console.error('充值失败:', error);
        showStatus('充值失败: ' + error.message, 'error');
    }
}

async function withdrawFromVault() {
    if (!await ensureVaultReady()) return;

    const tokenAddress = tokenAddressInput.value.trim();
    const amount = vaultAmountInput.value.trim();

    if (!validateAddress(tokenAddress)) {
        showStatus('请输入有效的代币地址', 'error');
        return;
    }

    if (!amount || Number(amount) <= 0) {
        showStatus('请输入有效的提现数量', 'error');
        return;
    }

    try {
        const { decimals } = await getTokenContract(tokenAddress);
        const parsedAmount = ethers.parseUnits(amount, decimals);

        showStatus('正在从金库提现...', 'warning');
        const tx = await vaultContract.withdraw(tokenAddress, parsedAmount);
        await tx.wait();
        showStatus('提现成功!', 'success');
        await refreshVaultBalance();
    } catch (error) {
        console.error('提现失败:', error);
        showStatus('提现失败: ' + error.message, 'error');
    }
}

async function transferWithinVault() {
    if (!await ensureVaultReady()) return;

    const tokenAddress = tokenAddressInput.value.trim();
    const toAddress = vaultRecipientInput.value.trim();
    const amount = vaultTransferAmountInput.value.trim();

    if (!validateAddress(tokenAddress)) {
        showStatus('请输入有效的代币地址', 'error');
        return;
    }

    if (!validateAddress(toAddress)) {
        showStatus('请输入有效的接收者地址', 'error');
        return;
    }

    if (!amount || Number(amount) <= 0) {
        showStatus('请输入有效的转账数量', 'error');
        return;
    }

    try {
        const { decimals } = await getTokenContract(tokenAddress);
        const parsedAmount = ethers.parseUnits(amount, decimals);

        showStatus('正在执行金库内转账...', 'warning');
        const tx = await vaultContract.transfer(tokenAddress, toAddress, parsedAmount);
        await tx.wait();
        showStatus('金库转账成功!', 'success');
        await refreshVaultBalance();
    } catch (error) {
        console.error('金库转账失败:', error);
        showStatus('金库转账失败: ' + error.message, 'error');
    }
}

async function refreshVaultBalance() {
    if (!await ensureVaultReady()) return;

    const tokenAddress = tokenAddressInput.value.trim();

    if (!validateAddress(tokenAddress)) {
        showStatus('请输入有效的代币地址以查询余额', 'error');
        return;
    }

    try {
        const balance = await vaultContract.balanceOf(tokenAddress, userAddress);
        const { decimals } = await getTokenContract(tokenAddress);
        vaultBalanceSpan.textContent = ethers.formatUnits(balance, decimals);
    } catch (error) {
        console.error('查询金库余额失败:', error);
        showStatus('查询金库余额失败: ' + error.message, 'error');
    }
}

async function ensureVaultReady() {
    if (!signer) {
        showStatus('请先连接钱包', 'warning');
        return false;
    }

    if (!TOKEN_VAULT_ADDRESS || !vaultContract) {
        showStatus('请先设置金库合约地址', 'warning');
        return false;
    }

    return true;
}

async function getTokenContract(tokenAddress) {
    const checksumAddress = ethers.getAddress(tokenAddress);
    const cachedDecimals = tokenDecimalsCache[checksumAddress];
    const tokenContract = new ethers.Contract(checksumAddress, ERC20_ABI, signer);

    if (cachedDecimals !== undefined) {
        return { tokenContract, decimals: cachedDecimals };
    }

    const decimals = await tokenContract.decimals();
    tokenDecimalsCache[checksumAddress] = decimals;
    return { tokenContract, decimals };
}

// 暴露给全局作用域，以便在控制台中使用
window.setContractAddress = setContractAddress;
window.setVaultAddress = setVaultAddress;
