import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Detail.css';
import copy from "copy-to-clipboard";
import morefun from '../images/more.png';
import upload from '../images/upload.png';
import link from '../images/link.png';
import back from '../images/back.png';
import closepic from '../images/close.png';
import user from '../images/user.png';
import x from '../images/x.png';
import up from '../images/up.png';
import down from '../images/down.png';
import send from '../images/send.png';

function Detail() {
  var hostname = "http://54.151.195.15:4000/api/v1";
  var path = "http://54.151.195.15:4000";
  let githubURL = new URL(window.location.href);
  let params = githubURL.pathname;
  var type = params.substring(14, 15);
  var id = params.substring(16, params.length);
  var idol = "";
  if (type == 1) {
    idol = "straykids";
  } else if (type == 2) {
    idol = "twice";
  } else if (type == 3) {
    idol = "redvelvet";
  }
  const [moremore, setMore] = React.useState([]);
  const [merch, setMerch] = React.useState([]);
  const [profile, setProfile] = React.useState();
  const [deletemsg, setDeletemsg] = React.useState("");
  const [comment, setComment] = React.useState();
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState(0);
  const [savestatus, setSavestatus] = React.useState(0);
  const [openstatus, setOpenstatus] = React.useState(0)
  const jwtToken = window.localStorage.getItem('jwtToken');
  React.useEffect(() => {
    if (!jwtToken) {
      window.alert("請先登入!")
      window.location.assign("/signin")
    }

    if (jwtToken) {
      fetch(`${hostname}/merch/${idol}`)
        .then((json) => json.json())
        .then((result) => setMore(result))
        .catch(error => window.alert(error))

      fetch(`${hostname}/merch/comment/${id}`)
        .then((json) => json.json())
        .then((result) => setComment(result))
        .catch(error => window.alert(error))

      fetch(`${hostname}/user/profile`, {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          setProfile(response.data);
          fetch(`${hostname}/merch/detail/${type}/${id}`)
            .then((resp) => resp.json())
            .then((json) => {
              setMerch(json)
              if (response["data"]["email"] == json[0]["owner_email"]) {
                setStatus(1);
              } else {
                setStatus(0);
              }
            })
          fetch(`${hostname}/merch/collection/${response["data"]["email"]}`)
            .then((json) => json.json())
            .then((result) => {
              console.log(result)
              for (var i = 0; i < result.length; i++) {
                if (result[i]["id"] == id) {
                  setSavestatus(1);
                }
              }
            })
            .catch(error => window.alert(error))
        })
    }
  }, []);

  const backpage = () => {
    window.history.go(-1);
  }
  const copyURL = () => {
    copy(window.location.href)
    window.alert("複製成功");
  }

  const show = () => {
    let infoModal = document.querySelector("#infoModal");
    infoModal.showModal();
  }
  const close = () => {
    let infoModal = document.querySelector("#infoModal");
    infoModal.close();
  }
  const deletemerch = () => {
    if (deletemsg == "Delete") {
      fetch(`${hostname}/deletemerch/${id}`)
        .then((json) => console.log(json))
        .catch(error => window.alert(error))
      window.alert("刪除成功!");
      window.location.href = "/merch";
    } else {
      window.alert("輸入錯誤!");
    }
  }
  const sendcomment = async () => {
    var date = JSON.stringify(new Date()).substring(1, 11);
    var data = {
      name: profile.name,
      email: profile.email,
      comment: content,
      date: date,
      merch_id: id
    }
    await fetch(`${hostname}/addcomment`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((json) => {
      if (json.error) {
        window.alert(json.error)
      } else {
        alert("留言成功");
        window.location.reload();
      }
    }
    ).catch(error => window.alert(error))
  }
  const turndown = () => {
    setOpenstatus(1);
    document.getElementById("commentarea").style.display = 'block';
  }
  const turnup = () => {
    setOpenstatus(0);
    document.getElementById("commentarea").style.display = 'none';
  }
  const addcollection = () => {
    setSavestatus(1);
    const data = {
      merch_id: id,
      merch_type: type,
      merch_pic: merch[0].pic,
      email: profile.email
    }
    fetch(`${hostname}/addcollection`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((json) => console.log(json))
      .catch(error => window.alert(error))
    window.alert("收藏成功!");
  }
  const movecollection = () => {
    setSavestatus(0);
    fetch(`${hostname}/deletecollection/${id}`)
      .then((json) => console.log(json))
      .catch(error => window.alert(error))
    window.alert("移除成功!");
  }

  if (merch && profile) {
    if (comment) {
      const addcollection = () => {
        setSavestatus(1);
        const data = {
          merch_id: id,
          merch_type: type,
          merch_pic: merch[0].pic,
          email: profile.email
        }
        fetch(`${hostname}/addcollection`, {
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          method: 'POST'
        }).then((json) => console.log(json))
          .catch(error => window.alert(error))
        window.alert("收藏成功!");
      }
      var comments = comment.map((comment, index) =>
        <div className="commentR" key={index} >
          <img className="userpic" style={{ width: '55px', height: '55px' }} src={user}></img>
          <div className='commentI'>
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
              <div className='commentIname'>{comment.name}</div>
              <div className='commentIcontent'>{comment.comment}</div>
            </div>
            <div className='commentTime'>{comment.date.substring(0, 8) + (parseInt(comment.date.substring(8, 10)) + 1)}</div>
          </div>
          <img className='report' src={morefun}></img>
        </div>
      )
    }
    var merches = merch.map((merch, index) =>
      <div className="detail" key={index}>
        <div className="detailimgbig">
          <img className="detailimg" src={path + merch.pic} />
        </div>
        <div className="detailinfo">
          <div className="infobutton">
            <div className="funbuttons">
              <img className="funbutton" src={morefun}></img>
              <img className="funbutton" src={upload}></img>
              <button className='funbuttonbig' onClick={copyURL}><img className="funbutton" src={link}></img></button>
            </div>
            {savestatus == 0 && <button className="savebutton" style={{ backgroundColor: 'black' }} onClick={addcollection}>Save</button>}
            {savestatus == 1 && <button className="savebutton" style={{ backgroundColor: '#db2a2a', borderColor: '#db2a2a' }} onClick={movecollection}>Save</button>}
          </div>
          <div className="infoname">{merch.name}</div>
          <div className="infoprice">$ {merch.price}</div>
          <div className="infodes">{merch.des}</div>
          <div className="uploader">
            <img className="userpic" src={user}></img>
            <div className="infoemail">由 {merch.owner_email} 建立</div>
          </div>
          <div className='opencomment'>
            {openstatus == 0 && <img className='opencommentimg' style={{ width: '26px', height: '26px', cursor: 'pointer' }} src={up} onClick={turndown}></img>}
            {openstatus == 1 && <img className='opencommentimg' style={{ width: '26px', height: '26px', cursor: 'pointer' }} src={down} onClick={turnup}></img>}
            {status == 1 && merch.status == 1 && <div className='deleteMerch' onClick={show}><img className="itemimg" src={x} /></div>}
            Comment
          </div>
          <div className="comment" id="comment">
            <div className="commentarea" id="commentarea" style={{ display: 'none' }}>
              {comment && comments}
            </div>
            <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
              <img className="commentuserpic" src={user}></img>
              <div className='commentinputbig'>
                <input className='commentinput' onChange={(e) => { setContent(e.target.value) }}></input>
                <img className='sendbtn' src={send} onClick={sendcomment}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

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
        <div className="detailbig">
          <button className='button' onClick={backpage}><img style={{ position: 'absolute', width: '30px', height: '30px', left: '40px', top: '160px' }} src={back}></img></button>
          {merches}
          <div className='more'>
            <div className="morepos">MORE</div>
            <hr className='merchhr' />
          </div>
          <div className='morearea'>
            <div className="waterfall">
              {moremores}
            </div>
          </div>
        </div>

        {/* {status == 1 && <div className='deleteMerch' onClick={show}><img className="itemimg" src={x} /></div>} */}
        <dialog id="infoModal" className='dialog'>
          <button className="closebtn" id="close" onClick={close}><img className="close" src={closepic} /></button>
          <div className="deleteinfo">
            <div className="">確定要刪除此商品？</div>
            <input id="inputdelete" placeholder="Delete" style={{ marginTop: '15px', borderRadius: '10px' }} onChange={(e) => { setDeletemsg(e.target.value) }} />
            <button className="deletebtn" type="button" id="submit" onClick={deletemerch}>Delete</button>
          </div>
        </dialog>
      </React.Fragment>

    );
  }
}

export default Detail;