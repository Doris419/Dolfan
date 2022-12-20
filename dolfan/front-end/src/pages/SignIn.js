import React, { useDebugValue, useEffect, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink } from "react-router-dom";
import './Sign.css';
import user from '../images/user.png';
import google from '../images/google.png';
const SignIn = () => {
    const hostname = 'http://54.151.195.15:4000/api/v1';
    var path = "http://54.151.195.15:4000";
    const [profile, setProfile] = React.useState();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [moremore, setMore] = React.useState();

    const jwtToken = window.localStorage.getItem('jwtToken');
    React.useEffect(() => {
        if (jwtToken) {
            fetch(`${hostname}/user/profile`, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                }),
            })
                .then((response) => response.json())
                .then((json) => { setProfile(json.data); });
        }
    }, []);

    async function submit() {
        var data = {
            provider: "native",
            email: email,
            password: password
        }
        await fetch(`${hostname}/user/signin`, {
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'POST'
        })
            .then((response) => response.json())
            .then((json) => {
                {
                    if (json.error) {
                        window.alert(json.error)
                    }
                    else {
                        window.localStorage.setItem('jwtToken', json.data.access_token);
                        return fetch(`${hostname}/user/profile`, {
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${json.data.access_token}`,
                            }),
                        })
                            .then((response) => response.json())
                            .then((json) => setProfile(json.data));
                    }
                }
                setProfile(json.data)
            })
    }
    const signup = () => {
        window.location.href = "/signup";
    }
    const uploadRecord = async () => {
        fetch(`${hostname}/merch/upload/${profile.email}`)
            .then((resp) => resp.json())
            .then((result) => setMore(result))
            .catch(error => window.alert(error))
    }
    const collectionRecord = async () => {
        fetch(`${hostname}/merch/collection/${profile.email}`)
            .then((resp) => resp.json())
            .then((result) => { setMore(result) })
            .catch(error => window.alert(error))
    }
    if (moremore) {
        var moremores = moremore.map((moremore, index) =>
            <div className="item" key={index}>
                <a href={`/merch/detail/${moremore.type}/${moremore.id}`}>
                    <img className="itemimg" src={path + moremore.pic} />
                </a>
            </div>
        )
    }

    return (
        <React.Fragment>
            {profile && (
                <div className='bigSignpage'>
                    <div className='Signpage'>
                        <div className='Signtitle'>
                            <div className='Sign'>Profile</div>
                            <hr className='Signhr'></hr>
                        </div>
                        <div className="profile_content">
                            <img className="profile_image" src={user} />
                            <div className="profileA">
                                <div className="profileT">Name:</div>
                                <div className="profileD">{profile.name}</div>
                            </div>
                            <div className="profileA">
                                <div className="profileT">Email:</div>
                                <div className="profileD">{profile.email}</div>
                            </div>
                            <button
                                className="Signsubmit2" onClick={() => {
                                    window.localStorage.removeItem('jwtToken');
                                    window.location.href = "/signin"
                                }}>
                                登出
                            </button>
                        </div>
                        <div className='more'>
                            <div className="pos" style={{ width: '35px', marginLeft: '-14px', justifyItem: 'center' }}>功能</div>
                            <hr className='Morehr' />
                        </div>
                        <div className='moreareafun'>
                            <div className='record' onClick={uploadRecord}>上傳<br />紀錄</div>
                            <div className='record' onClick={collectionRecord}>收藏<br />週邊</div>

                            <div className="waterfall" id="waterfall" style={{ display: 'block' }}>
                                {moremores}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!profile && (<div className='bigSignpage'>
                <div className='Signpage'>
                    <div className='Signtitle'>
                        <div className='Sign'>SignIn</div>
                        <hr className='Signhr'></hr>
                    </div>
                    <div className='Signemail'>
                        <input className='Signemail1' type="text" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='Signpassword'>
                        <input className='Signpassword1' type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="密碼" required />
                    </div>
                    <div className='Signsubmit'>
                        <button value="登入" className="Signsubmit1" onClick={submit}>登入</button>
                        <button value="註冊" className="Signsubmit1" onClick={signup}>註冊</button>
                    </div>
                    <div className='more'>
                        <div className="pos">其他登入方式</div>
                        <hr className='Morehr' />
                    </div>
                    <div className='morearea'>
                        <img className='google' src={google} />
                    </div>
                </div>
            </div>)}
        </React.Fragment>
    );
}

export default SignIn;