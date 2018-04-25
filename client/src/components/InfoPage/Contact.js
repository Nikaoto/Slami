import React, { Component } from "react"
import InfoPage from "./InfoPage"
import { contact_label } from "../../config"

export default class Contact extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <InfoPage
        animation={this.props.animation}
        content={
          <div>
            <h5>{contact_label}</h5>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

              <p style={{ fontSize: 18 }}>
                ტელეფონი: +995 551 50 60 70
              </p>
              <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.61766435918!2d44.73584371569932!3d41.70718878407082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40447344e8047ced%3A0xb53d8ecd4495903f!2sBusiness+and+Technology+University!5e0!3m2!1sen!2sge!4v1524663313390?key=AIzaSyAE4bkKqcGb2rJp6CvGNSnfM6JQdACJRvI"}
                    width={"600"} height={"450"} frameBorder={"0"} style={{ border: 0 }} allowFullScreen/>
            </div>
          </div>
        }
      />
    )
  }
}