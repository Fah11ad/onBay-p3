import React, { Component } from 'react'
import Ratings from 'react-ratings-declarative';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

export default class SearchCards extends Component {

    state={clicked:false}

    showDetails = () =>{
        this.setState({clicked:true})
    }

    deleteVilla = () =>{
        let vID = this.props.data._id
        Axios.delete("http://localhost:4000/villa/" + vID)
    }

    render() {
        // console.log("inside cards")
        // console.log(this.props.data)

        let avg = 0
        let sum = 0
        let count = 0
        console.log("ratings size")
        console.log(this.props.data.ratings.length)
        if (this.props.data.ratings.length > 0) {
            this.props.data.ratings.map(rItem => {
                sum += rItem.ratevalue
                count++
            })
        }

        avg = sum / count
        console.log("the avg: " + Math.round(avg))

        return (
            <div  class="spotlight">
                <div class="image">
                    <img src={require("../assets/villa-pic.jpg")} />
                </div>
                <div class="content">
                    <h3>{this.props.data.name}</h3>
                    {/* <p>{this.props.data.description}</p> */}

                    <Ratings className="ratingsStarsStyle"
                        widgetRatedColors="rgb(255, 209, 26)">
                        <Ratings.Widget widgetEmptyColor={avg >= 1 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={avg >= 2 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={avg >= 3 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={avg >= 4 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                        <Ratings.Widget widgetEmptyColor={avg >= 5 ? "rgb(255, 209, 26)" : "rgb(203,211,227)"} />
                    </Ratings>
                    <h3>{this.props.data.price}</h3>


                    <ul class="actions" onClick={this.showDetails} >
                        <li><a  class="button alt">Check</a></li>
                    </ul>
                    {/* <ul class="actions" onClick={this.deleteVilla} >
                        <li><a  class="button alt">Delete</a></li>
                    </ul> */}

                </div>
                {this.state.clicked == true && 
                <Redirect to={{
                    pathname: '/VillaDetails',
                    state: { data: this.props.data, startAt:this.props.startAt,endAt:this.props.endAt }
                  }}/>}
                  {/* {this.state.clicked == true && 
                <Redirect to={{
                    pathname: '/EditVilla',
                    state: { data: this.props.data }
                  }}/>
                } */}
            </div>
        )
    }
}
