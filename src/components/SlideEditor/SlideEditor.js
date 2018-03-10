import React, { Component } from "react"
import Img from "react-image"
import Draggable from "react-draggable"
import Spinner from "../Spinner"

export default class SlideEditor extends Component {
  constructor(props) {
    super(props)

    const passedText = this.props.slideObj.text
    this.state = { 
      text: passedText,
      textPosition: this.props.slideObj.textPosition,
      textStyle: { width: this.calculateTextWidth(passedText) }
    }

    this.onTextDrag = this.onTextDrag.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const passedText = nextProps.slideObj.text
    const textPosition = nextProps.slideObj.textPosition
    this.setState({ 
      text: passedText,
      textPosition: textPosition,
      textStyle: { 
        width: this.calculateTextWidth(passedText)
      }
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

  onTextDrag(e, data) {
    const newPosition = { 
      x: data.x,
      y: data.y
    }

    this.setState({
      textPosition: newPosition
    })

    if (this.props.onTextDrag) {
      this.props.onTextDrag(newPosition)
    }
  }

  calculateTextWidth(text, fontSize = styles.text.fontSize) {
    return (text.length + 1) * fontSize * 0.55
  }

  render() {
    const { url, title, text } = this.props.slideObj

    return(
      <div style={styles.editor} className="editor-container">
        <div style={styles.aspectRatioBox}>
          <Img src={url} alt={title} 
              loader={<Spinner/>}
              style={styles.editorImage} 
              className="non-draggable editor-image"/>
          <Draggable handle=".handle" bounds=".editor-container" onDrag={this.onTextDrag}
              position={this.state.textPosition}>
            <div style={{...styles.text, ...this.state.textStyle}}>
              <div className="handle" style={styles.handle}/>
              <input type="text"
                  value={this.state.text}
                  onChange={(e) => this.onTextChange(e.target.value)}
                  style={{...styles.text, ...this.state.textStyle}} />
            </div>
          </Draggable>
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
    paddingLeft: 10,
    paddingRight: 10,
    color: "black",
    backgroundColor: "white",
    position: "absolute",
    textAlign: "center",
    top: 7,
    left: 7,
    fontSize: 30
  },
  handle: {
    position:"absolute",
    backgroundColor: "black",
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 3,
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