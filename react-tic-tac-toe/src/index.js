import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

/* Import Board and Scoreboard views */
import { Board } from './components/board';
import { Scoreboard } from './components/scoreboard';

import './styles/board.css';
import './styles/box.css';
import './styles/buttons.css';

/* Creat the App component */
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={Scoreboard}/>
          <Route path="/board" component={Board} />
        </BrowserRouter>
      </div>
    )
  }
}

/* Render the App component into the DOM */
ReactDOM.render(<App />, document.getElementById('root'));