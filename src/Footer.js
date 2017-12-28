import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <h2>Stay updated with our Newsletter</h2>
          <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h3>
        </div>
        <div>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
