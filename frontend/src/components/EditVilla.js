import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Form, Row, Col,Alert } from 'react-bootstrap'
import axios from 'axios'
export default class EditVilla extends Component {

    state = {
        message: "",
        filename: "",
        uploadedFile: "",
        uploadedFile: "",
        facilities: [],
        guests: "5 - 10",
        owner: null,
        checked:false
    }

    componentDidMount() {
        this.setState({
            facilities:this.props.location.state.data.facilities,
            name:this.props.location.state.data.name,
            price:this.props.location.state.data.price,
            description:this.props.location.state.data.description
        })


        const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            this.setState({ owner: decoded.user._id })
        } 
    }

    onChangHandler = e => {
        this.setState({ [e.target.name]: e.target.value, })

        if (e.target.id != "") {
            let temp = this.state.facilities.slice()
            let fIndex = temp.indexOf(e.target.id)

            if (fIndex < 0) {
                temp.push(e.target.id)
            } else {
                temp.splice(fIndex, 1)
            }
            this.setState({ facilities: temp })
        }

    }

    onSubmit = e => {
        e.preventDefault();
        let vID = this.props.location.state.data._id
        let params = {
            name: this.state.name,
            price: this.state.price,
            description: this.state.description,
            facilities: this.state.facilities,
        }

        this.setState({checked:true})
        axios.put("/villa/"+vID,params)
    }

    render() {
        return (
            <div className="villacontainer">
                {this.state.checked == true &&
                <Alert style={{ marginLeft:"10%",marginRight:"10%" , backgroundColor: "rgb(212,237,218)", color:"green"}} color="success">Successfully edited new villa</Alert>
                } 
                <div className="villatop">ADD VILLA</div>
                <div className="villaform">
                    <Form>
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={this.state.name} name="name" type="String" onChange={this.onChangHandler} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Price:</Form.Label>
                            <Form.Control value={this.state.price} type="String" onChange={this.onChangHandler} name="price" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Description </Form.Label>
                            <Form.Control value={this.state.description} as="textarea" type="String" onChange={this.onChangHandler} name="description" />
                        </Form.Group>

                        <Form.Label>Facilities </Form.Label>
                        <Form>
                            {['checkbox'].map(type => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Row>
                                        <Col>

                                            <Form.Check checked={this.state.facilities.includes("terrace")} onChange={this.onChangHandler} label="Terrace" type={type} id="terrace" />
                                            <Form.Check checked={this.state.facilities.includes("sport court")} onChange={this.onChangHandler} label="Sport Court " type={type} id="sport court" />
                                            <Form.Check checked={this.state.facilities.includes("wifi")} onChange={this.onChangHandler} label="WiFi" type={type} id="wifi" />

                                        </Col>
                                        <Col>

                                            <Form.Check checked={this.state.facilities.includes("kitchen")} onChange={this.onChangHandler} label="Kitchen" type={type} id="kitchen" />
                                            <Form.Check checked={this.state.facilities.includes("garden")} onChange={this.onChangHandler} label="Garden" type={type} id="garden" />
                                            <Form.Check checked={this.state.facilities.includes("grill")} onChange={this.onChangHandler} label="Grill" type={type} id="grill" />

                                        </Col>
                                        <Col>

                                            <Form.Check checked={this.state.facilities.includes("playground")} onChange={this.onChangHandler} label="Playground" type={type} id="playground" />
                                            <Form.Check checked={this.state.facilities.includes("cswimming pool")} onChange={this.onChangHandler} label="Children Swimming Pool" type={type} id="cswimming pool" />
                                            <Form.Check checked={this.state.facilities.includes("swimming pool")} label=" Swimming Pool" type={type} id="swimming pool" />

                                        </Col>
                                    </Row>
                                </div>
                            ))}

                        </Form>
                        
                        <button onClick={this.onSubmit}  className="btnn" type="submit"> EDIT</button>

                        {/* <div className="btnn">
                            <Button onClick={this.onSubmit} variant='secondary' type="submit">
                                ADD
                         </Button>

                        </div> */}
                    </Form>

                </div>
            </div>
        )
    }
}
