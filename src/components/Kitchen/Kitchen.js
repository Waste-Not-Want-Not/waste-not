import React from 'react';
import './Kitchen.css';
import Preview from '../Preview/Preview';
// import Pantry from '../assets/pantry.png'
// import Fridge from '../assets/fridge.png'
// import Freezer from '../assets/freezer.png'
import { useQuery } from '@apollo/client';
import { GET_ITEMS_QUERY } from '../../graphql/queries';

const Kitchen = () => {

  const {loading, data, error} = useQuery( GET_ITEMS_QUERY, {
    variables: { id: 1 }
  })

  const getKitchen = (location) => {
    const filteredItems = data.getUserById.items.filter(item => item.location === location);
    const previews = filteredItems.map((item) => {
      return <Preview key={item.name} item={item} />
    })
    return previews
  }

  if (loading) {
    return <p></p>
  }
  if (data) {
    return (
      <section className='kitchen-container'>
        {/* {console.log(data.getUserById.items)} */}
        {/* <img src={require (Pantry)} alt='pantry'/>
        <img src={require (Fridge)} alt='fridge'/>
        <img src={require (Freezer)} alt='freezer'/> */}
        <button>ADD NEW FOOD</button>
        <article className='kitchen'>
          <div className='pantry'>
            <h3>Pantry</h3>
            {getKitchen('Pantry')}
          </div>
          <div className='fridge'>
            <h3>Fridge</h3>
            {getKitchen('Fridge')}
          </div>
          <div className='freezer'>
            <h3>Freezer</h3>
            {getKitchen('Freezer')}
          </div>
        </article>
        <button>SHOW POSSIBLE DONATIONS</button>
      </section>
    ) 
  }
}

export default Kitchen;