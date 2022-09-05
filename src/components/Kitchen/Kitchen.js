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

  
  if (error) return <h1>Technical difficulties, please visit us later.</h1>
  
  if (loading) return <h2>LOADING...</h2>
  
  if (data) {

    let newItems = [...data.getUserById.items];
  
    const getKitchen = (location) => {
      const filteredItems = newItems.filter(item => item.location === location);
      let sortedPreviews = filteredItems.sort((a, b) => {
        const date1 = new Date(a.expirationDate);
        const date2 = new Date(b.expirationDate);
        return date1 - date2
      }).map((item) => {
        return <Preview key={item.name} item={item} />
      })
      return sortedPreviews.splice(0,5)
    }

    return (
      <section className='kitchen-container'>
        <button className='kitchen-button'>ADD NEW FOOD</button>
        <article className='kitchen'>
          <div className='pantry'>
            <NavLink to='/pantry'>
              <div className='location-link'>
                <h3>Pantry</h3>
                <img className='location-img' src={Pantry} alt='pantry'/>
              </div>
            </NavLink>
            {getKitchen('pantry')}
          </div>
          <div className='fridge'>
            <NavLink to='/fridge'>
              <div className='location-link'>
                <h3>Fridge</h3>
                <img className='location-img' src={Fridge} alt='fridge'/>
              </div>
            </NavLink>
            {getKitchen('fridge')}
          </div>
          <div className='freezer'>
            <NavLink to='/freezer'>
              <div className='location-link'>
                <h3>Freezer</h3>
                  <img className='location-img' src={Freezer} alt='freezer'/>
              </div>
            </NavLink>
            {getKitchen('freezer')}
          </div>
        </article>
        <NavLink to='/expiring'>
          <button className='kitchen-button'>SHOW POSSIBLE DONATIONS</button>
        </NavLink>
      </section>
    ) 
  }
}

export default Kitchen;