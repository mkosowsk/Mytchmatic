import React, { FunctionComponent } from 'react'; // importing FunctionComponent

type ValidatorCardProps = {
  public_key: string,
  effective_balance: string
}

const ValidatorCard: FunctionComponent<ValidatorCardProps> = ({ public_key, effective_balance }) => <aside>
  <h2>{ public_key }</h2>
  <p>
    Effective Balance: { effective_balance }
  </p>
</aside>

export default ValidatorCard;
