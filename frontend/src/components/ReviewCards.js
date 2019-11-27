import React, { Component } from 'react'

export default class Reviewscards extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.data.reviewtext}</h2>           
            </div>
        )
    }
}
