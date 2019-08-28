import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import About from './components/about';
import Attestations from './components/Attestations';
import AttestationsPool from './components/AttestationsPool';
import Validators from './components/Validators';
import ValidatorAssignments from './components/ValidatorAssignments';
import ValidatorParticipation from './components/ValidatorParticipation';
import { Dropdown, Menu } from 'semantic-ui-react';
import Blocks from './components/Blocks'

//TODO: fix hitting both eth/validators and eth/validators/assignments
//which causes 2 tables to render

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Menu className="ui green eight item inverted menu">
          <Menu.Item as={Link} to="/about">
            About
          </Menu.Item>
          <Menu.Item>
            <Dropdown text='Beacon'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/beacon/attestations" text='Beacon Attestations' />
                <Dropdown.Item as={Link} to="/beacon/attestations/pool" text='Beacon Attestations Pool' description='ctrl + o' />
                <Dropdown.Item text='Save as...' description='ctrl + s' />
                <Dropdown.Item text='Rename' description='ctrl + r' />
                <Dropdown.Item text='Make a copy' />
                <Dropdown.Item icon='folder' text='Move to folder' />
                <Dropdown.Item icon='trash' text='Move to trash' />
                <Dropdown.Divider />
                <Dropdown.Item text='Download As...' />
                <Dropdown.Item text='Publish To Web' />
                <Dropdown.Item text='E-mail Collaborators' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators">
            Active Validators
          </Menu.Item>
          <Menu.Item as={Link} to="/beacon/blocks">
            Beacon Blocks
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators/assignments">
            Validator Assignments
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators/participation">
            Validator Participation
          </Menu.Item>
        </Menu>
        <Route path="/about" component={About} />
        <Route exact path="/beacon/attestations" component={Attestations} />
        <Route exact path="/beacon/attestations/pool" component={AttestationsPool} />
        <Route exact path="/beacon/blocks" component={Blocks} />
        <Route exact path="/eth/validators" component={Validators} />
        <Route exact path="/eth/validators/assignments" component={ValidatorAssignments} />
        <Route exact path="/eth/validators/participation" component={ValidatorParticipation} />
      </div>
    </Router >
  );
}

export default App;
