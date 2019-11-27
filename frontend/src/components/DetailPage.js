import React, { Component } from 'react'
import vImage from "../assets/villaImg.jpg"
import ReactMapGL, { Marker } from 'react-map-gl'
import markerImg from "../assets/marker20.png"
import Ratings from 'react-ratings-declarative'
import { Carousel, Form, Jumbotron, Container } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import ReviewCards from "./ReviewCards"
import axios from 'axios'

export default class DetailPage extends Component {

    state = {
        ratings: null,
        reviewText: null,
        reviews: null,
        user: null,
        facilitiesList: null,
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
        axios.post("http://localhost:4000/booking/create", params)
    }

    render() {
        let ratingAv = 3
        return (
            <div>
                <img
                    className="d-block w-100"
                    src={vImage}
                    style={{ width: 600, height: 500 }}
                    alt="First slide"
                />
                <h1>{this.props.location.state.data.name}</h1>

                {this.state.user != null &&
                    <ul class="actions" onClick={this.bookIT} >
                        <li><a class="button alt">Book it</a></li>
                    </ul>}
                {this.state.user == null &&
                    <ul class="actions">
                        <li><a class="button alt" href="/CustomerSignUp" >login to book</a></li>
                    </ul>
                }

                {this.props.location.state.data.facilities.map(item => {
                    return <img src={require("../assets/" + item + ".png")} />
                })}

                <br />
                <h2>Facilities icons</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia arcu sit amet eros congue elementum.
                    Donec urna elit, dapibus non lacus vitae, tempor egestas tellus. Praesent eu urna vel tellus blandit blandit. Vivamus
                    quis eros vel libero faucibus tincidunt eu sed enim. Fusce tellus dolor, bibendum id felis nec, rhoncus tempor diam.
                    Pellentesque mollis eu nunc vitae fermentum. Proin eget semper dolor. Nullam id felis non sem dictum elementum eu quis
                    sapien. Donec nec venenatis mauris, fringilla imperdiet lorem.
                     Phasellus id mauris augue. Curabitur ut ligula elit. Mauris vel mi eu neque luctus varius vel sed eros.</p>
                <h2>price</h2>
                <br />

                <Ratings
                    rating={this.state.rating}
                    widgetRatedColors="rgb(255, 209, 26)"
                    widgetHoverColors="rgb(255, 209, 26)"
                    changeRating={this.changeRating.bind(this)}>
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                </Ratings>
                <br />
                <ReactMapGL className="mapMargins" {...this.state.viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    onViewportChange={(viewport) => this.setState({ viewport })}>
                    <Marker latitude={21.6394345} longitude={39.1322110} offsetLeft={0} offsetTop={0} >
                        {/* offsetLeft={-20} offsetTop={-10}  */}
                        <img src={markerImg} />
                    </Marker>
                </ReactMapGL>

                {this.state.reviews != null && this.state.reviews.map((item) => { return <ReviewCards data={item} /> })}
                <h2>Add review</h2>
                <Form.Control as="textarea" rows="3" onChange={this.inputChange.bind(this)} />
                <input onClick={this.postreview.bind(this)} type="button" value="submit" />


                <h2>book it button</h2>


            </div>
        )
    }
}
