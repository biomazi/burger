import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState(() => {
            return {
                showSideDrawer: false
            };
        });
    };

    sideDrawerToggleHandler = () => {
        this.setState(state => {
            return {
                showSideDrawer: !state.showSideDrawer
            };
        });
    };

    render() {
        return (
            <>
                <div>ToolBar, SideDrawer, Backdrop</div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Container}>{this.props.children}</main>
            </>
        );
    }
}

export default Layout;
