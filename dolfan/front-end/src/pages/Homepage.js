import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import './Homepage.css';
import MyCarousel from './Carousel.js'
function Homepage() {
    return(
        <React.Fragment>
            <div className='homecarousel'>
            <MyCarousel/>
            </div>
            <div className='homeinfos'>
            <div className='homeinfo'>
                <div className='info1'>Intro</div>
                <div className='info2'></div>
            </div>
            <div className='homeinfo'>
                <div className='info1'>Notice</div>
                <div className='info2'></div>
            </div>
            <div className='homeinfo'>
                <div className='info1'>News</div>
                <div className='info2'></div>
            </div>
            <div className='homeinfo'>
                <div className='info1'>Music Video</div>
                <div className='info2'></div>
            </div>
            </div>
        </React.Fragment>
    );
}
export default Homepage;