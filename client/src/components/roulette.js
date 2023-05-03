import React, { useState } from "react";

function Roulette() {
  const [number, setNumber] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Call the placeBet function in your smart contract with the number and betAmount values
    // TODO: Display the bet in the list of bets
    setNumber("");
    setBetAmount("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number:
          <input
            type="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </label>
        <br />
        <label>
          Bet Amount (in ether):
          <input
            type="number"
            value={betAmount}
            onChange={(event) => setBetAmount(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Place Bet</button>
      </form>
      <ul>
        {/* TODO: Display the list of bets */}
      </ul>
      <button onClick={/* TODO: Call the play function in your smart contract */}>Play</button>
    </div>
  );
}

export default Roulette;
