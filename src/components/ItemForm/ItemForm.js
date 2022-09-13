import React, { useState } from 'react';
import './ItemForm.css';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM } from '../../graphql/mutations';

const ItemForm = ({ refetch }) => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const [createItem, {loading, error}] = useMutation(CREATE_ITEM);

  if (error) return <h1 className='error'>Technical difficulties, please visit us later.</h1>
  
  if (loading) return <h2 className='loading'>LOADING...</h2>

  const clearInputs = () => {
    setName('');
    setLocation('');
    setDate('');
  }

  const handleClick = event => {
    event.preventDefault();
    if (name && location && date) {
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
    else {
      alert('Please fill out all fields to add an item!')
    }
  }
  
  return (
    <section className='item-form-container'>
      <h2>Add Item</h2>
      <form onSubmit={(event) => handleClick(event)}>
        <input 
          type='text'
          placeholder='Item Name'
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
        <select value={location} onChange={event => setLocation(event.target.value)}>
          <option value=''>Select a location</option>
          <option value='pantry'>Pantry</option>
          <option value='fridge'>Fridge</option>
          <option value='freezer' >Freezer</option>
        </select>
        <input 
          type='date'
          placeholder='Expiration Date/Expected Expiration Date'
          value={date}
          onChange={event => setDate(event.target.value)}
          required
        />
        <button>ADD FOOD</button>
      </form>
    </section>
    )
  }


export default ItemForm;