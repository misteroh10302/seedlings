import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'


const Header = (props) => (
  <div className="theHeader">
    <nav>
      <Link to="/" className="logo"><h1>The Seedlings</h1></Link>
      <ul>
        <a onClick={props.showModal} href="#">Sign Up / Login</a>
        <Link className={props.showLog} to="/profile">Profile</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/#mission">Mission</Link>
      </ul>
    </nav>
    <div className={props.modal}>
      <div className="login">
        <h3 onClick={props.hideModal.bind(this)}>close</h3>
        <form onSubmit={props.addLogin.bind(this)}>
            <input type="text" ref={ el => this.inputName = el }/>
            <input type="text" ref={ el => this.inputEmail = el }/>
            <input type="submit"/>
        </form>
      </div>
    </div>
  </div>
);


export default Header;
