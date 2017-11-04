#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import datetime
from db.canteen_entity import CanteenEntity

#Wait time measurement
class MeasureEntity:

    measureId = None
    canteenId = 0
    #Date and time when the user arrived
    arriveDateTime = datetime.datetime.now()
    #Seconds waited in queue
    waitSeconds = 0

    # Builds a new measureId
    #
    # @param canteenEntity canteen entity where measure was taken
    # @param arriveDate dateWhen the measurement was taken
    # @param arriveOffsetSeconds seconds after canteen opening when the user arriveDate
    # @param waitSeconds seconds the user waited in queue
    #
    @staticmethod
    def fromCanteenAndDataPoint(canteenEntity, arriveDate, arriveOffsetSeconds, waitSeconds):
        canteenId = canteenEntity.canteenId
        #Gets opening datetime for that date and sums arrive offset seconds
        arriveDateTime = datetime.datetime.combine(arriveDate, canteenEntity.openingHours[arriveDate.weekday()][0]) + datetime.timedelta(seconds = arriveOffsetSeconds)
        waitSeconds = waitSeconds
        return MeasureEntity(None, canteenId, arriveDateTime, waitSeconds)

    # Builds a new measureId
    # @param measureId id to use inside the database
    def __init__(self, measureId, canteenId, arriveDateTime, waitSeconds):
        self.measureId = measureId
        self.canteenId = canteenId
        self.arriveDateTime = arriveDateTime
        self.waitSeconds = waitSeconds
