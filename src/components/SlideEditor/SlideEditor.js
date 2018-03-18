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
  }

  componentWillReceiveProps({ slideObj }) {
    this.setState({ textBoxes: slideObj.textBoxes })

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

  renderTextBox(index, { textPosition, text, textSize }) {
    if (text === undefined) return;
    return (
      <Draggable key={index} handle=".handle" onDrag={(e, data) => this.onTextDrag(data, index)} position={textPosition}>
        <div style={styles.textContainer}>
          <div className="handle" style={styles.handle}/>
          <div className="handle" style={{...styles.handle, top: textSize.height, left: textSize.width }}/>
          <div className="handle" style={{...styles.handle, top: textSize.height, left: 0 }}/>
          <div className="handle" style={{...styles.handle, top: 0, left: textSize.width }}/>
          {/* TODO: add textInputStyle based on selected font in SecondPage */}
          <TextInput
            maxWidth={this.state.editorSize.width}
            text={text}
            style={this.state.textInputStyle}
            onTextChange={(newText) => this.onTextChange(newText, index)}
            onResize={(newSize) => {
              const textBoxes = this.state.textBoxes
              textBoxes[index].textSize = newSize
              this.setState({ textBoxes: textBoxes })
            }}/>
        </div>
      </Draggable>
    )
  }

  renderAllTextBoxes() {
    return this.state.textBoxes.map((tb, i) => this.renderTextBox(i, tb))
  }

  componentDidMount() {
    this.onResize()
  }

  onTextChange(newText, index) {
    const textBoxes = this.state.textBoxes
    textBoxes[index].text = newText
    this.setState({ textBoxes: textBoxes })

    if (this.props.onTextChange) {
      this.props.onTextChange(newText, index)
    }
  }

  onTextDrag(data, index) {
    const newPosition = { 
      x: data.x,
      y: data.y
    }

    const textBoxes = this.state.textBoxes
    textBoxes[index].textPosition = newPosition

    this.setState({ textBoxes: textBoxes })

    if (this.props.onTextDrag) {
      this.props.onTextDrag(newPosition, index)
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
            className="no-drag editor-image"
          />
          {this.renderAllTextBoxes()}
        </div>
      </div>
    )
  }
}

const styles = {
  editor: {
    flex: 1,
    alignSelf: "stretch",
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