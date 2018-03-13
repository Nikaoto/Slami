import React, { Component } from "react"
import ReactResizeDetector from "react-resize-detector"
import autoSizeInput from "autosize-input"

export default class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = { text: this.props.text }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const newText = e.target.value
    this.setState({ text: newText })

    if (this.props.onTextChange) {
      this.props.onTextChange(newText)
    }

    this.onResize()
  }

  onResize() {
    const input = this.refs["textInput"]
    if (input) {
      const newSize = {
        height: input.clientHeight,
        width: input.clientWidth
      }

      this.setState({ size: newSize})

      if (this.props.onResize) {
        this.props.onResize(newSize)
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.removeListener) {
      this.state.removeListener()
    }

    this.setState({
      text: newProps.text,
      removeListener: autoSizeInput(this.refs["textInput"])
    })
  }

  render() {
    return(
      <div>
        <input
          type={"text"}
          ref={"textInput"}
          value={this.state.text}
          onChange={this.onChange}
          style={styles.text} />
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.onResize()}/>
      </div>
    )
  }
}

const styles = {
  text: {
    color: "black",
    backgroundColor: "white",
    position: "absolute",
    top: 7,
    left: 7,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 26,
    borderRadius: 10,
    minWidth: 15,
    boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.3)"
  }
}