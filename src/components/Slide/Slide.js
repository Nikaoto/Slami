import React, { Component } from "react"
import Img from "react-image"
import {
  choose_font_label,
  default_slide_duration_seconds, default_slide_transition, duration_label, fonts, transitions
} from "../../config"
import Button from "../Button/Button"
import { Dropdown, NavItem, Row, Button as MButton, Icon } from "react-materialize"

export default class Slide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: props.duration || default_slide_duration_seconds,
      transition: props.transition || default_slide_transition,
      dropped: false
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

  onTransitionChange(newTransition) {
    this.setState({
      transition: newTransition,
      dropped: false
    })

    if (this.props.onTransitionChange) {
      this.props.onTransitionChange(newTransition)
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
    const dropdownId = this.state.dropdownId

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
          <Img className={"no-drag hover-shadow"}
              style={ selected ? styles.selectedImage : styles.defaultImage }
              src={slide.url}
              alt={slide.title}/>
        </div>

        {/* Transition Controls */}
        <Row>
          <Dropdown trigger={ <MButton>{this.state.transition} <Icon right>chevron_right</Icon> </MButton> }>
            {
              Object.keys(transitions).map((k, i) =>
                <NavItem
                  key={i}
                  href={null}
                  onClick={() => this.onTransitionChange(transitions[k])}
                  style={styles.dropdownItem}>
                  {transitions[k]}
                </NavItem>
              )
            }
          </Dropdown>
        </Row>
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
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  dropdownButton: {
  },
  dropdownContent: {
    position: "absolute",
    zIndex: 10
  },
  dropdownItem: {

  }
}