import React, { Component } from 'react'
import '../App.css';
import vImage from "../assets/villaImg.jpg"
import jwt_decode from 'jwt-decode'
import axios from "axios"
import { Redirect } from 'react-router-dom'

export default class BookingListCard extends Component {

    deleteVilla = (e) => {
        axios.delete("http://localhost:4000/booking/" + e.target.id)
        .then(()=>{window.location.reload()})
    }

    render() {

        let fromD = this.props.data.startAt.split("T")
        let toD = this.props.data.endAt.split("T")
        return (
            <div>
               <div className="detalilsform" style={{ backgroundColor: "#eff3f6" }}>
                <div>
                        
                    <img className="villimage"
                        src={vImage}
                        alt="First slide"
                    />
                </div>
                <div style={{ marginTop: "10%" }}>
                    <h3>{this.props.data.villa.name}</h3>
                    <h3>From: {fromD[0]}</h3>
                    <h3>To: {toD[0]}</h3>
                    <br />
                    <div>
                        <button onClick={this.deleteVilla} id={this.props.data._id} style={{ width: "10%", margin: "5px" }} type="button" class="btn btn-warning">Delet</button>
                    </div>
                </div>

            </div>  
            </div>
        )
    }
}
