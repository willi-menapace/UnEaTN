module.exports = class PrevisionDataEntity {
	constructor(previsionDataId, previsionId, arriveTime, waitSeconds) {
		this.previsionDataId = previsionDataId;
		this.previsionId = previsionId;
		this.arriveTime = arriveTime;
		this.waitSeconds = waitSeconds;
	}
}
