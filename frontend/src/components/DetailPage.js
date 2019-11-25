import React, { Component } from 'react'
import vImage from "../assets/villaImg.jpg"
import ReactMapGL, { Marker } from 'react-map-gl'
import markerImg from "../assets/marker20.png"
import Ratings from 'react-ratings-declarative'
import { Carousel, Form } from 'react-bootstrap'


export default class DetailPage extends Component {

    state = {
        ratings: null,
        reviewText: null,
        reviews: null,
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

    inputChange(e) {
        this.setState({ reviewText: e.target.value })
    }

    postreview = () => {
        console.log("inside postreview")

        // let vId = "5ddad46c22a3fa4bf8e8ebbd"

        // let params = {
        //     customer: "5dda3c8bbe53b816fc107993",
        //     reviewtext: this.state.reviewText
        // }
        // let flag = 0


        // Axios.put("http://localhost:4000/villa/review/" + vId, params)

        //    console.log(this.state.review)
    }

    render() {


        let ratingAv = 3
        return (
            <div>
                <h1>Villa Name</h1>
                <Carousel className="carouseslStyle">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={vImage}
                            style={{ width: 600, height: 500 }}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={vImage}
                            style={{ width: 600, height: 500 }}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br/>
                <h2>Facilities icons</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia arcu sit amet eros congue elementum. 
                    Donec urna elit, dapibus non lacus vitae, tempor egestas tellus. Praesent eu urna vel tellus blandit blandit. Vivamus 
                    quis eros vel libero faucibus tincidunt eu sed enim. Fusce tellus dolor, bibendum id felis nec, rhoncus tempor diam. 
                    Pellentesque mollis eu nunc vitae fermentum. Proin eget semper dolor. Nullam id felis non sem dictum elementum eu quis 
                    sapien. Donec nec venenatis mauris, fringilla imperdiet lorem.
                     Phasellus id mauris augue. Curabitur ut ligula elit. Mauris vel mi eu neque luctus varius vel sed eros.</p>
                <br />
                {ratingAv > 0 &&
                    <Ratings
                        rating={this.state.rating}
                        widgetRatedColors="rgb(255, 209, 26)"
                    >
                        <Ratings.Widget widgetEmptyColor={ratingAv >= 1 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={ratingAv >= 2 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={ratingAv >= 3 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={ratingAv >= 4 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={ratingAv >= 5 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                    </Ratings>}
                <br />

                <ReactMapGL className="mapMargins" {...this.state.viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    onViewportChange={(viewport) => this.setState({ viewport })}>
                    <Marker latitude={21.6394345} longitude={39.1322110} offsetLeft={0} offsetTop={0} >
                    {/* offsetLeft={-20} offsetTop={-10}  */}
                        <img src={markerImg} />
                    </Marker>
                    {/* <Marker
                        coordinates={[37.78, -122.41]}
                        anchor="bottom">
                        <img src={markerImg} />
                    </Marker> */}
                </ReactMapGL>

                <h2>Add review</h2>
                <Form.Control as="textarea" rows="3" onChange={this.inputChange.bind(this)} />
                <input onClick={this.postreview.bind(this)} type="button" value="submit" />
                {/* {this.state.reviews != null && this.state.reviews.map((item)=>{return <Reviewcards data={item} />})}  */}








            </div>
        )
    }
}
