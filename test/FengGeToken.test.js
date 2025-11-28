const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FengGeToken", function () {
  const decimals = 18;
  const initialSupply = ethers.parseUnits("1000000", decimals);
  const cap = ethers.parseUnits("10000000", decimals);

  async function deployTokenFixture() {
    const [owner, alice, bob] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("FengGeToken");
    const token = await Token.deploy(initialSupply, cap);
    return { token, owner, alice, bob };
  }

  it("部署后应设置正确的名称、符号、cap 和初始供应", async function () {
    const { token, owner } = await deployTokenFixture();
    expect(await token.name()).to.equal("Feng Token");
    expect(await token.symbol()).to.equal("FENG");
    expect(await token.cap()).to.equal(cap);
    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("初始供应大于 cap 时应回退", async function () {
    const Token = await ethers.getContractFactory("FengGeToken");
    await expect(
      Token.deploy(cap + 1n, cap)
    ).to.be.revertedWith("Initial supply exceeds cap");
  });

  it("转账应更新余额", async function () {
    const { token, owner, alice } = await deployTokenFixture();
    const amount = ethers.parseUnits("1000", decimals);
    await token.transfer(alice.address, amount);
    expect(await token.balanceOf(alice.address)).to.equal(amount);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply - amount);
  });

  it("所有者可以增发，且不可超过 cap", async function () {
    const { token, owner, alice } = await deployTokenFixture();
    const mintAmount = ethers.parseUnits("500000", decimals);
    await token.mint(alice.address, mintAmount);
    expect(await token.balanceOf(alice.address)).to.equal(mintAmount);
    expect(await token.totalSupply()).to.equal(initialSupply + mintAmount);

    const remaining = cap - (initialSupply + mintAmount);
    await expect(token.mint(alice.address, remaining + 1n)).to.be.revertedWith("Cap exceeded");

    await token.mint(alice.address, remaining);
    expect(await token.totalSupply()).to.equal(cap);
  });

  it("非所有者不能增发", async function () {
    const { token, alice } = await deployTokenFixture();
    await expect(
      token.connect(alice).mint(alice.address, 1n)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount").withArgs(alice.address);
  });

});

