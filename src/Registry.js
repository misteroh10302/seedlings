import React, { Component } from 'react';
import fire from './Fire';
import OrderCompleted from './OrderCompleted';
import './App.css';
import { withRouter} from 'react-router-dom'

class Registry extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 'nothing',
      currentName: this.props.regName,
      des: null,
      date: null,
      location: null,
      currentItems: [],
      myTotal: 0,
      popUp: 'hidden'

    }
  }

  componentWillMount(){
    this.props.updateCurrent(this.props.regName);

    if (this.props.currentReg) {
      // var current = this.props.currentReg.replace(/ /g,'');
      var that = this

      var theRegistrys = fire.database().ref('/regItems').child(this.props.regName);
      var myRegistrys = []
      theRegistrys.on('value', function(snapshot) {

        for(var key in snapshot.val()){
           myRegistrys.push(snapshot.val()[key])
       }
      });

      var regItems = fire.database().ref('regItems').child(that.state.currentName);

      regItems.on('value',function(childSnap){

        childSnap.forEach(function(child){

          that.setState({
            currentItems: child.val()
          });

        });
      }).bind(that);




      that.setState({
        myreg: myRegistrys,
        currentName: this.props.regName
      })
    }  else {
      var that = this
      var currentPath = window.location;
      var leadsRef = fire.database().ref('registrys').child(that.state.currentName);
      var regItems = fire.database().ref('regItems').child(that.state.currentName);
      var amountLeft

      // Find the items in the registry
      regItems.on('value',function(childSnap){
        childSnap.forEach(function(child){
          that.setState({
            currentItems: child.val()

          });

        });
      }).bind(that);


      var myRegistry = fire.database().ref('/registrys');


    myRegistry.on('value', function(snapshot) {

                snapshot.forEach(function(childSnapshot) {
                  childSnapshot.forEach(function(child){
                    if (child.val().registry === that.state.currentName) {

                      that.setState({
                        des: child.val().description,
                        date: child.val().date,
                        location: child.val().loc

                      });
                    } else {

                    }

                  });

                });
            });

        //     var amountLeft = 120;
        //
        // for(var i = 0, len = this.state.currentItems.length; i < len; i++) {
        //           amountLeft += parseInt(this.state.currentItems[i].itemPrice);
        //           console.log(amountLeft)
        //     }

      this.setState({
        myreg: myRegistrys,
        currentName: this.props.regName
      })
      return;

    }


  }
    componentDidMount(){

    }

  handleChange(e){
      var key = e.target.id;
      var val = e.target.value;
      var obj  = {}
      obj[key] = val
      this.setState(obj)


  }

  showPop(){
    if (this.state.popUp != "shown"){
      this.setState({
        popUp: 'shown'
      });
    } else {
      this.setState({
        popUp: 'hidden'
      });
      this.props.history.push("/");
    }

  }

  render() {
    // calculate the users total!
    var myTotal = 0;
    var theActualTotal = 0;
    var amountLeft = 0;

    for(var i = 0, len = this.state.currentItems.length; i < len; i++) {

        var currentNum = parseInt(this.state[i]);
        // Check to make sure that the number is not NAN
        if (!currentNum) {
          currentNum = 0;
        }
        if (currentNum === undefined) {
          myTotal += 0;
        } else {
          myTotal += currentNum;
        }
          amountLeft += parseInt(this.state.currentItems[i].itemPrice);
    }


    return (
      <div className="wrapper theReg">
        <header>
          <h1>{this.state.currentName}</h1>
          <h4>{this.state.date}</h4>
          <h4>{this.state.location}</h4>
          <h3>Registry Details</h3>
          <p>{this.state.des}</p>
        </header>
        <main>

        <div>
          <h3>Registry Items</h3>

          {this.state.currentItems.map((item,index)=>(

            <div key={index} className="show-items">
              <div> {item.itemName}</div>
              <div> {item.itemPrice}</div>
              <div>  {item.itemUrl}</div>
              <div onChange={this.handleChange.bind(this)} className={index}>
                Contribute
                <input type="text" id={index}  placeholder='$'/>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3>Your Total </h3>
          <div>Your current total is: $ {myTotal}</div>
          <input onClick={this.showPop.bind(this)} type="submit" value="Complete Order"/>
        </div>

        </main>
        <OrderCompleted  show={this.showPop.bind(this)} popUp={this.state.popUp}/>
      </div>
    );
  }
}

export default withRouter(Registry);
