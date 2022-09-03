import './App.css';
import Navbar from '../Navbar/Navbar';
import Kitchen from '../Kitchen/Kitchen';
import Location from '../Location/Location';
import PossibleDonations from '../PossibleDonations/PossibleDonations';
import DonationsPage from '../DonationsPage/DonationsPage';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Kitchen />
        </Route>
        <Route exact path='/fridge'>
          <Location kitchenLocation='fridge'/>
        </Route>
        <Route exact path='/pantry'>
          <Location kitchenLocation='pantry'/>
        </Route>
        <Route exact path='/freezer'>
          <Location kitchenLocation='freezer'/>
        </Route>
        {/* We'll also need routes for donations page and new item page. */}
        <Route exact path='/expiring'>
          <PossibleDonations />
        </Route>
        <Route exact path='/donations'>
          <DonationsPage />
        </Route>
        <Route path='*'>
          <h2>Error - Please return to Home page</h2>
        </Route>
      </Switch>

    </main>
  )
}

export default App;
