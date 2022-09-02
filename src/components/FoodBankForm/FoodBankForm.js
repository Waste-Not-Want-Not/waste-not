import './FoodBankForm.css';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FOODBANKS_QUERY } from '../../graphql/queries';

const FoodBankForm = () => {



  return (
    <section>
      <h3>Food Banks</h3>
      <form>
        <input 
          type='text'
          placeholder='City, State'

        />
        <button>Submit</button>
      </form>
    </section>
  )

}

export default FoodBankForm;