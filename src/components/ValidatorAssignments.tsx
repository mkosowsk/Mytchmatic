import React, { Component } from 'react'; // importing FunctionComponent
import { Header, Table } from 'semantic-ui-react';
import Blockies from 'react-blockies';


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
      <Blockies key={publicKey + 'Blockie'} seed={publicKey}></Blockies>,
      publicKey,
      crosslinkCommittees,
      slot,
      shard,
      proposer
    ],
  });

interface IState {
  data: {
    "epoch": string,
    "assignments": [
      {
        // "crosslinkCommittees": Array<string> | string, //TODO how to cast these later
        "crosslinkCommittees": any,
        "shard": string,
        "slot": string,
        "proposer": boolean | string,
        "publicKey": string
      }
    ]
  }
}

interface IProps { }

class ValidatorAssignments extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {
        "epoch": '',
        "assignments": [
          {
            "crosslinkCommittees": [''],
            "shard": '',
            "slot": '',
            "proposer": false,
            "publicKey": ''
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

  render() {
    const { data } = this.state;
    console.log(data);

    data.assignments.map(assignment => {
      const publicKeyStart = assignment.publicKey.substring(0, 4);
      const publicKeyEnd = assignment.publicKey.substring(assignment.publicKey.length - 4);

      return assignment.publicKey = publicKeyStart + '...' + publicKeyEnd;
    });

    data.assignments.map(assignment => assignment.proposer = assignment.proposer.toString());
    // TODO: can you pipe this like in Angular, this should be view layer!
    // or run type assertion BEFORE join
    data.assignments.map(assignment => assignment.crosslinkCommittees = assignment.crosslinkCommittees.join(", "));

    // sort assignments based on slot and then shard
    data.assignments.sort((a, b) => Number(a.slot) - Number(b.slot) || Number(a.shard) - Number(b.shard));

    // TODO: show full publicKey on hover

    return (
      <div>
        <Header as='h1' className='white'>Validator Assignments</Header>
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
