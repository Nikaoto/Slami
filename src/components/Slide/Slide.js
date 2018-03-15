import React, { Component } from "react"
import Img from "react-image"

export default class Slide extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    const slide = this.props.slideObj
    const selected = slide.selected

    return(
      <div style={styles.container} onClick={this.onClick}>
        <Img className={"hover-shadow"}
            style={ selected ? styles.selectedImage : styles.defaultImage }
            src={slide.url}
            alt={slide.title}/>
      </div>
    )
  }
}

const selectedColor = "#0080ff"

const styles = {
  container: {
    borderWidth: 12,
    borderRadius: 12,
  },
  selectedImage: {
    width: 125,
    height: 125,
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 4,
    borderWidth: 5,
    padding: 0,
    borderStyle: "solid",
    borderColor: selectedColor,
  },
  defaultImage: {
    padding: 5,
    borderWidth: 0,
    borderStyle: "solid",
    width: 125,
    height: 125,
    marginBottom: 15,
    marginRight: 15,
  },
}