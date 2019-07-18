import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import About from './components/about'; 
import Validators from './components/Validators'; 

const App: React.FC = () => {
  return (
    <Router> 
      <div className="App">
        <header className="App-header">
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
        </header>
        <Route path="/about" component={About} />
        <Route path="/eth/validators" component={Validators} />
      </div>
    </Router>
  );
}

export default App;
