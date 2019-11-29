import React, { Component } from 'react'
import Ratings from 'react-ratings-declarative';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

export default class SearchCards extends Component {

    state = { clicked: false }

    showDetails = () => {
        this.setState({ clicked: true })
    }

    deleteVilla = () => {
        let vID = this.props.data._id
        Axios.delete("/villa/" + vID)
    }

    render() {
        let avg = 0
        let sum = 0
        let count = 0
        if (this.props.data.ratings.length > 0) {
            this.props.data.ratings.map(rItem => {
                sum += rItem.ratevalue
                count++
            })
        }

        avg = sum / count

        return (

            <div className="detalilsform" style={{ backgroundColor: "#eff3f6" }}>
                <div>
                    <img className="villimage"
                        src={require("../assets/villa-pic.jpg")}
                        alt="First slide"
                    />
                </div>
                <div style={{ marginTop: "10%" }}>
                    <h3>{this.props.data.name}</h3>
                    <br />
                    <div>
                        <Ratings className="ratingsStarsStyle"
                            widgetRatedColors="rgb(255, 209, 26)">
                            <Ratings.Widget widgetEmptyColor={avg >= 1 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                            <Ratings.Widget widgetEmptyColor={avg >= 2 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                            <Ratings.Widget widgetEmptyColor={avg >= 3 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                            <Ratings.Widget widgetEmptyColor={avg >= 4 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                            <Ratings.Widget widgetEmptyColor={avg >= 5 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        </Ratings>
                        <h3>{this.props.data.price + " SAR per night"}</h3>
                        <button onClick={this.showDetails} id={this.props.data._id} style={{ width: "10%", margin: "5px" }} type="button" class="btn btn-warning">Check</button>
                    </div>
                </div>
                {this.state.clicked == true &&
                    <Redirect to={{
                        pathname: '/VillaDetails',
                        state: { data: this.props.data, startAt: this.props.startAt, endAt: this.props.endAt }
                    }} />}
            </div>


        )
    }
}
