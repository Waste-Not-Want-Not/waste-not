import { useQuery, gql } from '@apollo/client';
import ItemCard from "../ItemCard/ItemCard"
import "./Location.css"

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
              image
          }
        }
      }
    `
  const {loading, data, error, refetch} = useQuery( GET_ITEMS_BY_LOCATION_QUERY, {
     variables: { id: 1 }
  })

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>
  
  
  if (data) {

    let newItems = [...data.getUserById[`${kitchenLocation}Items`]];
    
    let itemCards = newItems.sort((a, b) => {
      const date1 = new Date(a.expirationDate);
      const date2 = new Date(b.expirationDate);
      return date1 - date2
    }).map(item => {
      return <ItemCard item={item} key={Math.random()} refetch={refetch}/>
    })

    return (
      <section className="location-container">
        <div className='location'>
          <h3>{kitchenLocation.toUpperCase()}</h3>
        </div>
        <div className='location-items'>
          {itemCards}
        </div>
      </section>
    )
  }
}

export default Location