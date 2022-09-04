import './FoodBankForm.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FOODBANKS_QUERY } from '../../graphql/queries';

const FoodBankForm = () => {

  const [inputLocation, setLocation] = useState('');

  const [getLocation, {loading, data, error}] = useLazyQuery(GET_FOODBANKS_QUERY, {
    variables: { location: inputLocation }
  })

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>
  
  return (
    <section className='food-bank-form-container'>
      <h3 className='food-bank-heading'>Food Banks</h3>
      <article className='food-bank-form'>
        <input 
          type='text'
          placeholder='City, State'
          value={inputLocation}
          onChange={event => setLocation(event.target.value)}
        />
        <button className='submit-button' onClick={() => getLocation()}>Submit</button>
      </article>
      <article className='food-bank-info'>
        {data && (
          <>
            <p>Name:{data.getFoodBank.name} </p>
            <p>Address: {data.getFoodBank.address} </p>
            <p>Phone #: {data.getFoodBank.phoneNumber} </p>
            <p>Directions: {data.getFoodBank.directions}</p>
          </>
          )
        }
      </article>
    </section>
  )

}

export default FoodBankForm;