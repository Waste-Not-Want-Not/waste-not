import ItemCard from "../ItemCard/ItemCard"
import "./PossibleDonations.css"
import { useQuery } from '@apollo/client';
import { GET_ITEMS_QUERY } from '../../graphql/queries';

const PossibleDonations = () => {

  const {loading, data, error, refetch} = useQuery( GET_ITEMS_QUERY, {
    variables: { id: 1 }
 })

 if (error) return <h1 className='error'>Technical difficulties, please visit us later.</h1>

 if (loading) return <h2 className='loading'>LOADING...</h2>

 if (data) {

  
   let newItems = [...data.getUserById.items];
   
   let itemCards = newItems.sort((a, b) => {
     const date1 = new Date(a.expirationDate);
     const date2 = new Date(b.expirationDate);
     return date1 - date2
   }).map(item => {
      console.log(item.id);
     return <ItemCard item={item} key={Math.random()} refetch={refetch}/>
   }).splice(0, 10)

   return (
     <section className="possible-donation-container">
       <div className='location'>
         <h3>Possible Donations</h3>
         <div className='location-items'>
          {itemCards}  
         </div>
       </div>
     </section>
   )
 }
}

export default PossibleDonations;