import React, { Component } from 'react';
import fire from './Fire';
import Home from './Home';
import Create from './Create';
import Stories from './Stories';
import Profile from './Profile';
import Registry from './Registry';
import Header from './Header';
import Footer from './Footer';
import Blog from './Blog';
import './App.css';
import { createHashHistory } from 'history'
import { BrowserRouter, Route, Link, matchRoute, browserHistory } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super();
    this.state = {
      messages: [],
      loggedIn: false,
      modal: 'hidden',
      userID: null,
      registrys: [],
      activeReg: null,
      showLogin: 'none',
      hideLogin: 'block',
      loginText: 'Already a member? Login Here'
    }; // <- set up react state
  }

  componentWillMount() {
    var that = this
    var theRegistrys = fire.database().ref('/registrys');
    var theRegistryNames = [];
    theRegistrys.on('value', function(snapshot) {

      snapshot.forEach(function(snap){
        for(var key in snap.val()){

           // console.log("snapshot key" + key);
           // console.log("snapshot.val.url = " + snap.val()[key].firstname);
           // console.log("snapshot.val" + snap.val()[key].registry);
           theRegistryNames.push(key);

       }

      })
      // console.log(theRegistryNames)
      that.setState({
        registrys: theRegistryNames
      });
    });


  }

  addLogin(e){
      var that = this
      let email = this.inputName.value;
      let password = this.inputEmail.value;

      fire.auth().createUserWithEmailAndPassword(email, password).then(function(user){
        that.setState({
          loggedIn: true,
          userID: user.uid
        })

      }).catch(function(error) {
        console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */

    this.inputName.value = ''; // <- clear the input

    // .then(function(){
    //   fire.database().ref('accounts').child(that.state.userID).set(
    //     {
    //       name:  this.inputName.value,
    //       email: this.inputEmail.value,
    //       reg: [
    //           {name:' new'},
    //           {name: 'new2'}
    //         ]
    //     }
    //   );
    // });


      // this.props.history.push("/some/Path");
  }


  signIn(e){
    var that = this
    let email = this.inputNameS.value;
    let password = this.inputEmailS.value;

    fire.auth().signInWithEmailAndPassword(email, password).then(function(user){
      that.setState({
        loggedIn: true,
        userID: user.uid,
        modal: 'hidden'
      })



    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

      e.preventDefault();
  }

  showModal(){
    this.setState({
      modal: 'shown'
    });
  }
  hideModal(){
    this.setState({
      modal: 'hidden'
    });
  }
   goTo(){


  }
    currentReg(currentRegistry){
      this.setState({
        activeReg: currentRegistry
      })
    }
    toggleLogin(){
      if (this.state.hideLogin === 'none') {
        this.setState({
          hideLogin: 'block',
          showLogin: 'none',
          loginText: 'Already a member? Login Here'
        })
      } else {
        this.setState({
          hideLogin: 'none',
          showLogin: 'block',
            loginText: "Back to Sign In"
        })
      }

    }

  render() {
    var that = this
    let profiles
    let registry
    let showLog
    if (this.state.loggedIn === false) {
      profiles = null
      showLog = 'hidden';
    } else {
      profiles =   <Route path="/profile" exact children={({match}) => {
            if (match) return  <Profile user={this.state.userID} >

            </Profile>
          return null;
        }} />

      showLog = 'show';
    }

    var loginStyles = {
      display: this.state.showLogin
    }

    var signUpStyles = {
      display: this.state.hideLogin
    }


    return (
      <BrowserRouter>
          <div>
            <Header showLog={showLog} showModal={this.showModal.bind(this)} modal={this.state.modal} hideModal={this.hideModal.bind(this)} addLogin={this.addLogin.bind(this)}/>
            <Route path="/" showModal={this.showModal.bind(this)} exact children={({match}) => {
                if (match) return  <Home user={this.state.userID} showModal={this.showModal.bind(this)} loggedIn={this.state.loggedIn}>

                </Home>
              return null;
            }} />


            <Route path="/create-registry" user={this.state.userID} exact  children={({match}) => {
                if (match) return  <Create showLog={showLog} showModal={this.showModal.bind(this)} hideModal={this.hideModal.bind(this)} addLogin={this.addLogin.bind(this)} user={this.state.userID} currentReg={this.currentReg.bind(this)} loggedIn={this.state.loggedIn}>

                </Create>
              return null;
            }} />
            {profiles}
            {that.state.registrys.map((nav, i) =>
                 <Route key={`${i}`} path={"/" + nav.replace(/ /g,'')} children={({match}) => {
                    if (match) return  <Registry currentReg={this.state.activeReg}
                    updateCurrent={this.currentReg.bind(this)} regName={nav}>
                    </Registry>
                  return null;
                }} />
              )}
            <Route path="/seedling-stories" exact component={Stories} />
            <Route path="/blog" exact component={Blog} />

            <Footer />
            <div className={this.state.modal}>
              <div className="login">
                <div>
                  <h3 onClick={this.hideModal.bind(this)}>close</h3>
                  <form onSubmit={this.addLogin.bind(this)} style={signUpStyles}>
                      <h2>Sign Up</h2>
                      <input type="text" placeholder="Username" ref={ el => this.inputName = el }/>
                      <input type="text" placeholder="Email" ref={ el => this.inputEmail = el }/>
                      <input type="submit"/>
                  </form>
                </div>
                <span onClick={this.toggleLogin.bind(this)} className="showLogin">{this.state.loginText}</span>
                <div className="signup" style={loginStyles}>
                  <h2>Log In</h2>
                  <form onSubmit={this.signIn.bind(this)}>
                      <input type="text" placeholder="Username" ref={ el => this.inputNameS = el }/>
                      <input type="text" placeholder="Email" ref={ el => this.inputEmailS = el }/>
                      <input type="submit"/>
                  </form>
                </div>
              </div>
          </div>
         </div>
      </BrowserRouter>
    );
  }
}



export default App;
