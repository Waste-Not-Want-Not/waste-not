import React, { useState } from 'react';
import './ItemForm.css';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM } from '../../graphql/mutations';

const ItemForm = () => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const [createItem, {data, loading, error, refetch}] = useMutation(CREATE_ITEM);

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
          <option value='kitchen'>Select a location</option>
          <option value='pantry'>Pantry</option>
          <option value='fridge'>Fridge</option>
          <option value='freezer'>Freezer</option>
        </select>
        <input 
          type='date'
          placeholder='Expiration Date/Expected Expiration Date'
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <button onClick={()=> {
          createItem({ 
            variables: {
              input: {
                userId: 1,
                name,
                location, 
                expirationDate: `${date}T00:00:00Z`
              }
            }
          })
        }}>SUBMIT</button>
      </form>
    </section>
  )
}

export default ItemForm;