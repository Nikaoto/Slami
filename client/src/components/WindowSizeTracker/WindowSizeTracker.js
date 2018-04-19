import { Component } from "react"

export default class WindowSizeTracker extends Component {
  constructor(props) {
    super(props)
    this.updateWindowSize = this.updateWindowSize.bind(this)
  }

  updateWindowSize () {
    if (this.props.onResize) {
      this.props.onResize({ width: window.innerWidth, height: window.innerHeight })
    }
  }

  componentDidMount() {
    if (this.props.onResize) {
      this.updateWindowSize()
      window.addEventListener("resize", this.updateWindowSize)
    }
  }

  componentWillUnmount() {
    if (this.props.onResize) {
      window.removeEventListener("resize", this.updateWindowSize)
    }
  }
}
