module.exports = class MeasureEntity {
	constructor(measureId, userId, canteenId, arriveTime, waitSeconds) {
		this.measureId = measureId;
        this.userId = userId;
		this.canteenId = canteenId;
		this.arriveTime = arriveTime;
		this.waitSeconds = waitSeconds;
	}
}
