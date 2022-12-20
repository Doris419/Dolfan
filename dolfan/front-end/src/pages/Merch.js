import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Merch.css';
import add from '../images/plus.png';
import closepic from '../images/close.png';
function Merch() {
    const [profile, setProfile] = React.useState();
    const [merch, setMerch] = React.useState([]);
    var hostname = "http://54.151.195.15:4000/api/v1";
    var path = "http://54.151.195.15:4000";
    const jwtToken = window.localStorage.getItem('jwtToken');

    React.useEffect(() => {
        if (!jwtToken) {
            window.alert("請先登入!")
            window.location.assign("/signin")
        }

        if (jwtToken) {

            fetch(`${hostname}/merch/straykids`)
                .then((json) => json.json())
                .then((result) => setMerch(result))
                .catch(error => window.alert(error))

            fetch(`${hostname}/user/profile`, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                }),
            })
                .then((response) => response.json())
                .then((json) => setProfile(json.data));
        }
    }, []);

    const skz = async () => {
        await fetch(`${hostname}/merch/straykids`)
            .then((json) => json.json())
            .then((result) => setMerch(result))
            .catch(error => window.alert(error))
    }
    const tw = async () => {
        await fetch(`${hostname}/merch/twice`)
            .then((json) => json.json())
            .then((result) => setMerch(result))
            .catch(error => window.alert(error))
    }
    const rv = async () => {
        await fetch(`${hostname}/merch/redvelvet`)
            .then((json) => json.json())
            .then((result) => setMerch(result))
            .catch(error => window.alert(error))
    }

    const show = () => {
        let infoModal = document.querySelector("#infoModal");
        infoModal.showModal();
    }
    const close = () => {
        let infoModal = document.querySelector("#infoModal");
        infoModal.close();
    }
    const merchpage = () => {
        window.location.assign('/merch');
    }

    if (merch.length != 0) {
        var merches = merch.map((merch, index) =>
            <div className="item" >
                <a key={index} href={`/merch/detail/${merch.type}/${merch.id}`}>
                    <img className="itemimg" src={path + merch.pic} />
                </a>
            </div>
        )

        return (
            <React.Fragment>
                <div className='banner'>
                    <div className='Merch'>
                        <div id='artisttitle'>ARTIST</div>
                        <div className='artist'>
                            <div id='artistname' onClick={skz}>Stray Kids</div>
                            <div id='artistname' onClick={tw}>TWICE</div>
                            <div id='artistname' onClick={rv}>Red Velvet</div>
                        </div>
                        <hr style={{ width: "100%" }}></hr>
                    </div>
                </div>
                <div className="waterfall">
                    {merches}
                </div>

                <form method="post" name="file" action="http://54.151.195.15:4000/api/v1/addmerch" encType="multipart/form-data">
                    <div className='addMerch' onClick={show}><img className="itemimg" src={add} /></div>
                    <dialog id="infoModal">
                        <button className="closebtn" id="close" onClick={close}><img className="close" src={closepic} /></button>
                        <div className="addSchedule">
                            <div className="input">
                                <label className="inputtitle">IDOL:</label>
                                <select name="idol" required>
                                    <option select hidden>choose idol</option>
                                    <option>Stray Kids</option>
                                    <option>TWICE</option>
                                    <option>Red Velvet</option>
                                </select>
                            </div>
                            <div className="input">
                                <label className="inputtitle">Name:</label>
                                <input style={{ width: '505px' }} type="text" id="name" name="name" required />
                            </div>
                            <div className="input">
                                <label className="inputtitle">Price:</label>
                                <input style={{ width: '505px' }} type="text" id="price" name="price" required />
                            </div>
                            <div className="input">
                                <label className="inputtitle">Description:</label>
                                <textarea name="des" id="des" rows="5" cols="60"></textarea>
                            </div>
                            <div className="input">
                                <label className="inputtitle">Picture:</label>
                                <input type="file" id="file" name="file" required />
                            </div>
                            <button className="submitbtn" type="submit" id="submit" onClick={merchpage}>Add</button>
                            {profile && <input type="hidden" name="email" id="email" value={profile.email} ></input>}
                        </div>
                    </dialog>
                </form>
            </React.Fragment>
        );
    }
}

export default Merch;