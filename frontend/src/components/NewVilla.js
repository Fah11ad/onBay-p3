import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Form, Button, Row, Col,Alert } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewVilla extends Component {

    state = {
        filename: "",
        uploadedFile: "",
        uploadedFile: "",
        facilities: [],
        guests: "5 - 10",
        owner: null,
        checked: false,
    }

    componentDidMount() {
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
        const file = document.getElementById('inputGroupFile01').files
        const formData = new FormData()

        formData.append('img', file[0])
        console.log("file is ")
        let im = ""
        if (file.length != 0) {
            im = file[0].name
            axios.post("http://localhost:4000/uploadimage/", formData)
                .then(r => {
                    console.log("adding image")
                    console.log(r)
                })
                .catch(err => console.log(err))
        }

        let params = {
            name: this.state.name,
            city: this.state.city,
            price: this.state.price,
            description: this.state.description,
            guests: this.state.guests,
            facilities: this.state.facilities,
            area: this.state.area,
            owner: this.state.owner,
            x: this.state.x,
            y: this.state.y,
            image: im
        }


        axios.post("http://localhost:4000/villa/create", params)

        this.setState({ checked: true })


    }

    render() {


        return (
            <div className="villacontainer">
                {this.state.checked == true &&
                <Alert style={{ marginLeft:"10%",marginRight:"10%" , backgroundColor: "rgb(212,237,218)", color:"green"}} color="success">Successfully added new villa</Alert>
                } 
                <div className="villatop">ADD VILLA</div>
                <div className="villaform">
                    <Form>
                    <Form.Group >
                        <Form.Label className="detalilsform">Villa Name:</Form.Label>
                        <Form.Control name="name" type="String" onChange={this.onChangHandler} />
                    </Form.Group>
                    <Form.Group >

                        <Form.Label className="detalilsform">Villa Area:</Form.Label>
                        <Form.Control type="String" onChange={this.onChangHandler} name="area" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className="detalilsform">Select City</Form.Label>
                        <Form.Control type="String" onChange={this.onChangHandler} name="city" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className="detalilsform">Villa Price:</Form.Label>
                        <Form.Control type="String" onChange={this.onChangHandler} name="price" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className="detalilsform">Select Number of Gusts:</Form.Label>
                        <Form.Control as="select" onChange={this.onChangHandler} name="guests">
                            <option>5 - 10</option>
                            <option>10 - 20</option>
                            <option>20 - 30</option>
                            <option>30 - 50</option>
                            <option>50 and above</option>

                        </Form.Control>
                    </Form.Group>


                    <Form.Group >
                        <Form.Label className="detalilsform">Villa Description: </Form.Label>
                        <Form.Control as="textarea" type="String" onChange={this.onChangHandler} name="description" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className="detalilsform">Location: </Form.Label>
                        <Row>
                            <Col>
                                <Form.Control type="String" onChange={this.onChangHandler} name="x" placeholder="latitude" />

                            </Col>
                            <Col>
                                <Form.Control type="String" onChange={this.onChangHandler} name="y" placeholder="longitude" />

                            </Col>
                        </Row>
                    </Form.Group>


                    <Form.Label className="detalilsform" >Facilities: </Form.Label>
                    <br />
                    <br />
                    <Form style={{ display: "grid", gridAutoColumns: "1fr 1fr 1fr" }}>
                        {['checkbox'].map(type => (
                            <div key={`default-${type}`} className="mb-3">
                                <Row>
                                    <Col>
                                        <Row>
                                        <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="Terrace" type={type} id="terrace" /></Row>
                                       <Row> <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="Sport Court " type={type} id="sport court" /></Row>
                                      <Row>  <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="WiFi" type={type} id="wifi" />
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                        <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="Kitchen" type={type} id="kitchen" /></Row>
                                       <Row> <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="Garden" type={type} id="garden" /></Row>
                                      <Row>  <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="Grill" type={type} id="grill" /></Row>

                                    </Col>
                                    <Col>

                                       <Row> <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="Playground" type={type} id="playground" /></Row>
                                        <Row><Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label="children Swimming Pool" type={type} id="cswimming pool" /></Row>
                                       <Row> <Form.Check style={{ float: "left" }} onChange={this.onChangHandler} label=" Swimming Pool" type={type} id="swimming pool" /></Row>

                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Form>


                    <div>
                        <form>
                            <div id="upload">
                                <div className="custom-file">
                                    <input style={{ width: "50%" }} type="file" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                    <label class="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>

                                </div>

                            </div>
                        </form>
                        <Button onClick={this.onSubmit} variant='secondary' type="submit">Add</Button>
                        {/* <button onClick={this.onSubmit} className="btnn" type="submit">ADD</button> */}



                    </div>
                    
                </Form>
                </div>
            </div>
        )
    }
}
