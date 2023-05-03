import React from 'react';
import './App.css';
import { useEthers } from '@usedapp/core';
import Roulette from '../src/components/roulette';

function App() {
  const { activateBrowserWallet, account } = useEthers();

  function handleClick() {
    console.log('clicked');
    console.log(account, 'account');
    console.log(activateBrowserWallet, 'activateBrowserWallet');
    activateBrowserWallet();
  }

  return (
    <div className="App">
      {!account && <button onClick={handleClick}>Connect Wallet</button>}
      {account && <Roulette />}
    </div>
  );
}

export default App;
