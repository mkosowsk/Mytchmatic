import React, { Component } from 'react'; // importing FunctionComponent
import Attestations from '../mock/beacon_attestations.json';
import { Icon, Menu, Table } from 'semantic-ui-react';

// make a complex structured table

// map tableData onto an array

const tableData = Attestations.attestations;

function mapOntoTableData(data: any) {
  // make tableData key/value pairs
  const attestations = data.attestations;

  const tableData = [
      attestations[0]["aggregation_bits"],
      attestations[0]["data"]["beacon_block_root"]
  ];
  return tableData;
}

const renderBodyRow = ({
  aggregation_bits,
}: {
  aggregation_bits: string,
},
  i: number) => ({
    key: aggregation_bits || `row-${i}`,
    cells: [
      aggregation_bits,
    ],
  })

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

    // const tableData = mapOntoTableData(data);
    const tableData = ["hello"];
    console.log(tableData);

    return (
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
      </div>
    )
  }

}

export default AttestationsPool;