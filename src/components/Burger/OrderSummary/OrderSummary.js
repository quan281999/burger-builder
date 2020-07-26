import React from 'react';
import Button from '../../../components/UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((key) => [key ,props.ingredients[key]])
    .map((item, index) => (
        <li key={index}><span style={{textTransform: 'capitalize'}}>{item[0]}</span>: {item[1]}</li>
    ));
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' onClick={props.cancel}>CANCEL</Button>
            <Button btnType='Success' onClick={props.continue}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default orderSummary;