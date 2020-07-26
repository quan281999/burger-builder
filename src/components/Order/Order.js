import React from 'react'
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        })
    }
    const ingredientsOutput = ingredients.map((item, index) => (
        <span key={index} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '5px 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>{item.name}: {item.amount}</span>
    ))
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;