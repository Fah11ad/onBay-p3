import React, { Component } from 'react'
// import { Card, Button, Image, Form, Row, Col } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'
import '../App.css'
import axios from "axios"
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default class CustomTables extends Component {
    // initlaize state (1-imp)
    constructor(props) {
        super(props)

        //(4-imp) Bind those below methods to **this** by adding the following lines of code to the constructor
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeGuests = this.onChangeGuests.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //(4-imp) ----- End -------

        this.state = {
            city: '',
            startDate: '',
            endDate: '',
            guests: '',
            bookings: null,
            villas: null,
            results:null
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/villa")
            .then(res => {
                this.setState({ villas: res.data })
            })
            .catch()

        axios.get("http://localhost:4000/booking")
            .then(res => { this.setState({ bookings: res.data }) })
    }

    //Methods to update state (2-imp)
    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    }

    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        })
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        })
    }

    onChangeGuests(e) {
        this.setState({
            guests: e.target.value
        })
    }

    //Submit event Method of the Form & check the output(3-imp)
    onSubmit(e) {
        e.preventDefault()

        console.log('Form submitted:');
        console.log(`City: ${this.state.city}`);
        console.log(`Start Date: ${this.state.startDate}`);
        console.log(`End Date: ${this.state.endDate}`);
        console.log(`Guests: ${this.state.guests}`);

        let searchResult = []

        let filteredVillas = this.state.villas.filter(vItem => {
            return vItem.city == this.state.city && vItem.guests == this.state.guests
        })

        filteredVillas.map(item => {
            let filteredBooking = this.state.bookings.filter(bItem => {
                return item._id == bItem.villa //&& (this.state.startDate > bItem.endAt || bItem.startAt > this.state.endDate)
            })

            if (filteredBooking.length > 0) {
                filteredBooking.map(check => {
                    if (this.state.startDate > check.endAt || check.startAt > this.state.endDate) {
                        searchResult.push(item)
                    }
                })
            } else {
                searchResult.push(item)
            }
        })


        this.setState({results:searchResult})
        console.log("results length: "+searchResult.length)
        // searchResult.map(results => {
        //     console.log("results")
        //     console.log(results)
        // })

        // <Redirect to={{
        //     pathname: '/results',
        //     state: { results: this.state.results }
        //   }}/>
        //Reset the form after submition (3-imp)
        // this.setState({
        //     city: '',
        //     startDate: '',
        //         endDate: '',
        //         guests: ''
        // })    
    }

    render() {
        return (
            <div>
                {this.state.results != null && 
                <Redirect to={{
                    pathname: '/Results',
                    state: { results: this.state.results }
                  }}/>
                }
                <div className="search-bar">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row" >
                            <div className="form-group col-md-2">
                                <label>City</label>
                                <input type="string" className="form-control" id="inputCity" placeholder="Enter a city"
                                    //(5-imp)
                                    value={this.state.city}
                                    onChange={this.onChangeCity}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Check in Date</label>
                                <input type="date" className="form-control" id="inputCheck-in" placeholder="Check in Date"
                                    //(5-imp)
                                    value={this.state.startDate}
                                    onChange={this.onChangeStartDate}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Check out Date</label>
                                <input type="date" className="form-control" id="inputCheck-out" placeholder="Check out Date"
                                    //(5-imp)
                                    value={this.state.endDate}
                                    onChange={this.onChangeEndDate}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label>Guests</label>
                                <select id="inputState" className="form-control"
                                    value={this.state.guests}
                                    onChange={this.onChangeGuests}
                                >
                                    <option >Choose</option>
                                    <option

                                    >5 - 10</option>
                                    <option

                                    >10 - 20</option>
                                    <option>20 - 30</option>
                                    <option>30 - 50</option>
                                    <option>50 and above</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="hide-chr"> - </label>
                                <div>
                                    <button type="submit" className="btn btn-dark search-btn"
                                    //(5-imp)

                                    >Search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
