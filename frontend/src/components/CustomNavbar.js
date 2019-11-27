import React, { Component } from 'react'
import { Navbar, Nav, Button} from 'react-bootstrap'
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
  console.log("anas")
  localStorage.removeItem('usertoken')
  this.props.history.push('/')
      }
  //---------End logout func-----//

  render() {
    console.log(localStorage.usertoken)

    if(this.state.userType != 0){
      console.log(this.state.userType)
    }else{
      console.log("user not signed")
    }


    return (
      <Navbar collapseOnSelect expand="lg"  variant="dark" style={{ backgroundColor: "#F6D55C"}}>
        <Navbar.Brand href="/">OnBay</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="mr-auto"  >
            <Nav.Link href="/AddVilla"> <Button className="btn btn-warning" onclick="location.href ='/AddVilla'" >+ Add Villa</Button></Nav.Link>
            <Nav.Link href="/CustomerSignUp"><Button className="btn btn-warning" onclick="location.href ='/CustomerSignUp'" >Sign Up</Button></Nav.Link>
            <Nav.Link  href="/CustomerLogin"><Button className="btn btn-warning" onClick={this.state.hideNavItem}>Sign in</Button></Nav.Link>
            <Nav.Link onClick={this.logout} href="/"> <Button className="btn btn-warning" onclick="location.href ='/'" >Log Out</Button></Nav.Link>
          </Nav> */}
          <ul className="nav justify-content-end nav-fill" >

          {(localStorage.usertoken) ? null :  
          <li className="nav-item">
            <a className="nav-link" className="text-light"  href="/CustomerSignUp">Sign Up</a>
          </li>}

          {(localStorage.usertoken) ? null :
          <li className="nav-item">
          <a className="nav-link" className="text-light" href="/CustomerLogin" tabindex="-1" aria-disabled="true">Login In</a>
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
        {(localStorage.usertoken) ?
        <li className="nav-item">
          <a className="nav-link "className="text-light"  href="/BookingList" tabindex="-1" aria-disabled="true">Bookings list</a>
        </li> : null}
        {(localStorage.usertoken) ? 
        <li className="nav-item">
          <a className="nav-link "className="text-light" onClick={this.logout} href="/" tabindex="-1" aria-disabled="true">Log Out</a>
        </li> : null }
      
</ul>
         
        </Navbar.Collapse>
      </Navbar>

    )
  }
}