import * as React from 'react';
import Navigation from './components/Navigation/Navigation';
import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import './App.css';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
          <Navigation/>
          <div className='switch'>

              <LeftSide/>
              <RightSide/>
          </div>
      </div>
    );
  }
}

export default App;
