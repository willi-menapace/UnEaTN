'use strict';

const DIALOGFLOW_ACCESS_TOKEN = process.env.DIALOGFLOW_TOKEN || "957a68d0a11d4ac8b28396d199d79b65";
const UNEATN = require('./uneatn-api');
const INTERNAL_ERROR = 'Si è verificato un errore, riprovare più tardi!';
const PARSE_ERROR = 'Si è verificato un errore durante il parsing della richiesta, riprovare più tardi!';
const NO_CANTEEN_ERROR = 'Errore: la mensa non è stata trovata!';
const NO_TIME_ERROR = 'Errore: inserire l\'orario!';
const NO_TIME_INTERVAL_ERROR = "Errore: inserire un intervallo di tempo!";
const WAITING_FORECAST_INTENT = 'Previsione mensa';
const BEST_TIME_INTENT = 'Orario ideale';
const NOT_RECOGNIZED_ERROR = 'Non ho capito, puoi ripetere?';
const DIALOGFLOW_INTERNAL_ERROR = 'Si è verificato un errore nel server DialogFlow, riprovare più tardi!';
const TIME_ZONE = 1; //Siamo in UTC+1
//const NOT_RECOGNIZED_INTENT = 'Default Fallback Intent';

/**
 * Passa a DialogFlow il messaggio Telegram in linguaggio naturale che capisce cosa vuol fare l'utente e
 * ottiene dalla frase i vari paramentri. In base all'Intent rispondo all'utente interfacciandomi alle nostre API
 * del back-end.
 */
function NLrequestParser(msg, resolve, reject) {
    var naturalLanguageText = msg.text;
    var userID = msg.chat.id;

    var apiai = require("apiai");

    var options = {
        sessionId: userID
    };

    var app = apiai(DIALOGFLOW_ACCESS_TOKEN);
    var request = app.textRequest(naturalLanguageText,options);

    var answer = '';

    request.on('response', function(response) {
        var readIntentName = response.result.metadata.intentName;

        if(readIntentName === WAITING_FORECAST_INTENT){
            waitingTimeNL(response,resolve,reject,answer);
        }else if(readIntentName === BEST_TIME_INTENT){
            bestTimeNL(response,resolve,reject,answer);
        }else{
            answer = NOT_RECOGNIZED_ERROR;
            reject(answer);
            return;
        }
    });

    request.on('error', function(error) {
        console.log('DialogFlow:',error);
        answer = DIALOGFLOW_INTERNAL_ERROR;
        reject(answer);
        return;
    });

    request.end();
}

/**
 *  L'utente vuole sapere che attesa c'è per un determinata mensa. Questa funzione prende i parametri necessari da
 *  JSON generato da DialogFlow e genero una risposta in base ai valori ottenuti dal nostro DB.
 */
function waitingTimeNL(response,resolve,reject,answer) {
    //var isIncomplete = response.result.actionIncomplete;
    var readDate = response.result.parameters.date;
    var readCanteen = response.result.parameters.Mensa;
    var readTime = response.result.parameters.time;
    var readTimestamp = response.timestamp;

    var dayOfTheWeek;
    var canteen;
    var time;

    if(readDate === ''){
        var parsed = timestampParser(readTimestamp,'d');
        dayOfTheWeek = dateToDayofTheWeek(parsed[0],parsed[1],parsed[2]);
    }else{
        dayOfTheWeek = dateParser(readDate);
    }

    if(readCanteen === ''){
        answer = NO_CANTEEN_ERROR;
        reject(answer);
        return;
    }else{
        canteen = readCanteen;
    }

    if(readTime === '' && readDate === '') {
        //Se l'orario e la data non sono stati specificati direttamente, li ricavo dal timestamp
        //Significa che l'utente ha chiesto la coda per una data mensa, intendendo la coda presente in questo momento
        time = timestampParser(readTimestamp,'t');
    }else if(readTime === '' && readDate !== ''){
        answer = NO_TIME_ERROR;
        reject(answer);
        return;
    }else{
        time = timeParser(readTime);
    }

    if(time === null || canteen === null || dayOfTheWeek === null){
        answer = PARSE_ERROR;
        reject(answer);
        return;
    }
    UNEATN.waitingTimeCanteen(canteen, time[0], time[1], dayOfTheWeek).then(function (val) {
        answer = 'Dovrai aspettare in coda circa ' + val + ' minuti.';
        resolve(answer);
        return;
    }).catch(function (res) {
        answer = INTERNAL_ERROR;
        reject(answer);
        return;
    });

}

/**
 *  L'utente vuole sapere che attesa migliore per tutte le mense dato un determinato range di ore.
 *  Questa funzione prende i parametri necessari da JSON generato da DialogFlow e genero una risposta in base ai
 *  valori ottenuti dal nostro DB.
 */
function bestTimeNL(response,resolve,reject,answer) {
    var readDate = response.result.parameters.date;
    var readStartTime = response.result.parameters.begin;
    var readEndTime = response.result.parameters.end;
    var readTimestamp = response.timestamp;

    var dayOfTheWeek;
    var startTime;
    var endTime;

    if(readDate === ''){
        var parsed = timestampParser(readTimestamp,'d');
        dayOfTheWeek = dateToDayofTheWeek(parsed[0],parsed[1],parsed[2]);
    }else{
        dayOfTheWeek = dateParser(readDate);
    }

    if(readStartTime === ''){
        answer = NO_TIME_INTERVAL_ERROR;
        reject(answer);
        return;
    }else{
        startTime = timeParser(readStartTime);
    }

    if(readEndTime === ''){
        answer = NO_TIME_INTERVAL_ERROR;
        reject(answer);
        return;
    }else{
        endTime = timeParser(readEndTime);
    }

    if(startTime === null || endTime === null || dayOfTheWeek === null){
        answer = PARSE_ERROR;
        reject(answer);
        return;
    }

    UNEATN.bestWaitingTime(startTime[0],startTime[1],endTime[0],endTime[1],dayOfTheWeek).then(function (val) {
        var responseArray = val.bestWaitingTimes;
        for(var i = 0; i < responseArray.length; i++) {
            if(responseArray[i].error === false) {
                //answer += responseArray[i].name + ' -- Miglior orario: ' + responseArray[i].values.bestTime + ' Tempo di attesa: ' + responseArray[i].values.waitingTime + '\n';
                answer += responseArray[i].name + ': ti consiglio di andare a mangiare alle ' + responseArray[i].values.bestTime + ', dovrai aspettare circa '+ responseArray[i].values.waitingTime + ' minuti.\n';
            } else {
                //answer += responseArray[i].name + ' -- Nessun orario trovato' + '\n';
                answer += responseArray[i].name + ': non ho trovato nessun orario.'+ '\n';
            }
        }
        resolve(answer);
        return;
    }).catch(function (res) {
        answer = INTERNAL_ERROR;
        reject(answer);
        return;
    });
}

/**
 * Funzione che prende una data in ingresso (nel formato da dialogflow) e ritorna il giorno della settimana
 * corrispondente
 * @param date: data nel formato "ANNO-MESE-GIORNO", altrimenti non è una RE e non parsa nulla
 * @returns ritorna il giorno della settimana della data passata
 */
function dateParser(date) {
    if(date === undefined)
        return null;
    var yearRE = /^([0-9]+)[-][0-9]+[-][0-9]+$/;
    var monthRE = /^[0-9]+[-]([0-9]+)[-][0-9]+$/;
    var dayRE = /^[0-9]+[-][0-9]+[-]([0-9]+)$/;

    var returnYear = yearRE.exec(date);
    var returnMonth = monthRE.exec(date);
    var returnDay = dayRE.exec(date);

    if(returnYear === null || returnMonth === null || returnDay === null) {
        return null;
    }
    var year = parseInt(returnYear[1]);
    var month = parseInt(returnMonth[1]);
    var day = parseInt(returnDay[1]);

    if(!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return dateToDayofTheWeek(year,month,day);
    }
    return null;
}
/**
 * Funzione che parsa il tempo in input da Dialogflow nel suo formato in due interi per ora e minuti
 * @param time: stringa formattata nel formato di Dialogflow ("ORA:MIN:SEC")
 * @returns ritorna un array con ora e minuti, null se non è nel formato giusto
 */
function timeParser(time) {
    if(time === undefined)
        return null;
    var hourRE = /^([0-9]+)[:][0-9]+[:][0-9]+$/;
    var minuteRE = /^[0-9]+[:]([0-9]+)[:][0-9]+$/;
    var returnHour = hourRE.exec(time);
    var returnMinute = minuteRE.exec(time);

    if(returnHour === null || returnMinute === null) {
        return null;
    }
    var hour = parseInt(returnHour[1]);
    var minute = parseInt(returnMinute[1]);

    if(!isNaN(hour) && !isNaN(minute)) {
        if (hour < 24 && hour >= 0 && minute < 60 && minute >= 0) {
            return [hour,minute];
        }
    }
    return null;
}

/**
 * Funzione che parsa il timestamp in data/orario o entrambi
 * @param timestamp: il timestamp (di Dialogflow?) nel formato "ANNO-MESE-GIORNOTORA:MINUTI:SECONDI.DECIMIZ)
 * altrimenti non è una RE e non viene parsata
 * @param whatToReturn: niente o 'a' per tutte le informazioni (data e orario), 'd' per la data
 * (anno, mese e giorno), 't' per l'orario (ora e minuti)
 * @returns ritorna le informazioni desiderate (dipende dal whatToReturn) o null se ci sono errori
 */
function timestampParser(timestamp,whatToReturn) {
    if(timestamp === undefined)
        return null;
    var yearRE = /^([0-9]+)[-][0-9]+[-][0-9]+[T][0-9]+[:][0-9]+[:][0-9]+[.][0-9]+[Z]$/;
    var monthRE = /^[0-9]+[-]([0-9]+)[-][0-9]+[T][0-9]+[:][0-9]+[:][0-9]+[.][0-9]+[Z]$/;
    var dayRE = /^[0-9]+[-][0-9]+[-]([0-9]+)[T][0-9]+[:][0-9]+[:][0-9]+[.][0-9]+[Z]$/;
    var hourRE = /^[0-9]+[-][0-9]+[-][0-9]+[T]([0-9]+)[:][0-9]+[:][0-9]+[.][0-9]+[Z]$/;
    var minuteRE = /^[0-9]+[-][0-9]+[-][0-9]+[T][0-9]+[:]([0-9]+)[:][0-9]+[.][0-9]+[Z]$/;
    var secondRE = /^[0-9]+[-][0-9]+[-][0-9]+[T][0-9]+[:][0-9]+[:]([0-9]+)[.][0-9]+[Z]$/;

    var returnYear = yearRE.exec(timestamp);
    var returnMonth = monthRE.exec(timestamp);
    var returnDay = dayRE.exec(timestamp);
    var returnHour = hourRE.exec(timestamp);
    var returnMinute = minuteRE.exec(timestamp);
    var returnSecond = secondRE.exec(timestamp);

    if(returnYear === null || returnMonth === null || returnDay === null || returnHour === null || returnMinute === null || returnSecond === null) {
        return null;
    }
    var year = parseInt(returnYear[1]);
    var month = parseInt(returnMonth[1]);
    var day = parseInt(returnDay[1]);
    var hour = parseInt(returnHour[1]);
    hour += TIME_ZONE;      //l'ora ottenuta è in UTC
    hour = mod(hour,24);    //Per evitare di ottenere ad esempio le 24:30
    var minute = parseInt(returnMinute[1]);
    var second = parseInt(returnSecond[1]);

    if(whatToReturn === 'a' || whatToReturn === undefined)
        return [year,month,day,hour,minute,second];
    else if(whatToReturn === 'd')
        return [year,month,day];
    else if(whatToReturn === 't')
        return [hour,minute];
    else
        return null;
}

/**
 * L'operatore modulo (n % m) ritorna n se n è negativo, quindi questa funzione mi torna comodo
 * per avere dei valori da 0 a m come desiderei
 */
function mod(n, m) {
    return ((n % m) + m) % m;
}

function dateToDayofTheWeek(year,month,day) {
    var d = new Date(year, month-1, day, 12); // I mesi vanno da 0 a 11 con Date.
    var dayOfTheWeek = d.getDay(); //i giorni con getDay() sono 1-lun 2-mar 3-mer 4-gio 5-ven 6-sab 0-dom

    dayOfTheWeek = mod(dayOfTheWeek-1,7);//nel DB invece sono salvati come 0-lun 1-mar 2-mer 3-gio 4-ven 5-sab 6-dom

    return dayOfTheWeek;
}

module.exports = {
    NLrequestParser : NLrequestParser
};