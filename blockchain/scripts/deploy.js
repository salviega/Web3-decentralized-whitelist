const fs  = require("fs");
const {ethers} = require("hardhat");

async function main() {

    const whiteListContract = await ethers.getContractFactory("Whitelist");
    const whiteList = await whiteListContract.deploy(10);
    await whiteList.deployed();
    console.log("The WhiteList Contract was deployed to: " + whiteList.address);

    //Create the envieronment file with the start contract addresses
    let addresses = {
        "whitelistcontract": whiteList.address
    }
    let addressesJSON = JSON.stringify(addresses);
    fs.writeFileSync("environment/contract-address.json", addressesJSON);

}

main()
 .then(() => {
    process.exit(0);
 })
 .catch((error) => {
    console.error(error);
    process.exit(1);
 });