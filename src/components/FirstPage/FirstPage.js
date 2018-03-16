import React, { Component } from 'react'
import EditorCard from "../EditorCard"
import MediaItem from "../MediaItem"
import Button from "../Button"
import { getImportantWords, sendScrapeRequest } from "../../util"
import {alerts, custom_media_source, paragraph_delimiter_char} from "../../config"

class FirstPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paragraphs: [],
      media: [],
      customMedia: [],
      titleText: "",
      contentText: "",
      currentSlideNum: 0,
    }
  }

  addMediaItem(url, thumbnailUrl, title, source) {
    let currentMedia = this.state.media

    currentMedia.push({
      key: currentMedia.length,
      url: url,
      title: title,
      thumbnailUrl: thumbnailUrl || url,
      source: source,
      num: null, 
    })

    this.setState({ media: currentMedia })
  }

  updateTitleText(newText) {
    this.setState({ titleText: newText })
  }

  updateContentText(newText) {
    this.setState({ contentText: newText })
  }

  getParagraphs() {
    return this.state.contentText.trim()
    .split(paragraph_delimiter_char)
    .map(p => p.trim())
  }

  onNewParagraph() {
    const paragraphs = this.getParagraphs()
    getImportantWords(paragraphs[paragraphs.length - 1]).forEach(q => {
      sendScrapeRequest(q)
      .then(res => res.forEach(
        ({url, thumbnailUrl, title, source}) => this.addMediaItem(url, thumbnailUrl, title, source)
      )).catch(err => console.log(err))
    })
    this.setState({ paragraphs: paragraphs })
  }

  onDelete() {
    console.log("onDelete")
  }

  onMediaItemClick(itemId, selected) {
    let media = this.state.media
    let index = media.findIndex(item => item.key === itemId)

    if (selected) {
      // Add slide num
      const currentSlideNum = this.state.currentSlideNum + 1
      this.setState({ currentSlideNum: currentSlideNum })
      media[index].num = currentSlideNum
    } else {
      // Subtract slide num
      const currentSlideNum = this.state.currentSlideNum - 1
      this.setState({ currentSlideNum: currentSlideNum })
      
      const removedSlideNum = media[index].num

      // Rearrange each index
      media.forEach(item => {
        if (item.num) {
          if (item.num > removedSlideNum) {
            item.num--
          }
        }
      })

      media[index].num = null
    }

    this.setState({ media: media })
  }

  renderMedia() {
    return this.state.media.map(m => 
      <MediaItem key={m.key} url={m.thumbnailUrl} title={m.title} num={m.num} 
        onClick={(selected) => this.onMediaItemClick(m.key, selected)}/>
    )
  }

  onFileUpload(e) {
    const input = e.target
    if (input.files && input.files[0]) {
      const values = Object.keys(input.files).map(k => input.files[k])

      values.forEach(file => {
        console.log("file:",file)
        const reader = new FileReader()
        reader.onload = (e) => this.addMediaItem(e.target.result, null, file.name, custom_media_source)
        reader.readAsDataURL(file)
      })
    }
  }

  nextPage() {
    if (this.props.onNextPage && this.state.media[0]) {
      const finalMedia = this.state.media
        .filter(m => m.num !== null && m.num > 0)
        .map(m => {
          m.text = this.state.paragraphs[m.num - 1]
          return m
        })
        .sort((a, b) => a.num - b.num)

      if (!finalMedia[0]) {
        alert(alerts.no_slides_chosen)

        return
      }

      finalMedia[0].selected = true

      this.props.onNextPage(finalMedia)
    }
  }

  render() {
    return (
      <div className={"row scene-element " + this.props.animation}>

        <div className="col s6" style={styles.editor}>
          <EditorCard 
            titleText={this.state.titleText}
            updateTitle={(newText) => this.updateTitleText(newText)}
            contentText={this.state.contentText}
            updateContent={(newText) => this.updateContentText(newText)}
            onNewParagraph={() => this.onNewParagraph()}
            onDelete={() => this.onDelete()}
          />
        </div>

        <div className="col s6" style={styles.suggester}>

          <div className="row">

            {/* File Upload */}
            <div id="file-upload" className="col s8">
              <form action="#">
                <div className="file-field input-field">
                  <div className="btn" style={{ display: "flex", paddingLeft: 20, paddingRight: 20 }}>
                    <i className="material-icons">file_upload</i>
                    <span style={{ alignSelf: "center", marginLeft: 15 }} >ამოირჩიე ფაილები</span>
                    <input type="file" multiple onChange={(e) => this.onFileUpload(e)}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </form>
            </div>

            {/* Next Page Button */}
            <div className="col s1" style={styles.nextPageButton}>
              <Button
                onClick={() => this.nextPage()}
                text={"შემდეგი"}
                iconRight={"arrow_forward"}/>
            </div>
            
          </div>

          {/* Media List */}
          <div className="row">
            <div style={styles.mediaList} className="col s12">
              {this.renderMedia()}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const styles = {
  editor: {
  },
  suggester: {
    textAlign: "center"
  },
  nextPageButton: {
    marginTop: 20
  },
  mediaList: {
    marginTop: 10,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start"
  }
}

export default FirstPage;
