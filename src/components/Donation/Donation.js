import './Donation.css';
const dayjs = require('dayjs');

const Donation = ({item}) => {

  return(
    <article className="item-card-container">
      <p className="expiration">{dayjs(item.expirationDate).format('dddd, MMMM DD, YYYY')}</p>
      <div className="donation">
        <img className="donation-image" src={item.image} alt={item.name}/>
        <div>
          <p>{item.name}</p>
          <p>Location: {item.location}</p>
        </div>
      </div>
    </article>
  )

}

export default Donation;