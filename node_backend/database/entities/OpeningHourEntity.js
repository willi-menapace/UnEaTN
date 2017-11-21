module.exports = class OpeningHourEntity {
	constructor(openingHourId, canteenId, weekDay, openTime, closeTime) {
		this.openingHourId = openingHourId;
		this.canteenId = canteenId;
		this.weekDay = weekDay;
		this.openTime = openTime;
		this.closeTime = closeTime;
	}
}
