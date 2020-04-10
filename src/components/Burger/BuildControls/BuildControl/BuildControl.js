import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={styles.buildControl}>
        <div className={styles.label}>{props.label}</div>
        <button disabled={props.disabled}
                className={styles.less}
                onClick={props.removeIngredient}>
            Less
        </button>
        <button className={styles.more}
                onClick={props.addIngredient}>
            More
        </button>
    </div>
);

export default BuildControl;
