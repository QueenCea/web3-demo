// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FengGeToken
 * @dev 一个带有铸造上限的 ERC20 代币，支持所有者增发。
 */
contract FengGeToken is ERC20, Ownable {
    uint256 public immutable cap;

    /**
     * @param initialSupply 初始铸造数量（会在部署时发送给部署者）
     * @param _cap 代币最大供给上限
     */
    constructor(uint256 initialSupply, uint256 _cap) ERC20("FengGe Token", "FENGGE") Ownable() {
        require(_cap > 0, "Cap must be greater than zero");
        require(initialSupply <= _cap, "Initial supply exceeds cap");
        cap = _cap;

        if (initialSupply > 0) {
            _mint(_msgSender(), initialSupply);
        }
    }

    /**
     * @dev 只有所有者可以增发代币，且总供应量不能超过 cap
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= cap, "Cap exceeded");
        _mint(to, amount);
    }
}

