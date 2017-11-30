#!/bin/bash

heroku create

heroku buildpacks:clear

heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt

heroku buildpacks:add --index 2 heroku/python

heroku buildpacks:add --index 3 heroku/nodejs

# setting enviroment variables
heroku config:set TELEGRAM_TOKEN=483884774:AAGbt5DFB214pfoisaMXfMqyLOoGaJKsNdc
heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set URL_UNEATN=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set DIALOGFLOW_TOKEN=957a68d0a11d4ac8b28396d199d79b65
heroku config:set AUTH_TOKEN=TOKEN_TO_BE_DEFINED