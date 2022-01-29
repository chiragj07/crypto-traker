import React from 'react';
import './card.css'
const Card = ({item}) => {
    return (
        <div className='card'>  
            <img src={item.small} alt={item.name} />
            <span>{item.name}</span>
            <span>{item.price_btc}</span>
        </div>
    )
};

export default Card;
