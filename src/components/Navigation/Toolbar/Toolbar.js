import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <div>
            <i className="fa fa-bars"  onClick={props.open}></i>
        </div>
        <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
            <Logo ></Logo>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}></NavigationItems>
        </nav>
    </header>
);

export default toolBar;