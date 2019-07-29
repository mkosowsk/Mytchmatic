import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import About from './components/about';
import Validators from './components/Validators';
import { Menu } from 'semantic-ui-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Menu className="ui green three item inverted menu">
          <Menu.Item as={Link} to="/about" Î>
            About
          </Menu.Item>
          <Menu.Item as={Link} to="/eth/validators" Î>
            Active Validators
          </Menu.Item>
          <Menu.Item>
            Friends (this space intentionally left blank 😢)
          </Menu.Item>
        </Menu>
        <header>
          <Route path="/about" component={About} />
          <Route path="/eth/validators" component={Validators} />
        </header>
      </div>
    </Router >
  );
}

export default App;
