import React, {Component, Fragment} from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    handleSideDrawerOpen = () => {
        this.setState({showSideDrawer: true});
    };

    handleSideDrawerClose = () => {
        this.setState({showSideDrawer: false});
    };

    render() {
        return (
            <Fragment>
                <Toolbar handleSideDrawerOpen={this.handleSideDrawerOpen}/>
                <SideDrawer show={this.state.showSideDrawer}
                            handleSideDrawerClose={this.handleSideDrawerClose}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
