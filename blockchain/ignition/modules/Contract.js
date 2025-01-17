const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("WagerModule", (m) => {
  const wagerContract = m.contract("Wager");
  
  return { wagerContract };
});
