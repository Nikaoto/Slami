import React, { Component } from "react"
import InfoPage from "./InfoPage"

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
            <h5>კონტაქტი</h5>
            <p style={{ fontSize: 18 }}>
              საკონტაქტო გვერდი
            </p>
          </div>
        }
      />
    )
  }
}