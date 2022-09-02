import './FoodBankForm.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FOODBANKS_QUERY } from '../../graphql/queries';

const FoodBankForm = () => {

  const [inputLocation, setLocation] = useState('');

  return (
    <section>
      {console.log(inputLocation)}
      <h3>Food Banks</h3>
      <form>
        <input 
          type='text'
          placeholder='City, State'
          value={inputLocation}
          onChange={event => setLocation(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </section>
  )

}

export default FoodBankForm;