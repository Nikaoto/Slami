import React, { Component } from "react"
import autoSizeInput from "autosize-input"

export default class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text,
      maxWidth: this.props.maxWidth,
      size: { width: 5 }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.onResize()
    const newText = e.target.value

    if (this.state.size.width < this.state.maxWidth || newText.length < this.state.text.length) {
      this.setState({ text: newText })

      if (this.props.onTextChange) {
        this.props.onTextChange(newText)
      }
    }
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
      removeListener: autoSizeInput(this.refs["textInput"]),
      maxWidth: newProps.maxWidth
    })
  }

  refreshSize() {
    this.onResize()
    console.log("refresh")
    setTimeout(() => this.onResize(), 1000)
  }

  componentDidMount() {
    this.refreshSize()
  }

  render() {
    return(
      <input
        type={"text"}
        ref={"textInput"}
        value={this.state.text}
        onChange={this.onChange}
        style={styles.text} />
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
    height: 26,
    minWidth: 15,
    boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.3)"
  }
}