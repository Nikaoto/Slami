import React, { Component } from "react"


export default class SlideEditor extends Component {
  constructor(props) {
    super(props)

    const passedText = this.props.slideObj.text
    this.state = { 
      text: passedText,
      textStyle: { width: this.calculateTextWidth(passedText) }
    }
  }

  componentWillReceiveProps(nextProps) {
    const passedText = nextProps.slideObj.text
    this.setState({ 
      text: passedText,
      textStyle: { width: this.calculateTextWidth(passedText) }
    })
  }

  onTextChange(newText) {
    this.setState({ 
      text: newText,
      textStyle: { width: this.calculateTextWidth(newText) }
    })

    if (this.props.onTextChange) {
      this.props.onTextChange(newText)
    }
  }

  calculateTextWidth(text, fontSize = styles.text.fontSize) {
    return (text.length + 1) * fontSize * 0.46
  }

  render() {
    const { url, title, text } = this.props.slideObj

    return(
      <div style={styles.editor}>
        <div style={styles.aspectRatioBox}>
          <img src={url} alt={title} 
              style={styles.editorImage} className="non-draggable"/>
          <input type="text"
              value={this.state.text}
              onChange={(e) => this.onTextChange(e.target.value)}
              style={{...this.state.textStyle, ...styles.text}} />
        </div>
      </div>
    )
  }
}

const styles = {
  editor: {
    alignSelf: "stretch",
    flex: 1,
    minWidth: 240,
    minHeight: 240,
    maxWidth: 650,
    maxHeight: 650,
  },
  text: {
    paddingLeft: 12,
    paddingRight: 12,
    color: "black",
    backgroundColor: "white",
    position: "absolute",
    left: 10,
    top: 10,
    fontSize: 30
  },
  aspectRatioBox: {
    height: 0,
    overflow: "hidden",
    paddingTop: "100%",
    background: "black",
    position: "relative",
  },
  editorImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }
}