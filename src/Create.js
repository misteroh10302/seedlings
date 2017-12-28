import React, { Component } from 'react';
import fire from './Fire';
import './App.css';
import { BrowserRouter, Route, Link, HashRouter, withRouter } from 'react-router-dom'

class Create extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 'nothing',
      registryItems: []
    }
  }
  createNewRegistry(e){
    e.preventDefault();

    if (this.props.showLog === "hidden") {
        {this.props.showModal()}
    }  else {
      var theUserId = this.props.user;
      fire.database().ref('registrys').child(theUserId).child(this.regName.value).set(
        { firstname:this.firstName.value,
          registry:this.regName.value,
          description: this.des.value,
          date: this.date.value,
          loc: this.locat.value
        }
       );


     fire.database().ref('regItems').child(this.regName.value).set(
         {
           registrys: this.state.registryItems
         }
      );
      this.props.history.push(this.regName.value.replace(/ /g,''));
      this.props.currentReg(this.regName.value.replace(/ /g,''));

    }

  }

  addItemtoRegistry(){
    var  itemInfo =
    {
       itemName:this.exName.value,
       itemPrice:this.exPrice.value,
       itemUrl: this.exUrl.value,

     }
     this.setState({
       registryItems: [...this.state.registryItems,itemInfo ]
     })


  }

  render() {


    return (
      <div className="wrapper createReg">
        <header>Create a Registry</header>
        <form onSubmit={this.createNewRegistry.bind(this)}>
        <h2>Registry Details</h2>
          <input type="text"  placeholder="First Name" ref={ el => this.firstName = el }/>
          <input type="text"  placeholder="Registry Name" ref={ el => this.regName = el }/>
          <input type="text"  placeholder="Date" ref={ el => this.date = el }/>
          <input type="text"  placeholder="Location" ref={ el => this.locat = el }/>
          <textarea name="description" placeholder="Registry Description" cols="" rows="" ref={ el => this.des = el }></textarea>
          <div className="items">
            <h2>Add Experiences</h2>
            {this.state.registryItems.map((item,index)=>(
              <div key={index} className="show-items">
                <div>{item.itemName}</div>
                <div>{item.itemPrice}</div>
                <div>{item.itemUrl}</div>
                
              </div>
            ))}
            <div className="registry-item">
              <input type="text" placeholder="name" ref={ el => this.exName = el }/>
              <input type="text" placeholder="price" ref={ el => this.exPrice = el }/>
              <input type="text" placeholder="url" ref={ el => this.exUrl = el }/>
              <span onClick={this.addItemtoRegistry.bind(this)} >+ Add </span>
            </div>

          </div>

          <div className="share">
            <h2>Share Registry</h2>
            <div>
              <input type="text" placeholder="first name"/>
              <input type="text" placeholder="email"/>
            </div>
            <div>
              <input type="text" placeholder="first name"/>
              <input type="text" placeholder="email"/>
            </div>
            <div>
              <input type="text" placeholder="first name"/>
              <input type="text" placeholder="email"/>
            </div>

          </div>
          <input type="submit" placeholder="create"/>
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
