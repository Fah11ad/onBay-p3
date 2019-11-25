import React, { Component } from 'react'
import { Image, Card, CardDeck } from 'react-bootstrap'
import SearchBar from './SearchBar'
// import Stars from './Stars'
import '../App.css'

export default class CustomTables extends Component {
  render() {
    return (

      <div >
        
        <Image className="home-img" src={require('../assets/villa2-pic.jpg')} style={{
          maxWidth: "100%"}} />
        
        <br />
        <SearchBar />
        <CardDeck className="custom-card mt-3" >
          <Card>
            <Card.Img variant="top" src={require("../assets/villa-pic.jpg")} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
      </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/villa-pic.jpg")} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
        content.{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={require("../assets/villa-pic.jpg")} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
      </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    )
  }
}
