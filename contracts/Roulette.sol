// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Roulette {
    address public owner;
    uint256 public lastRound;
    uint256 public winningNumber;
    uint256 public winningAmount;
    uint256 public minimumBet;
    uint256 public maximumBet;
    mapping(address => uint256) public bets;

    event NewBet(address indexed player, uint256 amount, uint256 number);
    event WinningBet(address indexed player, uint256 amount);
    event NewRound(uint256 roundNumber, uint256 winningNumber, uint256 winningAmount);

    constructor() {
        owner = msg.sender;
        minimumBet = 0.01 ether;
        maximumBet = 1 ether;
        lastRound = 0;
        winningNumber = 0;
        winningAmount = 0;
    }

    function placeBet(uint256 number) public payable {
        require(msg.value >= minimumBet && msg.value <= maximumBet, "Invalid bet amount");
        require(bets[msg.sender] == 0, "You already placed a bet for this round");
        require(number >= 0 && number <= 36, "Invalid number");

        bets[msg.sender] = msg.value;
        emit NewBet(msg.sender, msg.value, number);
    }

    function play() public {
        require(msg.sender == owner, "Only the owner can play");

        // Generate a random number between 0 and 36
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 37;

        // Determine the winning amount and update the contract state
        for (uint256 i = 0; i < 37; i++) {
            if (bets[msg.sender] > 0 && i == randomNumber) {
                winningNumber = i;
                winningAmount = bets[msg.sender] * 2;
                payable(msg.sender).transfer(winningAmount);
                emit WinningBet(msg.sender, winningAmount);
                break;
            }
        }

        // Update the contract state for the new round
        lastRound += 1;
        winningNumber = randomNumber;
        winningAmount = 0;

        emit NewRound(lastRound, winningNumber, winningAmount);
    }
}
