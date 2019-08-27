import React, { Component } from 'react'; // importing FunctionComponent
import Attestations from '../mock/beacon_attestations.json';
import { Icon, Menu, Table } from 'semantic-ui-react';

// make a complex structured table

// map tableData onto an array

const tableData = Attestations;

function mapOntoTableData(data: any) {
  // make tableData key/value pairs
  const attestations = data.attestations;

  const tableData = attestations.map((currentValue: any, i: number) => {
    const currAttestationPool = {
      aggregation_bits: attestations[i]["aggregation_bits"],
      beacon_block_root: attestations[i]["data"]["beacon_block_root"],
      source_epoch: attestations[i]["data"]["source"]["epoch"],
      source_root: attestations[i]["data"]["source"]["root"],
      target_epoch: attestations[i]["data"]["target"]["epoch"],
      target_root: attestations[i]["data"]["target"]["root"],
      crosslink_shard: attestations[i]["data"]["crosslink"]["shard"],
      crosslink_parent_root: attestations[i]["data"]["crosslink"]["parent_root"],
      crosslink_start_epoch: attestations[i]["data"]["crosslink"]["start_epoch"],
      crosslink_end_epoch: attestations[i]["data"]["crosslink"]["end_epoch"],
      crosslink_data_root: attestations[i]["data"]["crosslink"]["data_root"],
      custody_bits: attestations[i]["custody_bits"],
      signature: attestations[i]["signature"]
    };
    return currAttestationPool;
  });

  return tableData;
}

const renderBodyRow = ({
  aggregation_bits,
  beacon_block_root,
  source_epoch,
  source_root,
  target_epoch,
  target_root,
  crosslink_shard,
  crosslink_parent_root,
  crosslink_start_epoch,
  crosslink_end_epoch,
  crosslink_data_root,
  custody_bits,
  signature

}: {
  aggregation_bits: string,
  beacon_block_root: string,
  source_epoch: string,
  source_root: string,
  target_epoch: string,
  target_root: string,
  crosslink_shard: string,
  crosslink_parent_root: string,
  crosslink_start_epoch: string,
  crosslink_end_epoch: string,
  crosslink_data_root: string,
  custody_bits: string,
  signature: string
},
  i: number) => ({
    key: aggregation_bits || `row-${i}`,
    cells: [
      aggregation_bits,
      beacon_block_root,
      source_epoch,
      source_root,
      target_epoch,
      target_root,
      crosslink_shard,
      crosslink_parent_root,
      crosslink_start_epoch,
      crosslink_end_epoch,
      crosslink_data_root,
      custody_bits,
      signature
    ],
  });

const headerRows = [
  <Table.Row>
    <Table.HeaderCell rowSpan='2' textAlign='center'>Aggregation Bits</Table.HeaderCell>
    <Table.HeaderCell rowSpan='2' textAlign='center'>Beacon Block Root</Table.HeaderCell>
    <Table.HeaderCell colSpan='2' textAlign='center'>Source</Table.HeaderCell>
    <Table.HeaderCell colSpan='2' textAlign='center'>Target</Table.HeaderCell>
    <Table.HeaderCell colSpan='5' textAlign='center'>CrossLink</Table.HeaderCell>
    <Table.HeaderCell rowSpan='2' textAlign='center'>Custody Bits</Table.HeaderCell>
    <Table.HeaderCell rowSpan='2' textAlign='center'>Signature</Table.HeaderCell>
  </Table.Row>,
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
];

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
        <Table celled structured compact
          headerRows={headerRows}
          renderBodyRow={renderBodyRow}
          tableData={tableData}
        >
        </Table>
      </div>
    )
  }

}

export default AttestationsPool;