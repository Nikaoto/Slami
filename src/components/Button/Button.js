import React, { Component } from "react"

const default_class_name = "waves-effect waves-light btn"

export default class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonStyle: {},
      textStyle: {},
      className: default_class_name,
      disabled: ""
    }

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

  componentWillReceiveProps(newProps) {
    if (newProps.customClassName) {
      this.setState({ className: newProps.customClassName })
    }

    if (newProps.disabled === true) {
      this.setState({ disabled: " disabled " })
    } else {
      this.setState({ disabled: "" })
    }

    if (!newProps.text) {
      this.setState({ 
        buttonStyle: styles.buttonWithNoText,
        textStyle: styles.noText
      })
      return
    }

    if (newProps.iconLeft && newProps.iconRight) {
      this.setState({ 
        buttonStyle: styles.buttonWithBothIcons, 
        textStyle: styles.textWithBothIcons
      })
      return
    }

    if (newProps.iconLeft) {
      this.setState({ 
        buttonStyle: styles.buttonWithIconLeft, 
        textStyle: styles.textWithIconLeft
      })
      return
    }

    if (newProps.iconRight) {
      this.setState({ 
        buttonStyle: styles.buttonWithIconRight,
        textStyle: styles.textWithIconRight
      })
    }
  }

  render() {
    const buttonStyle = {...this.state.buttonStyle, ...this.props.style }
    const className = this.state.className + this.state.disabled

    return(
      <button
        className={className}
        onClick={this.onClick}
        style={buttonStyle}
      >
        {this.renderLeftIcon()}
        <span style={this.state.textStyle}>{this.props.text}</span>
        {this.renderRightIcon()}
      </button>
    )
  }
}

const styles = {
  buttonWithNoText: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  noText: {
    height: 0,
    width: 0,
    padding: 0,
    margin: 0
  },
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