import React, { Component } from "react"
import Img from "react-image"
import { default_slide_duration_seconds, duration_label } from "../../config"

export default class Slide extends Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: props.duration || default_slide_duration_seconds
    }

    this.onClick = this.onClick.bind(this)
    this.onBlurDurationInput = this.onBlurDurationInput.bind(this)
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  onDurationChange(newDuration) {
    this.setState({ duration: newDuration })

    if (this.props.onDurationChange) {
      this.props.onDurationChange(newDuration)
    }
  }

  onBlurDurationInput() {
    const duration = this.state.duration

    if (duration === "") {
      this.setState({ duration: default_slide_duration_seconds })
      return
    }


    if (!parseInt(duration) && !parseFloat(duration)) {
      this.setState({ duration: default_slide_duration_seconds })
      return
    }

  }

  render() {
    const slide = this.props.slideObj
    const selected = slide.selected

    return(
      <div>
        {/* Duration Controls */}
        <div style={styles.durationContainer}>
          <input
            style={styles.durationInput}
            value={this.state.duration}
            onChange={(e) => this.onDurationChange(e.target.value)}
            onBlur={this.onBlurDurationInput}
          />
          <span style={styles.durationLabel}>{duration_label}</span>
        </div>

        {/* Slide Image */}
        <div style={styles.container} onClick={this.onClick}>
          <Img className={"hover-shadow"}
              style={ selected ? styles.selectedImage : styles.defaultImage }
              src={slide.url}
              alt={slide.title}/>
        </div>

        {/* Transition Controls */}
        <div>
        </div>
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
  durationContainer: {
    maxWidth: 125,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  durationLabel: {
    marginLeft: 10,
    marginBottom: 4
  },
  durationInput: {
    textAlign: "center",
    marginBottom: 4
  }
}