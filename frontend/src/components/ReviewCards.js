import React, { Component } from 'react'

export default class Reviewscards extends Component {
    render() {
        return (
            <div class="card">
                        <div class="card-body">
                        {this.props.data.reviewtext}
                        </div>
                    </div>
        )
    }
}
