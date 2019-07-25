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

const tableData = [
  { name: undefined, status: undefined, notes: undefined },
  { name: 'Jimmy', status: 'Requires Action', notes: undefined },
  { name: 'Jamie', status: undefined, notes: 'Hostile' },
  { name: 'Jill', status: undefined, notes: undefined },
]

const headerRow = ['Name', 'Status', 'Notes']

function test({a} : { a: any}) {

}

const renderBodyRow = ({ name, status, notes} : {name: any, status: any, notes: any}, i : number) => ({
  key: name || `row-${i}`,
  warning: !!(status && status.match('Requires Action')),
  cells: [
    name || 'No name specified',
    status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
    notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
  ],
})

// const TableExampleWarningShorthand = () => (
//   <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
// )


const Validators = () =>
  <div>
    <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
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