import React, { Component } from 'react'
import { Card, Image, Row, Col, Button } from 'react-bootstrap'

export default class SearchResults extends Component {
    render() {
        return (
            <div style={{ border: "2px" }}>
                <Card className="mx-5 my-5">
                <Row>
                    <Col className="first">
                    <Image style={{width: "400px"}} src={require("../assets/villa-pic.jpg")}/>  
                    </Col>
                    <Col className="second">
                    <Row>Row1</Row>
                    <Row>Row2</Row>
                    <Row>Row3</Row>
                    </Col>
                    <Col className="third align-self-end ml-3">
                    <Row >Price</Row>
                    <Row><Button>Check</Button></Row>
                    </Col>
                </Row>
                </Card>
              
            </div>
        )
            
//                <CardDeck style={{ width: '400px', display: 'flex', flexDirection: "row" }}>
//                <Card style={{ flex: 1 }}>
//   <Card.Img variant="top" src={require("../assets/villa-pic.jpg")} />
//   <Card.Body>
//     <Card.Title>Card Title</Card.Title>
//     <Card.Text>
//       Some quick example text to build on the card title and make up the bulk of
//       the card's content.
//     </Card.Text>
//   </Card.Body>
//   <ListGroup className="list-group-flush">
//     <ListGroupItem>Cras justo odio</ListGroupItem>
//     <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
//     <ListGroupItem>Vestibulum at eros</ListGroupItem>
//   </ListGroup>
//   <Card.Body>
//     <Card.Link href="#">Card Link</Card.Link>
//     <Card.Link href="#">Another Link</Card.Link>
//   </Card.Body>
// </Card>
  
// </CardDeck>
   
            }
        }
        
