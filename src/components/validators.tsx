import _ from 'lodash';
import React, { Component } from 'react';
import { Header, Popup, Table } from 'semantic-ui-react';
import Blockies from 'react-blockies';
import Utils from '../utils';

const API = 'http://api.prylabs.network/eth/v1alpha1/validators'
const DEFAULT_QUERY = '';
const MAX_UINT_64_STRING = '18446744073709551615';

const renderBodyRow = ({
  blockie,
  publicKey,
  withdrawalCredentials,
  activationEligibilityEpoch,
  activationEpoch,
  exitEpoch,
  withdrawableEpoch,
  slashed,
  effectiveBalance
}: {
  blockie: string,
  publicKey: string,
  withdrawalCredentials: string,
  activationEligibilityEpoch: string,
  activationEpoch: string,
  exitEpoch: string,
  withdrawableEpoch: string,
  slashed: boolean,
  effectiveBalance: string
},
  i: number) => ({
    key: publicKey || `row-${i}`,
    cells: [
      <Table.Cell>
        <Blockies key={publicKey + 'Blockie'} seed={publicKey}></Blockies>
      </Table.Cell>,
      <Table.Cell>
        <Popup
          content={publicKey}
          trigger={<span>{Utils.truncateString(publicKey)}</span>}
        />
      </Table.Cell>,
      <Table.Cell>
        <Popup
          content={withdrawalCredentials}
          trigger={<span>{Utils.truncateString(withdrawalCredentials)}</span>}
        />
      </Table.Cell>,
      activationEligibilityEpoch,
      activationEpoch,
      exitEpoch === MAX_UINT_64_STRING ? 'Not Exited' : exitEpoch,
      withdrawableEpoch === MAX_UINT_64_STRING ? 'Not Exited' : withdrawableEpoch,
      slashed + '',
      Number(effectiveBalance) / Math.pow(10, 9) + ''
    ],
  })

interface IState {
  column: string,
  direction: any,
  data: {
    epoch: string,
    validators:
    {
      public_key: string,
      withdrawal_credentials: string,
      effective_balance: string,
      activationEligibilityEpoch: string,
      activation_epoch: string,
      exit_epoch: string,
      slashed: boolean,
      withdrawable_epoch: string
    }[];
  }
}

interface IProps { }

class Validators extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      column: '',
      direction: '',
      data: {
        epoch: '',
        validators: [
          {
            public_key: '',
            withdrawal_credentials: '',
            effective_balance: '',
            activationEligibilityEpoch: '',
            activation_epoch: '',
            exit_epoch: '',
            slashed: false,
            withdrawable_epoch: ''
          }
        ]
      }
    }
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
  }

  handleSort = (clickedColumn: string) => () => {
    const { column, data, direction } = this.state
    const validators = data.validators;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: {
          epoch: data.epoch,
          validators: _.sortBy(validators, clickedColumn)
        },
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: {
        epoch: data.epoch,
        validators: validators.reverse()
      },
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, direction } = this.state

    const headerRow = [
      '',
      <Table.HeaderCell
        sorted={column === 'publicKey' ? direction : undefined}
        onClick={this.handleSort('publicKey')}
      > Public Key </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'withdrawalCredentials' ? direction : undefined}
        onClick={this.handleSort('withdrawalCredentials')}
      > Withdrawal Credentials </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'activationEligibilityEpoch' ? direction : undefined}
        onClick={this.handleSort('activationEligibilityEpoch')}
      > Activation Eligibility Epoch </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'activationEpoch' ? direction : undefined}
        onClick={this.handleSort('activationEpoch')}
      > Activation Epoch </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'exitEpoch' ? direction : undefined}
        onClick={this.handleSort('exitEpoch')}
      > Exit Epoch </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'withdrawableEpoch' ? direction : undefined}
        onClick={this.handleSort('withdrawableEpoch')}
      > Withdrawable Epoch </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'slashed' ? direction : undefined}
        onClick={this.handleSort('slashed')}
      > Slashed </Table.HeaderCell>,
      <Table.HeaderCell
        sorted={column === 'effectiveBalance' ? direction : undefined}
        onClick={this.handleSort('effectiveBalance')}
      > Effective Balance (ETH) </Table.HeaderCell>
    ];

    const { data } = this.state;

    const tableData = data.validators;


    return (
      <div>
        <Header as='h1' className='white'>Active Validators</Header>
        <Table sortable striped inverted celled textAlign="center"
          headerRow={headerRow}
          renderBodyRow={renderBodyRow}
          tableData={tableData}
        >
        </Table>
      </div>
    )
  }
}

export default Validators;
