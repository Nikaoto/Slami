import React, { Component } from "react"
import "./Spinner.css"

export default class Spinner extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className={this.props.className || ""} style={{...styles.container, ...this.props.style}}>
        <div style={{...styles.main, ...this.props.innerStyle}} className="item-loader-container">
          <div style={this.props.style} className="la-square-loader la-2x">
            <div/>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    backgroundColor: "#e8e8e8",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  main: {
    position: "absolute",
    top: "45%",
    left: "45%"
  }
}