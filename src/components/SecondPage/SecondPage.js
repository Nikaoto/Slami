import React, { Component } from "react"
//import GridSlide from "../GridSlide"

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onBackButtonClick = this.onBackButtonClick.bind(this)
  }

  onBackButtonClick() {
    if (this.props.onBack) {
      this.props.onBack()
    }
  }

  renderSlides() {
    return this.props.slides.map(sl => 
      <img key={sl.key} style={styles.img}
      src={sl.url} 
      alt={sl.title} />
    )
  }

  render() {
    return(
      <div className="row">

        {/* Back Button */}
        <div style={{ marginBottom: 40 }} className="col s1">
          <button onClick={this.onBackButtonClick} className="waves-effect waves-light btn">
            <i className="material-icons">arrow_back</i>
          </button>
        </div>

        <div className="col s12">
          <div className="row">

            {/* Slides Grid */}
            <div style={ styles.grid } className="col s6">
              { this.renderSlides() }
            </div>

            {/* Editor */}
            <div style={styles.editor} className="col s6">
              <h1>Slide Editor</h1>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

const styles = {
  grid: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,
    flexFlow: "row wrap",
    justifyContent: "flex-start",
  },
  editor: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "green",
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 15,
    marginRight: 15,
  }
}