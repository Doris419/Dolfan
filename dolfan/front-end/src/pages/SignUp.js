import React, { useDebugValue, useEffect, useState, useSyncExternalStore} from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink} from "react-router-dom";
import './Sign.css';
const Signup = () => {
    const hostname = 'http://54.151.195.15:4000/api/v1';
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    async function submit(){
        var data = {
            name:name,
            email:email,
            password:password
          }
        await fetch(`${hostname}/user/signup`,{
            body: JSON.stringify(data),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            method: 'POST'
        }).then((json)=>{if(json.error){
          window.alert(json.error)
        }else{
          alert("註冊成功")
          window.location.href="/signin";
        }} 
        ).catch(error=>window.alert(error))
    }
    const signin = () => {
        window.location.href="/signin";
    }

    return(

        <React.Fragment>
                <div className='bigSignpage'>
                    <div className='Signpage'>
                        <div className='Signtitle'>
                            <div className='Sign'>SignUp</div>
                            <hr className='Signhr'></hr>
                        </div>
                        <div className='Signpassword'>
                            <input className='Signpassword1' type="text" id="name" name="name" placeholder="帳號" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='Signpassword'>
                            <input className='Signpassword1' type="password" id="password" name="password" placeholder="密碼" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='Signpassword'>
                            <input className='Signpassword1' type="email" id="email" name="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='Signsubmit'>
                            <button value="註冊" className="Signsubmit1" onClick={submit}>註冊</button>
                            <button value="登入" className="Signsubmit1" onClick={signin}>登入</button>
                        </div>
                        <div className='more'>
                        <div className="pos">其他註冊方式</div>
                        <hr className='Morehr'/>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
}

export default Signup;