import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import ValidatorCard from './ValidatorCard';
import validators from '../mock/validators.json';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

//TODO: pull out ValidatorCard.tsx parts that make sense to use
// like ValidatorCardProps?

const Validators = () =>
  <div>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Public Key</Table.HeaderCell>
          <Table.HeaderCell>Withdrawal Credentials</Table.HeaderCell>
          <Table.HeaderCell>Effective Balance</Table.HeaderCell>
          <Table.HeaderCell>Slashed</Table.HeaderCell>
          <Table.HeaderCell>Activation Eligibility Epoch</Table.HeaderCell>
          <Table.HeaderCell>Activation Epoch</Table.HeaderCell>
          <Table.HeaderCell>Exit Epoch</Table.HeaderCell>
          <Table.HeaderCell>Withdrawal Epoch</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Menu floated='right' pagination>
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
    </Table>

    <h2>Active Validators</h2>
    <ul>
      <li><ValidatorCard public_key={validators.validators[0]["public_key"]} effective_balance={validators.validators[0]["effective_balance"]} /></li>
      <li><ValidatorCard public_key={validators.validators[1]["public_key"]} effective_balance={validators.validators[1]["effective_balance"]} /></li>
      <li><ValidatorCard public_key={validators.validators[2]["public_key"]} effective_balance={validators.validators[2]["effective_balance"]} /></li>
    </ul>
  </div>


export default Validators;