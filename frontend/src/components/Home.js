import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import SearchBar from './SearchBar'
import '../App.css'

export default class CustomTables extends Component {
  render() {
    return (

      <div >      
        <Image className="home-img" src={require('../assets/villa2-pic.jpg')} style={{
          maxWidth: "100%"}} />
        <SearchBar />
      </div>
    )
  }
}
