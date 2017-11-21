#!/bin/bash

heroku create

heroku buildpacks:clear

heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt

heroku buildpacks:add --index 2 heroku/python

heroku buildpacks:add --index 3 heroku/nodejs
