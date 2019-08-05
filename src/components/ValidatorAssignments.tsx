import React, {Component, FunctionComponent } from 'react'; // importing FunctionComponent
import ValidatorCard from './ValidatorCard';
import validators from '../mock/validators.json';
import { Icon, Label, Menu, Table, Tab } from 'semantic-ui-react';

// fetch data in componentDidMount

const API = 'http://api.prylabs.network/eth/v1alpha1/validators/assignments';
const DEFAULT_QUERY = '';

// {
//   "epoch": "0",
//   "assignments": [
//     {
//       "crosslinkCommittees": [
//         "23",
//         "8",
//         "18",
//         "60",
//         "51",
//         "10",
//         "0",
//         "47"
//       ],
//       "shard": "6",
//       "slot": "6",
//       "proposer": false,
//       "publicKey": "sao25T46/2oUBPjzBKa+U0K2lEptQjPxxmPhX5h6ZJj97fNVaIWyFqfHXafGBmoY"
//     },

interface IState {
  data: {
    "epoch": string,
    "assignments": [
      {
        "crosslinkCommittees": Array<string>,
        "shard": string,
        "slot": string,
        "proposer": boolean,
        "publicKey": string
      }
    ]
  }
}

interface IProps {}

class ValidatorAssignments extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: {
        "epoch": '',
        "assignments": [
          {
            "crosslinkCommittees": [''],
            "shard": '',
            "slot": '',
            "proposer": false,
            "publicKey": ''
          }
        ]
      }
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => {
        // console.log('response in then', response.json())
        return response.json();
      })
      .then(data => this.setState({ data: data }))
  }
  
  render() {
    const { data } = this.state;
    console.log(data);

    return (
      <div>
        {data["epoch"]}
      </div>
    );
  }
}


export default ValidatorAssignments;


{/* <ul>
        {hits.map(hit  =>
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        )}
      </ul> */}

// const tableData = validators.validators;

// const headerRow = [
//   'Public Key1',
//   'Withdrawal Credentials',
//   'Activation Eligibility Epoch',
//   'Activation Epoch',
//   'Exit Epoch',
//   'Withdrawal Epoch',
//   'Slashed',
//   'Effective Balance'
// ]

// const renderBodyRow = ({
//   public_key,
//   withdrawal_credentials,
//   activation_eligiblity_epoch,
//   activation_epoch,
//   exit_epoch,
//   withdrawable_epoch,
//   slashed,
//   effective_balance
// }: {
//   public_key: string,
//   withdrawal_credentials: string,
//   activation_eligiblity_epoch: string,
//   activation_epoch: string,
//   exit_epoch: string,
//   withdrawable_epoch: string,
//   slashed: boolean,
//   effective_balance: string
// },
//   i: number) => ({
//     key: public_key || `row-${i}`,
//     cells: [
//       public_key,
//       withdrawal_credentials,
//       activation_eligiblity_epoch,
//       activation_epoch,
//       exit_epoch,
//       withdrawable_epoch,
//       slashed,
//       effective_balance
//     ],
//   })

// const ValidatorAssignments = () =>
//   <div>
//     <Table
//       celled headerRow={headerRow}
//       renderBodyRow={renderBodyRow}
//       tableData={tableData}
//     />
//     <div className="ui one column padded centered grid">
//       <Table.Footer>
//         <Table.Row>
//           <Table.HeaderCell>
//             <Menu>
//               <Menu.Item as='a' icon>
//                 <Icon name='chevron left' />
//               </Menu.Item>
//               <Menu.Item as='a'>1</Menu.Item>
//               <Menu.Item as='a'>2</Menu.Item>
//               <Menu.Item as='a'>3</Menu.Item>
//               <Menu.Item as='a'>4</Menu.Item>
//               <Menu.Item as='a' icon>
//                 <Icon name='chevron right' />
//               </Menu.Item>
//             </Menu>
//           </Table.HeaderCell>
//         </Table.Row>
//       </Table.Footer>
//     </div>
//   </div>