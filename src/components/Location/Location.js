import { useQuery, gql } from '@apollo/client';
import { ItemCard } from "../../ItemCard/ItemCard"

const Location = () => {
  const location = 'pantry'
  const GET_ITEMS_BY_LOCATION_QUERY = gql`
    query getUserById($id: ID!) {
      getUserById(id: $id) {
          id
          name
          email
          ${location}Items {
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
 
  const itemCards = data.getUserById[`${location}Items`].map(item => {
    return <ItemCard item={item} key={item.id}/>
  })
  if (data) return (
    <section className="location-container">
      {console.log(data.getUserById[`${location}Items`][0].name)}
      <div className='location'>
        <h3>LOCATION PLACEHOLDER</h3>
        {itemCards}
      </div>
    </section>
  )
}

export default Location