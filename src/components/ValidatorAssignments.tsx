import React, { Component, FunctionComponent } from 'react'; // importing FunctionComponent
import { Icon, Header, Menu, Table, Tab } from 'semantic-ui-react';
import Blockies from 'react-blockies';


const API = 'http://api.prylabs.network/eth/v1alpha1/validators/assignments';
const DEFAULT_QUERY = '';

const headerRow = [
  'Public Key',
  'Crosslink Committees',
  'Slot',
  'Shard',
  'Proposer'
]

const renderBodyRow = ({
  publicKey,
  crosslinkCommittees,
  slot,
  shard,
  proposer
}: {
  publicKey: string,
  crosslinkCommittees: Array<string>,
  slot: string,
  shard: string,
  proposer: string
},
  i: number) => ({
    key: publicKey || `row-${i}`,
    cells: [
      publicKey ? { key: 'publicKey', content: publicKey, collapsing: true } : 'None',
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

    data.assignments.map(assignment => assignment.proposer = assignment.proposer.toString());
    // TODO: can you pipe this like in Angular, this should be view layer!
    // or run type assertion BEFORE join
    data.assignments.map(assignment => assignment.crosslinkCommittees = assignment.crosslinkCommittees.join(", "));

    // sort assignments based on slot and then shard
    data.assignments.sort((a, b) => Number(a.slot) - Number(b.slot) || Number(a.shard) - Number(b.shard));

    return (
      <div>
        <Blockies></Blockies>
        <Header as='h1' className='white'>Validator Assignments</Header>
        <Table striped inverted textAlign="center"
          celled headerRow={headerRow}
          renderBodyRow={renderBodyRow}
          tableData={data.assignments}
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
    );
  }
}

export default ValidatorAssignments;
