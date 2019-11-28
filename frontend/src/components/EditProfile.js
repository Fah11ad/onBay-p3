import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap'
import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';
import { login } from '../functionAuth/functionAuth'
class EditProfile extends Component {
    state = {
        firstname: jwt_decode(localStorage.usertoken).user.firstname,
        lastname: jwt_decode(localStorage.usertoken).user.lastname,
        phonenumber:jwt_decode(localStorage.usertoken).user.phonenumber,
        user: jwt_decode(localStorage.usertoken).user
    }
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
     onSubmitHandelr = (e) => {
        e.preventDefault()
        let obj = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phonenumber: this.state.phonenumber
        }
        // 5dde542dfb99cbfd790c1e9e
        axios.put(`http://localhost:4000/user/changedetails/${this.state.user._id}`, obj)
        .then(res => {
            localStorage.removeItem('usertoken')
            console.log(res.data.user)
            axios.post('http://localhost:4000/user/edit/token' , res.data.user)
          .then ((fes)=> {
            console.log(fes)   
            localStorage.setItem('usertoken' , fes.data)
                 setTimeout(() => {
                this.props.history.push('/profile')
            }, 500)
        })
            });
    // 
    }
       
        render() {
          console.log(this.state.lastname)
            return (
              <div className="formcontainer">
              <div className="top">Edit Profile</div>
              <div className="form">
              <Form onSubmit={this.onSubmitHandelr} noValidate>
              <table className="table col-md-6 mx-auto">
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>First name</Form.Label>
                        <Form.Control onChange={this.onChangeHandler} type="String" name="firstname" value={this.state.firstname}
                                onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Last name</Form.Label>
                            <Form.Control onChange={this.onChangeHandler} type="text" name="lastname" value={this.state.lastname} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Phone Number</Form.Label>
                            <Form.Control onChange={this.onChangeHandler} type="text" name="phonenumber" value={this.state.phonenumber} />
                        </Form.Group>
                        </table>
                        <Button variant='secondary' type="submit">Submit</Button>
                </Form>
              </div>
              </div>
            )
          }
        }
        export default EditProfile