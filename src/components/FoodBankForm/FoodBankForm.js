import './FoodBankForm.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FOODBANKS_QUERY } from '../../graphql/queries';

const FoodBankForm = () => {

  const [inputLocation, setLocation] = useState('');

  const [getLocation, {loading, data, error}] = useLazyQuery(GET_FOODBANKS_QUERY, {
    variables: { location: inputLocation }
  })

  if (error) return <h1>Error Found</h1>
  
  return (
    <section>
      {console.log(data)}
      <h3>Food Banks</h3>
      <div>
        <input 
          type='text'
          placeholder='City, State'
          value={inputLocation}
          onChange={event => setLocation(event.target.value)}
        />
        <button onClick={() => getLocation()}>Submit</button>
      </div>
      <article>
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