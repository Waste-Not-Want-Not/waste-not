import "./ItemCard.css";
import { useMutation } from '@apollo/client';
import { DELETE_ITEM } from '../../graphql/mutations';
const dayjs = require('dayjs');


const ItemCard = ({ item, refetch }) => {

  const [deleteItem, {loading, error}] = useMutation(DELETE_ITEM);

  const getItemId = () => {
    console.log(item.id)
    
    deleteItem({
      variables: {
        input: {
          id: Number(item.id)
        }
      }
    })

    refetch();
  }

  if (error) return <h1>Technical difficulties, please visit us later.</h1>
  
  if (loading) return <h2>LOADING...</h2>

  return (
    <article className="item-card-container">
      <p className="expiration">Expiration Date: {dayjs(item.expirationDate).format('dddd, MMMM DD, YYYY')}</p>
      <div className="item-card">
        {/* <img src={image} alt={name}/> */}
        <div className='item-details'>
          <p>{item.name}</p>
          <p>Location: {item.location}</p>
        </div>
        <div>
          <button className="ate-button" onClick={() => getItemId()}>ATE</button>
          <button className="donate-button">DONATE</button>
        </div>
      </div>
    </article>
    )
}

export default ItemCard