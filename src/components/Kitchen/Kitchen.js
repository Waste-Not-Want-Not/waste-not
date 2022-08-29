import React from 'react';
import './Kitchen.css';
// import Pantry from '../assets/pantry.png'
// import Fridge from '../assets/fridge.png'
// import Freezer from '../assets/freezer.png'

const Kitchen = () => {
  return (
    <section className='kitchen-container'>
      {/* <img src={require (Pantry)} alt='pantry'/>
      <img src={require (Fridge)} alt='fridge'/>
      <img src={require (Freezer)} alt='freezer'/> */}
      <button>ADD NEW FOOD</button>
      <article className='kitchen'>
        <div className='pantry'>
          <h3>Pantry</h3>
        </div>
        <div className='fridge'>
          <h3>Fridge</h3>
        </div>
        <div className='freezer'>
          <h3>Freezer</h3>
        </div>
      </article>
      <button>SHOW POSSIBLE DONATIONS</button>
    </section>
  ) 
}

export default Kitchen;