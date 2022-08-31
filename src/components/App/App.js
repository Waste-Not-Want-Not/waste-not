import './App.css';
import Navbar from '../Navbar/Navbar';
import Kitchen from '../Kitchen/Kitchen';
import Location from '../Location/Location';
import { Switch, Router } from 'react-router-dom';

const App = () => {
  return (
    <main className="App">
      <Navbar />
      <Kitchen />
      <Location />
    </main>
  )
}

export default App;
