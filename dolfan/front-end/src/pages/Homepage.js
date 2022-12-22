import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Homepage.css';
import News1 from '../images/News1.jpg';
import News3 from '../images/News3.jpg';
import News4 from '../images/News4.jpg';
import News5 from '../images/News5.gif';
import MyCarousel from './Carousel.js'
function Homepage() {
    window.onload = () => {
        document.getElementById("News5").addEventListener('click', function () {
            document.getElementById("News5").src = document.getElementById("News5").src;
        })
    }
    return (
        <React.Fragment>
            <div className='homecarousel'>
                <MyCarousel />
            </div>
            <div className='homeinfos'>
                <div className='homeinfo'>
                    <div className='info1'>SKZ-REPLAY</div>
                    <div className='info2'>
                        <div className='infodetail'>
                            <img src={News1} style={{ width: '110px', height: '110px', margin: '15px' }}></img>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '6px', margin: '5px' }}>Stray Kids(스트레이 키즈) <br />&lt;SKZ-REPLAY&gt; COVER 2022.12.21 WED <br />6PM (KST) | 4AM (EST)</div>
                                <a href='https://stray-kids.lnk.to/SKZ-REPLAY'><div style={{ fontSize: '4px', marginLeft: '71px' }}>View more...</div></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='homeinfo'>
                    <div className='homeinfo'>
                        <div className='info1'>HAN DAY</div>
                        <div className='info2'>
                            <div className='infodetail'>
                                <img id="News5" src={News5} style={{ width: '110px', height: '110px', margin: '15px' }}></img>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '6px', margin: '5px' }}> 황제 쿼카 탄신일🐿🎂 HAPPY BIRTHDAY HAN #HappyHANDay #HANInALifeTime<br />#StrayKids #한 #HAN</div>
                                    <a href='https://www.vlive.tv/post/0-30538025'><div style={{ fontSize: '4px', marginLeft: '71px' }}>View more...</div></a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='homeinfo'>
                    <div className='info1'>SMCU</div>
                    <div className='info2'>
                        <div className='infodetail'>
                            <img src={News4} style={{ width: '110px', height: '110px', margin: '15px' }}></img>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '6px', margin: '5px' }}> 'Beautiful Christmas'<br /> 2022 Winter SMTOWN : SMCU PALACE single<br />&lt;Red Velvet, aespa&gt; 2022/12/14</div>
                                <a href='https://www.youtube.com/watch?v=iTgcp1oDk2M'><div style={{ fontSize: '4px', marginLeft: '71px' }}>View more...</div></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='homeinfo'>
                    <div className='info1'>IM NAYEON</div>
                    <div className='info2'>
                        <div className='infodetail'>
                            <img src={News3} style={{ width: '110px', height: '110px', margin: '15px' }}></img>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '6px', margin: '5px' }}>The 1st Mini Album "IM NAYEON" M/V <br /> #TWICE #트와이스 #NAYEON #나연 #IM_NAYEON #POP❣</div>
                                <a href='https://nayeon.lnk.to/IMNAYEON'><div style={{ fontSize: '4px', marginLeft: '71px' }}>View more...</div></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Homepage;