import React, {Fragment} from 'react';
import styles from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    const sideDrawerClasses = [styles.sideDrawer];

    if (props.show) {
        sideDrawerClasses.push(styles.open);
    } else {
        sideDrawerClasses.push(styles.close);
    }

    return (
        <Fragment>
            <Backdrop show={props.show} handleClick={props.handleSideDrawerClose}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div className={styles.logoWrapper}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;
