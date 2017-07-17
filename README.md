# SamePhotoBot

SamePhotoBot is a Facebook page bot powered by node.js, meant to automate the daily posting of images. Using Facebook's Graph API and Webhooks services, it accepts images from users through messenger conversations. It then uses a perceptual hash to compare the similarity betwen the submitted image, and the predefined base image. If the images are similar enough, the user's submission is stored in a queue, and eventually posted (rate of one image per day).

### Installation
1. Download the files onto your machine/server. If you haven't already, install Node.js.
2. Get the API keys for Facebook's Graph API and set up Messenger Webhooks. You may need to set up a simple privacy policy to get your app approved.
3. Create SSL keys and certificated. You can use [Let's Encrypt] (https://letsencrypt.org/).
4. Create a copy of conf.sample.js named conf.js, and set the appropriate page tokens and page id, host name, as well as the path to your base image.
5. Run app.js with Node. 