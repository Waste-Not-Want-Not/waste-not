const ItemCard = ({ item }) => {
    const { image, expirationDate, name} = item;
    return (
        <article className="item-card-container">
            <p className="expiration">{expirationDate}</p>
            <div className="item-card">
                <img src={image} alt={name}/>
                <p>{name}</p>
                <button className="ate-button"></button>
                <button className="donate-button"></button>
            </div>
        </article>
    )
}