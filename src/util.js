import { important_word_length, scrapeApi } from "./config"

export function getImportantWords(paragraph) {
  let words = paragraph.trim().split(" ").map(x => x.trim())
  if (words.length === 0) {
    console.log("WARN: words.length === 0")
    return []
  }

  let actualWords = words.filter(word => word.length > 1)
  if (actualWords.length === 0) {
    console.log("WARN: actualWords.length === 0")
    return []
  }

  let importantWords = words.filter(word => word.length >= important_word_length)
  if (importantWords.length === 0) {
    return [actualWords[Math.floor(Math.random()*actualWords.length)]]
  } else {
    return importantWords
  }
}

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

export function generateVideo(slides, context, canvas, onFinish) {
  const fps = 10

  // Geo font
  //const Kartuli = new FontFace('Kartuli', 'url(fonts/NotoSansGeorgian-Regular.ttf)');

  const Whammy = require("./whammy")
  const video = new Whammy.Video(fps)

  slides.forEach((slide, index) => {

    let looped = false // TODO use this to restrict looping

    const img = new Image()
    const onLoad = () => {
      looped = true
      context.drawImage(img, 0, 0, canvas.width, canvas.height)
      //drawText
      console.log("add frame")
      try {
        video.add(context)
      } catch (err) {
        console.log("CORS not allowed, calling proxy server")

        sendDownloadRequest(slide.url, (res) => {
          console.log("download request result:", res)
          
          img.src = res.url
        })
      }
      clearCanvas(context)

      // Check if finished
      if (index >= slides.length) {
/*        console.log("compile")

        video.compile(false, (output) => {
          console.log(output)
          onFinish(output)
        })*/
      }
    }
    //img.crossOrigin = "Anonymous"
    img.onload = () => onLoad()
    img.src = slide.url //TODO: check if I have to use FileReader for local images
  })
}

function processImage(context, canvas, video, ) {

}

export function sendDownloadRequest(url, callback) {
  if (url.length > 0) {
    fetch(`${scrapeApi}/download?url=${url}`)
      .then(res => res.json())
      .then(res => callback(res))
      .catch(err => console.log(err))
  } else {
      console.log("url is empty")
  }
}