import React, { Component } from "react"
import "./MediaItem.css"

export default class MediaItem extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      selected: false,
    }
  }

  onClick() {
    const selected = !this.state.selected

    if (this.props.onClick) {
      this.props.onClick(selected)
    }

    this.setState({ selected: selected })
  }

  renderNum(num) {
    if(num === null) return "null"; else return num
  }

  render() {
    const { url, title, num } = this.props

    return(
      <div style={styles.container}>
        <div className="slide-num" 
        style={styles.numSelected }>
          {this.renderNum(num)}
        </div>
        <img className="hover-shadow slideLeftFadeIn"
          alt={title}
          src={url}
          style={this.state.selected ? styles.selected : styles.default }
          onClick={() => this.onClick()} 
        />
      </div>
    )
  }
}
const selectedColor = "#0080ff"

const styles = {
  container: {
    position: "relative",
    textAlign: "center",
    maxWidth: 120,
    maxHeight: 120,
    margin: 6,
  },
  default: {
    borderWidth: 0,
    borderStyle: "solid",
    maxWidth: 120,
    maxHeight: 120,
  },
  selected: {
    borderRadius: 4,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: selectedColor,
    maxWidth: 120,
    maxHeight: 120,
  },
  numDefault: {
    visibility: "hidden",
    opacity: 0,
    position: "absolute",
    height: 0,
  },
  numSelected: {
    visibility: "visible",
    opacity: 1,
    color: "white",
    position: "absolute",
    top: "0px",
    left: "0px",
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: selectedColor,
    borderRadius: 10,
  }
}