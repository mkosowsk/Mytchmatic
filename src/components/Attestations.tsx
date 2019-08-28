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
  aggregationBits,
  beaconBlockRoot,
  sourceEpoch,
  sourceRoot,
  targetEpoch,
  targetRoot,
  crosslinkShard,
  crosslinkParentRoot,
  crosslinkStartEpoch,
  crosslinkEndEpoch,
  crosslinkDataRoot,
  custodyBits,
  signature

}: {
  aggregationBits: string,
  beaconBlockRoot: string,
  sourceEpoch: string,
  sourceRoot: string,
  targetEpoch: string,
  targetRoot: string,
  crosslinkShard: string,
  crosslinkParentRoot: string,
  crosslinkStartEpoch: string,
  crosslinkEndEpoch: string,
  crosslinkDataRoot: string,
  custodyBits: string,
  signature: string
},
  i: number) => ({
    key: aggregationBits || `row-${i}`,
    cells: [
      aggregationBits,
      beaconBlockRoot,
      sourceEpoch,
      sourceRoot,
      targetEpoch,
      targetRoot,
      crosslinkShard,
      crosslinkParentRoot,
      crosslinkStartEpoch,
      crosslinkEndEpoch,
      crosslinkDataRoot,
      custodyBits,
      signature
    ],
  });

function truncateString(currString: string) {
  if (!currString) return;

  console.log("this here's the currString", currString)
  const stringStart = currString.substring(0, 4);
  const stringEnd = currString.substring(currString.length - 4);

  return stringStart + '...' + stringEnd;
};

function mapOntoTableData(data: any) {
  const attestations = data.attestations;

  const tableData = attestations.map((currentValue: any) => {
    const currAttestationPool = {
      aggregationBits: currentValue["aggregationBits"],
      beaconBlockRoot: currentValue["data"]["beaconBlockRoot"],
      sourceEpoch: currentValue["data"]["source"]["epoch"],
      sourceRoot: currentValue["data"]["source"]["root"],
      targetEpoch: currentValue["data"]["target"]["epoch"],
      targetRoot: currentValue["data"]["target"]["root"],
      crosslinkShard: currentValue["data"]["crosslink"]["shard"],
      crosslinkParentRoot: currentValue["data"]["crosslink"]["parentRoot"],
      crosslinkStartEpoch: currentValue["data"]["crosslink"]["startEpoch"],
      crosslinkEndEpoch: currentValue["data"]["crosslink"]["endEpoch"],
      crosslinkDataRoot: currentValue["data"]["crosslink"]["dataRoot"],
      custodyBits: currentValue["custodyBits"],
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
        aggregationBits: string,
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
            aggregationBits: '',
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
