#!/bin/bash

BRANCH="master"

if [ -z "$1" ]
  then
    echo "No branch supplied, master will be pushed"
  else
  	BRANCH=$1
  	echo "Branch $BRANCH selected"
fi

heroku create

heroku buildpacks:clear

heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt

heroku buildpacks:add --index 2 heroku/python

heroku buildpacks:add --index 3 heroku/nodejs

# push on heroku main remote
git push heroku $BRANCH:master

# remove main heroku remote
git remote remove heroku

# switch Procfile end package.json to configure telegram bot
mv Procfile Procfile.main
mv package.json package.json.main

mv Procfile.bot Procfile
mv package.json.bot package.json

# setting up telegram-bot heroku reopository
heroku create
heroku buildpacks:clear
heroku buildpacks:add --index 1 heroku/nodejs

# setting enviroment variables
heroku config:set TELEGRAM_TOKEN=483884774:AAGbt5DFB214pfoisaMXfMqyLOoGaJKsNdc
heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set URL_UNEATN=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set DIALOGFLOW_TOKEN=957a68d0a11d4ac8b28396d199d79b65
heroku config:set AUTH_TOKEN=TOKEN_TO_BE_DEFINED

# push on heroku bot remote
git push heroku $BRANCH:master

# remove bot heroku remote
git remote remove heroku
# switch back to main repository
mv Procfile Procfile.bot
mv package.json package.json.bot

mv Procfile.main Procfile
mv package.json.main package.json