import React, { Component } from 'react'
import { Card, Image, Row, Col, Button } from 'react-bootstrap'
import SearchCards from "./SearchCards"

export default class SearchResults extends Component {
    render() {

        let results = this.props.location.state.results
        console.log(results.length)
        // console.log(this.props.location.state.results)
        return (
            <section id="two" class="wrapper style2 alt">
            <div class="inner">
                {results.length > 0 &&  results.map(item=>{ 
                    return <SearchCards data={item} startAt={this.props.location.state.startAt} endAt={this.props.location.state.endAt} />
                  })  }
                  {results.length == 0 && <h1>No results found</h1>}
            </div>
        </section>
        )
   
            }
        }
        
