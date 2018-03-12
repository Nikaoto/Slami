const devMode = false
const imagesEndpoint = "/images"
const proxyEndpoint = "/proxy"

const finalProdUrl = "https://scr-api.ge"
const devUrl = "http://localhost:2000"
const prodUrl = "https://scr-api.herokuapp.com"

module.exports = {
  devMode: devMode,
  devUrl: devUrl,
  prodUrl: prodUrl,
  scrapeApi: devMode ? devUrl + imagesEndpoint : prodUrl + imagesEndpoint,
  proxyApi: devMode ? devUrl + proxyEndpoint : prodUrl + proxyEndpoint,
  paragraph_delimiter_key: "Enter",
  paragraph_delimiter_char: "\u21B5",
  delete_key: "Backspace",
  important_word_length: 4,
  custom_media_source: "self",
  default_text_position: { x: 7, y: 7 }, // default position of slide text
}