import React, { Component } from 'react'
import { Navbar, Nav, Button,Image} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import '../App.css';


export default class CustomNavbar extends Component {
  constructor(props){
    super()
    this.state = {
      hideNavItem: false,
      userType:0
    }
  }
    componentDidMount(){

      const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            this.setState({ userType: decoded.user.type })} 

      if(window.location.pathname === '/CustomerLogin' ){
        this.setState({hideNavItem: true})
      }
    }
  

  //---------logout func----------//
    state = { activeItem: 'home' }
    handleItemClick = ((e, { name }) => {
      this.setState({ activeItem: name })
      // extra
      if (name === "home"){
        this.props.history.push(`/`)
      }else{
        this.props.history.push(`/${name}`)
      }
      })

      logout =()=>{
  localStorage.removeItem('usertoken')
  this.props.history.push('/')
      }
  //---------End logout func-----//

  render() {

    return (
      <Navbar collapseOnSelect expand="lg"  variant="dark" style={{ backgroundColor: "#F6D55C"}}>
        <Navbar.Brand href="/"><Image src={require("../assets/shalihat-logo.png")} style={{ width: '80px', height: '80px' }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <ul className="nav justify-content-end nav-fill" >

          {(localStorage.usertoken) ? null :  
          <li className="nav-item">
            <a className="nav-link" className="text-light"  href="/CustomerSignUp">Sign Up</a>
          </li>}

          {(localStorage.usertoken) ? null :
          <li className="nav-item">
          <a className="nav-link" className="text-light" href="/CustomerLogin" tabindex="-1" aria-disabled="true">Sign in</a>
         </li>}
            
            {(localStorage.usertoken) ? null : 
            <li className="nav-item">
              <a className="nav-link active" className="text-light" href="/AddVilla">+ Add Villa</a>
           </li>}
      
        {(localStorage.usertoken) ? 
        <li className="nav-item">
          <a className="nav-link " className="text-light"  href="/profile" tabindex="-1" aria-disabled="true"> Profile </a>
        </li> : null}
        {this.state.userType == 2 && 
        <li className="nav-item">
          <a className="nav-link "className="text-light"  href="/VillasLists" tabindex="-1" aria-disabled="true">Villas Lists</a>
        </li>}
        {this.state.userType == 2 && 
        <li className="nav-item">
          <a className="nav-link "className="text-light"  href="/NewVilla" tabindex="-1" aria-disabled="true">Add new villa</a>
        </li>}
        {this.state.userType == 1 &&
        <li className="nav-item">
          <a className="nav-link "className="text-light"  href="/BookingList" tabindex="-1" aria-disabled="true">Bookings list</a>
        </li>}
        {(localStorage.usertoken) ? 
        <li className="nav-item">
          <a className="nav-link "className="text-light" onClick={this.logout} href="/" tabindex="-1" aria-disabled="true">Log out</a>
        </li> : null }
      
</ul>
         
        </Navbar.Collapse>
      </Navbar>

    )
  }
}