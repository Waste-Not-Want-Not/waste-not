import ItemCard from "../ItemCard/ItemCard"
import "./PossibleDonations.css"
import { useQuery } from '@apollo/client';
import { GET_ITEMS_QUERY } from '../../graphql/queries';

const PossibleDonations = () => {

  const {loading, data, error} = useQuery( GET_ITEMS_QUERY, {
    variables: { id: 1 }
 })

 if (error) return <h1>Technical difficulties, please visit us later.</h1>

 if (loading) return <h2>LOADING...</h2>

 if (data) {

   let newItems = [...data.getUserById.items];
   
   let itemCards = newItems.sort((a, b) => {
     const date1 = new Date(a.expirationDate);
     const date2 = new Date(b.expirationDate);
     return date1 - date2
   }).map(item => {
     return <ItemCard item={item} key={Math.random()}/>
   }).splice(0, 10)

   return (
     <section className="possible-donation-container">
       <div className='location'>
         <h3>Possible Donations</h3>
         {itemCards}
       </div>
     </section>
   )
 }
}

export default PossibleDonations;