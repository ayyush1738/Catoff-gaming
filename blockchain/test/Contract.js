const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wager Contract", function () {
  var wagerContract;
  var owner, creator, opponent, otherAccount;

  beforeEach(async function () {
    var accounts = await ethers.getSigners();
    owner = accounts[0];
    creator = accounts[1];
    opponent = accounts[2];
    otherAccount = accounts[3];
    
    var WagerContract = await ethers.getContractFactory("Wager");
    wagerContract = await WagerContract.deploy();
  });

  describe("Wager Creation", function () {
    it("Should create a new wager successfully", async function () {
      var wagerId = "WAGER_001";
      var betAmount = ethers.parseEther("0.1");

      await wagerContract.connect(creator).createWager(
        wagerId, 
        creator.address, 
        opponent.address, 
        betAmount
      );

      var wagerDetails = await wagerContract.wagers(wagerId);
      
      expect(wagerDetails.creator).to.equal(creator.address);
      expect(wagerDetails.opponent).to.equal(opponent.address);
      expect(wagerDetails.betAmount).to.equal(betAmount);
      expect(wagerDetails.isAccepted).to.be.false;
    });

    it("Should prevent creating duplicate wagers", async function () {
      var wagerId = "WAGER_002";
      var betAmount = ethers.parseEther("0.1");

      await wagerContract.connect(creator).createWager(
        wagerId, 
        creator.address, 
        opponent.address, 
        betAmount
      );

      await expect(
        wagerContract.connect(creator).createWager(
          wagerId, 
          creator.address, 
          opponent.address, 
          betAmount
        )
      ).to.be.revertedWith("Wager already exists");
    });
  });

  describe("Wager Acceptance", function () {
    it("Should allow opponent to accept wager", async function () {
      var wagerId = "WAGER_003";
      var betAmount = ethers.parseEther("0.1");

      await wagerContract.connect(creator).createWager(
        wagerId, 
        creator.address, 
        opponent.address, 
        betAmount
      );

      await wagerContract.connect(opponent).acceptWager(wagerId);

      var wagerDetails = await wagerContract.wagers(wagerId);
      expect(wagerDetails.isAccepted).to.be.true;
    });

    it("Should prevent non-opponent from accepting wager", async function () {
      var wagerId = "WAGER_004";
      var betAmount = ethers.parseEther("0.1");

      await wagerContract.connect(creator).createWager(
        wagerId, 
        creator.address, 
        opponent.address, 
        betAmount
      );

      await expect(
        wagerContract.connect(otherAccount).acceptWager(wagerId)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Wager Resolution", function () {
    it("Should resolve wager with winner", async function () {
      var wagerId = "WAGER_005";
      var betAmount = ethers.parseEther("0.1");

      await wagerContract.connect(creator).createWager(
        wagerId, 
        creator.address, 
        opponent.address, 
        betAmount
      );

      await wagerContract.connect(opponent).acceptWager(wagerId);
      await wagerContract.connect(creator).resolveWager(wagerId, opponent.address);

      var wagerDetails = await wagerContract.wagers(wagerId);
      expect(wagerDetails.winner).to.equal(opponent.address);
    });

    it("Should prevent resolving unaccepted wager", async function () {
      var wagerId = "WAGER_006";
      var betAmount = ethers.parseEther("0.1");

      await wagerContract.connect(creator).createWager(
        wagerId, 
        creator.address, 
        opponent.address, 
        betAmount
      );

      await expect(
        wagerContract.connect(creator).resolveWager(wagerId, opponent.address)
      ).to.be.revertedWith("Wager not active");
    });
  });
});
