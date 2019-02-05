# Slami
**Slami** helps media content creators generate short captioned videos to use along with their content (articles, social media posts, blog posts…)

I made Slami as an open-source project for a client. I do not own the domain or the service.

It might still be available here: https://slami.ge

# Preview
Gifs showing how Slami can be used.

**Scraping resources based on post text**
![Slami - resource scraper](https://i.imgur.com/h0alxEt.gif)

**Assembling a short slideshow alongside the post**
![Slami - slideshow assembler](https://i.imgur.com/7RSxMjx.gif)

# Installation
Yarn and npm are required
```
git clone
cd slami
yarn install
cd client
yarn install
```

# Development
Using `concurrently`, we can run a node and webpack dev server together by calling:
```
yarn dev
```
in the root directory.

## IMPORTANT
`client/src/config.js` contains configurations that you should change during development/deployment.

Mostly it will be `devMode` and `localMode`

**When developing locally, set them both to true:**
```javascript
const devMode = true
const localMode = true
```

**When you wish to test the app on heroku or some other global server, while still in development:**
```javascript
const devMode = true
const localMode = false
```
And then generate a static build of the client code:
```
cd client
yarn build
```

**If you wish to test the generated build locally, set them both to true and from the root 
directory:**
```
node server
```
This will launch a node server and serve the static files just as a global server would (without all
that webpack mumbo-jumbo)

# Deployment
1. Modify these in `config.js`:
```javascript
const devMode = false
const localMode = false
```

2. Generate a static build of the client code:
```
cd client
yarn build
```
If if fails to compile, you're probably running the development server, so stop that and `yarn build` again.
If it still fails, remove `client/build` directory and retry.

3. Push everything to production server. Make sure to include everything inside `client/build`

# Requests
Server has a scraping api and also serves the views statically in production.

## Server
The server has full cors enabled, since `context.getImageData()` is used on a `<canvas/>` to 
generate a video frame-by-frame.

### `GET /images`
Route `/images` takes a GET request and a query object with `query` for the image search.

Sample fetch request:
```javascript
fetch("https://scr-api.com/images?query=dog")
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

The returned JSON should look like this:
```json
{
  "url": "http://www.quickanddirtytips.com/sites/default/files/images/2887/Dog_Chew.jpg",
  "title": "The Dog Trainer : Pica: Eating Things That Aren’t Food ...",
  "thumbnailUrl": "https://tse2.mm.bing.net/th?id=OIP.Lb9--l6XDyJV6RwC5fDEiwHaE7&pithumb.jpg",
  "source": "http://www.quickanddirtytips.com/pets/dog-behavior/pica-eating-things-that-aren%E2%80%99t-food"
}
```


### `GET /proxy`
Route `/proxy` takes a GET request and a query object with `url` as the image URL.

*This is only needed when CORS is not allowed on the requesed url*

Returns a stream of the image with given URL.

Example:
```html
<img src="https://scr-api.com/proxy?url=https://http.cat/100.jpg" alt="cat" />
```


## Client

### The client expects scrape result data with such structure:
```
{
  url, // Url to an image
  thumbnailUrl, // Url to a smaller version of the image
  title, // String describing the image
  source // Website from which the image was obtained
}
```

# Note
The server has full CORS enabled.

The scrapper is made with [Cheerio](https://cheerio.js.org/) -> https://github.com/buchin/nodejs-bing
