import React from 'react';
import './Kitchen.css';
import Preview from '../Preview/Preview';
import Pantry from '../../assets/pantry.png';
import Fridge from '../../assets/fridge.png';
import Freezer from '../../assets/freezer.png';
import { useQuery } from '@apollo/client';
import { GET_ITEMS_QUERY } from '../../graphql/queries';
import { NavLink } from 'react-router-dom';

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

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>

  if (data) {
    return (
      <section className='kitchen-container'>
        <button>ADD NEW FOOD</button>
        <article className='kitchen'>
          <div className='pantry'>
            <div className='location-link'>
              <NavLink to='/pantry'>
                <img className='location-img' src={Pantry} alt='pantry'/>
                <h3>Pantry</h3>
              </NavLink>
            </div>
            {getKitchen('pantry')}
          </div>
          <div className='fridge'>
            <div className='location-link'>
              <NavLink to='/fridge'>
                <img className='location-img' src={Fridge} alt='fridge'/>
                <h3>Fridge</h3>
              </NavLink>
            </div>
            {getKitchen('fridge')}
          </div>
          <div className='freezer'>
            <div className='location-link'>
              <NavLink to='/freezer'>
                <img className='location-img' src={Freezer} alt='freezer'/>
                <h3>Freezer</h3>
              </NavLink>
            </div>
            {getKitchen('freezer')}
          </div>
        </article>
        <button>SHOW POSSIBLE DONATIONS</button>
      </section>
    ) 
  }
}

export default Kitchen;