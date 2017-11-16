/*
* Bot module that interacts with Telegram server using node-telegram-bot-api api
* Can be started locally with 'node index.js' or 'heroku local' or pushed on heroku
* Based on how it's started the bot will be configured in polling or webhook mode:
* - When configured in polling mode, the bot will automatically query the telegram server to
*   check if any message was received.
* - When configured in webhook mode, the bot will send an URL to the telegram server
*   and will start listening on a specific port, now the telegram server will automatically
*   forward any new message to the URL given.
*
* Author: Giuliani Daniele
*/

/* Fetching of enviroment variables */
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '453354176:AAEsyCqr-LdNhjADBY_Z1xLxIytwLRjHVyM';
const NODE_ENV = process.env.NODE_ENV || 'development';
const HEROKU_URL = process.env.HEROKU_URL || 'https://se2telegrambot.herokuapp.com/';

/* Import of different modules */
var TelegramBot = require('node-telegram-bot-api');
var commandParser = require('./command-parser');


/* BOT CONFIGURATION */

console.log("Starting bot...");

var bot;

//check enviroment variable to decide in what mode start the bot
if(NODE_ENV === 'development') {
    //starts the bot in polling mode (development only)
    bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});
} else {
    //starts the bot in webhook mode (production only)
    var options = {
        webHook: {
            port: process.env.PORT
        }
    };
    bot = new TelegramBot(TELEGRAM_TOKEN, options);
    bot.setWebHook(HEROKU_URL + bot.token)
}

console.log('Bot started in ' + NODE_ENV + ' mode');


/* Bot logic */

bot.on('message', function(msg){

    var answer = commandParser.parse(msg).then(function(val) {
        bot.sendMessage(msg.chat.id, val, {parse_mode: 'markdown'});
        console.log('SUCCESFULL REQUEST: ' + msg.text); //todo remove this line (debug only)
    }).catch(function(res) {
        bot.sendMessage(msg.chat.id, res, {parse_mode: 'markdown'});
        console.log('BAD REQUEST RECEIVED');
        console.log('Req:');
        console.log(msg.text);
        console.log('Res:');
        console.log(res);
    });

});