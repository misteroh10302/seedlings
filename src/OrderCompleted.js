import React, { Component } from 'react';
import './App.css';
import {  withRouter } from 'react-router-dom'

const OrderCompleted = (props) => (
      <div className={`completedOrder ${props.popUp}`}>
        <div>
          <span onClick={props.show.bind(this)}>Close</span>
          <h2>Thank you for contributing to this experience!</h2>
          <h2>We are so grateful!</h2>
          <h4>Thank you!</h4>
        </div>
      </div>

)

export default withRouter(OrderCompleted);
