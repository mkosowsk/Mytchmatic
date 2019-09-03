import React, { Component } from 'react';
import { Header, Popup, Table } from 'semantic-ui-react';
import Blockies from 'react-blockies';

const API = 'http://api.prylabs.network/eth/v1alpha1/validators'
const DEFAULT_QUERY = '';

const headerRow = [
  '',
  'Public Key',
  'Withdrawal Credentials',
  'Activation Eligibility Epoch',
  'Activation Epoch',
  'Exit Epoch',
  'Withdrawable Epoch',
  'Slashed',
  'Effective Balance'
]

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
          trigger={<span>{truncateString(publicKey)}</span>}
        />
      </Table.Cell>,
      <Table.Cell>
        <Popup
          content={withdrawalCredentials}
          trigger={<span>{truncateString(withdrawalCredentials)}</span>}
        />
      </Table.Cell>,
      activationEligibilityEpoch,
      activationEpoch,
      exitEpoch,
      withdrawableEpoch,
      slashed + '',
      effectiveBalance
    ],
  })

// TODO: drop this into a utils file and pull it in
function truncateString(currString: string) {
  if (!currString) return;

  const stringStart = currString.substring(0, 4);
  const stringEnd = currString.substring(currString.length - 4);

  return stringStart + '...' + stringEnd;
};

interface IState {
  data: {
    epoch: string,
    validators: [
      {
        public_key: string,
        withdrawal_credentials: string,
        effective_balance: string,
        activationEligibilityEpoch: string,
        activation_epoch: string,
        exit_epoch: string,
        slashed: boolean,
        withdrawable_epoch: string
      }
    ],
    next_page_token: string,
    total_size: number
  }
}

interface IProps { }

class Validators extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
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
        ],
        next_page_token: '',
        total_size: 0
      }
    }
  }

  componentDidMount() {

    return fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
  }

  render() {
    const { data } = this.state;

    const tableData = data.validators;

    console.log(data);

    return (
      <div>
        <Header as='h1' className='white'>Validator Assignments</Header>
        <Table striped inverted celled textAlign="center"
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
