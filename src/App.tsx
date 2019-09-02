import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import About from './components/about';
import Attestations from './components/Attestations';
import Validators from './components/Validators';
import ValidatorAssignments from './components/ValidatorAssignments';
import ValidatorParticipation from './components/ValidatorParticipation';
import { Dropdown, Menu } from 'semantic-ui-react';
import Blocks from './components/Blocks'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Menu className="ui green three item inverted menu">
          <Menu.Item as={Link} to="/about">
            About
          </Menu.Item>
          <Menu.Item as={Dropdown} text='Beacon'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/beacon/attestations" text='Beacon Attestations' />
              <Dropdown.Item as={Link} to="/beacon/attestations/pool" text='Beacon Attestations Pool' />
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/beacon/blocks" text='Beacon Blocks' />
            </Dropdown.Menu>
          </Menu.Item>
          <Menu.Item as={Dropdown} text='Validators'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/eth/validators" text='Active Validators' />
              <Dropdown.Item as={Link} to="/eth/validators/assignments" text='Validator Assignments' />
              <Dropdown.Item as={Link} to="/eth/validators/participation" text='Validator Participation' />
            </Dropdown.Menu>
          </Menu.Item>
        </Menu>
        <Route path="/about" component={About} />
        <Route exact path="/beacon/attestations"
          render={(props) => <Attestations {...props} api='http://api.prylabs.network/eth/v1alpha1/beacon/attestations' />}
        />
        <Route exact path="/beacon/attestations/pool"
          render={(props) => <Attestations {...props} api='http://api.prylabs.network/eth/v1alpha1/beacon/attestations/pool' />}
        />
        <Route exact path="/beacon/blocks" component={Blocks} />
        <Route exact path="/eth/validators" component={Validators} />
        <Route exact path="/eth/validators/assignments" component={ValidatorAssignments} />
        <Route exact path="/eth/validators/participation" component={ValidatorParticipation} />
      </div>
    </Router >
  );
}

export default App;
