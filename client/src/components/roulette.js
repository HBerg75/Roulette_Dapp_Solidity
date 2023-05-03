// Roulette.js

import React, { useState } from 'react';
import { ethers } from 'ethers';
import RouletteContract from '../../src/contracts/roulette.json';

function Roulette({ provider }) {
  const [number, setNumber] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [result, setResult] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contract, setContract] = useState(null);

  async function connectContract() {
    console.log(provider, 'provider');
    const signer = provider.getSigner();
    // const network = await provider.getNetwork();
    const contract = new ethers.Contract(RouletteContract.address, RouletteContract.abi, signer);
    console.log(RouletteContract, 'bobobobobob');
    console.log(contract, 'babababababababab');
    setContract(contract);
    setContractAddress(RouletteContract.address);
  }

  async function placeBet() {
    const tx = await contract.placeBet(number, {
      value: ethers.utils.parseEther(betAmount)
    });
    await tx.wait();
    setResult(`Bet placed on number ${number}`);
  }

  async function play() {
    const tx = await contract.play();
    await tx.wait();
    const winningNumber = await contract.winningNumber();
    setResult(`The winning number is ${winningNumber.toNumber()}`);
  }

  return (
    <div>
      <h1>Roulette</h1>
      <p>Contract address: {contractAddress}</p>
      <button onClick={connectContract}>Connect to contract</button>
      {contract && (
        <div>
          <h2>Place your bet</h2>
          <label>
            Number:
            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
          </label>
          <label>
            Bet amount (ETH):
            <input type="number" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
          </label>
          <button onClick={placeBet}>Place bet</button>
          <h2>Play</h2>
          <button onClick={play}>Play</button>
          {result && <p>{result}</p>}
        </div>
      )}
    </div>
  );
}

export default Roulette;
