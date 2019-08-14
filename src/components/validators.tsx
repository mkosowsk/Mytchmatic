import React from 'react'; // importing FunctionComponent
import validators from '../mock/validators.json';
import { Icon, Menu, Table } from 'semantic-ui-react';

//TODO: pull out ValidatorCard.tsx parts that make sense to use
// like ValidatorCardProps?

const tableData = validators.validators;

const headerRow = [
  'Public Key',
  'Withdrawal Credentials',
  'Activation Eligibility Epoch',
  'Activation Epoch',
  'Exit Epoch',
  'Withdrawal Epoch',
  'Slashed',
  'Effective Balance'
]

const renderBodyRow = ({
  public_key,
  withdrawal_credentials,
  activation_eligiblity_epoch,
  activation_epoch,
  exit_epoch,
  withdrawable_epoch,
  slashed,
  effective_balance
}: {
  public_key: string,
  withdrawal_credentials: string,
  activation_eligiblity_epoch: string,
  activation_epoch: string,
  exit_epoch: string,
  withdrawable_epoch: string,
  slashed: boolean,
  effective_balance: string
},
  i: number) => ({
    key: public_key || `row-${i}`,
    cells: [
      public_key,
      withdrawal_credentials,
      activation_eligiblity_epoch,
      activation_epoch,
      exit_epoch,
      withdrawable_epoch,
      slashed,
      effective_balance
    ],
  })

const Validators = () =>
  <div>
    <Table
      celled headerRow={headerRow}
      renderBodyRow={renderBodyRow}
      tableData={tableData}
    />
    <div className="ui one column padded centered grid">
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell>
            <Menu>
              <Menu.Item as='a' icon>
                <Icon name='chevron left' />
              </Menu.Item>
              <Menu.Item as='a'>1</Menu.Item>
              <Menu.Item as='a'>2</Menu.Item>
              <Menu.Item as='a'>3</Menu.Item>
              <Menu.Item as='a'>4</Menu.Item>
              <Menu.Item as='a' icon>
                <Icon name='chevron right' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </div>
  </div>


export default Validators;