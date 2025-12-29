const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Presale basic flow", function () {
  it("deploys token and presale, handles SHCH buys and allocations", async function () {
    const [owner, alice, bob] = await ethers.getSigners();

    const SHCH = await ethers.getContractFactory("SHCHToken");
    const initialSupply = 1_000_000; // will be multiplied by 1e18 in constructor
    const shch = await SHCH.deploy(initialSupply);
    await shch.waitForDeployment();
    const shchAddr = await shch.getAddress();

    const Presale = await ethers.getContractFactory("Presale");
    const presale = await Presale.deploy(shchAddr, shchAddr);
    await presale.waitForDeployment();
    const presaleAddr = await presale.getAddress();

    // fund presale with tokens to sell
    const fundAmount = ethers.parseUnits("500000", 18);
    await shch.connect(owner).transfer(presaleAddr, fundAmount);

    // add a phase that is currently active
    const block = await ethers.provider.getBlock("latest");
    const now = block.timestamp;
    const start = now - 10;
    const end = now + 86400;
    const rate = ethers.parseUnits("24", 18); // 24 tokens per 1 MATIC-equivalent
    const allocation = ethers.parseUnits("100000", 18);
    const minRate = rate;
    await presale.connect(owner).addPhase(start, end, rate, allocation, minRate);


    // give alice some SHCH to pay
    const alicePay = ethers.parseUnits("100", 18);
    await shch.connect(owner).transfer(alice.address, alicePay);

    // alice approves presale to spend SHCH
    await shch.connect(alice).approve(presaleAddr, alicePay);

    // calculate expected tokens = alicePay * rate / 1e18
    const expectedTokens = alicePay * rate / ethers.parseUnits("1", 18);

    // buy with SHCH
    await presale.connect(alice).buyWithSHCH(alicePay);

    const finalBal = await shch.balanceOf(alice.address);
    expect(finalBal.toString()).to.equal(expectedTokens.toString());

    // allocateTokens to bob (off-chain purchase)
    const alloc = ethers.parseUnits("50", 18);
    await presale.connect(owner).allocateTokens(bob.address, alloc);
    const bobBal = await shch.balanceOf(bob.address);
    expect(bobBal.toString()).to.equal(alloc.toString());

    // withdraw collected SHCH from presale to owner
    const ownerBefore = await shch.balanceOf(owner.address);
    await presale.connect(owner).withdrawShch(owner.address);
    const ownerAfter = await shch.balanceOf(owner.address);
    expect((ownerAfter > ownerBefore)).to.equal(true);
  });
});
