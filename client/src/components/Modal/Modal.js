import React, { Component } from 'react'


class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  render() {
    if (this.state.visible) {
      return <div/>
    }

    return (
      <div>MODAL</div>
    )
  }
}

export default Modal