const devMode = true
const imagesEndpoint = "/images"
const proxyEndpoint = "/proxy"

const finalProdUrl = "https://scr-api.ge"
//const devUrl = "http://localhost:2000"
const devUrl = "https://scr-api.herokuapp.com"
const prodUrl = "https://scr-api.herokuapp.com"

module.exports = {
  devMode: devMode,
  devUrl: devUrl,
  prodUrl: prodUrl,
  scrapeApi: devMode ? devUrl + imagesEndpoint : prodUrl + imagesEndpoint,
  proxyApi: devMode ? devUrl + proxyEndpoint : prodUrl + proxyEndpoint,
  paragraph_delimiter_key: "Enter",
  paragraph_delimiter_char: "\u21B5",
  delete_keys: ["Backspace", "Delete"],
  important_word_length: 4,
  custom_media_source: "self",
  default_text_position: { x: 7, y: 7 }, // default position of slide text
  default_text_size: { width: 0, height: 0 },
  canvas_size: 1024,
  video_preview_size: 360,
  default_slide_duration_seconds: 1.0,
  duration_label: "წამი",
  choose_font_label: "ამოირჩიე ფონტი",
  alerts: {
    no_slides_chosen: "გთხოვთ ამოირჩიოთ ერთი სლაიდი მაინც"
  },
  fonts: ["Arial", "BPG Arial", "NotoSansGeo"],
  default_font: "Arial",
  transitions:{
    fade: "fade"
  }
}