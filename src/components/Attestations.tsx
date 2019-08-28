import React, { Component } from 'react'; // importing FunctionComponent
import validators from '../mock/validators.json';
import { Icon, Menu, Table } from 'semantic-ui-react';

const API = 'http://api.prylabs.network/eth/v1alpha1/beacon/attestations';
const DEFAULT_QUERY = '';

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

function truncateString(currString: string) {
  const stringStart = currString.substring(0, 4);
  const stringEnd = currString.substring(currString.length - 4);

  return stringStart + '...' + stringEnd;
});

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
      custody_bits: currentValue["custody_bits"],
      signature: currentValue["signature"]
    };
    return currAttestationPool;
  });

  return tableData;
}

interface IState {
  data: {
    attestations: [
      {
        aggregation_bits: string,
        data: {
          beaconBlockRoot: string,
          source: {
            epoch: string,
            root: string
          },
          target: {
            epoch: string,
            root: string
          },
          crosslink: {
            shard: string,
            parentRoot: string,
            startEpoch: string,
            endEpoch: string,
            dataRoot: string
          }
        },
        custodyBits: string,
        signature: string
      }
    ]
  }
}

interface IProps { }

class Attestations extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {
        attestations: [
          {
            aggregation_bits: '',
            data: {
              beaconBlockRoot: '',
              source: {
                epoch: '',
                root: ''
              },
              target: {
                epoch: '',
                root: ''
              },
              crosslink: {
                shard: '',
                parentRoot: '',
                startEpoch: '',
                endEpoch: '',
                dataRoot: ''
              }
            },
            custodyBits: '',
            signature: ''
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

    const tableData = mapOntoTableData(data);
    // const tableData = ["hello"];
    console.log(tableData);

    return (
      <Table celled structured compact
        headerRows={headerRows}
        renderBodyRow={renderBodyRow}
        tableData={tableData}
      >
      </Table>
    )
  }
}

export default Attestations;
