import React, { Component } from 'react'; // importing FunctionComponent
import Attestations from '../mock/beacon_attestations.json';
import { Icon, Menu, Table } from 'semantic-ui-react';


const tableData = Attestations;

function mapOntoTableData(data: any) {
  const attestations = data.attestations;

  const tableData = attestations.map((currentValue: any) => {
    const currAttestationPool = {
      aggregation_bits: currentValue["aggregation_bits"],
      beacon_block_root: currentValue["data"]["beacon_block_root"],
      source_epoch: currentValue["data"]["source"]["epoch"],
      source_root: currentValue["data"]["source"]["root"],
      target_epoch: currentValue["data"]["target"]["epoch"],
      target_root: currentValue["data"]["target"]["root"],
      crosslink_shard: currentValue["data"]["crosslink"]["shard"],
      crosslink_parent_root: currentValue["data"]["crosslink"]["parent_root"],
      crosslink_start_epoch: currentValue["data"]["crosslink"]["start_epoch"],
      crosslink_end_epoch: currentValue["data"]["crosslink"]["end_epoch"],
      crosslink_data_root: currentValue["data"]["crosslink"]["data_root"],
      custody_bits: currentValue["custody_bits"]
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
  custody_bits

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
  custody_bits: string
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
      custody_bits
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