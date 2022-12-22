import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import './Header.css';
import menu from '../images/menu.png';
import logo from '../images/logo4.jpg';
import member from '../images/member.png';

function Header() {
    const memberpage = () => {
        window.location.assign('/signin');
    }

    return(
    <React.Fragment>
        <header className ="header">
        <button className="menubtn" id="menu"><img className="menupic" src={menu}/></button>
        <div className="asideMenu">
            <div className="title">LIST</div>

            <a href='/select'>
            <div className="idolbox">
            <p className="idol">CALENDAR</p>
            </div>
            </a>

            <a href='/merch'>
            <div className="idolbox">
            <p className="idol">MERCH</p>
            </div>
            </a>

        </div>
        <a className="logohref" href='/'><button className="logobtn" id="logo"><img className="logopic" src={logo}/></button></a>
        
        <button className="memberbtn" id="member" onClick={memberpage}><img className="memberpic" src={member}/></button>
        </header>
        {/* <div className="headerhr"></div> */}
    </React.Fragment>
    );
}

export default Header;