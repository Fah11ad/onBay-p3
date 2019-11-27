import React, { Component } from 'react'
import vImage from "../assets/villaImg.jpg"
import ReactMapGL, { Marker } from 'react-map-gl'
import markerImg from "../assets/marker20.png"
import Ratings from 'react-ratings-declarative'
import { Form } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import ReviewCards from "./ReviewCards"
import { Alert } from 'react-bootstrap'

export default class DetailPage extends Component {

    state = {
        ratings: null,
        reviewText: null,
        reviews: null,
        user: null,
        facilitiesList: null,
        checked: false,
        viewport: {
            width: 800,
            height: 400,
            // latitude: 37.78,
            // longitude: -122.41,
            latitude: 21.6394345,
            longitude: 39.1322110,
            zoom: 12
        }
    }

    changeRating(newRating) {
        console.log("rating: " + newRating)

        let vId = this.props.location.state.data._id    //this.props.data._id

        this.setState({newRating:newRating})
        let params = {
            customer: this.state.user,
            ratevalue: newRating
        }

        let flag = 0
        // this.state.ratings.map((item)=>console.log(item))
        this.state.ratings.map((item) => {
            if (item.customer == params.customer) {
                flag = 1
            }
        })
        if (flag == 0) {
            console.log("You just rated")
            axios.put("http://localhost:4000/villa/rate/" + vId, params)
        } else {
            console.log("Already rated !!!")
        }
    }

    componentDidMount() {
        let vId = this.props.location.state.data._id

        const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            this.setState({ user: decoded.user._id })
        } else {
            // this.props.history.push('/CustomerLogin')
        }
        axios.get("http://localhost:4000/villa/rates/" + vId)
            .then(res => { this.setState({ ratings: res.data }) })

        axios.get("http://localhost:4000/villa/review/" + vId)
            .then(res => { this.setState({ reviews: res.data }) })
    }

    inputChange(e) {
        this.setState({ reviewText: e.target.value })
    }

    postreview = () => {
        console.log("inside postreview")

        let vId = this.props.location.state.data._id

        let params = {
            customer: this.state.user,
            reviewtext: this.state.reviewText
        }
        let flag = 0
        axios.put("http://localhost:4000/villa/review/" + vId, params)
    }

    bookIT = () => {

        let params = {
            startAt: this.props.location.state.startAt,
            endAt: this.props.location.state.endAt,
            customer: this.state.user,
            villa: this.props.location.state.data._id
        }
        this.setState({checked:true})
        axios.post("http://localhost:4000/booking/create", params)
    }

    render() {
        return (
            <div>
                <div className="detalilsform">
                    <div>
                        <img className="villimage"
                            src={vImage}
                            alt="villa image" />
                    </div>
                    <div style={{ marginTop: "2%" }}>
                        <h1>{this.props.location.state.data.name}</h1>
                        <Ratings
                            rating={this.state.newRating}
                            widgetRatedColors="rgb(255, 209, 26)"
                            widgetHoverColors="rgb(255, 209, 26)"
                            changeRating={this.changeRating.bind(this)}>
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                        </Ratings>
                        <h3> {this.props.location.state.data.price + " SAR per night"}</h3>
                        <br />
                        {this.state.user != null &&
                            <button type="button" class="btn btn-warning" onClick={this.bookIT}>Book Now</button>}
                        {this.state.user == null &&
                            <button type="button" class="btn btn-warning" href="/CustomerSignUp">login to book</button>}
                            <br/>
                            <br/>
                        {this.state.checked == true &&
                            <Alert style={{ marginLeft: "60%", marginRight: "10%", backgroundColor: "rgb(212,237,218)", color: "green" }} color="success">Successfully added new villa</Alert>
                        }

                    </div>

                </div>
                <br />
                <br />

                <div style={{ clear: "both" }}>
                    <div className="label1">
                        <h5 style={{ float: "left", marginLeft: "10px" }}>Facilities</h5>
                    </div>
                    <div className="facilities">

                        {this.props.location.state.data.facilities.length > 0 && this.props.location.state.data.facilities.map(item => {
                            return <div> <img className="icon" src={require("../assets/" + item + ".png")} /></div>
                        })}

                    </div>
                </div>
                <div style={{ clear: "both" }}>
                    <div className="label1">
                        <h5 style={{ float: "left", marginLeft: "10px" }}> Description</h5>
                    </div>
                    <br />
                    <p>{this.props.location.state.data.description}</p>



                </div>
                <div style={{ clear: "both" }}>
                    <div className="label1">
                        <h5 style={{ float: "left", marginLeft: "10px" }}> Location</h5>
                    </div>
                    <ReactMapGL className="mapMargins" {...this.state.viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                        onViewportChange={(viewport) => this.setState({ viewport })}>
                        <Marker latitude={this.state.viewport.latitude} longitude={this.state.viewport.longitude} offsetLeft={0} offsetTop={0} >
                            <img src={markerImg} />
                        </Marker>

                    </ReactMapGL>
                </div>
                <div style={{ clear: "both" }}>
                    <div className="label1">
                        <h5 style={{ float: "left", marginLeft: "10px" }}> Reviews</h5>
                    </div>
                    <br />
                    {this.state.reviews != null && this.state.reviews.map((item) => { return <ReviewCards data={item} /> })}
                </div>
                {this.state.user != null &&
                    <div style={{ clear: "both" }}>
                        <div className="label1">
                            <h5 style={{ float: "left", marginLeft: "10px" }}>Add Reviews</h5>
                        </div>

                        <div style={{ width: "60%", marginLeft: "5px" }}>
                            <Form.Control style={{ height: "150px" }} as="textarea" rows="2" size='sm' onChange={this.inputChange.bind(this)} />
                            <input onClick={this.postreview.bind(this)} type="button" value="submit" />
                        </div>
                    </div>}

            </div>

        )
    }
}
