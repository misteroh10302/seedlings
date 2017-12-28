import React, { Component } from 'react';
import fire from './Fire';
import './App.css';

class Modal extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {

  }
  componentDidUpdate(){
  }


  render() {
    return (
      <div>
        <div className={this.props.modal}>
            <div className="login">
              <div>
                <h3 onClick={this.props.hideModal.bind(this)}>close</h3>
                <form onSubmit={this.props.addLogin.bind(this)}>
                    <h2>Sign Up</h2>
                    <input type="text" ref={ el => this.inputName = el }/>
                    <input type="text" ref={ el => this.inputEmail = el }/>
                    <input type="submit"/>
                </form>
              </div>
              <div className="signup">
                <h2>Log In</h2>
                <form onSubmit={this.props.signIn.bind(this)}>
                    <input type="text" ref={ el => this.inputNameS = el }/>
                    <input type="text" ref={ el => this.inputEmailS = el }/>
                    <input type="submit"/>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Modal;
