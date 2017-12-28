import React, { Component } from 'react';
import fire from './Fire';
import './App.css';
import { BrowserRouter, Route, Link, HashRouter, withRouter } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
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
        this.inputName.value = " ";
        this.inputEmail.value = " ";


      }).catch(function(error) {
        console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */

    this.inputEl.value = ''; // <- clear the input

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

  createMe(){
    if (this.props.loggedIn === true) {
         this.props.history.push("/create-registry");

    } else {
      console.log('not logged')
      {this.props.showModal()}
    }

  }


  render() {
    return (
        <div>
          <header>
            <h1>Some large introductory text that can provide an overview of what this page is about. This can be useful for readers that are skimming (everyone).</h1>
            <a onClick={this.createMe.bind(this)}>CREATE A REGISTRY</a>
          </header>
          <main>
            <section id="ideas">
              <h2>Registry Ideas</h2>
              <div>
                <div>
                  <h3></h3>
                </div>
                <div>
                  <h3></h3>
                </div>
                <div>
                  <h3></h3>
                </div>
              </div>
            </section>
            <section id="mission">
              <h2>Mission Statement</h2>
              <p>
                Some large introductory text that can provide an overview of what this page is about. This can be useful for readers that are skimming (everyone).Some large introductory text that can provide an overview of what this page is about. This can be useful for readers that are skimming (everyone).
              </p>
            </section>
            <section id="find">
              <h2>Find a Registry</h2>
              <input type="" name="" value="Registry" placeholder="Registry" />
            </section>
            <section id="how">
              <h2>How it works</h2>
              <p>
                Some large introductory text that can provide an overview of what this page is about. This can be useful for readers that are skimming (everyone).Some large introductory text that can provide an overview of what this page is about. This can be useful for readers that are skimming (everyone).
              </p>
            </section>
            <Link to="/blog">
            <section id="blog">
              <h2>Blog Posts</h2>
              <div>
                <div>
                  <h3></h3>
                </div>
                <div>
                  <h3></h3>
                </div>
                <div>
                  <h3></h3>
                </div>
              </div>
            </section>
            </Link>
          </main>

        </div>

    );
  }
}

export default withRouter(Home);
