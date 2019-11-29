import React, { Component } from 'react'
import { Button, Form,  Nav} from 'react-bootstrap'
import { login } from '../functionAuth/functionAuth'
import OwnerSignUp from './OwnerSignUp'

export default class AddVilla extends Component {
    state = {}

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandelr = async (e) => {
        e.preventDefault()
        await login(this.state)
        this.props.history.push('/profile')

    }
    render() {
        return (
            <div className="formcontainer">
                <div className="top">LOG IN</div>
                <div className="form">
                    <Form onSubmit={this.onSubmitHandelr}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter Email" name="email"
                                onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password"
                                onChange={this.onChangeHandler} />
                        </Form.Group>

                        <button className="btnn" type="submit" style={{ width: "90px" }}>
                            LOG IN
                         </button>
                        <Form.Group>
                            <div>Don’t have an account? <Nav.Link href="/OwnerSignUp">
                                <Button variant="link" style={{ width: "90px" }}> Sign Up </Button></Nav.Link></div>
                        </Form.Group>
                    </Form>

                </div>
            </div>

        )
    }
}

