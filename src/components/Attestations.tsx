import _ from 'lodash';
import React, { Component } from 'react';
import { Popup, Table } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { BitList } from "@chainsafe/bit-utils";

const DEFAULT_QUERY = '';

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
  crosslinkEndEpoch
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
  crosslinkEndEpoch: string
},
  i: number) => {

  // TODO: make an BlockRootLink component and import and use it here  
  const encodedBeaconBlockRoot = encodeURIComponent(beaconBlockRoot);
  const encodedSourceRoot = encodeURIComponent(sourceRoot);
  const encodedTargetRoot = encodeURIComponent(targetRoot);

  return ({
    key: aggregationBits || `row-${i}`,
    cells: [
      aggregationBits,
      <Table.Cell>
        <Popup
          content={beaconBlockRoot}
          trigger={
            <Link to={{ pathname: "/beacon/blocks", search: `root=${encodedBeaconBlockRoot}` }}>
              {truncateString(beaconBlockRoot)}
            </Link>
          }
        />
      </Table.Cell >,
      sourceEpoch,
      <Table.Cell>
        <Popup
          content={sourceRoot}
          trigger={
            <Link to={{ pathname: "/beacon/blocks", search: `root=${encodedSourceRoot}` }}>
              {truncateString(sourceRoot)}
            </Link>
          }
        />
      </Table.Cell >,
      targetEpoch,
      <Table.Cell>
        <Popup
          content={targetRoot}
          trigger={
            <Link to={{ pathname: "/beacon/blocks", search: `root=${encodedTargetRoot}` }}>
              {truncateString(targetRoot)}
            </Link>
          }
        />
      </Table.Cell >,
      crosslinkShard,
      <Table.Cell>
        <Popup
          content={crosslinkParentRoot}
          trigger={<span>{truncateString(crosslinkParentRoot)}</span>}
        />
      </Table.Cell>,
      crosslinkStartEpoch,
      crosslinkEndEpoch
    ],
  })
};

function truncateString(currString: string) {
  if (!currString) return;

  const stringStart = currString.substring(0, 4);
  const stringEnd = currString.substring(currString.length - 4);

  return stringStart + '...' + stringEnd;
};

function handleErrors(response: any) {
  if (!response.ok) {
    console.log(response);
    throw Error(response.statusText);
  }
  return response;
}

function mapDataToTableData(data: any) {
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
      crosslinkEndEpoch: currentValue["data"]["crosslink"]["endEpoch"]
    };
    return currAttestationPool;
  });

  return tableData;
}

interface IState {
  column: string,
  direction: any,
  data: {
    attestations:
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
          endEpoch: string
        }
      }
    }[]
  }
}

interface IProps {
  api: string
}

class Attestations extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      column: '',
      direction: '',
      data: {
        attestations:
          [
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
                  endEpoch: ''
                }
              }
            }
          ]
      }
    };
  }

  componentDidMount() {
    const api = this.props.api;

    return fetch(api + DEFAULT_QUERY)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
  }

  handleSort = (clickedColumn: string) => () => {
    const { column, data, direction } = this.state
    const attestations = data.attestations;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: {
          attestations: _.sortBy(attestations, clickedColumn)
        },
        direction: 'ascending',
      })

      return;
    }

    this.setState({
      data: {
        attestations: attestations.reverse()
      },
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state;

    const headerRows = [
      <Table.Row>
        <Table.HeaderCell
          rowSpan='2'
          sorted={column === 'aggregationBits' ? direction : undefined}
          onClick={this.handleSort('aggregationBits')}
        > Aggregation Bits </Table.HeaderCell>
        <Table.HeaderCell rowSpan='2' textAlign='center'>Beacon Block Root</Table.HeaderCell>
        <Table.HeaderCell colSpan='2' textAlign='center'>Source</Table.HeaderCell>
        <Table.HeaderCell colSpan='2' textAlign='center'>Target</Table.HeaderCell>
        <Table.HeaderCell colSpan='4' textAlign='center'>CrossLink</Table.HeaderCell>
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
      </Table.Row>
    ];

    const tableData = mapDataToTableData(data);

    return (
      <Table sortabled striped inverted celled structured textAlign="center"
        headerRows={headerRows}
        renderBodyRow={renderBodyRow}
        tableData={tableData}
      >
      </Table>
    )
  }
}

export default Attestations;
