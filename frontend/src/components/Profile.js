import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import decoded from 'jwt-decode'
import {Button} from 'react-bootstrap'
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: '',
      errors: {}
    }
  }
  componentDidMount() {
    const token = localStorage.usertoken
    if(token){
      const decoded = jwt_decode(token)
    this.setState(decoded.user)
    }else{
      this.props.history.push('/CustomerLogin')
    }
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.firstname}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.lastname}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{this.state.phonenumber}</td>
              </tr>
              <tr>
                {/* <td>Change Password</td> */}
                <td><div class="button_cont" align="center"><a class="example_a" href="/EditProfile" target="_blank" rel="nofollow noopener">Edit Profile</a></div></td>
                <td><div class="button_cont" align="center"><a class="example_a" href="/ChangePassword" target="_blank" rel="nofollow noopener">Change Password</a></div></td>
              </tr>
            </tbody>
          </table>
          {/* <Button href="/EditProfile" variant='secondary' type="submit">Edit Profile</Button> */}
        </div>
        <tr> 
            {/* <div class="button_cont" align="center"><a class="example_a" href="/EditProfile" target="_blank" rel="nofollow noopener">Edit Profile</a></div> */}
        </tr>
      </div>
    )
  }
}
export default Profile