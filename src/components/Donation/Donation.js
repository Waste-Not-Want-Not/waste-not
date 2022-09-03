import './Donation.css';

const Donation = ({item}) => {

  return(
    <article className="item-card-container">
      <p className="expiration">{item.expirationDate}</p>
      <div className="donation">
          {/* <img src={image} alt={name}/> */}
          <p>{item.name}</p>
          <p>{item.location}</p>
      </div>
    </article>
  )

}

export default Donation;