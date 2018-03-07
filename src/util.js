import { custom_media_source, important_word_length, scrapeApi, proxyApi } from "./config"

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


// Networking

export function sendScrapeRequest(query) {
  if (query.length <= 0) {
    console.log("query is empty")
    return
  }

  return new Promise((resolve, reject) => {
    fetch(`${scrapeApi}?query=${query}`)
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}

export const proxy = (url) => `${proxyApi}?url=${url}`

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


// Canvas stuff

export function generateVideo(slides, context, canvas, onFinish) {
  processSlides(slides, context)
  .then(video => video.compile(false, output => {
    console.log("compile")
    onFinish(output)
  })).catch(err => console.log(err))
}

function processSlides(slides, context) {
  return new Promise(async resolve => {
    // Geo font
    //const Kartuli = new FontFace('Kartuli', 'url(fonts/NotoSansGeorgian-Regular.ttf)');
    const fps = 1
    const Whammy = require("./whammy")
    const video = new Whammy.Video(fps)
    
    for (const slide of slides) {
      await processSlide(slide, context, video)
    }

    resolve(video)
  })
}

function processSlide(slide, context, video) {
  return new Promise(resolve => {
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      console.log("onload")

      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)
      drawText(context, slide.text)
      video.add(context)

      clearCanvas(context)

      resolve()
    }

    if (!slide.source || slide.source !== custom_media_source) {
      img.src = proxy(slide.url)
    } else {
      img.src = slide.url //TODO: check if I have to use FileReader for local images
    }
  })
}

function drawText(context, text) {
  context.font = "30px Arial"
  context.fillText(text, 10, 50)
}

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}