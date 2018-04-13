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
            <p style={{ fontSize: 18 }}>
              საკონტაქტო ინფორმაცია მალე დაემატება
            </p>
          </div>
        }
      />
    )
  }
}