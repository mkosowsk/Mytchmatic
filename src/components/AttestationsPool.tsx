import React from 'react'; // importing FunctionComponent
import Attestations from '../mock/beacon_attestations.json';
import { Icon, Menu, Table } from 'semantic-ui-react';

// make a complex structured table

const tableData = Attestations.attestations;

const renderBodyRow = ({
  aggregation_bits,
  withdrawal_credentials,
  activation_eligiblity_epoch,
  activation_epoch,
  exit_epoch,
  withdrawable_epoch,
  slashed,
  effective_balance
}: {
  aggregation_bits: string,
  withdrawal_credentials: string,
  activation_eligiblity_epoch: string,
  activation_epoch: string,
  exit_epoch: string,
  withdrawable_epoch: string,
  slashed: boolean,
  effective_balance: string
},
  i: number) => ({
    key: aggregation_bits || `row-${i}`,
    cells: [
      aggregation_bits,
      withdrawal_credentials,
      activation_eligiblity_epoch,
      activation_epoch,
      exit_epoch,
      withdrawable_epoch,
      slashed,
      effective_balance
    ],
  })


// 13 total columns

const AttestationsPool = () =>
  <div>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan='2' textAlign='center'>Aggregation Bits</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2' textAlign='center'>Beacon Block Root</Table.HeaderCell>
          <Table.HeaderCell colSpan='2' textAlign='center'>Source</Table.HeaderCell>
          <Table.HeaderCell colSpan='2' textAlign='center'>Target</Table.HeaderCell>
          <Table.HeaderCell colSpan='5' textAlign='center'>CrossLink</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2' textAlign='center'>Custody Bits</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2' textAlign='center'>Signature</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign='center'>Epoch</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Root</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Epoch</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Root</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Shard</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Parent Root</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Start Epoch</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>End Epoch</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Data Root</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
    <Table
      celled structured
      renderBodyRow={renderBodyRow}
      tableData={tableData}
    >
    </Table>
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


export default AttestationsPool;