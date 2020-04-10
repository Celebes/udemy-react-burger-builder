import React from 'react';
import styles from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props) => (
    <div className={styles.logo}>
        <img src={burgerLogo} alt=""/>
    </div>
);

export default Logo;
