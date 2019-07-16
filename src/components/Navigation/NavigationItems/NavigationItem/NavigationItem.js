import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={{ pathname: props.link }} exact={props.exact} activeClassName={classes.active}>
                {props.children}
            </NavLink>
            {/* <a className={props.active ? classes.active : null} href={props.link}>{props.children}</a> */}
        </li>
    );
};

export default NavigationItem;
