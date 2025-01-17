// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wager {
    struct WagerDetails {
        address creator;
        address opponent;
        uint256 betAmount;
        bool isAccepted;
        address winner;
    }

    mapping(string => WagerDetails) public wagers;

    function createWager(
        string memory wagerId,
        address creator,
        address opponent,
        uint256 betAmount
    ) public {
        require(wagers[wagerId].creator == address(0), "Wager already exists");
        wagers[wagerId] = WagerDetails(creator, opponent, betAmount, false, address(0));
    }

    function acceptWager(string memory wagerId) public {
        require(wagers[wagerId].opponent == msg.sender, "Not authorized");
        require(!wagers[wagerId].isAccepted, "Wager already accepted");

        wagers[wagerId].isAccepted = true;
    }

    function resolveWager(string memory wagerId, address winner) public {
        require(wagers[wagerId].isAccepted, "Wager not active");
        require(
            msg.sender == wagers[wagerId].creator || msg.sender == wagers[wagerId].opponent,
            "Not authorized"
        );

        wagers[wagerId].winner = winner;
    }
}

