import './App.css'
import Home from './pages/Home'
import Conversion from './pages/Conversion'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function App() {
  return (
    <Router className="app__container">
      <ul className="nav">
        <li className="logo">
          CONVERSION RATES
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/conversion">Conversion</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/conversion" component={Conversion}></Route>
      </Switch>
    </Router>
  )
}

export default App;
