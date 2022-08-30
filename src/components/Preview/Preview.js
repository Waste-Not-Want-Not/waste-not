import React from 'react';
import './Preview.css';

const Previews = ({ item }) => {
  return (
    <article className='item-preview'>
      <h4>{item.name}</h4>
      {/* <img /> */}
    </article>
  )
}

export default Previews;