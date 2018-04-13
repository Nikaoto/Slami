import React, { Component } from "react"
import InfoPage from "./InfoPage"

export default class Faq extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <InfoPage
        animation={this.props.animation}
        content={
          <div>
            <h5>ხშირად დასმული შეკითხვები</h5>
            <ul style={{ fontWeight: 500, fontSize: 18 }}>
              <li>შეკითხვა # 1</li>
              <li>შეკითხვა # 1</li>
              <li>შეკითხვა # 1</li>
              <li>შეკითხვა # 1</li>
              <li>შეკითხვა # 1</li>
              <li>შეკითხვა # 1</li>
            </ul>
          </div>
        }
      />
    )
  }
}