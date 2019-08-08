import React, { Component, FunctionComponent } from 'react'; // importing FunctionComponent
import { Icon, Header, Menu, Table, Tab } from 'semantic-ui-react';

const API = 'http://api.prylabs.network/eth/v1alpha1/validators/assignments';
const DEFAULT_QUERY = '';

const headerRow = [
  'Public Key',
  'Crosslink Committees',
  'Shard',
  'Slot',
  'Proposer'
]

const renderBodyRow = ({
  publicKey,
  crosslinkCommittees,
  shard,
  slot,
  proposer
}: {
  publicKey: string,
  crosslinkCommittees: Array<string>,
  shard: string,
  slot: string,
  proposer: string
},
  i: number) => ({
    key: publicKey || `row-${i}`,
    cells: [
      publicKey ? { key: 'publicKey', content: publicKey, collapsing: true } : 'None',
      crosslinkCommittees,
      shard,
      slot,
      proposer
    ],
  });

  // const renderBodyRow = ({ name, status, notes }, i) => ({
  //   key: name || `row-${i}`,
  //   warning: !!(status && status.match('Requires Action')),
  //   cells: [
  //     name || 'No name specified',
  //     status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
  //     notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
  //   ],
  // })
  

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
    data.assignments.map(assignment => assignment.crosslinkCommittees = assignment.crosslinkCommittees.join(", "));

    return (
      <div>
        <Header as='h1' className='white'>Validator Assignments</Header>
        <Table inverted
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


{/* <ul>
        {hits.map(hit  =>
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        )}
      </ul> */}

// const tableData = validators.validators;
