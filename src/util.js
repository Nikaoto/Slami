import {
  custom_media_source, important_word_length, scrapeApi, proxyApi, default_text_position,
  default_font, transitions
} from "./config"
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

export const getSlideImageUrl = ({ url, source }) => {
  if (!source || source !== custom_media_source) {
    return proxy(url)
  }
  return url
}


// Canvas stuff

export function generateVideo(slides, font, context, editorSize, onFinish) {
  processSlides(slides, font, context, editorSize)
    .then(video => video.compile(false, output => {
      console.log("compile")
      onFinish(output)
    })).catch(err => console.log(err))
}

function processSlides(slides, font, context, editorSize) {
  return new Promise(async resolve => {
    const Whammy = require("./whammy")
    const video = new Whammy.Video()

    for (let i = 0; i < slides.length; i++) {
      await processSlide(slides[i], slides[i+1], font, context, video, editorSize)
    }

    resolve(video)
  })
}

// Adjusts texts position for default offset and editor scale
const getActualTextPosition = (position, canvasSize, editorSize) =>  ({
  x: Math.ceil(canvasSize.width * (position.x + default_text_position.x) / editorSize.width),
  y: Math.ceil(canvasSize.height * (position.y + default_text_position.y) / editorSize.height)
})

function processSlide(slide, nextSlide, font, context, video, editorSize) {
  return new Promise(resolve => {
    const duration = parseFloat(slide.duration)*1000.0
    console.log(slide.transition)
    console.log("duration:", slide.duration)

    // Load image
    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.onload = () => {
      console.log("onload")


      drawSlide(context, img, slide.textBoxes, font, editorSize)

      video.add(context, duration)

      if (!nextSlide) {
        // Whammy last frame bug workaround
        drawEmptySlide(context)
        video.add(context, 1)
        resolve()
      } else {

        switch(slide.transition) {

          case transitions.fade: {
            console.log("fade")
            addFade(slide, nextSlide, font, context, editorSize, video).then(() => {
              resolve()
            })
            break;
          }

          default: {
            clearCanvas(context)
            resolve()
            break;
          }
        }
      }
    }

    img.src = getSlideImageUrl(slide)
  })
}

function addFade(fromSlide, toSlide, font, context, editorSize, video) {
  return new Promise(resolve => {
    if (!toSlide) {
      console.log("!toSlide")

      resolve()
    }

    const totalDuration = 500
    const frameRate = 30
    const frameDuration = Math.ceil(totalDuration/frameRate)

    const fromImage = new Image()
    const toImage = new Image()

    const onLoadBoth = () => {
      for (let opacity = 0; opacity <= 1; opacity += 1 / frameRate) {
        context.globalAlpha = opacity

        drawSlide(context, fromImage, fromSlide.textBoxes, font, editorSize)
        drawSlide(context, toImage, toSlide.textBoxes, font, editorSize)

        video.add(context, frameDuration)

        resolve()
      }
    }

    // Load both in parallel. This happens before onLoadBoth
    fromImage.crossOrigin = "Anonymous"
    toImage.crossOrigin = "Anonymous"
    let firstLoaded = false
    const onLoad = () => {
      if (!firstLoaded) {
        firstLoaded = true
      } else {
        onLoadBoth()
      }
    }
    toImage.onload = onLoad
    fromImage.onload = onLoad

    fromImage.src = getSlideImageUrl(fromSlide)
    toImage.src = getSlideImageUrl(toSlide)

  })
}

function drawSlide(context, image, textBoxes, font, editorSize) {

  /* The following code fits images to the canvas without problems
  TODO apply the same effect to SlideEditor (probably need canvas there as well)
  // Scale image to fit
  const w = context.canvas.width
  const h = context.canvas.height
  // Black background
  context.fillRect(0, 0, w, h)
  let newWidth = 0
  let newHeight = 0
  // Determine which axis to resize by
  if (image.width > image.height) {
    // Resize by X
    newWidth = w
    newHeight = image.height * newWidth / image.width
  } else {
    // Resize by Y
    newHeight = h
    newWidth = image.width * newHeight / image.height
  }

  // Draw image with scaled sizes
  context.drawImage(image, (w - newWidth)/2, (h - newHeight)/2, newWidth, newHeight)
  */

  context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height)

  if (textBoxes[0] && textBoxes[0].text && textBoxes[0].text.length > 0) {
    textBoxes.forEach(tb => {
      if (tb.text && tb.text.length > 0) {
        const actualTextPosition = getActualTextPosition(tb.textPosition, context.canvas, editorSize)
        drawText(context, tb.text, actualTextPosition, font)
      }
    })
  }
}

function drawText(context, text, position, font = default_font, fontSize = 45,
                  padding = { horizontal: 12, vertical: 12 }) {
  context.textBaseline = "hanging"
  context.font = `${fontSize}px ${font}`
  context.fillStyle = "white"

  const yOffset = Math.ceil(fontSize * 0.2)
  const { height } = calcHeight(text, { size: fontSize })
  const width = context.measureText(text).width

  context.fillRect(
    position.x,
    position.y + yOffset,
    width + padding.horizontal * 2,
    height + padding.vertical * 2
  )
  context.fillStyle = "black"
  context.fillText(text, position.x + padding.horizontal, position.y + padding.vertical + yOffset)

}

function drawEmptySlide(context, color = "#000000") {
  clearCanvas(context)
  context.fillStyle = color
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

function clearCanvas(context) {
  context.globalAlpha = 1
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
    img.src = url
  }
}