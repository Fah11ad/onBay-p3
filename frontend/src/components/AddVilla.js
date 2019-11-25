import React, { Component } from 'react'
import { Card, Button, Image, Form, Row, Nav, Link } from 'react-bootstrap'
import { login }  from '../functionAuth/functionAuth'
import OwnerSignUp from './OwnerSignUp'

export default class AddVilla extends Component {
    state ={
        // constructor(){
        //     super(props)
        //     this.props.history.push('/OwnerSignUp')

        // }

    }
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
    // onSubmitRegisterHandelr = async (e)=>{
    //     await OwnerSignUp(this.state)
    //     this.props.history.push('/OwnerSignUp')
    // }
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
                <Form.Group>
                    <br/>
                <div>Don’t have an account? <Nav.Link href="/OwnerSignUp"><Button variant="link"> Sign Up </Button></Nav.Link></div>
                </Form.Group>
             </Form>
                            
            </div>
            </div>
          
        )
    }
}



// export default class AddVilla extends Component {
//     render() {
//         return (
//             <div className= "formcontainer">
//             <div className="top">ADD VILLA</div>
//         <div className="form">
//          <Form>
          
          
//              <Form.Group >
//                  <Form.Control type="text" placeholder="Enter Vill Name" />
//              </Form.Group>
//              <Form.Group >
//                 <Form.Control type="text" placeholder="Enter Villa area" />
//             </Form.Group>
             
//              <Form.Group >
//                 <Form.Control type="text" placeholder="Enter Villa area" />
//             </Form.Group>
            
//             <div className="btnn">
//             <Button variant='secondary' type="submit">
//                ADD
//             </Button>
         
//             </div>
//          </Form>
                        
//         </div>
//         </div>
//         )
//     }
// }
