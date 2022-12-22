import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Dolfan from './pages/Dolfan.js';
import React from "react";
import Homepage from "./pages/Homepage.js";
import Select from "./pages/Select.js";
import Merch from "./pages/Merch.js";
import SignUp from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import Detail from "./pages/Detail.js";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route exact path="/" element={<Homepage/>}/>  
      <Route exact path="/schedule/:group" element={<Dolfan/>}/>
      <Route exact path="/merch" element={<Merch/>}/>
      <Route exact path="/select" element={<Select/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
      <Route exact path="/signin" element={<SignIn/>}/>
      <Route exact path="/merch/detail/:type/:id" element={<Detail/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
