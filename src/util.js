import { important_word_length } from "./config"

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

export function generateVideo(slides, context, canvas, onFinish) {
  const fps = 10

  // Geo font
  //const Kartuli = new FontFace('Kartuli', 'url(fonts/NotoSansGeorgian-Regular.ttf)');

  const Whammy = require("./whammy")
  const video = new Whammy.Video(fps)

  // TODO: if fails check with canvas.width and height (pass canvas as arg)
  const clearCanvas = (ctx) => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  slides.forEach((slide, index) => {

    const img = new Image()
    img.crossOrigin = "use-credentials"
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height)
      //drawText
      console.log("add frame")
      video.add(context)
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
    img.src = slide.url //TODO: check if I have to use FileReader for local images

  })
}