const { ethers } = require("hardhat");

async function main() {
  const Roulette = await ethers.getContractFactory("Roulette");
  const roulette = await Roulette.deploy();
  await roulette.deployed();
  console.log("Roulette deployed to:", roulette.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
