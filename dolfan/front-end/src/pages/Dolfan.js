import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch, Route, Routes, Link, NavLink, Redirect } from "react-router-dom";
import './Dolfan.css';
import closepic from '../images/close.png';
import han from '../images/han.jpg';
import nayeon from '../images/nayeon.jpg';
import wendy from '../images/wendy.jpg';
import sea from '../images/sea.png';
import back from '../images/back.png';
import { gapi } from 'gapi-script';
function Dolfan() {

  useEffect(() => {
    document.getElementById('show').style.visibility = 'hidden';
  }, [])
  let githubURL = new URL(window.location.href);
  let params = githubURL.pathname;
  var idol = params.substring(10, params.length);

  const show = () => {
    let infoModal = document.querySelector("#infoModal");
    infoModal.showModal();
  }
  const close = () => {
    let infoModal = document.querySelector("#infoModal");
    infoModal.close();
  }

  const backpage = () => {
    window.history.go(-1);
  }
  var CLIENT_ID = '996969019139-0s1gp84ed0meb2607sipf5n8jtrkrgvf.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyCcpNSqWWAj5n46d_aPmMQMVQTUm685Tj0';

  var DISCOVERY_DOCS = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  var SCOPES = "https://www.googleapis.com/auth/calendar";

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOCS],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  function gisLoaded() {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    });
    gisInited = true;
    maybeEnableButtons();
  }

  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
    }
    listUpcomingEvents()
  }

  function handleAuthClick() {

    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    });
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      document.getElementById('authorize_button').style.visibility = 'collapse';
      document.querySelector("#show").style.visibility = 'visible';
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }

  }

  async function listUpcomingEvents() {
    let response;
    var calendarId;
    try {
      if (idol == 'straykids') {
        calendarId = 'dolfan20221205@gmail.com';
      } else if (idol == 'twice') {
        calendarId = '91f856eadff7fa4fdf060ca8ffb4c499cee68b216497214d518ae18293c7597d@group.calendar.google.com';
      } else if (idol == 'redvelvet') {
        calendarId = 'd55215fd543487e54b40dcd54a6d4f6129cca562772cb67560cdebf4cc003527@group.calendar.google.com';
      }
      const request = {
        'calendarId': calendarId,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 3,
        'orderBy': 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      return;
    }

    var events = response.result.items;
    if (!events || events.length == 0) {
      document.getElementById('content2').innerText = 'We are on holiday!';
      return;
    }

    const output = events.reduce(
        (str, event) => `${str}${event.start.dateTime.replace('T',' ').substring(0,16) || event.start.date}  ${event.summary}\n`,
        '');
    document.getElementById('content2').innerText = output;
    console.log(JSON.stringify(events))

  }

  function insertEvents() {
    let startschedule = document.querySelector("#startschedule").value;
    let endschedule = document.querySelector("#endschedule").value;
    let title = document.querySelector("#title").value;
    let des = document.querySelector("#des").value;
    var resource = {
      'summary': title,
      'description': des,
      'start': {
        'dateTime': startschedule + ':00+08:00',
        'timeZone': 'Asia/Taipei'
      },
      'end': {
        'dateTime': endschedule + ':00+08:00',
        'timeZone': 'Asia/Taipei'
      }
    };
    var calendarId;
    if (idol == 'straykids') {
      calendarId = 'dolfan20221205@gmail.com';
    } else if (idol == 'twice') {
      calendarId = '91f856eadff7fa4fdf060ca8ffb4c499cee68b216497214d518ae18293c7597d@group.calendar.google.com';
    } else if (idol == 'redvelvet') {
      calendarId = 'd55215fd543487e54b40dcd54a6d4f6129cca562772cb67560cdebf4cc003527@group.calendar.google.com';
    }
    var request = gapi.client.calendar.events.insert({
      'calendarId': calendarId,
      'resource': resource
    });
    request.execute(function (resp) {
      console.log(resp);
    });
    window.location.reload();
  }

  return (
    <React.Fragment>
      <button className='button' onClick={backpage}><img style={{ position: 'absolute', width: '30px', height: '30px', left: '40px', top: '160px' }} src={back}></img></button>
      {gapiLoaded()}
      {gisLoaded()}
      <div className="youtube">
        {idol == 'straykids' && <iframe width="1200px" height="500" style={{ marginTop: '20px' }} src="https://www.youtube.com/embed/57n4dZAPxNY?&autoplay=1" allow="autoplay" allowFullScreen></iframe>}
        {idol == 'twice' && <iframe width="1200px" height="500" style={{ marginTop: '20px' }} src="https://www.youtube.com/embed/XA2YEHn-A8Q?&autoplay=1" allow="autoplay" allowFullScreen></iframe>}
        {idol == 'redvelvet' && <iframe width="1200px" height="500" style={{ marginTop: '20px' }} src="https://www.youtube.com/embed/J_CFBjAyPWE?&autoplay=1" allow="autoplay" allowFullScreen></iframe>}
      </div>
      <div className="reminder">
        {/* <div className="remindertitle">Avtivities:</div> */}
        <div className="reminderarea">
          <div style={{display: 'flex', flexWrap: 'nowrap', marginLeft: 'auto', padding: '0 20px'}}>
          <span style={{marginTop: '68px', marginRight: '18px', fontSize: '3px', fontColor: 'grey'}}>Read</span>
          <pre className="content" id="content1" style={{ whiteSpace: "pre-wrap" }}>What's your upcoming schedules?</pre>
          <img src={sea} className="han"></img>
          </div>
          <div style={{display: 'flex', flexWrap: 'nowrap', marginTop: '-50px', padding: '0 20px'}}>
          {idol == 'straykids' && <img src={han} className="han"></img>}
          {idol == 'twice' && <img src={nayeon} className="han"></img>}
          {idol == 'redvelvet' && <img src={wendy} className="han"></img>}
          <pre className="content" id="content2" style={{ whiteSpace: "pre-wrap" }}></pre>
          {/* <span style={{marginTop: '76px', marginLeft: '8px', fontSize: '3px', fontColor: 'grey'}}>Read</span> */}
          </div>
        </div>
      </div>
      <button className="authorize" id="authorize_button" onClick={handleAuthClick}>Authorize</button>
      <button className="addbtn" id="show" onClick={show}>Add</button>

      <dialog id="infoModal">
        <button className="closebtn" id="close" onClick={close}><img className="close" src={closepic} /></button>
        <div className="addSchedule">
          <div className="input">
            <label className="inputtitle">Title</label>
            <input style={{ width: '515px'}} type="text" id="title" name="title" required />
          </div>
          <div className="input">
            <label className="inputtitle">Description</label>
            <textarea name="des" id="des" rows="5" cols="60"></textarea>
          </div>
          <div className="input">
            <label className="inputtitle">Start time</label>
            <input id="startschedule" type="datetime-local" name="scheduledate" required />
          </div>
          <div className="input">
            <label className="inputtitle">End time</label>
            <input id="endschedule" type="datetime-local" name="scheduledate" required />
          </div>
          <button className="submitbtn" id="submit" onClick={insertEvents}>Add</button>
        </div>
      </dialog>

      <div className="calendar">
        {idol == 'straykids' && <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTaipei&src=ZG9sZmFuMjAyMjEyMDVAZ21haWwuY29t&color=%23039BE5" style={{ border: 'solid 1px #777', width: '1200px', height: '750px', frameborder: '0', scrolling: 'no' }}></iframe>}
        {idol == 'twice' && <iframe src="https://calendar.google.com/calendar/embed?src=91f856eadff7fa4fdf060ca8ffb4c499cee68b216497214d518ae18293c7597d%40group.calendar.google.com&ctz=Asia%2FTaipei" style={{ border: 'solid 1px #777', width: '1200px', height: '750px', frameborder: '0', scrolling: 'no' }}></iframe>}
        {idol == 'redvelvet' && <iframe src="https://calendar.google.com/calendar/embed?src=d55215fd543487e54b40dcd54a6d4f6129cca562772cb67560cdebf4cc003527%40group.calendar.google.com&ctz=Asia%2FTaipei" style={{ border: 'solid 1px #777', width: '1200px', height: '750px', frameborder: '0', scrolling: 'no' }}></iframe>}
      </div>

      {/* <div className="kuang">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div> */}

      <script async defer src="https://apis.google.com/js/api.js" onLoad={gapiLoaded}></script>
      <script async defer src="https://accounts.google.com/gsi/client" onLoad={gapiLoaded}></script>
    </React.Fragment>
  );
}

export default Dolfan;