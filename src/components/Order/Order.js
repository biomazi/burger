import React from 'react';
import classes from './Order.module.css';

const Order = props => {
    const ingredients = [];
    for (const ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
    }

    const ingredientOutput = ingredients.map(item => {
        return (
            <span
                key={item.name}
                style={{
                    textTransfomr: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
					padding: '5px',
                    border: '1px solid #ccc'
                }}
            >
                {item.name} ({item.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>
                Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
