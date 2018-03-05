const devMode = true
const localUrl = "http://localhost:2000"
const prodUrl = "https://scr-api"
const devUrl = "https://scr-api.herokuapp.com"

module.exports = {
  devMode: devMode,
  localUrl: localUrl,
  devUrl: devUrl,
  prodUrl: prodUrl,
  scrapeApi: localUrl,//devMode ? devUrl : prodUrl,
  paragraph_delimiter_key: "Enter",
  paragraph_delimiter_char: "\u21B5",
  delete_key: "Backspace",
  important_word_length: 4,
}