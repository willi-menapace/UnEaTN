

module.exports = class TimeChecker{
    //if firstTime is before secondTime returns 1
    //if firstTime is after secondTime returns -1
    //if firstTime is equal to secondTime returns 0
    //if there is a parameter error returns null
    static compareHoursMinutesTimes(firstTime, secondTime){
        if(!(firstTime instanceof Date) || !(secondTime instanceof Date)){
            return null;
        } else{
            if(firstTime.getHours() < secondTime.getHours()){
                return 1;
            } else if(firstTime.getHours() > secondTime.getHours()){
                return -1;
            } else {
                if(firstTime.getMinutes() < secondTime.getMinutes()){
                    return 1;
                } else if(firstTime.getMinutes() > secondTime.getMinutes()){
                    return -1;
                } else{
                    return 0;
                }
            }
        }
    }
    //if timeString is in "HH:mm" format returns a date object, else return null
    static getDateFromHoursAndMinutesByString(timeString){
        if(typeof timeString === 'string' || timeString instanceof String){
            var timeSplitted = timeString.split(':');
            var hours = Number(timeSplitted[0]);
            var minutes = Number(timeSplitted[1]);
            
            if(Number.isInteger(hours) && Number.isInteger(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60){
                var date = new Date();
                date.setHours(hours);
                date.setMinutes(minutes);
                date.setSeconds(0);
                date.setMilliseconds(0); 
                return date;
            }
            else{
                return null;
            }
        } else{
            return null;
        }
    }
    
}
    
    