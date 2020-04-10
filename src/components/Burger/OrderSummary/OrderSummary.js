import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => <li key={key}>
            <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
        </li>);

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>Total Price: <b>{props.totalPrice.toFixed(2)}</b></p>
            <p>Continue to Checkout?</p>
            <Button buttonType="danger"
                    clicked={() => props.handleCancelPurchase()}>
                CANCEL
            </Button>
            <Button buttonType="success"
                    clicked={() => props.handleContinuePurchase()}>
                CONTINUE
            </Button>
        </Fragment>
    );
};

export default OrderSummary;
