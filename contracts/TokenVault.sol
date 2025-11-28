// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenVault
 * @dev 一个简单的多代币金库，允许用户充值、提现以及在金库账户间转账。
 */
contract TokenVault is Ownable {
    // token => user => balance
    mapping(address => mapping(address => uint256)) private balances;

    event Deposited(address indexed token, address indexed account, uint256 amount);
    event Withdrawn(address indexed token, address indexed account, uint256 amount);
    event Transferred(address indexed token, address indexed from, address indexed to, uint256 amount);

    /**
     * @dev 查看某个账户在指定代币上的余额
     */
    function balanceOf(address token, address account) external view returns (uint256) {
        return balances[token][account];
    }

    /**
     * @dev 充值指定 ERC20 代币到金库
     * 用户需要提前对金库授权（approve）
     */
    function deposit(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[token][msg.sender] += amount;
        emit Deposited(token, msg.sender, amount);
    }

    /**
     * @dev 提现：把金库中代币转回给调用者
     */
    function withdraw(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        uint256 userBalance = balances[token][msg.sender];
        require(userBalance >= amount, "Insufficient vault balance");

        balances[token][msg.sender] = userBalance - amount;
        IERC20(token).transfer(msg.sender, amount);
        emit Withdrawn(token, msg.sender, amount);
    }

    /**
     * @dev 在金库内部给其他用户转账
     */
    function transfer(address token, address to, uint256 amount) external {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than zero");

        uint256 senderBalance = balances[token][msg.sender];
        require(senderBalance >= amount, "Insufficient vault balance");

        balances[token][msg.sender] = senderBalance - amount;
        balances[token][to] += amount;

        emit Transferred(token, msg.sender, to, amount);
    }

    /**
     * @dev 紧急取回误存的代币（仅限所有者）
     */
    function rescueTokens(address token, uint256 amount, address to) external onlyOwner {
        require(to != address(0), "Invalid recipient");
        IERC20(token).transfer(to, amount);
    }
}

