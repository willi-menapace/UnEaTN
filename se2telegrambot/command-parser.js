/*
* Module that parses incoming string and executes an action accordingly
*
* Author: Giuliani Daniele
*/

const UTIL = require('./utilities');
const UNEATN = require('./uneatn-api');

/* Canteen list */
const canteenList = ['povo0', 'povo1', 'pastoLesto'];

/* Error messages */
const PARAM_NUMBER_ERROR = 'Numero di parametri errato, vedi /help';
const BAD_REQUEST = 'Comando non valido, vedi /help';
const BAD_CANTEEN = 'Mensa non esistente!';
const TIME_PARSING_ERROR = 'Orario non valido!';
const INVALID_WAITING_TIME = 'Il tempo di attesa inserito non è valido!';
const INTERNAL_ERROR = 'Si è verificato un errore, riprovare più tardi!';

/* Data structure for regular expressions and semantic actions */
var regExps = [];
var semActs = [];

/* Regular expression for commands */
var waitRE = /^\/wait (.+)/;
var bestTimeRE = /^\/bestTime (.+)/;
var submitRE = /^\/submit (.+)/;
var helpRE = /^\/help.*/;
var messageRE = /^[^/].+/;   //all the messages that don't begin with "/"


/* Semantic actions implementation */

function waitSA(msg, resolve, reject) {
    var answer = '';

    var canteen;
    var hour;
    var minute;
    var dayOfTheWeek;

    console.log('/wait received');

    var reOutput = waitRE.exec(msg.text);
    var text = reOutput[1]; //remove "/wait"
    var parameters = text.split(' ');

    //controllo sul numero di parametri
    if(parameters.length < 1 || parameters.length > 3) {
        answer = PARAM_NUMBER_ERROR;
        reject(answer);
    }

    //controllo sulla validità della mensa
    if(!UTIL.isCanteenValid(parameters[0], canteenList)) {
        answer = BAD_CANTEEN;
        reject(answer);
    } else {
        canteen = parameters[0];
    }

    //controllo ed estrazione dell'orario (se presente)
    if(parameters.length > 1) {
        var time = UTIL.parseTime(parameters[1]);
        if(time === null) {
            //parsing error
            answer = TIME_PARSING_ERROR;
            reject(answer);
        }
        hour = time.hour;
        minute = time.minute;
    } else {
        //inserire orario di sistema
        hour = new Date().getHours();
        minute = new Date().getMinutes();
    }

    //controllo ed estrazione del giorno (se presente)
    if(parameters.length > 2) {
        dayOfTheWeek = UTIL.parseDate(parameters[2]);
        if(dayOfTheWeek === null) {
            //parsing error
            answer = TIME_PARSING_ERROR;
            reject(answer);
        }
    } else {
        dayOfTheWeek = new Date().getDay();
    }

    UNEATN.waitingTimeCanteen(canteen, hour, minute, dayOfTheWeek).then(function(val) {
        answer = 'Tempo di attesa: ' + val + ' min';
        resolve(answer);
    }).catch(function(res) {
        answer = INTERNAL_ERROR;
        reject(answer);
    });
}


function bestTimeSA(msg, resolve, reject) {
    var answer = '';

    var startHour;
    var startMinute;
    var endHour;
    var endMinute;
    var dayOfTheWeek;

    console.log('/bestTime received');

    var reOutput = bestTimeRE.exec(msg.text);
    var text = reOutput[1];
    var parameters = text.split(' ');

    //controllo sul numero di parametri
    if(parameters.length < 2 || parameters.length > 3) {
        answer = PARAM_NUMBER_ERROR;
        reject(answer);
    }

    //controllo intervallo orario
    var startTime = UTIL.parseTime(parameters[0]);
    var endTime = UTIL.parseTime(parameters[1]);
    if(startTime === null || endTime === null) {
        answer = TIME_PARSING_ERROR;
        reject(answer);
    } else {
        startHour = startTime.hour;
        startMinute = startTime.minute;
        endHour = endTime.hour;
        endMinute = endTime.minute;
    }

    //controllo (esistenza e validità) giornata
    if(parameters.length > 2){
        dayOfTheWeek = UTIL.parseDate(parameters[2]);
        if(dayOfTheWeek === null) {
            answer = TIME_PARSING_ERROR;
            reject(answer);
        }
    } else {
        dayOfTheWeek = new Date().getDay();
    }

    UNEATN.bestWaitingTime(startHour, startMinute, endHour, endMinute, dayOfTheWeek).then(function(val) {
        for (var key in val) {
            if (val.hasOwnProperty(key)) {
                if(val[key].error === false) {
                    answer += key + ' -- Miglior orario: ' + val[key].bestTime + ' Tempo di attesa: ' + val[key].waitTime + '\n';
                } else {
                    answer += key + ' -- Nessun orario trovato' + '\n';
                }
            }
        }
        resolve(answer);
    }).catch(function(res) {
        answer = INTERNAL_ERROR;
        reject(answer);
    });
}


function submitSA(msg, resolve, reject) {
    var answer = '';

    var telegramID = msg.chat.id;
    var canteen;
    var waitingTime;
    var hour;
    var minute;

    console.log('/submit received');

    var reOutput = submitRE.exec(msg.text);
    var text = reOutput[1];
    var parameters = text.split(' ');

    //controllo sul numero di parametri
    if(parameters.length < 2 || parameters.length > 3) {
        answer = PARAM_NUMBER_ERROR;
        reject(answer);
    }

    //controllo mensa
    if(!UTIL.isCanteenValid(parameters[0], canteenList)) {
        answer = BAD_CANTEEN;
        reject(answer);
    } else {
        canteen = parameters[0];
    }

    //controllo tempo attesa
    waitingTime = parseInt(parameters[1]);
    if(isNaN(waitingTime)) {
        answer = INVALID_WAITING_TIME;
        reject(answer);
    }

    //controllo esistenza e validità orario
    if(parameters.length > 2) {
        var time = UTIL.parseTime(parameters[2]);
        if(time === null) {
            answer = TIME_PARSING_ERROR;
            reject(answer);
        } else {
            hour = time.hour;
            minute = time.minute;
        }
    } else {
        hour = new Date().getHours();
        minute = new Date().getMinutes();

        //calculating arrival time //todo test this branch
        var waitingHour = Math.floor(waitingTime / 60);
        var waitingMinute = waitingTime % 60;

        hour -= waitingHour;
        minute -= waitingMinute;

        //compute real hour if time became negative (time refers to previous days)
        while(hour < 0) {hour += 24}
    }

    UNEATN.addWaitingTime(telegramID, canteen, waitingTime, hour, minute).then(function(val) {
        answer = 'Grazie per il tuo contributo!';
        resolve(answer);
    }).catch(function(res) {
        answer = INTERNAL_ERROR;
        reject(answer);
    });
}

function helpSA(msg, resolve, reject) {
    var answer = '';

    answer += '*Lista comandi:*\n';
    answer += '/help\n';
    answer += 'Visualizza il seguente menù.\n';
    answer += '\n';
    answer += '/wait mensa \\[ora] \\[giorno]\n';
    answer += 'Visualizza il tempo di attesa in una determinata mensa durante l\'ora e il giorno impostati.\n';
    answer += '\n';
    answer += '/bestTime oraInizio oraFine \\[giorno]\n';
    answer += 'Visualizza la migliore ora per pranzare in ciascuna mensa all\'interno dell\'intervallo specificato, nel giorno impostato.\n';
    answer += '\n';
    answer += '/submit mensa tempoAttesa \\[ora]\n';
    answer += 'Invia una segnalazione riguardo al tempo di attesa di una specifica mensa ad una data ora.\n';
    answer += '\n\n';

    answer += '*Lista mense disponibili:*\n';
    for(var i = 0; i < canteenList.length; i++) {
        answer += '    \u2022 ' + canteenList[i] + '\n';
    }

    answer += '\n\n';
    answer += '*Convenzioni:*\n';
    answer += '    \u2022 `[parametri facoltativi]`\n';
    answer += '    \u2022 Orario:\n';
    answer += '          `HH:MM`\n';
    answer += '          `HH.MM`\n';
    answer += '    \u2022 Giorno:\n';
    answer += '          `lun/mar/.../dom`\n';
    answer += '          `1/2/.../7`\n';

    resolve(answer);
}


function messageSA(msg, resolve, reject) {
    resolve("Dialgoflow interactrion is still wip!"); //TODO implement
}


/*
*   Adding regular expression and semantic actions to structures
*   All the expression are evalued following their orded in the array
*/
regExps.push(waitRE);
semActs.push(waitSA);

regExps.push(bestTimeRE);
semActs.push(bestTimeSA);

regExps.push(submitRE);
semActs.push(submitSA);

regExps.push(helpRE);
semActs.push(helpSA);

regExps.push(messageRE);
semActs.push(messageSA);


/* Function available outside the module */
exports.parse = function(msg) {

    return new Promise(function(resolve, reject) {
        //goes through all regular expressions and tests them one by one following array order
        var matchFound = false;
        for(var i = 0; i < regExps.length; i++) {
            if(regExps[i].test(msg.text)) {
                matchFound = true;
                semActs[i](msg, resolve, reject); //make subfunction handle resolve/reject
            }
        }
        if(!matchFound) {
            reject(BAD_REQUEST);
        }
    });

};