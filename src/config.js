const devMode = true
const devUrl = "http://localhost:2000"
const prodUrl = "http://temp-slami"

module.exports = {
  devMode: devMode,
  devUrl: devUrl,
  prodUrl: prodUrl,
  scrapeApi: devMode ? devUrl : prodUrl,
  paragraph_delimiter_key: "Enter",
  paragraph_delimiter_char: "\u21B5",
  delete_key: "Backspace",
  important_word_length: 4,
}