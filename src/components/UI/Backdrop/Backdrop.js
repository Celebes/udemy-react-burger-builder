import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = (props) => (
    props.show ? <div className={styles.backdrop} onClick={() => props.handleClick()}/> : null
);

export default Backdrop;
