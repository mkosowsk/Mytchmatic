import React, { Component } from 'react';
import { Icon, Popup, Table } from 'semantic-ui-react';

const API = 'http://api.prylabs.network/eth/v1alpha1/validators'
const DEFAULT_QUERY = '';

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
  publicKey,
  withdrawal_credentials,
  activation_eligiblity_epoch,
  activation_epoch,
  exit_epoch,
  withdrawable_epoch,
  slashed,
  effective_balance
}: {
  publicKey: string,
  withdrawal_credentials: string,
  activation_eligiblity_epoch: string,
  activation_epoch: string,
  exit_epoch: string,
  withdrawable_epoch: string,
  slashed: boolean,
  effective_balance: string
},
  i: number) => ({
    key: publicKey || `row-${i}`,
    cells: [
      <Table.Cell>
        <Popup
          content={publicKey}
          trigger={<span>{truncateString(publicKey)}</span>}
        />
      </Table.Cell>,
      withdrawal_credentials,
      activation_eligiblity_epoch,
      activation_epoch,
      exit_epoch,
      withdrawable_epoch,
      slashed,
      effective_balance
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
        slashed: boolean,
        activation_eligibility_epoch: string,
        activation_epoch: string,
        exit_epoch: string,
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
            slashed: false,
            activation_eligibility_epoch: '',
            activation_epoch: '',
            exit_epoch: '',
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
      <Table celled structured compact textAlign="center"
        headerRow={headerRow}
        renderBodyRow={renderBodyRow}
        tableData={tableData}
      >
      </Table>
    )
  }
}

export default Validators;
