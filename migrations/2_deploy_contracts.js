const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts) {

    // deploy Token
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    // deploy RWD
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    // deploy DecentralBank
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    // transfer all rwd to bank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    // transfer 100 tokens to investors.
    await tether.transfer(accounts[1], '100000000000000000000')
};
  