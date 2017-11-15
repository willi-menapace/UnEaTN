#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from db.measure_entity import MeasureEntity

# Helper class for database measurement entities manipulation
class MeasureDbHelper:

    insertQuery = (""
    "INSERT INTO measures (canteen_id, arrive_time, wait_seconds)"
    " VALUES (%(canteenId)s, %(arriveTime)s, %(waitSeconds)s)")

    getFromDaterangeAndWeekdayQuery = (""
    "SELECT measure_id, canteen_id, arrive_time, wait_seconds"
    " FROM measures"
    " WHERE arrive_time BETWEEN %(beginDate)s AND %(endDate)s"
    " AND WEEKDAY(arrive_time) = %(weekday)s"
    " AND canteen_id = %(canteenId)s")

    deleteAllMeasuresQuery = (""
    "DELETE FROM measures "
    " WHERE true")

    # Inserts a measure
    #
    # @param measureEntity the measure to insert
    # @param cursor The cursor to use for the operation
    @staticmethod
    def insert(measureEntity, cursor):

        measureDataMap = {
            "canteenId": measureEntity.canteenId,
            "arriveTime": measureEntity.arriveDateTime,
            "waitSeconds": measureEntity.waitSeconds,
        }

        cursor.execute(MeasureDbHelper.insertQuery, measureDataMap)

    #Retrieves measures that match a time period, weekday, and canteen
    @staticmethod
    def getFromDaterangeAndDay(canteen, beginDate, endDate, weekdayNumber, cursor):

        queryParameters = {
            "beginDate": beginDate,
            "endDate": endDate,
            "weekday": weekdayNumber,
            "canteenId": canteen.canteenId,
        }

        #Executes query and gets data
        cursor.execute(MeasureDbHelper.getFromDaterangeAndWeekdayQuery, queryParameters)
        results = cursor.fetchall()

        measureEntities = []

        #Converts results to measure entites
        for row in results:
            measureEntities += [MeasureEntity(row[0], row[1], row[2], row[3])]

        return measureEntities

    #Deletes all measures in the database
    @staticmethod
    def deleteAllMeasures(cursor):

        cursor.execute(MeasureDbHelper.deleteAllMeasuresQuery)




