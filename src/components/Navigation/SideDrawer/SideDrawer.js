import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses.pop();
        attachedClasses.push(classes.Open);
    }
    return (
        <React.Fragment>
            <div className={classes.Backdrop}>
                <Backdrop show={props.show} clicked={props.close}></Backdrop>
            </div>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav onClick={props.close}>
                    <NavigationItems isAuth={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;