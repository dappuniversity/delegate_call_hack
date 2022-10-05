const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Attack', () => {
  let a, b, c

  beforeEach(async () => {
    const A = await ethers.getContractFactory('A')
    a = await A.deploy()

    const B = await ethers.getContractFactory('B')
    b = await B.deploy(a.address)

    const C = await ethers.getContractFactory('C')
    c = await C.deploy(b.address)

    let accounts = await ethers.getSigners()
    deployer = accounts[0]
    attacker = accounts[1]
    console.log("Deployer Address:", deployer.address)
    console.log("Attacker Address:", attacker.address)
  })

  describe('the attack', () => {

    it('changes the ownership with delegateCall() exploit', async () => {
      // Check initial owner
      console.log("Owner of B:", await b.owner())
      expect(await b.owner()).to.equal(deployer.address)

      // Perform the attack
      let tx = await c.connect(attacker).attack()
      await tx.wait()

      // Check the new owner
      console.log("Owner of B:", await b.owner())
      expect(await b.owner()).to.equal(c.address)
    })

  })
})
