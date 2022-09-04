import './Donation.css';

const Donation = ({item}) => {

  return(
    <article className="item-card-container">
      <p className="expiration">{item.expirationDate}</p>
      <div className="donation">
        {/* <img src={image} alt={name}/> */}
        <div>
          <p>{item.name}</p>
          <p>Location: {item.location}</p>
        </div>
      </div>
    </article>
  )

}

export default Donation;