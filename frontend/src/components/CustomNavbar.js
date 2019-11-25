import React, { Component } from 'react'
import { Navbar, Nav, Button} from 'react-bootstrap'


export default class CustomNavbar extends Component {
  constructor(props){
    super()
    this.state = {
      hideNavItem: false
    }
  }
    componentDidMount(){
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
    return (
      <Navbar collapseOnSelect expand="lg"  variant="dark" style={{ backgroundColor: "#250940" }}>
        <Navbar.Brand href="/">OnBay</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto pull-right" >
            <Nav.Link href="/AddVilla">+ Add Villa</Nav.Link>
            <Nav.Link href="/CustomerSignUp">Sign up</Nav.Link>
            <Nav.Link  href="/CustomerLogin"><Button onClick={this.state.hideNavItem}>Sign in</Button></Nav.Link>
            <Nav.Link onClick={this.logout} href="/">Log Out</Nav.Link>
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}
