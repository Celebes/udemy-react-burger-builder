import React from 'react';
import styles from './DrawerToggle.module.css';

const DrawerToggle = (props) => (
    <div className={styles.drawerToggle} onClick={props.handleSideDrawerOpen}>
        <div/>
        <div/>
        <div/>
    </div>
);

export default DrawerToggle;
