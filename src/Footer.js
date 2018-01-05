import React, { Component } from 'react';
import './App.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <h2>Stay updated with our Newsletter</h2>
          <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h3>
        </div>
        <div>
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
