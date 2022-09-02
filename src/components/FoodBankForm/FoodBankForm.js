import './FoodBankForm.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FOODBANKS_QUERY } from '../../graphql/queries';

const FoodBankForm = () => {

  const [inputLocation, setLocation] = useState('');

  const [getLocation, {loading, data, error}] = useLazyQuery(GET_FOODBANKS_QUERY, {
    variables: { location: inputLocation }
  })

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
    </section>
  )

}

export default FoodBankForm;