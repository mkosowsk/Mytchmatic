import React, { Component } from 'react'; // importing FunctionComponent
import { Header, Popup, Table } from 'semantic-ui-react';
import Utils from '../utils';
import TableCellPopup from './TableCellPopup';

const API = 'http://api.prylabs.network/eth/v1alpha1/beacon/blocks';
const DEFAULT_QUERY = '?slot=5000';

function mapOntoTableData(data: any) {
    const blocks = data.blocks;

    const tableData = [
        { key: 'Slot', value: blocks[0]["slot"] },
        {
            key: 'Parent Root',
            value: <TableCellPopup content={blocks[0]["parentRoot"]}></TableCellPopup>
        },
        {
            key: 'Signature',
            value: <TableCellPopup content={blocks[0]["signature"]}></TableCellPopup>
        },
        { key: 'Attestations', value: blocks[0]["body"]["attestations"].length },
        {
            key: 'Eth 1 Data: Deposit Root',
            value: <TableCellPopup content={blocks[0]["body"]["eth1Data"]["depositRoot"]}></TableCellPopup>
        },
        { key: 'Eth 1 Data: Deposit Count', value: blocks[0]["body"]["eth1Data"]["depositCount"] },
        {
            key: 'Eth 1 Data: Block Hash',
            value: <TableCellPopup content={blocks[0]["body"]["eth1Data"]["blockHash"]}></TableCellPopup>
        },
        {
            key: 'Graffiti',
            value: <TableCellPopup content={blocks[0]["body"]["graffiti"]}></TableCellPopup>
        },
        { key: 'Proposer Slashings', value: blocks[0]["body"]["proposerSlashings"].length },
        { key: 'Attester Slashings', value: blocks[0]["body"]["attesterSlashings"].length },
        {
            key: 'Randao Reveal',
            value:
                <Table.Cell>
                    <Popup
                        content={blocks[0]["body"]["randaoReveal"]}
                        trigger={<span>{Utils.truncateString(blocks[0]["body"]["randaoReveal"])}</span>}
                    />
                </Table.Cell>
        },
        { key: 'Deposits', value: blocks[0]["body"]["deposits"].length },
        { key: 'Voluntary Exits', value: blocks[0]["body"]["voluntaryExits"].length },
        { key: 'Transfers', value: blocks[0]["body"]["transfers"].length }
    ];
    return tableData;
}

const renderBodyRow = ({
    key,
    value
}: {
    key: string,
    value: string
},
    i: number) => ({
        key: key || `row-${i}`,
        cells: [
            key,
            value
        ],
    });

interface IState {
    data: {
        blocks: [
            {
                slot: string,
                parentRoot: string,
                signature: string,
                body: {
                    eth1Data: {
                        depositRoot: string,
                        depositCount: string,
                        blockHash: string
                    },
                    graffiti: string,
                    attestations: Array<string>, //TODO: fill this out with full attestations model
                    proposerSlashings: Array<string>, //TODO: fill this out with full proposerSlashings model
                    attesterSlashings: Array<string>, //TODO: fill this out with full attesterSlashings model
                    randaoReveal: string,
                    deposits: Array<string>, //TODO: fill this out with full deposits model
                    voluntaryExits: Array<string> //TODO: fill this out with full voluntaryExits model
                    transfers: Array<string>, //TODO: fill this out with full attesterSlashings model
                }
            }
        ]
    }
}

interface IProps {
    location: any
}

class Blocks extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: {
                blocks: [
                    {
                        slot: '',
                        parentRoot: '',
                        signature: '',
                        body: {
                            attestations: [],
                            eth1Data: {
                                depositRoot: '',
                                depositCount: '',
                                blockHash: ''
                            },
                            graffiti: '',
                            proposerSlashings: [],
                            attesterSlashings: [],
                            randaoReveal: '',
                            deposits: [],
                            voluntaryExits: [],
                            transfers: [],
                        },
                    }
                ]
            }
        };
    }

    componentDidMount() {
        const search = this.props.location.search;
        const query = search ? API + search : API + DEFAULT_QUERY;

        fetch(query)
            .then(response => response.json())
            .then(data => this.setState({ data: data }))
    }

    render() {
        const { data } = this.state;

        const tableData = data.blocks.length ? mapOntoTableData(data) : undefined;

        return (
            <div>
                <Header as='h1' className='white'>Beacon Blocks</Header>
                <Table striped inverted textAlign="center"
                    renderBodyRow={renderBodyRow}
                    tableData={tableData}
                />
            </div>
        );
    }
}

export default Blocks;
