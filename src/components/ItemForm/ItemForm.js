import React, { useState } from 'react';
import './ItemForm.css';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM } from '../../graphql/mutations';

const ItemForm = ({refetch}) => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const [createItem, { data, loading, error}] = useMutation(CREATE_ITEM);

  if (error) return <h1>Technical difficulties, please visit us later.</h1>
  
  if (loading) return <h2>LOADING...</h2>

  const clearInputs = () => {
    setName('');
    setLocation('');
    setDate('');
  }

  const handleClick = () => {
    createItem({ 
      variables: {
        input: {
          userId: 1,
          name,
          location, 
          expirationDate: `${date}T00:00:00Z`
        }
      },
    });
    refetch();
    alert(`${name} was added to the ${location}!`)
    clearInputs();
  }
  
  return (
    <section>
      <h2>Update/Add Food</h2>
      {console.log(data)}
      <div>
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
        <button onClick={() => handleClick()}>SUBMIT</button>
      </div>
    </section>
    )
  }


export default ItemForm;