import './App.css';
import Navbar from '../Navbar/Navbar';
import Kitchen from '../Kitchen/Kitchen';
import Location from '../Location/Location';
import { Switch, Router } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <Navbar />
      <Switch>
        <Router exact path='/'>
          <Kitchen />
        </Router>
        <Router path='/fridge'>
          <Location location='fridge'/>
        </Router>
        <Router path='/pantry'>
          <Location location='pantry'/>
        </Router>
        <Router path='/freezer'>
          <Location location='freezer'/>
        </Router>
        {/* We'll also need routes for donations page and new item page. */}
        <Router path='*'>
          <h2>Error - Please return to Home page</h2>
        </Router>
      </Switch>

    </main>
  )
}

export default App;
