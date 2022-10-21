import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import 'hardhat-deploy';
const { ALCHEMY_RPC, MNEMONIC } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: '0.8.4',
      settings: {
        optimizer: {
          enabled: true,
          runs: 2000,
        },
      },
    },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      live: false,
      saveDeployments: true,
      tags: ["localhost"]
    },
    goerli: {
      url: ALCHEMY_RPC,
      chainId: 5,
      accounts: {mnemonic: MNEMONIC},
      live: true,
      saveDeployments: true,
      tags: ["goerli"]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
      "goerli": '0x32F0a4Db8350a0882241623A50587e048e11a126'
    },
    nonSigner: {
      default: 1,
      "goerli": '0x9B5416219dc491519cdf4523C0c2Ed290b780A9f'
    },
  }
};

export default config;