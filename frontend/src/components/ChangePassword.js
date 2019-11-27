import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap'
import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';

export default class ChangePassword extends Component {
    state = {
        wrong: false
    }
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmitHandelr = (e) => {
        e.preventDefault()
        let token = localStorage.usertoken
        const decoded = jwt_decode(token)


        axios.put(`http://localhost:4000/user/changepass/${decoded.user._id}`, {
            password: this.state.password,
            newPassword: this.state.newPassword
        })
            .then(res => {
                if ("password not match" == res.data.msg) {
                    this.setState({ wrong: true })
                }
                else {
                    this.setState({ show: true })
                }
            })
    }
    render() {
        console.log(this.state)
        return (

            <div className="formcontainer">
                <SweetAlert
                    show={this.state.show}
                    title="Change Password"
                    text="the password has been changed"
                    onConfirm={() => {
                        this.props.history.push('/profile')
                        this.setState({ show: false })
                    }}
                />

                {this.state.wrong && ['danger'].map((variant, idx) => (
                    <Alert key={idx} variant={variant}>
                        the old password not correct
                </Alert>
                ))}
                <div className="top">Change Password</div>
                <div className="form">
                    <Form onSubmit={this.onSubmitHandelr} noValidate>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password"
                                onChange={this.onChangeHandler} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="New Password" name="newPassword"
                                onChange={this.onChangeHandler} />
                        </Form.Group>

                        <div className="btnn">
                            <Button variant='secondary' type="submit">
                                Change Password
                </Button>

                        </div>
                    </Form>

                </div>
            </div>

        )
    }
}