import "./ItemCard.css"

const ItemCard = ({ item }) => {
    const { expirationDate, name} = item;
    return (
        <article className="item-card-container">
            <p className="expiration">{expirationDate}</p>
            <div className="item-card">
                {/* <img src={image} alt={name}/> */}
                <p>{name}</p>
                <button className="ate-button">ATE</button>
                <button className="donate-button">DONATE</button>
            </div>
        </article>
    )
}

export default ItemCard