// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Counter
 * @dev 一个简单的计数器智能合约
 */
contract Counter {
    // 存储计数值
    uint256 private count;
    
    // 合约所有者
    address public owner;
    
    // 事件：当计数值改变时触发
    event CountChanged(uint256 newCount, address changedBy);
    
    // 构造函数
    constructor() {
        owner = msg.sender;
        count = 0;
    }
    
    /**
     * @dev 获取当前计数值
     * @return 当前计数值
     */
    function getCount() public view returns (uint256) {
        return count;
    }
    
    /**
     * @dev 增加计数值
     */
    function increment() public {
        count += 1;
        emit CountChanged(count, msg.sender);
    }
    
    /**
     * @dev 减少计数值
     */
    function decrement() public {
        require(count > 0, "Count cannot be less than 0");
        count -= 1;
        emit CountChanged(count, msg.sender);
    }
    
    /**
     * @dev 重置计数值为0（只有合约所有者可以调用）
     */
    function reset() public {
        require(msg.sender == owner, "Only owner can reset the count");
        count = 0;
        emit CountChanged(count, msg.sender);
    }
    
    /**
     * @dev 设置特定的计数值
     * @param _count 新的计数值
     */
    function setCount(uint256 _count) public {
        count = _count;
        emit CountChanged(count, msg.sender);
    }
}
