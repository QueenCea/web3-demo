const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter 合约测试", function () {
  let counter;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1, addr2] = await ethers.getSigners();

    // 部署合约
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
            await counter.waitForDeployment();
  });

  describe("部署测试", function () {
    it("应该设置正确的所有者", async function () {
      expect(await counter.owner()).to.equal(owner.address);
    });

    it("应该将初始计数设置为0", async function () {
      expect(await counter.getCount()).to.equal(0);
    });
  });

  describe("计数操作", function () {
    it("应该能够增加计数", async function () {
      await counter.increment();
      expect(await counter.getCount()).to.equal(1);

      await counter.increment();
      expect(await counter.getCount()).to.equal(2);
    });

    it("应该能够减少计数", async function () {
      // 先增加计数
      await counter.increment();
      await counter.increment();
      expect(await counter.getCount()).to.equal(2);

      // 然后减少
      await counter.decrement();
      expect(await counter.getCount()).to.equal(1);
    });

    it("当计数为0时，减少操作应该失败", async function () {
      await expect(counter.decrement()).to.be.revertedWith("计数不能小于0");
    });

    it("应该能够设置特定的计数值", async function () {
      await counter.setCount(42);
      expect(await counter.getCount()).to.equal(42);
    });
  });

  describe("重置功能", function () {
    it("所有者应该能够重置计数", async function () {
      await counter.setCount(10);
      await counter.reset();
      expect(await counter.getCount()).to.equal(0);
    });

    it("非所有者不应该能够重置计数", async function () {
      await counter.setCount(10);
      await expect(
        counter.connect(addr1).reset()
      ).to.be.revertedWith("只有合约所有者可以重置计数");
    });
  });

  describe("事件测试", function () {
    it("增加计数时应该触发 CountChanged 事件", async function () {
      await expect(counter.increment())
        .to.emit(counter, "CountChanged")
        .withArgs(1, owner.address);
    });

    it("减少计数时应该触发 CountChanged 事件", async function () {
      await counter.increment();
      
      await expect(counter.decrement())
        .to.emit(counter, "CountChanged")
        .withArgs(0, owner.address);
    });

    it("设置计数时应该触发 CountChanged 事件", async function () {
      await expect(counter.setCount(100))
        .to.emit(counter, "CountChanged")
        .withArgs(100, owner.address);
    });

    it("重置计数时应该触发 CountChanged 事件", async function () {
      await counter.setCount(50);
      
      await expect(counter.reset())
        .to.emit(counter, "CountChanged")
        .withArgs(0, owner.address);
    });
  });

  describe("多用户交互", function () {
    it("多个用户都应该能够修改计数", async function () {
      // owner 增加计数
      await counter.increment();
      expect(await counter.getCount()).to.equal(1);

      // addr1 增加计数
      await counter.connect(addr1).increment();
      expect(await counter.getCount()).to.equal(2);

      // addr2 设置计数
      await counter.connect(addr2).setCount(10);
      expect(await counter.getCount()).to.equal(10);
    });

    it("应该正确记录事件中的操作者", async function () {
      await expect(counter.connect(addr1).increment())
        .to.emit(counter, "CountChanged")
        .withArgs(1, addr1.address);

      await expect(counter.connect(addr2).setCount(5))
        .to.emit(counter, "CountChanged")
        .withArgs(5, addr2.address);
    });
  });
});
