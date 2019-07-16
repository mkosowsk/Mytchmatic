import React from 'react';
import mitch_kosowski from './mitch_kosowski.jpg';
import './App.css';
import validators from './mock/validators.json';
import ValidatorCard from './components/validators';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mytchmatic™</h1>
        <h2>The BEST GUI for Ethereum 2.0</h2>
        <img src={mitch_kosowski} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://twitter.com/Mitch_Kosowski"
          target="_blank"
          rel="noopener noreferrer"
        >
          -@Mitch_Kosowski #GreatestTraderOfALLTIME
          <span role="img" aria-label="Flexed Biceps"> 💪</span>
          <span role="img" aria-label="Smiling Face With Sunglasses">😎</span>
          <span role="img" aria-label="Thumbs Up">👍</span>
        </a>
        <div>
          <h2>Active Validators</h2>
          <ul>
            <li><ValidatorCard public_key={validators.validators[0]["public_key"]} effective_balance={validators.validators[0]["effective_balance"]} /></li>
            <li><ValidatorCard public_key={validators.validators[1]["public_key"]} effective_balance={validators.validators[1]["effective_balance"]} /></li>
            <li><ValidatorCard public_key={validators.validators[2]["public_key"]} effective_balance={validators.validators[2]["effective_balance"]} /></li>
          </ul>
        </div>
      </header>
      
    </div>
  );
}

export default App;
