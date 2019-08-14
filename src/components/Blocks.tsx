import React, { Component } from 'react'; // importing FunctionComponent
import { Header, Table } from 'semantic-ui-react';

const API = 'http://api.prylabs.network/eth/v1alpha1/beacon/blocks';
const DEFAULT_QUERY = '?slot=500';

const headerRow = [
    'Slot',
    'Parent Root',
    'State Root'
]

const renderBodyRow = ({
    slot,
    parentRoot,
    stateRoot
}: {
    slot: string,
    parentRoot: string,
    stateRoot: string
},
    i: number) => ({
        key: slot || `row-${i}`,
        cells: [
            slot,
            parentRoot,
            stateRoot
        ],
    });

interface IState {
    data: {
        "blocks": [
            {
                slot: string,
                parentRoot: string,
                stateRoot: string
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
                        stateRoot: ''
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

        return (
            <div>
                <Header as='h1' className='white'>Beacon Blocks</Header>
                <Table striped inverted textAlign="center"
                    celled headerRow={headerRow}
                    renderBodyRow={renderBodyRow}
                    tableData={data.blocks}
                />
            </div>
        );
    }
}

export default Blocks;
