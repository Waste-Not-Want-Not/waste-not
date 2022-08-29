import React, { useState } from 'react';
import './ItemForm.css';

const ItemForm = () => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  return (
    <section>
      <h2>Update/Add Food</h2>
      <form>
        <input 
          type='text'
          placeholder='Item Name'
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <select value={location} onChange={event => setLocation(event.target.value)}>
          <option>Pantry</option>
          <option>Fridge</option>
          <option>Freezer</option>
        </select>
        <input 
          type='text'
          placeholder='Expiration Date/Expected Expiration Date'
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <button>SUBMIT</button>
      </form>
    </section>
  )
}

export default ItemForm;