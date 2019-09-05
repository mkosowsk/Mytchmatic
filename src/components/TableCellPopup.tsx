import React, { Component } from 'react';
import { Popup, Table } from 'semantic-ui-react';
import Utils from '../utils';

interface IProps { 
    content: string
}

export default class TableCellPopup extends Component<IProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Table.Cell>
            <Popup
                content={this.props.content}
                trigger={<span>{Utils.truncateString(this.props.content)}</span>}
            />
        </Table.Cell>
    }
}