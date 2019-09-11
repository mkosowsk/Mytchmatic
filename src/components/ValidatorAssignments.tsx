import _ from 'lodash';
import React, { Component } from 'react';
import { Header, Popup, Table } from 'semantic-ui-react';
import Blockies from 'react-blockies';
import Utils from '../utils';

const API = 'http://api.prylabs.network/eth/v1alpha1/validators/assignments';
const DEFAULT_QUERY = '';

const headerRow = [
  '',
  'Public Key',
  'Crosslink Committees',
  'Slot',
  'Shard',
  'Proposer'
]

const renderBodyRow = ({
  blockie,
  publicKey,
  crosslinkCommittees,
  slot,
  shard,
  proposer
}: {
  blockie: string,
  publicKey: string,
  crosslinkCommittees: Array<string>,
  slot: string,
  shard: string,
  proposer: string
},
  i: number) => ({
    key: publicKey || `row-${i}`,
    cells: [
      <td>
        <Blockies key={publicKey + 'Blockie'} seed={publicKey}></Blockies>
      </td>,
      <Table.Cell>
        <Popup
          content={publicKey}
          trigger={<span>{Utils.truncateString(publicKey)}</span>}
        />
      </Table.Cell>,
      crosslinkCommittees.join(", "),
      slot,
      shard,
      proposer + ''
    ],
  });

interface IState {
  column: string,
  direction: string,
  data: {
    epoch: string,
    assignments:
    {
      crosslinkCommittees: Array<string>,
      shard: string,
      slot: string,
      proposer: boolean,
      publicKey: string
    }[];

  }
}

interface IProps { }

class ValidatorAssignments extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      column: '',
      direction: '',
      data: {
        epoch: '',
        assignments: [
          {
            crosslinkCommittees: [''],
            shard: '',
            slot: '',
            proposer: false,
            publicKey: ''
          }
        ]
      }
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
  }

  handleSort = (clickedColumn: string) => () => {
    const { column, data, direction } = this.state
    const assignments = data.assignments;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: {
          epoch: data.epoch,
          assignments: _.sortBy(assignments, clickedColumn)
        },
        direction: 'ascending',
      })

      return;
    }

    this.setState({
      data: {
        epoch: data.epoch,
        assignments: assignments.reverse()
      },
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { data } = this.state;

    // sort assignments based on slot and then shard
    data.assignments.sort((a, b) => Number(a.slot) - Number(b.slot) || Number(a.shard) - Number(b.shard));

    return (
      <div>
        <Header as='h1' className='white'>Validator Assignments</Header>
        <Header as='h2' className='white'>Epoch: {data.epoch}</Header>
        <Table striped inverted textAlign="center"
          celled headerRow={headerRow}
          renderBodyRow={renderBodyRow}
          tableData={data.assignments}
        />
      </div>
    );
  }
}

export default ValidatorAssignments;
