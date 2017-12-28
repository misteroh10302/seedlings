import React, { Component } from 'react';
import fire from './Fire';
import './App.css';
import { BrowserRouter, Route, Link, matchRoute, browserHistory } from 'react-router-dom'


class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      userEmail: null
    }
  }

  componentWillMount() {
    // get the current user Profile Information
    var user = fire.auth().currentUser;
    var userId = this.props.user;

    this.setState({
        userEmail: user.email
    })

    var that = this
    var theRegistrys = fire.database().ref('/registrys').child(userId);
    var myRegistrys = []
    theRegistrys.on('value', function(snapshot) {
       console.log(snapshot.val())

      for(var key in snapshot.val()){
         // console.log("snapshot key" + key);
         // console.log("snapshot.val.url = " + snapshot.val()[key].firstname);
         // console.log("snapshot.val" + snapshot.val()[key].registry);
         myRegistrys.push(key)
     }
    });

    that.setState({
      myreg: myRegistrys
    })
  }
  componentDidUpdate(){
    // set up all the variables to get the User information
    var that = this
    // create a reference to the registrys databaseURL
    var leadsRef = fire.database().ref('registrys');

    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.key;
          if (that.props.user === childData) {
            // console.log(childSnapshot.val())
          }
        });
    });
  }


  render() {
    return (
      <div id="profile">
        <header>
          <h1>{this.state.userEmail}</h1>
          <h1>Profile</h1>

        </header>

        <section>

          <div>
            <h3>My Registrys</h3>
              {this.state.myreg.map((reg,i) =>
              <Link key={i} to={reg.replace(/ /g,'')}>
                {reg}
              </Link>
            )}

            <h3>Account Information</h3>

          </div>
        </section>

      </div>
    );
  }
}

export default Profile;
