require("@nomiclabs/hardhat-waffle");
const secret = require("./environment/secrets.json");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  paths: { //se enrutan las fuentes del blockchain
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  },
  defaultNetwork: "kovan",
    networks: {
      hardhat: {
        // If want to do some forking, uncomment this
        // forking: {
        //  url: MAINNET_RPC_URL
        // }
      },
      localhost: {
      },
      kovan: {
        url: secret.KOVAN_RPC_URL,
        accounts: [secret.PRIVATE_KEY],
        saveDeployments: true,
      }
    },
  solidity: "0.8.15",
  
};