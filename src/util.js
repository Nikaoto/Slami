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

function corsAllowed(url) {
  return new Promise(resolve => {
    try {
      fetch(url)
      .then(res => resolve(true))
      .catch(err => resolve(false))
    } catch(err) {
      resolve(false)
    }
  })
}

export function generateVideoASD(slides, context, canvas, onFinish) {
  console.log("genvid")
  corsAllowed(slides[0].url)
  .then(isAllowed => console.log(isAllowed))
  .catch(err => console.log(err))
}

export function generateVideo(slides, context, canvas, onFinish) {
  const fps = 1

  // Geo font
  //const Kartuli = new FontFace('Kartuli', 'url(fonts/NotoSansGeorgian-Regular.ttf)');

  const Whammy = require("./whammy")
  const video = new Whammy.Video(fps)
  
  slides.forEach((slide, index) => {
    let looped = false

    const img = new Image()
    img.onload = () => {
      console.log("onload")
      try {
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        //drawText()
        video.add(context)


        clearCanvas(context)

        video.compile(false, output => {
          console.log("compile")
        })
      } catch(err) {
        if (looped) {
          console.log("Looped. ERROR.")
          console.log("img:", img)
        } else {
          looped = true
          console.log("Calling proxy server")

          sendDownloadRequest(slide.url, (res) => {
            console.log("Proxy result:", res)
            img.crossOrigin = "Anonymous"
            img.src = res.url
          })
        }
      }
    }

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