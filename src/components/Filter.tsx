import React, { Component } from 'react';
import { Form, Popup } from 'semantic-ui-react';

const REGEX = new RegExp('^[a-zA-Z0-9 ]+$');

interface IState {
    filter: string,
    filterValid: boolean
}

interface IProps { 
    onSubmitFilter: any,
    loading: boolean
}

export class VehicleFilter extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            filter: '',
            filterValid: true,
        };
    }

    handleOnChange = (event: any, { name, value }: any) => {
        if (value !== '' && !REGEX.test(value)) {
            this.setState({ [name]: value, filterValid: false });
        } else {
            this.setState({ [name]: value, filterValid: true });
            this.props.onSubmitFilter(value);
        }
    };

    render() {
        const { filter } = this.state;
        let popupMessage = '';
        if (!this.state.filterValid) {
            popupMessage = 'Invalid character.';
        } else if (this.props.totalCount === 0) {
            popupMessage = 'No results found.';
        }

        return (
            <Form>
                <Form.Group>
                    <Form.Field>
                        <Popup
                            trigger={
                                <Form.Input
                                    placeholder="Enter the filter."
                                    name="filter"
                                    value={filter}
                                    error={!this.state.filterValid}
                                    label="Filter"
                                    onChange={this.handleOnChange}
                                    icon="search"
                                    loading={this.props.loading}
                                />
                            }
                            content={popupMessage}
                            on="click"
                            open={!this.state.filterValid || this.props.totalCount === 0}
                            position="right center"
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}
