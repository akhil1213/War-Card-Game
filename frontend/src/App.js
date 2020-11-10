import logo from './logo.svg';
import './App.css';
import Game from "./components/Game/game"
import Login from "./components/login"
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Game} />
        <Route path="/login" component={Login} />
      </div>
    </Router>

  );
}

export default App;
