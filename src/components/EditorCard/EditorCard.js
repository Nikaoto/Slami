import React, { Component } from 'react'
import {paragraph_delimiter_char, paragraph_delimiter_key, delete_keys} from "../../config"

class EditorCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      titleText: this.props.titleText || "",
      contentText: this.props.contentText || ""
    }

    this.onKeyPress = this.onKeyPress.bind(this)
  }

  updateContentText(newText) {
    this.setState({ contentText: newText })

    if (this.props.updateContent) {
      this.props.updateContent(newText)
    }
  }

  onKeyPress(e) {
    if (e.key === paragraph_delimiter_key) {
      this.updateContentText(this.state.contentText + paragraph_delimiter_char)

      if(this.props.onNewParagraph) {
        this.props.onNewParagraph()
      }

      return
    }

    if (delete_keys.includes(e.key)) {
      if(this.props.onDelete) {
        this.props.onDelete()
      }
    }
  }

  getParagraphs() {
    return this.state.contentText.trim()
      .split(paragraph_delimiter_char)
      .map(p => p.trim())
  }

  render() {
    return (
      <div className="card z-depth-5">
        <div className="row">
          <form className="col s12" style={{ marginBottom: 10 }}>
            <div className="input-field col s12 outline" style={styles.textContainer}>

              <ul className="materialize-textarea">
                {
                  this.getParagraphs().map((p, i) =>
                  <li key={i} style={styles.paragraphNumber}> {i + "."} </li>)
                }
              </ul>
              <textarea className="materialize-textarea"
                  value={this.state.contentText}
                  onChange={(e) => this.updateContentText(e.target.value)}
                  onKeyDown={this.onKeyPress}
                  style={styles.cardText} />

            </div>
          </form>
        </div>
      </div>
    )
  }
}

const styles = {
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 15
  },
  numberContainer: {
    marginLeft: 4,
    paddingTop: 15
  },
  paragraphNumber: {
    fontSize: 18,
    marginRight: 15
  },
  cardText: {
    fontSize: 18,
    textAlign: "justify",
    paddingTop: 15,
    minHeight: 100
  },
}

export default EditorCard;
