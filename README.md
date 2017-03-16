# SamePhotoBot

SamePhotoBot is a Facebook page bot powered by node.js, meant to automate the daily posting of images. Using Facebook's Graph API and Webhooks services, it accepts images from users through messenger conversations. It then uses a perceptual hash to compare the similarity betwen the submitted image, and the predefined base image. If the images are similar enough, the user's submission is stored in a queue, and eventually posted (rate of one image per day).

#TODO
-Tagging
-More Captions
-Logging
-Moderation (Web Panel)