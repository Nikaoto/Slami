const devMode = false
const imagesEndpoint = "/images"
const proxyEndpoint = "/proxy"

const separateDevApiUrl = "https://scr-api.herokuapp.com" // Separate server that runs scrapers
//const devApiUrl = "https://slami-demo.herokuapp.com"
const devApiUrl = "http://localhost:2000" // node server
const prodApiUrl = "https://slami.ge"

module.exports = {
  devMode: devMode,
  devApiUrl: devApiUrl,
  prodApiUrl: prodApiUrl,
  scrapeApi: devMode ? devApiUrl + imagesEndpoint : prodApiUrl + imagesEndpoint,
  proxyApi: devMode ? devApiUrl + proxyEndpoint : prodApiUrl + proxyEndpoint,
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
  choose_font_label: "ფონტი",
  about_us_label: "ჩვენს შესახებ",
  contact_label: "კონტაქტი",
  copyright_label: "© 2018 Slami",
  privacy_policy_label: "კონფიდენციალურობის პოლიტიკა",
  faq_label: "ხშირად დასმული შეკითხვები",
  alerts: {
    no_slides_chosen: "გთხოვთ ამოირჩიოთ ერთი სლაიდი მაინც"
  },
  fonts: ["Arial", "BPG Arial", "NotoSansGeo"],
  default_font: "Arial",
  transitions:{
    cut: "Cut",
    fade: "Fade"
  },
  default_slide_transition: "Cut"
}