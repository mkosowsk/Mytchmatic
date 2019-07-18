import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import ValidatorCard from './ValidatorCard';
import validators from '../mock/validators.json';

const Validators = () =>
  <div>
    <h2>Active Validators</h2>
      <ul>
        <li><ValidatorCard public_key={validators.validators[0]["public_key"]} effective_balance={validators.validators[0]["effective_balance"]} /></li>
        <li><ValidatorCard public_key={validators.validators[1]["public_key"]} effective_balance={validators.validators[1]["effective_balance"]} /></li>
        <li><ValidatorCard public_key={validators.validators[2]["public_key"]} effective_balance={validators.validators[2]["effective_balance"]} /></li>
      </ul>
  </div>


export default Validators;