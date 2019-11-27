import React, { Component } from 'react'
import BookingListCard from "./BookingListCard"
import jwt_decode from 'jwt-decode'
import axios from "axios"

export default class BookingList extends Component {

    state = {userVillas:null}
    
    componentDidMount = () => {
        const token = localStorage.usertoken
        let id;
        if (token) {
            const decoded = jwt_decode(token)
            id = decoded.user._id
            this.setState({ user: decoded.user._id })
        }

        axios.get("http://localhost:4000/booking/5dde09e10783f50308b4b583")
            .then(res => {
                console.log(res.data)
                this.setState({ userVillas: res.data })
            })
            .catch(err => { console.log(err) })

        
    }

    render() {
        return (
            <div>
                {this.state.userVillas != null && this.state.userVillas.map(item=>{
                return <BookingListCard data={item} />
                     
                })}
            </div>
        )
    }
}
