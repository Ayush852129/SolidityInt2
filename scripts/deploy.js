
const hre = require("hardhat");

async function main() {
  

  const libraryManagement = await hre.ethers.deployContract("LibraryManagement");

  await libraryManagement.waitForDeployment();

  console.log(
    `LibraryManagement Contract deployed to ${libraryManagement.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
