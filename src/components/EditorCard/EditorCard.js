import React, { Component } from 'react'
import config from "../../config"

class EditorCard extends Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      titleText: this.props.titleText || "",
      contentText: this.props.contentText || ""
    }

    this.onKeyPress = this.onKeyPress.bind(this)
  }

  updateTitleText(newText) {
    this.setState({ titleText: newText })

    if (this.props.updateTitle) {
      this.props.updateTitle(newText)
    }
  }

  updateContentText(newText) {
    this.setState({ contentText: newText })

    if (this.props.updateContent) {
      this.props.updateContent(newText)
    }
  }

  onKeyPress(e) {
    if (e.key === config.paragraph_delimiter_key) {
      this.updateContentText(this.state.contentText + config.paragraph_delimiter_char)

      if(this.props.onNewParagraph) {
        this.props.onNewParagraph()
      }

      return
    }

    if (e.key === config.delete_key) {
      if(this.props.onDelete) {
        this.props.onDelete()
      }
    }
  }

  render() {
    return (
      <div className="card z-depth-5">
        <div className="card-content black-text">

          <span className="row">
            <div className="input-field col s12">

              <input id="card_title"
              type="text"
              value={this.state.titleText}
              onChange={(e) => this.updateTitleText(e.target.value)}
              style={styles.cardTitle}
              />
              <label htmlFor="card_title">სათაური</label>

            </div>

          </span>
        </div>

        <div className="divider" style={{ marginTop: 0 }} />

        <div className="section">

          <div className="row">
            <form className="col s12">
              <div className="input-field col s12 outline">

                <textarea className="materialize-textarea"
                    value={this.state.contentText}
                    onChange={(e) => this.updateContentText(e.target.value)}
                    onKeyDown={this.onKeyPress}
                    style={styles.cardText} />

              </div>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

const styles = {
  cardTitle: {
    fontSize: 30,
    marginBottom: 0,
  },
  cardText: {
    fontSize: 18,
    textAlign: "justify",
  },
}

export default EditorCard;
