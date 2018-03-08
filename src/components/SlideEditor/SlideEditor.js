import React, { Component } from "react"

export default class SlideEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { url, title, text } = this.props.slideObj
    return(
      <div style={styles.editor}>
        <div style={styles.aspectRatioBox}>
          <img src={url} alt={title} 
              style={styles.editorImage} className="non-draggable"/>
          <div style={styles.text}>{text}</div>
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
    fontSize: 30,
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