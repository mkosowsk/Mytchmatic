import React, { Component } from 'react'; // importing FunctionComponent
import Attestations from '../mock/beacon_attestations.json';
import { Icon, Menu, Table } from 'semantic-ui-react';

// make a complex structured table

// map tableData onto an array

const tableData = Attestations;

function mapOntoTableData(data: any) {
  // make tableData key/value pairs
  const attestations = data.attestations;

  const tableData = [
    {
      aggregation_bits: attestations[0]["aggregation_bits"],
      beacon_block_root: attestations[0]["data"]["beacon_block_root"],
      source_epoch: attestations[0]["data"]["source"]["epoch"],
      source_root: attestations[0]["data"]["source"]["root"],
      target_epoch: attestations[0]["data"]["target"]["epoch"],
      target_root: attestations[0]["data"]["target"]["root"]
    },
  ];
  return tableData;
}

const renderBodyRow = ({
  aggregation_bits,
  beacon_block_root,
  source_epoch,
  source_root,
  target_epoch,
  target_root
}: {
  aggregation_bits: string,
  beacon_block_root: string,
  source_epoch: string,
  source_root: string,
  target_epoch: string,
  target_root: string
},
  i: number) => ({
    key: aggregation_bits || `row-${i}`,
    cells: [
      aggregation_bits,
      beacon_block_root,
      source_epoch,
      source_root,
      target_epoch,
      target_root
    ],
  });

const headerRow = [
  <Table.HeaderCell rowSpan='2' textAlign='center'>Aggregation Bits</Table.HeaderCell>,
  <Table.HeaderCell rowSpan='2' textAlign='center'>Beacon Block Root</Table.HeaderCell>,
  <Table.HeaderCell colSpan='2' textAlign='center'>Source</Table.HeaderCell>,
  <Table.HeaderCell colSpan='2' textAlign='center'>Target</Table.HeaderCell>,
  <Table.HeaderCell colSpan='5' textAlign='center'>CrossLink</Table.HeaderCell>,
  <Table.HeaderCell rowSpan='2' textAlign='center'>Custody Bits</Table.HeaderCell>,
  <Table.HeaderCell rowSpan='2' textAlign='center'>Signature</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Epoch</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Root</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Epoch</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Root</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Shard</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Parent Root</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Start Epoch</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>End Epoch</Table.HeaderCell>,
  <Table.HeaderCell textAlign='center'>Data Root</Table.HeaderCell>
]

// const headerRow = <Table.Header>
// <Table.Row>
//   <Table.HeaderCell rowSpan='2' textAlign='center'>Aggregation Bits</Table.HeaderCell>
//   <Table.HeaderCell rowSpan='2' textAlign='center'>Beacon Block Root</Table.HeaderCell>
//   <Table.HeaderCell colSpan='2' textAlign='center'>Source</Table.HeaderCell>
//   <Table.HeaderCell colSpan='2' textAlign='center'>Target</Table.HeaderCell>
//   <Table.HeaderCell colSpan='5' textAlign='center'>CrossLink</Table.HeaderCell>
//   <Table.HeaderCell rowSpan='2' textAlign='center'>Custody Bits</Table.HeaderCell>
//   <Table.HeaderCell rowSpan='2' textAlign='center'>Signature</Table.HeaderCell>
// </Table.Row>
// <Table.Row>
//   <Table.HeaderCell textAlign='center'>Epoch</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Root</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Epoch</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Root</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Shard</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Parent Root</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Start Epoch</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>End Epoch</Table.HeaderCell>
//   <Table.HeaderCell textAlign='center'>Data Root</Table.HeaderCell>
// </Table.Row>
// </Table.Header>


// const tableData = [
//   { name: undefined, status: undefined, notes: undefined },
//   { name: 'Jimmy', status: 'Requires Action', notes: undefined },
//   { name: 'Jamie', status: undefined, notes: 'Hostile' },
//   { name: 'Jill', status: undefined, notes: undefined },
// ]

// const renderBodyRow = ({ name, status, notes }: any, i: number) => ({
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
    attestations: [
      {
        aggregation_bits: string
      }
    ]
  }
}

interface IProps { }

// 13 total columns
class AttestationsPool extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {
        attestations: [
          {
            aggregation_bits: ''
          }
        ]
      }
    };
  }

  // TODO: add this in later to get real results from API
  // componentDidMount() {
  //   fetch(API + DEFAULT_QUERY)
  //     .then(response => response.json())
  //     .then(data => this.setState({ data: data }))
  // }

  render() {
    // TODO: add the following back in
    // const { data } = this.state;

    const data = Attestations;
    console.log(data);

    const tableData = mapOntoTableData(data);
    // const tableData = ["hello"];
    console.log(tableData);

    return (
      <div>
        <Table celled structured
          headerRow={headerRow}
          renderBodyRow={renderBodyRow}
          tableData={tableData}
        >
        </Table>
      </div>
    )
  }

}

export default AttestationsPool;