import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import About from './components/about';
import Validators from './components/Validators';
import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="ui green three item inverted menu">
          <a className="active item">
            Home
          </a>
          <a className="item">
            Messages
          </a>
          <a className="item">
            Friends
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/eth/validators">Active Validators</Link>
            </li>
          </ul>
        </nav>
        <header className="App-header">
          <Route path="/about" component={About} />
          <Route path="/eth/validators" component={Validators} />
        </header>
      </div>
    </Router>
  );
}

export default App;
