import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
    <div className={styles.buildControls}>
        <p>Current Price: <b>{props.totalPrice.toFixed(2)}</b></p>
        {controls.map(c => <BuildControl key={c.label}
                                         label={c.label}
                                         addIngredient={() => props.handleAddIngredient(c.type)}
                                         removeIngredient={() => props.handleRemoveIngredient(c.type)}
                                         disabled={props.disabled[c.type]}/>)}
        <button className={styles.orderButton}
                disabled={!props.purchasable}
                onClick={() => props.handlePurchase()}>
            ORDER NOW
        </button>
    </div>
);

export default BuildControls;
