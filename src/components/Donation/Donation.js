import 'Donation.css';

const Donation = () => {

  return(
    <article className="item-card-container">
      <p className="expiration">{expirationDate}</p>
      <div className="donation">
          {/* <img src={image} alt={name}/> */}
          <p>{name}</p>
          <p>{location}</p>
      </div>
    </article>
  )

}

export default Donation;