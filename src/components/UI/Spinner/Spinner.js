import React from 'react';
import styles from './Spinner.module.css';

const Spinner = (props) => (
    <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}/>
    </div>
);

export default Spinner;
