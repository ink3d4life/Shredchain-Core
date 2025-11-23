import { ethers } from "hardhat";

async function main() {
  const AthletePhotoNFT = await ethers.getContractFactory("AthletePhotoNFT");
  const athleteNFT = await AthletePhotoNFT.deploy();
  await athleteNFT.deployed();

  console.log("AthletePhotoNFT deployed to:", athleteNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});