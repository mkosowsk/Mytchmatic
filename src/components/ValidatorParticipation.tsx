import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

const API = 'http://api.prylabs.network/eth/v1alpha1/validators/participation';
const DEFAULT_QUERY = '';

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Global Participation Rate',
      fill: false,
      lineTension: 0.1,
      borderColor: 'green',
      backgroundColor: 'green',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,255,255,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [.105, .59, .80, .81, .56, .55, .40],
      yAxisID: 'y-axis-1'
    },
    {
      label: 'Voted Ether',
      fill: false,
      lineTension: 0.1,
      borderColor: 'rgba(255,255,255,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,255,255,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [30, 25, 20, 10, 5, 10, 5],
      yAxisID: 'y-axis-2'
    }
  ]
};

const options = {
  scales: {
    xAxes: [{
      gridLines: {
        color: 'rgba(255,255,255,1)'
      },
    }],
    yAxes: [{
      fontColor: 'rgba(255,255,255,1)',
      type: 'linear',
      display: true,
      position: 'left',
      id: 'y-axis-1',
      gridLines: {
        color: 'rgba(255,255,255,1)'
      },
      scaleLabel: {
        display: true,
        labelString: 'Global Participation Rate (percentage)',
      },
      ticks: {
        min: 0,
        max: 1,
        callback: function (value: number) {
          return (value * 100) + '%'
        },
      }
    }, {
      type: 'linear',
      display: true,
      position: 'right',
      id: 'y-axis-2',
      gridLines: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    }],
  }
}

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
      (Number(votedEther) / Math.pow(10, 9)).toLocaleString(),
      (Number(eligibleEther) / Math.pow(10, 9)).toLocaleString()
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
    // fetch(API + DEFAULT_QUERY)
    //   .then(response => response.json())
    //   .then(data => this.setState({ data: data }))
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
        <Header as='h2' className='white'>Global Participation Rate, Voted Ether, and Eligible Ether vs. Epoch</Header>
        <Line data={lineData} options={options} />
      </div>
    );
  }
}

export default ValidatorAssignments;
