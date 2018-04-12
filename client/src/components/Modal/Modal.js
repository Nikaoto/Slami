import React, { Component } from 'react'
import Button from "../Button"
import "./Modal.css"

class Modal extends Component {
  constructor(props) {
    super(props)

    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    return (

      <div className="c-modal">

        <div className="c-modal-content">

          <div className="c-modal-header">
            <span className="c-close" onClick={this.onClose}>&times;</span>
            {this.props.header}
          </div>

          <div className="c-modal-body">
            {this.props.body}
          </div>

          <div className="c-modal-footer">
            {this.props.footer}
          </div>

        </div>

      </div>
    )
  }
}

const styles = {
}

export default Modal