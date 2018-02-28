import React, { Component } from 'react'
import EditorCard from "../EditorCard"
import MediaItem from "../MediaItem"
import { getImportantWords } from "../../util"
import { paragraph_delimiter_char } from "../../config"

const devMode = true
const devUrl = "http://localhost:1000"
const prodUrl = "http://temp-slami"
const scrapeApi = devMode ? devUrl : prodUrl

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

  sendScrapeRequest(query, max = 1) {
    if (query.length > 0) {
      fetch(`${scrapeApi}/bing?query=${query}&max=${max}`)
      .then(res => res.json())
      .then(media => this.addBulkMedia(media))
      .catch(err => console.log(err))
    } else {
      console.log("query is empty")
    }
  }

  addMedia(media) {
    const paragraphCount = this.state.paragraphs.length - 1

    let currentMedia = this.state.media
    
    if (currentMedia[paragraphCount] === undefined) {
      console.log("new request media")
      currentMedia[paragraphCount] = []
    }

    media.forEach(m => {
      const key = `p${paragraphCount}i${currentMedia[paragraphCount].length}`
      const mediaItem = { 
        key: key, 
        title: m.title, 
        url: m.mediaurl, 
        source: m.link,
        size: m.size // TODO change this to description or smth
      }

      currentMedia[paragraphCount].push(mediaItem)
    })

    this.setState({ media: currentMedia })

    console.log(currentMedia)
  }

  addBulkMedia(media) {
    media.forEach(({ mediaurl, title, link }) => this.addMediaItem(mediaurl, title, link))
  }

  addMediaItem(url, title, source) {
    let currentMedia = this.state.media

    currentMedia.push({
      key: currentMedia.length,
      url: url,
      title: title,
      source: source      
    })

      this.setState({ media: currentMedia })
  }

  addCustomMedia(name, url, type) {
    const newItem = {
      key: "c" + this.state.customMedia.length,
      title: name,
      url: url,
      source: url,
      size: type // TODO change this
    }
    const customMedia = this.state.customMedia
    customMedia.push(newItem)
    this.setState({ customMedia: customMedia })
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
    getImportantWords(paragraphs[paragraphs.length - 1]).forEach(q => this.sendScrapeRequest(q))
    this.setState({ paragraphs: paragraphs })
  }

  onDelete() {
    console.log("onDelete")
  }

  onMediaItemClick(itemId, selected) {

    const media = this.state.media
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
      <MediaItem key={m.key} url={m.url} title={m.title} num={m.num} 
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
        reader.onload = (e) => this.addMediaItem(e.target.result, file.name, "custom")
        reader.readAsDataURL(file)
      })
    }
  }

  nextPage() {
    console.log("NEXT PAGE")
  }

  render() {
    return (
      <div className="row">

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

        <div className="col s6" style={styles.resourcer}>

          <div className="row">

            {/* File Upload */}
            <div id="file-upload" className="col s8">
              <form action="#">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>ამოირჩიე ფაილები</span>
                    <input type="file" multiple onChange={(e) => this.onFileUpload(e)}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </form>
            </div>

            {/* Next Page Button */}
            <div className="col s4">
              <button className="waves-effect waves-light btn" 
              onClick={() => this.nextPage()}
              style={styles.nextPageButton}>
                შემდეგი
              </button>
            </div>
            
          </div>

          {/* Media List */}
          <div className="row">
            <div id="resource-list" style={styles.mediaList} className="col s12">
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
  resourcer: {
    textAlign: "center",
  },
  nextPageButton: {
    float: "right",
    marginTop: 20,
  },
  mediaList: {
    marginTop: 10,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
  }
}

export default FirstPage;
