import React, { Component } from "react"
import Img from "react-image"
import ReactResizeDetector from "react-resize-detector"
import TextInput from "../TextInput"
import Draggable from "react-draggable"
import Spinner from "../Spinner"

export default class SlideEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textBoxes : [{
        text: this.props.slideObj.text,
        textPosition: this.props.slideObj.textPosition,
        textSize: { width: 0, height: 0 }
      }],
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
      textPosition: textPosition
    })

    this.refresh()
  }

  // Refreshes layout to apply textbox size changes (hacky, but works)
  refresh() {
    setTimeout(() => this.setState({ refresh: !this.state.refresh || false }), 10)
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

  // TODO add Handle compo
  renderDraggableText({ textPosition, text, textSize }) {
    return (
      <Draggable handle=".handle" onDrag={this.onTextDrag}
                 position={textPosition}>
        <div style={styles.textContainer}>
          <div className="handle" style={styles.handle}/>
          <div className="handle" style={{...styles.handle, top: textSize.height, left: textSize.width }}/>
          <div className="handle" style={{...styles.handle, top: textSize.height, left: 0 }}/>
          <div className="handle" style={{...styles.handle, top: 0, left: textSize.width }}/>
          <TextInput
            maxWidth={this.state.editorSize.width}
            text={text}
            onTextChange={(newText) => this.onTextChange(newText)}
            onResize={(newSize) => this.setState({ textSize: newSize })}/>
        </div>
      </Draggable>
    )
  }

  renderAllDraggableText() {
    this.state.textBoxes.map(tb => this.renderDraggableText(tb))
  }

  componentDidMount() {
    this.onResize()
  }

  onTextChange(newText) {
    this.setState({ text: newText })

    if (this.props.onTextChange) {
      this.props.onTextChange(newText)
    }
  }

  onTextDrag(e, data) {
    const newPosition = { 
      x: data.x,
      y: data.y
    }

    this.setState({ textPosition: newPosition })

    if (this.props.onTextDrag) {
      this.props.onTextDrag(newPosition)
    }
  }

  render() {
    const { url, title } = this.props.slideObj

    return(
      <div style={styles.editor} ref="editorContainer" className="editor-container">
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.onResize()} />
        <div style={styles.aspectRatioBox}>
          <Img
            src={url}
            alt={title}
            loader={<Spinner/>}
            style={styles.editorImage}
            className="non-draggable editor-image"
          />
          {this.renderAllDraggableText()}
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
    maxWidth: 600,
    maxHeight: 600,
  },
  textContainer: {
    position: "absolute",
    top: 7,
    left: 7
  },
  handle: {
    position:"absolute",
    backgroundColor: "black",
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 2,
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