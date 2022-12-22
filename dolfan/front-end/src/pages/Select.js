import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Select.css';
import straykids from '../images/straykids1.jpg';
import twice from '../images/twice1.jpg';
import redvelvet from '../images/redvelvet1.jpg';
function Select() {
    const jwtToken = window.localStorage.getItem('jwtToken');
    if (!jwtToken) {
        window.alert("請先登入!")
        window.location.assign("/signin")
    }
    return (
        <React.Fragment>
            <div className='area'>
                <a href='/schedule/straykids'>
                    <div className='schedulearea'>
                        <img id="idolimg" style={{ width: '435px', height: '290px', marginTop: '20px' }} src={straykids}></img>
                        <div className="txt">Stray Kids</div>
                    </div>
                </a>
                <a href='/schedule/twice'>
                    <div className='schedulearea' style={{ backgroundColor: '#ffefaa' }}>
                        <img id="idolimg" style={{ width: '435px', height: '290px', marginTop: '20px' }} src={twice}></img>
                        <div className="txt">TWICE</div>
                    </div>
                </a>
                <a href='/schedule/redvelvet'>
                    <div className='schedulearea'>
                        <img id="idolimg" style={{ width: '435px', height: '290px', marginTop: '20px' }} src={redvelvet}></img>
                        <div className="txt">Red Velvet</div>
                    </div>
                </a>
            </div>
        </React.Fragment>
    );
}
export default Select;