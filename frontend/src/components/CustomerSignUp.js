import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Button,
} from 'react-bootstrap'
import React, { Component } from 'react'
import { register }  from '../functionAuth/functionAuth'
import jwt_decode from 'jwt-decode'
import axios from 'axios'


export default class CustomerSignUp extends Component {
    state ={}


onChangHandler=(e)=>{
    this.setState({
        [e.target.name] : e.target.value,
        type: 1
    })
}
onSubmitHandelr = async (e)=>{
    e.preventDefault()
    await register(this.state)
    this.props.history.push('/CustomerLogin')
}
    render() {
      

        return (
            <div className="container">
            <div className="jumbotron mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">PROFILE</h1>
              </div>
              <Form onSubmit={this.onSubmitHandelr}>
              <table className="table col-md-6 mx-auto">
                <tbody>
                  <tr>
                    <td>Fist Name</td>
                    <td>
                        <input onChange={this.onChangeHandler} type="text" name="firstname" placeholder={this.state.firstname}/>
                    </td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td><input onChange={this.onChangeHandler} type="text" name="lastname" placeholder={this.state.lastname}/></td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td><input onChange={this.onChangeHandler} type="text" name="phonenumber" placeholder={this.state.phonenumber}/></td>
                  </tr> 
                </tbody>
              </table>
              <Button variant='secondary' type="submit"></Button>
              </Form>
              </div>
            <tr> 
                <td><div class="button_cont" align="center"><a class="example_a" href="/Profile" target="_blank" rel="nofollow noopener">Edit Profile</a></div></td>
            </tr>
          </div>
        )
    }
}
