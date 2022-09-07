import "./ItemCard.css";
import { useMutation } from '@apollo/client';
import { DELETE_ITEM, UPDATE_ITEM } from '../../graphql/mutations';
const dayjs = require('dayjs');

const ItemCard = ({ item, refetch }) => {

  const [deleteItem, {loading, error}] = useMutation(DELETE_ITEM);

  const getItemId = () => {
    
    deleteItem({
      variables: {
        input: {
          id: Number(item.id)
        }
      }
    })
    refetch();
  }

  const [updateItem, {updateLoading, updateError}] = useMutation(UPDATE_ITEM);

  const updateForDonation = () => {
    updateItem({
      variables: {
        input: {
          id: Number(item.id)
        }
      }
    })
    alert(`${item.name} is ready for donation.  Confirm this donation on the donation page.`);
  }

  if (error || updateError) return <h1>Technical difficulties, please visit us later.</h1>
  
  if (loading || updateLoading) return <h2>LOADING...</h2>

  return (
    <article className="item-card-container">
      <p className="expiration">Expiration Date: {dayjs(item.expirationDate).format('dddd, MMMM DD, YYYY')}</p>
      <div className="item-card">
        <img className="item-image" src={item.image} alt={item.name}/>
        <div className='item-details'>
          <p>{item.name}</p>
          <p>Location: {item.location}</p>
        </div>
        <div>
          <button className="ate-button" onClick={() => getItemId()}>ATE</button>
          <button className="donate-button" onClick={() => updateForDonation()}>DONATE</button>
        </div>
      </div>
    </article>
    )
}

export default ItemCard