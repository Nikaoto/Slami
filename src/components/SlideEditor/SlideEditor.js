import React, { Component } from "react"
import Img from "react-image"
import ReactResizeDetector from "react-resize-detector"
import Draggable from "react-draggable"
import Spinner from "../Spinner"

export default class SlideEditor extends Component {
  constructor(props) {
    super(props)

    const passedText = this.props.slideObj.text
    this.state = { 
      text: passedText,
      textPosition: this.props.slideObj.textPosition,
      textStyle: { width: this.calculateTextWidth(passedText) },
      editorSize: {
        width: styles.editor.maxWidth,
        height: styles.editor.maxHeight
      }
    }

    this.onTextDrag = this.onTextDrag.bind(this)
  }

  componentWillReceiveProps({ slideObj }) {
    const passedText = slideObj.text
    const textPosition = slideObj.textPosition
    this.setState({
      text: passedText,
      textPosition: textPosition,
      textStyle: { 
        width: this.calculateTextWidth(passedText)
      }
    })
  }

  onResize() {
    if (this.refs.editorContainer) {
      const newSize = {
        height: this.refs.editorContainer.clientHeight,
        width: this.refs.editorContainer.clientWidth
      }

      this.setState({ editorSize: newSize })

      if (this.props.onResize) {
        this.props.onResize(newSize)
      }
    }
  }

  componentDidMount() {
    this.onResize()
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
    const newWidth = (text.length + 1) * fontSize * 0.6
    const maxWidth = styles.editor.maxWidth * 0.95

    if (newWidth > maxWidth) {
      return maxWidth
    }

    return newWidth
  }

  getTextContainerStyle() {
    const horizontalMargin = 30
    const verticalMargin = 10

    return {
      ...styles.textContainer,
      height: styles.text.fontSize + styles.text.top + styles.textContainer.top + verticalMargin,
      width: this.state.textStyle.width + horizontalMargin
    }
  }

  render() {
    const { url, title } = this.props.slideObj

    return(
      <div style={styles.editor} ref="editorContainer" className="editor-container">
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.onResize()} />
        <div style={styles.aspectRatioBox}>
          <Img src={url} alt={title}
              loader={<Spinner/>}
              style={styles.editorImage} 
              className="non-draggable editor-image"/>
          <Draggable handle=".handle" bounds=".editor-container" onDrag={this.onTextDrag}
              position={this.state.textPosition}>
            <div style={this.getTextContainerStyle()}>
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
  textContainer: {
    position: "absolute",
    top: 7,
    left: 7,
  },
  text: {
    paddingLeft: 8,
    paddingRight: 8,
    color: "black",
    backgroundColor: "white",
    position: "absolute",
    textAlign: "center",
    top: 7,
    left: 7,
    fontSize: 28,
    borderRadius: 10,
    boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.3)"
  },
  handle: {
    position:"absolute",
    backgroundColor: "black",
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
    cursor: "move"
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