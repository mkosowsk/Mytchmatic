import React, { Component } from 'react'; // importing FunctionComponent
import { Header, Table } from 'semantic-ui-react';

const API = 'http://api.prylabs.network/eth/v1alpha1/beacon/blocks';
const DEFAULT_QUERY = '?slot=5000';

// const headerRow = [
//     'Slot',
//     'Parent Root',
//     'State Root'
// ]

const stubBlocksFull = {
    "blocks": [
        {
            "slot": "string",
            "parent_root": "string",
            "state_root": "string",
            "body": {
                "randao_reveal": "string",
                "eth1_data": {
                    "deposit_root": "string",
                    "deposit_count": "string",
                    "block_hash": "string"
                },
                "graffiti": "string",
                "proposer_slashings": [
                    {
                        "proposer_index": "string",
                        "header_1": {
                            "slot": "string",
                            "parent_root": "string",
                            "state_root": "string",
                            "body_root": "string",
                            "signature": "string"
                        },
                        "header_2": {
                            "slot": "string",
                            "parent_root": "string",
                            "state_root": "string",
                            "body_root": "string",
                            "signature": "string"
                        }
                    }
                ],
                "attester_slashings": [
                    {
                        "attestation_1": {
                            "custody_bit_0_indices": [
                                "string"
                            ],
                            "custody_bit_1_indices": [
                                "string"
                            ],
                            "data": {
                                "beacon_block_root": "string",
                                "source": {
                                    "epoch": "string",
                                    "root": "string"
                                },
                                "target": {
                                    "epoch": "string",
                                    "root": "string"
                                },
                                "crosslink": {
                                    "shard": "string",
                                    "parent_root": "string",
                                    "start_epoch": "string",
                                    "end_epoch": "string",
                                    "data_root": "string"
                                }
                            },
                            "signature": "string"
                        },
                        "attestation_2": {
                            "custody_bit_0_indices": [
                                "string"
                            ],
                            "custody_bit_1_indices": [
                                "string"
                            ],
                            "data": {
                                "beacon_block_root": "string",
                                "source": {
                                    "epoch": "string",
                                    "root": "string"
                                },
                                "target": {
                                    "epoch": "string",
                                    "root": "string"
                                },
                                "crosslink": {
                                    "shard": "string",
                                    "parent_root": "string",
                                    "start_epoch": "string",
                                    "end_epoch": "string",
                                    "data_root": "string"
                                }
                            },
                            "signature": "string"
                        }
                    }
                ],
                "attestations": [
                    {
                        "aggregation_bits": "string",
                        "data": {
                            "beacon_block_root": "string",
                            "source": {
                                "epoch": "string",
                                "root": "string"
                            },
                            "target": {
                                "epoch": "string",
                                "root": "string"
                            },
                            "crosslink": {
                                "shard": "string",
                                "parent_root": "string",
                                "start_epoch": "string",
                                "end_epoch": "string",
                                "data_root": "string"
                            }
                        },
                        "custody_bits": "string",
                        "signature": "string"
                    }
                ],
                "deposits": [
                    {
                        "proof": [
                            "string"
                        ],
                        "data": {
                            "public_key": "string",
                            "withdrawal_credentials": "string",
                            "amount": "string",
                            "signature": "string"
                        }
                    }
                ],
                "voluntary_exits": [
                    {
                        "epoch": "string",
                        "validator_index": "string",
                        "signature": "string"
                    }
                ],
                "transfers": [
                    {
                        "sender_index": "string",
                        "recipient_index": "string",
                        "amount": "string",
                        "fee": "string",
                        "slot": "string",
                        "sender_withdrawal_public_key": "string",
                        "signature": "string"
                    }
                ]
            },
            "signature": "string"
        }
    ],
    "next_page_token": "string",
    "total_size": 0
};

function mapOntoTableData(blocks: any) {
    // make tableData key/value pairs

    const tableData = [
        {key: 'Slot', value: blocks[0]["slot"]},
        {key: 'Parent Root', value: blocks[0]["parentRoot"]},
        {key: 'Eth 1 Data: Deposit Root', value: blocks[0]["body"]["eth1Data"]["depositRoot"]},
        {key: 'Eth 1 Data: Deposit Count', value: blocks[0]["body"]["eth1Data"]["depositCount"]},
        {key: 'Eth 1 Data: Block Hash', value: blocks[0]["body"]["eth1Data"]["blockHash"]},
        {key: 'Proposer Slashings', value: blocks[0]["body"]["proposerSlashings"].length},
        // make proposerSlashings, attesterSlashings, transfers the number for list view
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
        "blocks": [
            {
                slot: string,
                parentRoot: string,
                body: {
                    eth1Data: {
                        depositRoot: string,
                        depositCount: string,
                        blockHash: string
                    },
                    proposerSlashings: Array<string>
                }
            }
        ]
    }
}

interface IProps { }

class Blocks extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: {
                "blocks": [
                    {
                        slot: '',
                        parentRoot: '',
                        body: {
                            eth1Data: {
                                depositRoot: '',
                                depositCount: '',
                                blockHash: ''
                            },
                            proposerSlashings: []
                        }
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
        
        const tableData = mapOntoTableData(data.blocks)

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
