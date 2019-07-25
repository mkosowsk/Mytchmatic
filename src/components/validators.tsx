import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import ValidatorCard from './ValidatorCard';
import validators from '../mock/validators.json';
import { Icon, Label, Menu, Table, Tab } from 'semantic-ui-react';

//TODO: pull out ValidatorCard.tsx parts that make sense to use
// like ValidatorCardProps?

const data = [
  { name: "10jan", key: "10jan" },
  { name: "12jan", key: "12jan" },
  { name: "14jan", key: "14jan" },
];

const panes = data.map(d => ({
  menuItem: d.name,
  render: () => <Tab.Pane> {d.key}</Tab.Pane>
}));

// validators[0]

const cells = validators.validators.map(data => ({
  menuItem: data["public_key"],
  render: () => <Table.Cell> {data.public_key}</Table.Cell>
}));

const App = () => (
  <div>
    <Tab panes={panes} />
  </div>
);

//want to repeat the Table.row
// want to repeat the rows

// const tableData = [
//   { name: undefined, status: undefined, notes: undefined },
//   { name: 'Jimmy', status: 'Requires Action', notes: undefined },
//   { name: 'Jamie', status: undefined, notes: 'Hostile' },
//   { name: 'Jill', status: undefined, notes: undefined },
// ]

const tableData = validators.validators;

const headerRow = ['Public Key', 'Withdrawal Credentials', 'Effective Balance', 'Slashed', 
  'Activation Eligibility Epoch', 'Activation Epoch', 'Exit Epoch', 'Withdrawal Epoch'
]

const renderBodyRow = ({ public_key, status, notes} : {public_key: string, status: any, notes: any}, i : number) => ({
  key: public_key || `row-${i}`,
  cells: [
    public_key
  ],
})

const Validators = () =>
  <div>
    <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
    <Table celled>
      <Table.Body>
        <Table.Row>
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

    <div>
      <Tab panes={panes} />
    </div>

    <h2>Active Validators</h2>
    <ul>
      <li><ValidatorCard public_key={validators.validators[0]["public_key"]} effective_balance={validators.validators[0]["effective_balance"]} /></li>
      <li><ValidatorCard public_key={validators.validators[1]["public_key"]} effective_balance={validators.validators[1]["effective_balance"]} /></li>
      <li><ValidatorCard public_key={validators.validators[2]["public_key"]} effective_balance={validators.validators[2]["effective_balance"]} /></li>
    </ul>
  </div>


export default Validators;