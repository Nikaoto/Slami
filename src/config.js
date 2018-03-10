const devMode = true
const localUrl = "http://localhost:2800/images"
const prodUrl = "https://scr-api.ge"
const devUrl = "https://slami-bing-api.herokuapp.com/images"

module.exports = {
  devMode: devMode,
  localUrl: localUrl,
  devUrl: devUrl,
  prodUrl: prodUrl,
  scrapeApi: "http://localhost:2800/images",//devMode ? devUrl : prodUrl,
  proxyApi: "http://localhost:2800/proxy",
  paragraph_delimiter_key: "Enter",
  paragraph_delimiter_char: "\u21B5",
  delete_key: "Backspace",
  important_word_length: 4,
  custom_media_source: "self",
  textPos: { x: 7, y: 7 }, // default position of slide text
}