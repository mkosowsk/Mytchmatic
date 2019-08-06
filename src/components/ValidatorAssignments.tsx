import React, { Component, FunctionComponent } from 'react'; // importing FunctionComponent
import ValidatorCard from './ValidatorCard';
import validators from '../mock/validators.json';
import { Icon, Label, Menu, Table, Tab } from 'semantic-ui-react';

// fetch data in componentDidMount

const API = 'http://api.prylabs.network/eth/v1alpha1/validators/assignments';
const DEFAULT_QUERY = '';

// {
//   "epoch": "0",
//   "assignments": [
//     {
//       "crosslinkCommittees": [
//         "23",
//         "8",
//         "18",
//         "60",
//         "51",
//         "10",
//         "0",
//         "47"
//       ],
//       "shard": "6",
//       "slot": "6",
//       "proposer": false,
//       "publicKey": "sao25T46/2oUBPjzBKa+U0K2lEptQjPxxmPhX5h6ZJj97fNVaIWyFqfHXafGBmoY"
//     },

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
      publicKey,
      crosslinkCommittees,
      shard,
      slot,
      proposer
    ],
  })

interface IState {
  data: {
    "epoch": string,
    "assignments": [
      {
        "crosslinkCommittees": Array<string>,
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
      .then(response => {
        // console.log('response in then', response.json())
        return response.json();
      })
      .then(data => this.setState({ data: data }))
  }

  render() {
    const { data } = this.state;
    console.log(data);

    data.assignments.map(assignment => assignment.proposer = assignment.proposer.toString())


    // return (
    //   <div>
    //     {data["epoch"]}
    //   </div>
    // );


    return (
      <div>
        <Table
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
