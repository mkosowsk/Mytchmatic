import React, { Component } from 'react'; // importing FunctionComponent
import { Header, Table } from 'semantic-ui-react';
import Blockies from 'react-blockies';


const API = 'http://api.prylabs.network/eth/v1alpha1/validators/participation';
const DEFAULT_QUERY = '';

const headerRow = [
  'Epoch',
  'Finalized',
  'Global Participation Rate',
  'Voted Ether',
  'Eligible Ether',
]

const renderBodyRow = ({
  epoch,
  finalized,
  globalParticipationRate,
  votedEther,
  eligibleEther
}: {
  epoch: string,
  finalized: boolean,
  globalParticipationRate: number,
  votedEther: string,
  eligibleEther: string,
},
  i: number) => ({
    key: epoch || `row-${i}`,
    cells: [
      epoch,
      finalized + '',
      (globalParticipationRate * 100).toFixed(3) + '%',
      votedEther,
      eligibleEther
    ],
  });

interface IState {
  data: {
    epoch: string,
    finalized: boolean,
    globalParticipationRate: number,
    votedEther: string,
    eligibleEther: string,
  }
}

interface IProps { }

class ValidatorAssignments extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {
        epoch: '',
        finalized: false,
        globalParticipationRate: 0,
        votedEther: '',
        eligibleEther: '',
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
        <Header as='h1' className='white'>Validator Participation</Header>
        <Table striped inverted textAlign="center"
          celled headerRow={headerRow}
          renderBodyRow={renderBodyRow}
          tableData={[data]}
        />
      </div>
    );
  }
}

export default ValidatorAssignments;
