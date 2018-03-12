import { custom_media_source, important_word_length, scrapeApi, proxyApi } from "./config"

// TODO: revamp this
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

export function sendScrapeRequest(query, max = 2) {
  if (query.length <= 0) {
    console.log("query is empty")
    return
  }

  return new Promise((resolve, reject) => {
    fetch(`${scrapeApi}?query=${query}&max=${max}`)
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}

export const proxy = (url) => `${proxyApi}?url=${url}`


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

      if (slide.text && slide.text.length && slide.text.length > 0) {
        drawText(context, slide.text)
      }

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

function drawText(context, text, position) {
  context.font = "60px Arial"
  context.fillText(text, position.x, position.y, context.canvas.width)
}

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

// Temporary method for testing canvas look
export function renderCanvas(canvas, slide, editorSize) {
  const context = canvas.getContext("2d")
  console.log("slide:", slide)
  console.log("editorSize:", editorSize)

  const { text, textPosition, url, source } = slide

  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = () => {
    console.log("onload")

    context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)

    if (text && text.length && text.length > 0) {
      drawText(context, text, textPosition)
    }
  }

  if (!source || source !== custom_media_source) {
    img.src = proxy(url)
  } else {
    img.src = url //TODO: check if I have to use FileReader for local images
  }
}