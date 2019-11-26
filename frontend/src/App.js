import React, { Component } from 'react'
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom'
// import './App.css';
import Home from './components/Home'
import CustomNavbar from './components/CustomNavbar'
import OwnerLogin from './components/OwnerLogin'
import AddVilla from './components/AddVilla'
import SearchResults from './components/SearchResults'
import OwnerSignUp from './components/OwnerSignUp'
import CustomerLogin from './components/CustomerLogin'
import CustomerSignUp from './components/CustomerSignUp'
import Profile from './components/Profile'
import DetailPage from "./components/DetailPage"


import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();



class App extends Component {
  // constructor(props){
  //   super()
  //   this.state = {
  //     hideNavItem: false
  //   }
  // }
  //   componentDidMount(){
  //     if(window.location.pathname === '/CustomerLogin' ){
  //       this.setState({hideNavItem: true})
  //     }
  //   }
  // }
 


  render(){
  return (
    <BrowserRouter>
    <div className="App">
      <CustomNavbar />
      {/* <DetailPage/> */}
      <Switch>
      {/* <Route exact path="/" render={(props) => <Home {...props} response={this.state.response} />} /> */}
      <Route exact path="/" component={Home} />
      <Route path="/OwnerLogin" component={OwnerLogin} />
      <Route path="/OwnerSignUp" component={OwnerSignUp} />
      <Route path="/AddVilla" component={AddVilla} />
      <Route path="/CustomerLogin" component={CustomerLogin} />
      <Route path="/CustomerSignUp" component={CustomerSignUp} />
      <Route path="/Results" component={SearchResults} />
      <Route path='/profile' component={Profile} />
      </Switch>   
    </div>
    </BrowserRouter>
  )
  }
}

export default App;
