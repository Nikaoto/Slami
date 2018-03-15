import React, { Component } from "react"
import Button from "../Button"
import Slide from "../Slide"
import SlideEditor from "../SlideEditor"
import { generateVideo } from "../../util"
import {
  default_text_position, default_text_size, canvas_size, video_preview_size,
  paragraph_delimiter_key
} from "../../config"
import "./SecondPage.css"
import Spinner from "../Spinner/Spinner"

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.slides)
    const editSlides = this.props.slides
      .map(sl => {
        sl.selected = sl.selected || false
        sl.textBoxes = [{
          text: sl.text,
          textPosition: default_text_position,
          textSize: default_text_size
        }]
        return sl
      })

    this.state = {
      chosenSlideIndex: 0,
      editSlides: editSlides,
      downloadUrl: ""
    }

    this.onBackButtonClick = this.onBackButtonClick.bind(this)
    this.onDownloadClick = this.onDownloadClick.bind(this)
    this.updateCurrentSlideText = this.updateCurrentSlideText.bind(this)
    this.updateCurrentSlideTextPosition = this.updateCurrentSlideTextPosition.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onBackButtonClick() {
    if (this.props.onBack) {
      this.props.onBack()
    }
  }

  onGenerateClick() {
    console.log("onGenerateClick")
    this.setState({ isGenerating: true })

    const canvas = this.refs.canvas
    const videoPlayer = this.refs.videoPlayer
    const context = canvas.getContext("2d")

    // TODO fix this after textBoxes func
    generateVideo(this.state.editSlides, context, this.state.editorSize, (output) => {
      const url = URL.createObjectURL(output)
      this.setState({
        isGenerating: false,
        downloadUrl: url
      })
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

  updateCurrentSlideText(newText, index) {
    const editSlides = this.state.editSlides
    editSlides[this.state.chosenSlideIndex].textBoxes[index].text = newText
    this.setState({ editSlides: editSlides })
  }

  updateCurrentSlideTextPosition(newPosition, index) {
    const editSlides = this.state.editSlides
    editSlides[this.state.chosenSlideIndex].textBoxes[index].textPosition = newPosition
    this.setState({ editSlides: editSlides })
  }

  renderSlides() {
    return this.state.editSlides.map(sl => 
      <Slide key={sl.key} slideObj={sl} onClick={() => this.onSlideClick(sl.key)}/>
    )
  }

  onKeyDown(e) {
    if (e.key === paragraph_delimiter_key) {
      const editSlides = this.state.editSlides
      editSlides[this.state.chosenSlideIndex].textBoxes.push({
        text: "ტექსტი",
        textPosition: default_text_position,
        textSize: default_text_size
      })
      this.setState({ editSlides: editSlides })
    }
  }

  onDownloadClick() {
    let file_path = this.state.downloadUrl;
    let a = document.createElement('A');
    a.href = file_path;
    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.width = canvas_size
    canvas.height = canvas_size
  }

  render() {
    const spinnerStyle = {...styles.spinner, display: this.state.isGenerating ? "block" : "none" }
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
                <div className="col s1">
                  <Button text={"დააგენერირე"} iconLeft={"settings"} iconRight={"settings"}
                      onClick={() => this.onGenerateClick()}/>
                </div>

                <div className="col s1 offset-s4">
                  <Spinner
                    style={spinnerStyle}
                    innerStyle={{ top: "10%", left: "10%"}}
                  />
                </div>

                <div className="col s1">
                  <Button
                    text={"გადმოწერე"}
                    disabled={this.state.downloadUrl.length <= 1}
                    iconRight={"file_download"}
                    onClick={this.onDownloadClick}
                  />
                </div>

                {/*
                  <Button text={"Render Canvas"} onClick={() =>
                <div className="col s3">
                    renderCanvas(this.refs.canvas, this.state.editSlides[this.state.chosenSlideIndex], this.state.editorSize)
                  } />
                </div>*/}
              </div>

              {/* Canvas and Video */}
              <canvas ref="canvas" style={styles.canvas} />
              <video ref="videoPlayer" controls autoPlay loop style={styles.videoPlayer}
                  width={video_preview_size} height={video_preview_size} />

            </div>


            {/* Editor (+ Right Side) */}
            <div style={styles.editorContainer} className="col s6" onKeyDown={this.onKeyDown}>
              <SlideEditor
                  slideObj={this.getCurrentSlide()}
                  onTextChange={this.updateCurrentSlideText}
                  onTextDrag={this.updateCurrentSlideTextPosition}
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
    display: "none",
    boxShadow: "0px 0px 6px 2px"
  },
  spinner: {
    position: "relative",
    backgroundColor: "none",
    width: 30,
    height: 30,
    top: 0,
    left: 0
  },
  videoPlayer: {
    margin: 10,
    boxShadow: "0px 3px 13px 3px rgba(0,0,0,0.2)"
  }
}