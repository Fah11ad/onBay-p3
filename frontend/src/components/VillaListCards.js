import React, { Component } from 'react'
import '../App.css';
import vImage from "../assets/villaImg.jpg"
import jwt_decode from 'jwt-decode'
import axios from "axios"
import { Redirect } from 'react-router-dom'

export default class VillaListCards extends Component {

    state = { checked: false }
    
    deleteVilla = (e) => {
        axios.delete("http://localhost:4000/villa/" + e.target.id)
        .then(()=>{window.location.reload()})

    }

    goToEdit = (e) => {
        this.setState({ checked: true })
    }

    render() {
        return (
            <div className="detalilsform" style={{ backgroundColor: "#eff3f6" }}>
                <div>
                    {this.state.checked == true &&
                        <Redirect to={{
                            pathname: '/EditVilla',
                            state: { data: this.props.data }
                        }} />}
                    <img className="villimage"
                        src={vImage}
                        alt="First slide"
                    />
                </div>
                <div style={{ marginTop: "10%" }}>
                    <h3>{this.props.data.name}</h3>
                    <br />
                    <div>
                        <button onClick={this.goToEdit} id={this.props.data._id} style={{ width: "10%", margin: "5px" }} type="button" class="btn btn-warning">Edit</button>
                        <button onClick={this.deleteVilla} id={this.props.data._id} style={{ width: "10%", margin: "5px" }} type="button" class="btn btn-warning">Delete</button>
                    </div>
                </div>

            </div>
        )
    }
}
