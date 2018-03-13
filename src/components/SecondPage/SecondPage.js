import React, { Component } from "react"
import Button from "../Button"
import Slide from "../Slide"
import SlideEditor from "../SlideEditor"
import { generateVideo, renderCanvas } from "../../util"
import { default_text_position } from "../../config"
import "./SecondPage.css"

const canvas_size = 1024
const video_preview_size = 300

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    
    const editSlides = this.props.slides.map(sl => {
      sl.selected = sl.selected || false
      sl.textPosition = default_text_position
      return sl
    })

    this.state = {
      chosenSlideIndex: 0,
      editSlides: editSlides
    }

    this.onBackButtonClick = this.onBackButtonClick.bind(this)
  }

  onBackButtonClick() {
    if (this.props.onBack) {
      this.props.onBack()
    }
  }

  onGenerateClick() {
    console.log("onGenerateClick")

    const canvas = this.refs.canvas
    const videoPlayer = this.refs.videoPlayer
    const context = canvas.getContext("2d")
    // TODO set actual positions for each slide text v2(-7, -7)
    generateVideo(this.state.editSlides, context, canvas, (output) => {
      const url = URL.createObjectURL(output)
      videoPlayer.src = url
    })
  }

  onSlideClick(slideKey) {
    const slides = this.state.editSlides
    const i = slides.findIndex(sl => sl.key === slideKey)
    slides.forEach(sl => sl.selected = false)
    slides[i].selected = true

    this.setState({
      chosenSlideIndex: i,
      editSlides: slides
    })
  }

  getCurrentSlide = () => this.state.editSlides[this.state.chosenSlideIndex]

  updateCurrentSlideText(newText) {
    const editSlides = this.state.editSlides
    editSlides[this.state.chosenSlideIndex].text = newText
    this.setState({ editSlides: editSlides })
  }

  updateCurrentSlideTextPosition(newPosition) {
    //console.log(newPosition)

    const editSlides = this.state.editSlides
    editSlides[this.state.chosenSlideIndex].textPosition = newPosition
    this.setState({ editSlides: editSlides })
  }

  renderSlides() {
    return this.state.editSlides.map(sl => 
      <Slide key={sl.key} slideObj={sl} onClick={() => this.onSlideClick(sl.key)}/>
    )
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.width = canvas_size
    canvas.height = canvas_size

    //renderCanvas(canvas, this.state.editSlides[this.state.chosenSlideIndex], this.state.editorSize)
  }

  render() {
    return(
      <div className={"row scene-element " + this.props.animation}>

        {/* Back Button */}
        <div style={{ marginBottom: 40 }} className="col s1">
          <Button onClick={this.onBackButtonClick} text={"უკან"} iconLeft={"arrow_back"} />
        </div>

        <div className="col s12">
          <div className="row">

            {/* Left Side */}
            <div className="col s6">

              {/* Slides Grid */}
              <div className="row">
                <div style={ styles.grid } className="col s12">
                  { this.renderSlides() }
                </div>
              </div>

              {/* Generate Button */}
              <div className="row">
                <div className="col s3">
                  <Button text={"დააგენერირე"} iconLeft={"settings"} iconRight={"settings"}
                      onClick={() => this.onGenerateClick()}/>
                </div>
                <div className="col s3">
                  <Button text={"Render Canvas"} onClick={
                    // TODO: remove this later
                    () => renderCanvas(this.refs.canvas, this.state.editSlides[this.state.chosenSlideIndex],
                      this.state.editorSize)
                  } />
                </div>
              </div>

              {/* Canvas and Video */}
              <canvas ref="canvas" style={styles.canvas} />
              <video ref="videoPlayer" controls autoPlay loop style={styles.videoPlayer}
                  width={video_preview_size} height={video_preview_size} />

            </div>


            {/* Editor (+ Right Side) */}
            <div style={styles.editorContainer} className="col s6">
              <SlideEditor
                  slideObj={this.getCurrentSlide()}
                  onTextChange={(newText) => this.updateCurrentSlideText(newText)}
                  onTextDrag={(newPosition) => this.updateCurrentSlideTextPosition(newPosition)}
                  onResize={(newSize) => this.setState({ editorSize: newSize })}/>
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
    justifyContent: "flex-start"
  },
  editorContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%"
  },
  canvas: {
    boxShadow: "0px 0px 6px 10px"
  },
  videoPlayer: {
    margin: 10,
    boxShadow: "0px 3px 13px 3px rgba(0,0,0,0.2)"
  }
}