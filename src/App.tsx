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
        <div className="ui green three item inverted menu">
          <a className="active item">
            <Link to="/about">About</Link>
          </a>
          <Menu.Item as={Link} to="/eth/validators" Î>
            Active Validators
          </Menu.Item>
          <a className="item">
            Friends (this space intentionally left blank 😢)
          </a>
        </div>
        <header>
          <Route path="/about" component={About} />
          <Route path="/eth/validators" component={Validators} />
        </header>
      </div>
    </Router >
  );
}

export default App;
