import React, { Component } from "react"

export default class InfoPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={"container scene-element " + this.props.animation}>
        <div className={"col s12 card-panel"} style={{ backgroundColor: "white" }}>
          {this.props.content}
        </div>
      </div>
    )
  }
}