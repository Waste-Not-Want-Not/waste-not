import { useQuery, gql } from '@apollo/client';
import ItemCard from "../ItemCard/ItemCard"
import "./Location.css"
const dayjs = require('dayjs')

const Location = ({kitchenLocation}) => {
  
  const GET_ITEMS_BY_LOCATION_QUERY = gql`
    query getUserById($id: ID!) {
      getUserById(id: $id) {
          id
          name
          email
          ${kitchenLocation}Items {
              id
              name
              expirationDate
              location
          }
        }
      }
    `
  const {loading, data, error} = useQuery( GET_ITEMS_BY_LOCATION_QUERY, {
     variables: { id: 1 }
  })

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>
  
  let newItems = [...data.getUserById[`${kitchenLocation}Items`]];

  let itemCards = newItems.sort((a, b) => {
    const date1 = new Date(a.expirationDate);
    const date2 = new Date(b.expirationDate);
    return date1 - date2
  }).map(item => {
    return <ItemCard item={item} key={item.id}/>
  })

  if (data) return (
    <section className="location-container">
      {console.log()}
      <div className='location'>
        <h3>{kitchenLocation.toUpperCase()}</h3>
        {itemCards}
      </div>
    </section>
  )
}

export default Location