import React, { Component } from "react"

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { slides } = this.props

    return(
      <div className="row">
        { slides.map(sl => <img key={sl.key} src={sl.url} alt={sl.title} />) }
      </div>
    )
  }
}