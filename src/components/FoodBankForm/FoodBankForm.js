import './FoodBankForm.css';
import { states } from './state-array';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FOODBANKS_QUERY } from '../../graphql/queries';

const FoodBankForm = () => {

  const [inputLocation, setLocation] = useState('');

  const [getLocation, {loading, data, error}] = useLazyQuery(GET_FOODBANKS_QUERY);

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>

  const handleClick = event => {
    event.preventDefault();
      // if (!inputLocation.includes(states.forEach(state => state))) {
      //   alert('Please submit a valid city and state!')
      // } else {
        getLocation({
          variables: {
            location: inputLocation
          }
        })
        alert('Location Submitted! Here is a near by food bank for you to donate your food to 😁');
        setLocation('');
  }

  return (
    <section className='food-bank-form-container'>
      <h3 className='food-bank-heading'>Food Banks</h3>
      <form className='food-bank-form' onSubmit={(event) => handleClick(event)}>
        <input 
          type='text'
          placeholder='City, State Abbreviation (I.E. CO)'
          value={inputLocation}
          onChange={event => setLocation(event.target.value)}
          required
        />
        <button className='submit-button'>Submit Location</button>
      </form>
      <article className='food-bank-info'>
        {data && (
          <>
            <p>Name: {data.getFoodBank.name} </p>
            <p>Phone #: {data.getFoodBank.phoneNumber}</p>
            <p>Address: {data.getFoodBank.address} </p>
            <p>Directions: {data.getFoodBank.directions}</p>
          </>
          )
        }
      </article>
    </section>
  )
}

export default FoodBankForm;