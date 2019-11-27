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
        phonenumber:jwt_decode(localStorage.usertoken).user.phonenumber
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
        // let token = localStorage.usertoken
        // const decoded = jwt_decode(token)
        // axios.put(`http://localhost:4000/user/changepass/${decoded.user._id}`, {
        //     password: this.state.password,
        //     newPassword: this.state.newPassword
        // })
        //     .then(res => {
        //         if ("password not match" == res.data.msg) {
        //             this.setState({ wrong: true })
        //         }
        //         else {
        //             this.setState({ show: true })
        //         }
        //     })
        render() {

          console.log(this.state.lastname)
            return (
              <div className="container">
                <div className="jumbotron mt-5">
                  <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">Edit Profile</h1>
                  </div>
                  <Form onSubmit={this.onSubmitHandelr}>
                  <table className="table col-md-6 mx-auto">
                    <tbody>
                      <tr>
                        <td>Fist Name</td>
                        <td>
                            <input onChange={this.onChangeHandler} type="text" name="firstname" value={this.state.firstname}/>
                        </td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td><input onChange={this.onChangeHandler} type="text" name="lastname" value={this.state.lastname}/></td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td><input onChange={this.onChangeHandler} type="text" name="phonenumber" value={this.state.phonenumber}/></td>
                      </tr> 
                    </tbody>
                  </table>
                  <Button variant='secondary' type="submit">Submit</Button>
                  </Form>
                  </div>
              </div>
            )
          }
        }
        export default EditProfile