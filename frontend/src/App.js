import logo from './logo.svg';
import './App.css';
import Game from "./components/Game/game"
import Login from "./components/login"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/game" component={Game} />
        </div>
      </Router>
    </Provider>
    

  );
}

export default App;
