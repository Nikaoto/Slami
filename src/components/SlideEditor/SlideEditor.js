import React, { Component } from "react"

export default class SlideEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div style={styles.editor}>
        <div style={styles.aspectRatioBox}>
          <img src={this.props.chosenSlide.url} alt={this.props.chosenSlide.title} 
              style={styles.editorImage} className="non-draggable"/>
        </div>
      </div>
    )
  }
}

const styles = {
  editor: {
    backgroundColor: "green",
    alignSelf: "stretch",
    flex: 1,
    minWidth: 240,
    minHeight: 240,
    maxWidth: 650,
    maxHeight: 650,
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