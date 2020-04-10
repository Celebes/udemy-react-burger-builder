import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className={styles.toolbar}>
        <DrawerToggle handleSideDrawerOpen={props.handleSideDrawerOpen}/>
        <div className={styles.logoWrapper}>
            <Logo/>
        </div>
        <nav className={styles.desktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default Toolbar;
