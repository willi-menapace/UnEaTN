module.exports = class MeasureEntity {
	constructor(measureId, telegramId, canteenId, arriveTime, waitSeconds) {
		this.measureId = measureId;
        this.telegramId = telegramId;
		this.canteenId = canteenId;
		this.arriveTime = arriveTime;
		this.waitSeconds = waitSeconds;
	}
}
