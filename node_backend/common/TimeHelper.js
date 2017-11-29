module.exports = class TimeHelper {
    
    //if firstTime is before secondTime returns 1
    //if firstTime is then secondTime returns -1
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
        if(typeof timeString == 'string' || timeString instanceof String){
           
            var timeSplitted = timeString.split(':');
            if(!isNaN(timeSplitted[0]) && !isNaN(timeSplitted[1])){
                var hours = parseInt(timeSplitted[0]);
                var minutes = parseInt(timeSplitted[1]);
                if(hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60){
                    var date = new Date();
                    date.setHours(hours);
                    date.setMinutes(minutes);
                    date.setSeconds(0);
                    date.setMilliseconds(0); 
                    return date;
                } else{
                    return null;
                }
            } else{
                return null;
            }
        } else{
            return null;
        }
    }
    
    //Does an intersection between two date intervals: 
    //IMPORTANT! the intervals are a couple of Date, the first date of the couple must be before the second date, else the method returns null
    // - the interval returned is an array composed by 2 dateS: the first rappresetS the first date of the interval while the second the second date of the interval
    //returns null if the intersection is an empty set or there is an error, 
    //returns the intersection interval if the intersection isn't an empty set
    //NOTE: if the intersacttion interval is a single value the function returns anyway an array composed of 2 equal date
    static getTimeIntersectionByCoupleOfIntervals(startTimeFirstInterval, endTimeFirstInterval, startTimeSecondInterval, endTimeSecondInterval){
        if(!(startTimeFirstInterval instanceof Date) || !(endTimeFirstInterval instanceof Date) || !(startTimeSecondInterval instanceof Date) || !(endTimeSecondInterval instanceof Date)){ //check if all the interval is intervals of dates
            return null;
        } else if(this. compareHoursMinutesTimes(startTimeFirstInterval, endTimeFirstInterval) < 0){ //check if the first date of an interval is before the second date of that interval
            return null;  
        } else if(this.compareHoursMinutesTimes(startTimeSecondInterval, endTimeSecondInterval) < 0){
            return null;
        } else {
            if(this.compareHoursMinutesTimes(startTimeFirstInterval, startTimeSecondInterval) >= 0 &&
               this.compareHoursMinutesTimes(startTimeSecondInterval, endTimeSecondInterval) >= 0 &&
               this.compareHoursMinutesTimes(endTimeSecondInterval, endTimeFirstInterval) >= 0){
                var intersection = [startTimeSecondInterval, endTimeSecondInterval];
                return intersection;
            } else if(this.compareHoursMinutesTimes(startTimeFirstInterval, startTimeSecondInterval) >= 0 &&
                      this.compareHoursMinutesTimes(startTimeSecondInterval, endTimeFirstInterval) >= 0 &&
                      this.compareHoursMinutesTimes(endTimeFirstInterval, endTimeSecondInterval) >= 0){
                var intersection = [startTimeSecondInterval, endTimeFirstInterval];
                return intersection;
            } else if(this.compareHoursMinutesTimes(startTimeSecondInterval, startTimeFirstInterval) >= 0 &&
                      this.compareHoursMinutesTimes(startTimeFirstInterval, endTimeFirstInterval) >= 0 &&
                      this.compareHoursMinutesTimes(endTimeFirstInterval, endTimeSecondInterval) >= 0){
                var intersection = [startTimeFirstInterval, endTimeFirstInterval];
                return intersection;
            } else if(this.compareHoursMinutesTimes(startTimeSecondInterval, startTimeFirstInterval) >= 0 &&
                      this.compareHoursMinutesTimes(startTimeFirstInterval, endTimeSecondInterval) >= 0 &&
                      this.compareHoursMinutesTimes(endTimeSecondInterval, endTimeFirstInterval) >= 0){
                var intersection = [startTimeFirstInterval, endTimeSecondInterval];
                return intersection;
            } else{
                return null; //case if the intersection set is empty
            }
        }
    }
    
    /* 
    * Given a time in format hh:mm:ss returns a date which has
    * current day, month and year. Minutes and hours are equal 
    * to those of time passed as parameter, while seconds and milliseconds 
    * are equal to 0
    */
    static getDateByTime(time) {
        const HOURS_INDEX = 0;
        const MINUTES_INDEX = 1;
        var dateTime = new Date();
        var splittedTime = time.split(":",2);
        var hours = splittedTime[HOURS_INDEX];
        var minutes = splittedTime[MINUTES_INDEX];
        dateTime.setHours(hours);
        dateTime.setMinutes(minutes);
        dateTime.setSeconds(0);
        dateTime.setMilliseconds(0);
        
        return dateTime;
    }
    
    /* 
    * Given a date returns a string of the format hh:mm where
    * hours and minutes are equal to those of date passed as parameter.
    */
    static getTimeByDate(date) {
        const HOURS_INDEX = 0;
        const MINUTES_INDEX = 1;
        var dateText = date.toTimeString();
        dateText = dateText.split(' ')[0];
        var timeSeparator = ":";
        var splittedTime = dateText.split(timeSeparator);
        var hoursText = splittedTime[HOURS_INDEX];
        var minutesText = splittedTime[MINUTES_INDEX];
        var timeText = hoursText.concat(timeSeparator.concat(minutesText));
        
        return timeText;
    }
    
    /*
    * Given a date this method returns a date to which
    * minutes passed as parameter are added.
    */
    static addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }
    
    /*
    * Search in previsionsData for a previsionData which has an arrive time
    * equals to time
    */
    static getPrevisionDataByTime(previsionsData, time) {
        var previsionData = null;
        for(var i = 0; i < previsionsData.length && previsionData === null; i++) {
            var arriveTimeDate = this.getDateByTime(previsionsData[i].arriveTime);
            var arriveTimeHours = arriveTimeDate.getHours();
            var arriveTimeMinutes = arriveTimeDate.getMinutes();
            if(arriveTimeHours == time.getHours() && arriveTimeMinutes == time.getMinutes())
                previsionData = previsionsData[i];
        }
        return previsionData;
    }
    
    /*
    * This method has to be called if and only if openingHours contains at least
    * a non null element. Given an array of opening hour elements it returns a date 
    * which represents the minimum open date.
    */
    static getMinOpenDateTime(openingHours) {
        const MAX_DATE = 8640000000000000;
        var minOpenDateTime = new Date(MAX_DATE); // latest date
        for(var i = 0; i < openingHours.length; i++) {
            var openDateTime = this.getDateByTime(openingHours[i].openTime);
            if(openingHours[i] !== null && openDateTime < minOpenDateTime) 
                minOpenDateTime = openDateTime;
            }
        return minOpenDateTime;
    }
    
    /*
    * This method has to be called if and only if openingHours contains at least
    * a non null element. Given an array of opening hour elements it returns a date 
    * which represents the maximum open date.
    */
    static getMaxCloseDateTime(openingHours) {
        const MIN_DATE = -8640000000000000;
        var maxCloseDateTime = new Date(MIN_DATE); // earliest date
        for(var i = 0; i < openingHours.length; i++) {
            var closeDateTime = this.getDateByTime(openingHours[i].closeTime);
            if(openingHours[i] !== null && closeDateTime > maxCloseDateTime) 
                maxCloseDateTime = closeDateTime;
        }
        return maxCloseDateTime;
    }
    
}