import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import About from './components/about';
import Attestations from './components/Attestations';
import Validators from './components/Validators';
import ValidatorAssignments from './components/ValidatorAssignments';
import { Menu } from 'semantic-ui-react';
import Blocks from './components/Blocks'

//TODO: fix hitting both eth/validators and eth/validators/assignments
//which causes 2 tables to render

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Menu className="ui green five item inverted menu">
          <Menu.Item as={Link} to="/about">
            About
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators">
            Active Validators
          </Menu.Item>
          <Menu.Item as={Link} to="/beacon/attestations">
            Beacon Attestations
          </Menu.Item>
          <Menu.Item as={Link} to="/beacon/blocks">
            Beacon Blocks
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators/assignments">
            Validator Assignments
          </Menu.Item>
        </Menu>
        <Route path="/about" component={About} />
        <Route exact path="/beacon/attestations" component={Attestations} />
        <Route exact path="/beacon/blocks" component={Blocks} />
        <Route exact path="/eth/validators" component={Validators} />
        <Route path="/eth/validators/assignments" component={ValidatorAssignments} />
      </div>
    </Router >
  );
}

export default App;
