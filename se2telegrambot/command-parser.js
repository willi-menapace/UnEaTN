/*
* Module that parses incoming string and executes an action accordingly
*
* Author: Giuliani Daniele
*/

var AUTH_TOKEN = process.env.AUTH_TOKEN || 'tokenOK';

const UTIL = require('./utilities');
const UNEATN = require('./uneatn-api');
const DFINTERACTION = require('./dialogflow-interaction');

/* Canteen list */
var canteenList = [];

/* Error messages */
const PARAM_NUMBER_ERROR = 'Numero di parametri errato, vedi /help';
const BAD_REQUEST = 'Comando non valido, vedi /help';
const BAD_CANTEEN = 'Mensa non esistente!';
const TIME_PARSING_ERROR = 'Orario non valido!';
const INVALID_WAITING_TIME = 'Il tempo di attesa inserito non è valido!';
const INTERNAL_ERROR = 'Si è verificato un errore, riprovare più tardi!';
const BAD_SUBMISSION = 'I dati forniti risultano non essere validi!';

/* Data structure for regular expressions and semantic actions */
var regExps = [];
var semActs = [];

/* Regular expression for commands */
var waitRE = /^\/wait (.+)/;
var bestTimeRE = /^\/bestTime (.+)/;
var submitRE = /^\/submit (.+)/;
var helpRE = /^\/help.*/;
var startRE = /^\/start.*/;
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
        return;
    }

    //controllo sulla validità della mensa
    if(!UTIL.isCanteenValid(parameters[0], canteenList)) {
        answer = BAD_CANTEEN;
        reject(answer);
        return;
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
            return;
        }
        hour = time.hour;
        minute = time.minute;
    } else {
        //inserire orario di sistema
        hour = new Date().getUTCHours() + 1;
        minute = new Date().getMinutes();
        console.log('Extracted time: ' + hour + ':' + minute);
    }

    //controllo ed estrazione del giorno (se presente)
    if(parameters.length > 2) {
        dayOfTheWeek = UTIL.parseDate(parameters[2]);
        if(dayOfTheWeek === null) {
            //parsing error
            answer = TIME_PARSING_ERROR;
            reject(answer);
            return;
        }
    } else {
        dayOfTheWeek = new Date().getDay() - 1;
    }

    UNEATN.getWaitTime(canteen, hour, minute, dayOfTheWeek).then(function(val) {
        answer = 'Tempo di attesa: ' + val + ' min';
        resolve(answer);
    }).catch(function(res) {
        if(res.localeCompare(UNEATN.NO_PREVISION) === 0) {
            answer = 'Nessuna previsione per l\'orario specificato';
        } else {
            answer = INTERNAL_ERROR;
        }
        console.log('ERROR reason: ' + res);
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
        return;
    }

    //controllo intervallo orario
    var startTime = UTIL.parseTime(parameters[0]);
    var endTime = UTIL.parseTime(parameters[1]);
    if(startTime === null || endTime === null) {
        answer = TIME_PARSING_ERROR;
        reject(answer);
        return;
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
            return;
        }
    } else {
        dayOfTheWeek = new Date().getDay() - 1;
    }

    UNEATN.getBestTime(startHour, startMinute, endHour, endMinute, dayOfTheWeek).then(function(val) {
        var responseArray = val.bestTime;
        for(var i = 0; i < responseArray.length; i++) {
            if(responseArray[i].isClosed === false) {
                answer += responseArray[i].codeName + ' -- Miglior orario: ' + responseArray[i].values.bestTime + ' Tempo di attesa: ' + responseArray[i].values.waitingTime + '\n';
            } else {
                answer += responseArray[i].codeName + ' -- Nessun orario trovato' + '\n';
            }
        }
        resolve(answer);
    }).catch(function(res) {
        answer = INTERNAL_ERROR;
        console.log('ERROR reason: ' + res);
        reject(answer);
    });
}


function submitSA(msg, resolve, reject) {
    var answer = '';

    var telegramID;
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
        return;
    }

    //controllo telegramID
    if(isNaN(parseInt(msg.from.id))) {
        answer = INTERNAL_ERROR;
        reject(answer);
        return;
    } else {
        telegramID = parseInt(msg.chat.id);
    }

    //controllo mensa
    if(!UTIL.isCanteenValid(parameters[0], canteenList)) {
        answer = BAD_CANTEEN;
        reject(answer);
        return;
    } else {
        canteen = parameters[0];
    }

    //controllo tempo attesa
    waitingTime = parseInt(parameters[1]);
    if(isNaN(waitingTime)) {
        answer = INVALID_WAITING_TIME;
        reject(answer);
        return;
    }

    //controllo esistenza e validità orario
    if(parameters.length > 2) {
        var time = UTIL.parseTime(parameters[2]);
        if(time === null) {
            answer = TIME_PARSING_ERROR;
            reject(answer);
            return;
        } else {
            hour = time.hour;
            minute = time.minute;
        }
    } else {
        hour = new Date().getUTCHours() + 1;
        minute = new Date().getMinutes();

        //calculating arrival time
        var waitingHour = Math.floor(waitingTime / 60);
        var waitingMinute = waitingTime % 60;

        hour -= waitingHour;
        minute -= waitingMinute;

        //compute real hour if time became negative (time refers to previous days)
        while(hour < 0) {hour += 24}
    }

    UNEATN.addTime(AUTH_TOKEN, telegramID, canteen, waitingTime, hour, minute).then(function(val) {
        answer = 'Grazie per il tuo contributo!';
        resolve(answer);
    }).catch(function(res) {
        if(res.localeCompare(UNEATN.BAD_DATA) === 0) {
            answer = BAD_SUBMISSION;
        } else {
            answer = INTERNAL_ERROR;
        }
        console.log('ERROR reason: ' + res);
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
	//Richiamo il modulo di interazione con DialogFlow per l'utilizzo del Linguaggio Naturale al posto
	//dei comandi.
	DFINTERACTION.NLrequestParser(msg,resolve,reject);
}

function startSA(msg, resolve, reject) {
    answer = 'Ciao, cosa posso fare per te?';
    resolve(answer);
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

regExps.push(startRE);
semActs.push(startSA);


/* Function available outside the module */
/* Parses an incoming message */
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

/*
* Function used to init the list of the avaliable canteen
* @return Promise resolved as true if the list was obtained correctly otherwise rejected as false
*/
exports.initCodenameList = function() {
    return new Promise(function(resolve, reject) {
        UNEATN.getCanteenList().then(function(val) {
            canteenList = val;
            resolve(true);
            return;
        }).catch(function(res) {
            reject(false);
            return;
        });
    });
}