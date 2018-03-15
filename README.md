# Slami

# Client expects scrape data with such structure:
```
{
  url, // Url to an image
  thumbnailUrl, // Url to a smaller version of the image
  title, // String describing the image
  source // Website from which the image was obtained
}
```

# Important dependencies

 - `react-draggable` - dragging functionality on text inside SlideEditor
 - `react-image` - caching images and adding custom loading indicators
 - `react-resize-detector` - detecting editor resize to scale text in final video
 - `text-height` - calculating exact height of drawn text on canvas