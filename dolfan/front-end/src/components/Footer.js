import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import './Footer.css';
import line from '../images/line.png';
import twitter from '../images/twitter.png';
import facebook from '../images/facebook.png';

function Footer() {
    
    return(
        <React.Fragment>
                <div className="hr"/>
                <footer className="footer">
                    <div className="about">
                        <button className = "fabout" type="button">關於DOLFAN</button>
                        <font color="black">|</font>
                        <button className = "fabout" type="button">服務條款</button>
                        <font color="black">|</font>
                        <button className = "fabout" type="button">隱私政策</button>
                        <font color="black">|</font>
                        <button className = "fabout" type="button">聯絡我們</button>
                        <font color="black">|</font>
                        <button className = "fabout" type="button">FAQ</button>
                    </div>
                    <div className="fpicture">
                        <button className = "lmediabtn" type="button"><img className="lmediaimg" src={line}/></button>
                        <button className = "mediabtn" type="button"><img className="mediaimg" src={twitter}/></button>
                        <button className = "mediabtn" type="button"><img className="mediaimg" src={facebook}/></button>
                    </div>
                    <p style={{color:'grey', marginTop: '25px'}}> ©2022. All rights reserved.</p>
                </footer>
            </React.Fragment>
    );
}

export default Footer;