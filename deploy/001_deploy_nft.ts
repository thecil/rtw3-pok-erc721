import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import "@nomiclabs/hardhat-ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log('Alchemy NFT Deployment starts')
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deploy, log } = deployments;

    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);

    const deployResult = await deploy('Alchemy', {
        from: deployer,
        log: true,
    });

    if (deployResult.newlyDeployed) {
        log(`
            ----------------------------------------------------------------------------------
            |    Deployment Status  :                                                               
            |       Contract owner  :         ${deployer}      
            |
            |  ------------------------------------------------------------------------------
            |    Contract deployed  :         
            |    Alchemy            :         ${deployResult.address}   
            ----------------------------------------------------------------------------------
        `);
    }


};

export default func;
func.tags = ['Alchemy'];