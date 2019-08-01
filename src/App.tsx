import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import About from './components/about';
import Attestations from './components/Attestations';
import Validators from './components/Validators';
import { Menu } from 'semantic-ui-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Menu className="ui green three item inverted menu">
          <Menu.Item as={Link} to="/about">
            About
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators">
            Active Validators
          </Menu.Item>
          <Menu.Item as={Link} to="/beacon/attestations">
            Beacon Attestations
          </Menu.Item>
        </Menu>
        <Route path="/about" component={About} />
        <Route path="/beacon/attestations" component={Attestations} />
        <Route path="/eth/validators" component={Validators} />
      </div>
    </Router >
  );
}

export default App;
