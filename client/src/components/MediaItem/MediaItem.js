import React, { Component } from "react"
import Img from "react-image"
import "./MediaItem.css"
import Spinner from "../Spinner"

export default class MediaItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.num !== null,
    }
  }

  onClick() {
    const selected = !this.state.selected

    if (this.props.onClick) {
      this.props.onClick(selected)
    }

    this.setState({ selected: selected })
  }

  renderSpinner(imgStyle) {
    return (
      <Spinner
        className={"slideLeftFadeIn"}
        style={{ ...imgStyle, position: "relative", padding: 10 }}
        innerStyle={{ position: "relative", top: 0, left: 0 }}
      />
    )
  }

  render() {
    const { url, title, num } = this.props
    const imgStyle = this.state.selected ? styles.selected : styles.default

    return(
      <div style={styles.container}>
        <div className="slide-num" style={this.state.selected ? styles.numSelected : styles.numDefault}>
          {num}
        </div>
        <Img className="hover-shadow slideLeftFadeIn" 
            src={url} 
            alt={title}
            loader={this.renderSpinner(imgStyle)}
            style={imgStyle}
            onClick={() => this.onClick()} />
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