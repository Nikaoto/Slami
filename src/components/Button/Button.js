import React, { Component } from "react"

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.state = { buttonStyle: {}, textStyle: {}}
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  renderLeftIcon() {
    if (this.props.iconLeft) {
      return <i className="material-icons">{this.props.iconLeft}</i>
    }
  }

  renderRightIcon() {
    if (this.props.iconRight) {
      return <i className="material-icons">{this.props.iconRight}</i>
    }
  }

  componentDidMount() {
    if (this.props.iconLeft && this.props.iconRight) {
      this.setState({ buttonStyle: styles.buttonWithBothIcons })
      this.setState({ textStyle: styles.textWithBothIcons })
      return
    }

    if (this.props.iconLeft) {
      this.setState({ buttonStyle: styles.buttonWithIconLeft })
      this.setState({ textStyle: styles.textWithIconLeft })
      return
    }

    if (this.props.iconRight) {
      this.setState({ buttonStyle: styles.buttonWithIconRight })
      this.setState({ textStyle: styles.textWithIconRight })
    }
  }

  render() {
    return(
      <button className="waves-effect waves-light btn" onClick={this.onClick}
          style={this.state.buttonStyle} >
        {this.renderLeftIcon()}
        <span style={this.state.textStyle}>{this.props.text}</span>
        {this.renderRightIcon()}
      </button>
    )
  }
}

const styles = {
  buttonWithBothIcons: {
    display: "flex",
    paddingLeft: 15,
    paddingRight: 15
  },
  textWithBothIcons: {
    alignSelf: "center",
    marginLeft: 15,
    marginRight: 15
  },
  buttonWithIconLeft: {
    display: "flex",
    paddingLeft: 15,
    paddingRight: 20
  },
  textWithIconLeft: {
    alignSelf: "center",
    marginLeft: 15
  },
  buttonWithIconRight: {
    display: "flex",
    paddingLeft: 20,
    paddingRight: 15
  },
  textWithIconRight: {
    alignSelf: "center",
    marginRight: 15
  }
}