import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {
    state = {
        sideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({sideDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState({sideDrawer: true});
    }
 
    render() {
        return (
            <React.Fragment>
            <Toolbar 
                open={this.sideDrawerOpenHandler}
                isAuth={this.props.isAuthenticated}></Toolbar>
            <SideDrawer 
                close={this.sideDrawerCloseHandler}
                isAuth={this.props.isAuthenticated}
                show={this.state.sideDrawer}></SideDrawer>
            <div>Toolbar, Side Drawer, Backdrop</div>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.tokenId !== null
    }
}

export default connect(mapStateToProps)(Layout);