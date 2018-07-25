import React, { Component } from "react";
import "./LinkGoogleMaps.css";



class LinkGoogleMaps extends Component {
  render() {
      return <div className="animated bounceInLeft">

          <a className="sample" href="https://www.google.com/maps/dir/Current+Location/" target="_blank">
              <span className="text">link to google maps</span>
              <span className="line -right"/>
              <span className="line -top"/>
              <span className="line -left"/>
              <span className="line -bottom"/>
          </a>


      </div>
  };
}


export default LinkGoogleMaps;


    