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

  // const convertDates = () => {
  //   let formatedDates = []
  //   data.getUserById[`${kitchenLocation}Items`].forEach((item) => {
  //     dayjs(item.expirationDate).format('YYYY-MM-DD')
  //     formatedDates.push()
  //   })
  // }

  if (error) return <h1>Technical difficulties, please visit us later.</h1>

  if (loading) return <h2>LOADING...</h2>
 
  const itemCards = data.getUserById[`${kitchenLocation}Items`].map(item => {
    // item.expirationDate = dayjs(item.expirationDate).format('YYYY-MM-DD')
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