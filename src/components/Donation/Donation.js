import './Donation.css';
const dayjs = require('dayjs');

const Donation = ({item}) => {
  return(
    <article className="item-card-container">
      <p className="donation-expiration">{dayjs(item.expirationDate).format('dddd, MMMM DD, YYYY')}</p>
      <div className="donation">
        <img className="donation-image" src={item.image} alt={item.name}/>
        <div className='donation-info'>
          <p>Item: {item.name}</p>
          <p>Location: {item.location.toUpperCase()}</p>
          <p>Ready for Donation!</p>
        </div>
      </div>
    </article>
  )

}

export default Donation;