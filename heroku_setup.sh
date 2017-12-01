#!/bin/bash

BRANCH="master"

if [ -z "$1" ]
	then
    	echo "No branch supplied, master will be pushed"
	else
  		BRANCH=$1
  		echo "Branch $BRANCH selected"
fi

echo "Creating main application"

git checkout $BRANCH

#heroku create
#heroku buildpacks:clear
#heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt
#heroku buildpacks:add --index 2 heroku/python
#heroku buildpacks:add --index 3 heroku/nodejs

# push on heroku main remote
#if [ "$BRANCH" == "master" ]
#	then
#		git push heroku master
#	else
#		git push heroku $BRANCH:master
#fi


# remove main heroku remote
#git remote remove heroku

echo "Creating bot telegram"

# creating new temporary branch for push
git branch heroku-tmp
git checkout heroku-tmp

# switch Procfile end package.json to configure telegram bot
mv Procfile Procfile.main
mv package.json package.json.main

git status

mv Procfile.bot Procfile
mv package.json.bot package.json

git status

# updating branch configuration files
git add *
git commit -m "Configure branch for push"

# setting up telegram-bot heroku reopository
#heroku create
#heroku buildpacks:clear
#heroku buildpacks:add --index 1 heroku/nodejs

# setting enviroment variables
#heroku config:set TELEGRAM_TOKEN=483884774:AAGbt5DFB214pfoisaMXfMqyLOoGaJKsNdc
#heroku config:set HOST_URL=$(heroku info -s | grep web_url | cut -d= -f2)
#heroku config:set URL_UNEATN=$(heroku info -s | grep web_url | cut -d= -f2)
#heroku config:set DIALOGFLOW_TOKEN=957a68d0a11d4ac8b28396d199d79b65
#heroku config:set AUTH_TOKEN=TOKEN_TO_BE_DEFINED

# push on heroku bot remote
#git push heroku heroku-tmp:master

# remove bot heroku remote
#git remote remove heroku

git status

# checkout previous branch
git checkout $BRANCH

git status

# delete temporary branch
git branch -D heroku-tmp

git status