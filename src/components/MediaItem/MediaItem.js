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

  render() {
    const { url, title, num } = this.props

    return(
      <div>
        <p style={this.state.selected ? styles.numSelected : styles.numDefault}>{num}</p>
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

const styles = {
  default: {
    margin: 6,
    maxWidth: 120,
    maxHeight: 120,
    borderWidth: 0,
    borderStyle: "solid",
  },
  selected: {
    margin: "6 1 6 1",
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 5,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#0080ff",
  },
  numDefault: {
    display: "none",
    postiion: "absolute",
  },
  numSelected: {
    display: "block",
    postiion: "absolute",
    margin: 6,
  }
}