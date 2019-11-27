import React, { Component } from 'react'
import '../App.css';
import vImage from "../assets/villaImg.jpg"
import jwt_decode from 'jwt-decode'
import axios from "axios"
import { Redirect } from 'react-router-dom'
import VillaListCards from './VillaListCards'

export default class SearchResults extends Component {

    state = {
        ownersVillas: null,
        checked:false
    }
    
    componentDidMount = () => {
        const token = localStorage.usertoken
        let id;
        if (token) {
            const decoded = jwt_decode(token)
            id = decoded.user._id
            this.setState({ user: decoded.user._id })
        }

        axios.get("http://localhost:4000/villa/owner/" + id)
            .then(res => {
                console.log(res.data)
                this.setState({ ownersVillas: res.data })
            })
            .catch(err => { console.log(err) })
    }

    render() {

        return (
            <div >
                {this.state.ownersVillas != null && this.state.ownersVillas.map(item=>{
                return <VillaListCards data={item} />
                     
                })}
               

            </div>
        )
    }
}