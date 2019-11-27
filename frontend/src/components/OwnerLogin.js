import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Button } from 'react-bootstrap'
import React, { Component } from 'react'
import { login } from '../functionAuth/functionAuth'
 

export default class OwnerLogin extends Component {
    state ={}
    
    onChangeHandler=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmitHandelr = async (e)=>{
        e.preventDefault()
        await login(this.state)
        this.props.history.push('/profile')
        console.log(this.props.history);
        
    }
    render() {
        console.log(this.state)
        return (
           <div className= "formcontainer">
                <div className="top">LOG IN</div>
            <div className="form">
             <Form onSubmit={this.onSubmitHandelr}>
                 <Form.Group controlId="formBasicEmail">
                     <Form.Control type="email" placeholder="Enter Email" name="email" 
                        onChange={this.onChangeHandler} />
                 </Form.Group>
                 
                 <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name="password" 
                        onChange={this.onChangeHandler}  />
                </Form.Group>
                
                <div className="btnn">
                <Button variant='secondary' type="submit">
                   LOG IN
                </Button>
             
                </div>
             </Form>
                            
            </div>
            </div>
          
        )
    }
}
