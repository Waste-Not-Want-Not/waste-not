import "./ItemCard.css"
const dayjs = require('dayjs')

const ItemCard = ({ item }) => {
    return (
        <article className="item-card-container">
            <p className="expiration">{dayjs(item.expirationDate).format('MM-DD-YYYY')}</p>
            <div className="item-card">
                {/* <img src={image} alt={name}/> */}
                <p>{item.name}</p>
                <button className="ate-button">ATE</button>
                <button className="donate-button">DONATE</button>
            </div>
        </article>
    )
}

export default ItemCard