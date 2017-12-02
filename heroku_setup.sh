#!/bin/bash

BRANCH="master"
TELEGRAM_TOKEN="483884774:AAGbt5DFB214pfoisaMXfMqyLOoGaJKsNdc"
DIALOGFLOW_TOKEN="957a68d0a11d4ac8b28396d199d79b65"
AUTH_TOKEN="]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)"
BACKEND_URL=""	#leave empty
BOT_URL=""		#leave empty

if [ -z "$1" ]
	then
    	echo "Missing parameters!"
    	echo "Usage:"
    	echo "$0 <branch>"
	else
  		BRANCH=$1
  		echo "Branch $BRANCH selected"
		echo "Creating main application"

		git checkout $BRANCH

		heroku create
		heroku buildpacks:clear
		heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt
		heroku buildpacks:add --index 2 heroku/python
		heroku buildpacks:add --index 3 heroku/nodejs

		# push on heroku main remote
		if [ "$BRANCH" == "master" ]
			then
				git push heroku master
			else
				git push heroku $BRANCH:master
		fi

		BACKEND_URL=$(heroku info -s | grep web_url | cut -d= -f2)


		# remove main heroku remote
		git remote remove heroku

		echo "Creating bot telegram"

		# creating new temporary branch for push
		git branch heroku-tmp
		git checkout heroku-tmp

		# switch Procfile to configure telegram bot
		mv Procfile Procfile.main
		mv Procfile.bot Procfile

		# updating branch configuration files
		git add .			#NOTE "git add *" does not keep track of deleted files!!!
		git commit -m "Configure branch for push"

		# setting up telegram-bot heroku reopository
		heroku create
		heroku buildpacks:clear
		heroku buildpacks:add --index 1 heroku/nodejs

		BOT_URL=$(heroku info -s | grep web_url | cut -d= -f2)

		# setting enviroment variables
		heroku config:set TELEGRAM_TOKEN=$TELEGRAM_TOKEN
		heroku config:set HOST_URL=$BOT_URL
		heroku config:set URL_UNEATN=$BACKEND_URL
		heroku config:set DIALOGFLOW_TOKEN=$DIALOGFLOW_TOKEN
		heroku config:set AUTH_TOKEN=$AUTH_TOKEN

		# push on heroku bot remote
		git push heroku heroku-tmp:master

		# remove bot heroku remote
		git remote remove heroku

		# checkout previous branch
		git checkout $BRANCH

		# delete temporary branch
		git branch -D heroku-tmp
fi
