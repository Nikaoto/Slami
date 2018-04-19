import React, { Component } from "react"
import Button from "../Button"
import Slide from "../Slide"
import SlideEditor from "../SlideEditor"
import { generateVideo } from "../../util"
import {
  default_text_position, default_text_size, canvas_size, video_preview_size,
  paragraph_delimiter_key, delete_keys, default_slide_duration_seconds, fonts, choose_font_label,
  default_slide_transition
} from "../../config"
import Spinner from "../Spinner/Spinner"
import { Dropdown, NavItem, Button as MButton } from "react-materialize"

export default class SecondPage extends Component {
  constructor(props) {
    super(props)
    const editSlides = this.props.slides
      .map((sl, i) => {
        sl.duration = default_slide_duration_seconds
        sl.transition = default_slide_transition
        sl.selected = i === 0
        sl.textBoxes = [{
          text: sl.text || "",
          textPosition: default_text_position,
          textSize: default_text_size
        }]
        return sl
      })

    this.state = {
      font: "Arial",
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
    videoPlayer.src = "" // Removes video
    const context = canvas.getContext("2d")

    generateVideo(this.state.editSlides, this.state.font, context, this.state.editorSize, (output) => {
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

  onSlideDurationChange(newDuration, slideIndex) {
    const editSlides = this.state.editSlides
    editSlides[slideIndex].duration = newDuration

    this.setState({ editSlides: editSlides })
  }

  onSlideTransitionChange(newTransition, slideIndex) {
    const editSlides = this.state.editSlides
    editSlides[slideIndex].transition = newTransition

    this.setState({ editSlides: editSlides })
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
    return this.state.editSlides.map((sl, i) =>
      <Slide
        key={sl.key}
        k={sl.key}
        slideObj={sl}
        onClick={() => this.onSlideClick(sl.key)}
        onDurationChange={(newDuration) => this.onSlideDurationChange(newDuration, i)}
        onTransitionChange={(newTransition) => this.onSlideTransitionChange(newTransition, i)}
      />
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

      return
    }

    if (delete_keys.includes(e.key)) {
      const textBoxes = this.getCurrentSlide().textBoxes

      // Remove empty textboxes
      textBoxes.map((tb, i) => {
          if (tb.text === "") {
            return i
          }
        })
        .filter(index => index !== undefined)
        .forEach(index => textBoxes.splice(index, 1))

      // Update state
      const editSlides = this.state.editSlides
      editSlides[this.state.chosenSlideIndex].textBoxes = textBoxes
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
      <div
        className={"row scene-element " + this.props.animation}
        onKeyDown={this.onKeyDown}
        tabIndex={0}
        style={{outline: "none"}}>

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

              {/* Font Picker */}
              <div className="row">
                <div className="col s1">
                  <Dropdown
                    style={styles.fontDropdownContent}
                    trigger={
                      <MButton style={styles.fontDropdownButton}> {choose_font_label} </MButton>
                    }>
                    {fonts.map((f, i) => <NavItem href={null} key={i} onClick={() => this.setState({ font: f })}> {f} </NavItem>)}
                  </Dropdown>
                </div>
              </div>

              {/* Bottom-left side */}
              <div style={{ display: "flex" }}>

                {/* Canvas (not visible) */}
                <canvas ref="canvas" style={styles.canvas} />

                {/* Video */}
                <video ref="videoPlayer" controls autoPlay style={styles.videoPlayer}
                  width={video_preview_size} height={video_preview_size} />

                {/* Generate & Download buttons stacked vertically */}
                <div style={{ display: "flex", flexDirection: "column" }}>

                  {/* Generate */}
                  <div style={{ display: "flex", flexDirection: "row", margin: 10 }}>
                    <MButton
                      className={"red"}
                      waves={"light"}
                      onClick={() => this.onGenerateClick()}>
                      {"დააგენერირე"}
                    </MButton>

                    <Spinner style={spinnerStyle} innerStyle={{ top: "10%", left: "10%"}} />
                  </div>

                  {/* Download */}
                  <div>
                    <Button
                      style={{ margin: 10, paddingLeft: 22, paddingRight: 17 }}
                      text={"გადმოწერე"}
                      disabled={this.state.downloadUrl.length <= 1 || this.state.isGenerating}
                      iconRight={"file_download"}
                      onClick={this.onDownloadClick}
                    />
                  </div>

                </div>

              </div>

            </div>


            {/* Editor (+ Right Side) */}
            <div style={styles.editorContainer} className="col s6">
              <SlideEditor
                  slideObj={this.getCurrentSlide()}
                  textInputStyle={{ fontFamily: this.state.font }}
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
    borderRadius: 10,
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
    marginLeft: 10,
    top: 0,
    left: 0
  },
  videoPlayer: {
    margin: 10,
    boxShadow: "0px 3px 13px 3px rgba(0,0,0,0.2)"
  },
  fontDropdownButton: {
    margin: 3,
    paddingLeft: 45,
    paddingRight: 45
  },
  fontDropdownContent: {
    margin: 3
  }
}