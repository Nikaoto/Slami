import { custom_media_source, important_word_length, scrapeApi, proxyApi, default_text_position } from "./config"
import calcHeight from "text-height"

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

export function generateVideo(slides, context, editorSize, onFinish) {
  processSlides(slides, context, editorSize)
    .then(video => video.compile(false, output => {
      console.log("compile")
      onFinish(output)
    })).catch(err => console.log(err))
}

function processSlides(slides, context, editorSize) {
  return new Promise(async resolve => {

    // Geo font
    //const Kartuli = new FontFace('Kartuli', 'url(fonts/NotoSansGeorgian-Regular.ttf)');

    const fps = 1
    const Whammy = require("./whammy")
    const video = new Whammy.Video(fps)

    for (const slide of slides) {
      await processSlide(slide, context, video, editorSize)
    }

    resolve(video)
  })
}

function processSlide(slide, context, video, editorSize) {
  return new Promise(resolve => {
    const { text, url, source } = slide
    const canvas = context.canvas

    // Adjust for default offset
    const textPosition = {
      x: slide.textPosition.x + default_text_position.x,
      y: slide.textPosition.y + default_text_position.y
    }

    // Adjust for editor scale
    const actualTextPosition = {
      x: Math.ceil(canvas.width * textPosition.x / editorSize.width),
      y: Math.ceil(canvas.height * textPosition.y / editorSize.height)
    }

    // Load image
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      console.log("onload")

      context.drawImage(img, 0, 0, canvas.width, canvas.height)

      if (text && text.length && text.length > 0) {
        drawText(context, text, actualTextPosition)
      }

      video.add(context)

      clearCanvas(context)

      resolve()
    }

    if (!source || source !== custom_media_source) {
      img.src = proxy(url)
    } else {
      img.src = url //TODO: check if I have to use FileReader for local images
    }
  })
}

function drawText(context, text, position, fontSize = 45, padding = { horizontal: 12, vertical: 12 }) {
  context.textBaseline = "hanging"
  context.font = `${fontSize}px Arial` // TODO change to BPG Arial
  context.fillStyle = "white"

  const yOffset = Math.ceil(fontSize * 0.2)
  const { height } = calcHeight(text, { size: fontSize })
  const width = context.measureText(text).width

  // TODO round corners? [https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas]
  context.fillRect(
    position.x,
    position.y + yOffset,
    width + padding.horizontal * 2,
    height + padding.vertical * 2
  )
  context.fillStyle = "black"
  context.fillText(text, position.x + padding.horizontal, position.y + padding.vertical + yOffset)

}

// TODO do globalAlpha for fading
function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}

// Temporary method for testing canvas look
export function renderCanvas(canvas, slide, editorSize) {
  const context = canvas.getContext("2d")

  const { text, url, source } = slide

  // Adjust for default offset
  const textPosition = {
    x: slide.textPosition.x + default_text_position.x,
    y: slide.textPosition.y + default_text_position.y
  }

  // Adjust for editor scale
  const actualTextPosition = {
    x: Math.ceil(canvas.width * textPosition.x / editorSize.width),
    y: Math.ceil(canvas.height * textPosition.y / editorSize.height)
  }

  console.log("textPosition:", textPosition)
  console.log("actualTextPosition:", actualTextPosition)

  // Load Image
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = () => {
    console.log("onload")

    context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)

    if (text && text.length && text.length > 0) {
      drawText(context, text, actualTextPosition)
    }
  }

  if (!source || source !== custom_media_source) {
    img.src = proxy(url)
  } else {
    img.src = url //TODO: check if I have to use FileReader for local images
  }
}