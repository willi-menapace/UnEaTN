#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from db.measure_entity import MeasureEntity

# Helper class for database prevision entities manupulation
class PrevisionDbHelper:

    getNextPrevisionId = (""
    "SELECT MAX(prevision_id) + 1 AS next_id"
    " FROM previsions")

    insertPrevisionQuery = (""
    "INSERT INTO previsions (prevision_id, opening_hour_id, generation_date)"
    " VALUES (%(prevision_id)s, %(opening_hour_id)s, %(generation_date)s)")

    insertPrevisionDataQuery = (""
    "INSERT INTO prevision_data (prevision_id, arrive_time, wait_seconds)"
    " VALUES (%(prevision_id)s, %(attive_time)s, %(wait_seconds)s)")

    # Inserts a previsions
    #
    # @param previsionEntity the prevision to insert. Its id is set by the procedure
    # @param cursor the cursor to use for the operation
    #
    # @return id of the newly inserted prevision
    @staticmethod
    def insertPrevision(previsionEntity, cursor):

        cursor.execute(PrevisionDbHelper.getNextPrevisionId)

        #Determines the id to assign to the prevision
        nextId = cursor.fetchone()[0]

        # Handles the first data entry
        if nextId == None:
            nextId = 1
        previsionEntity.previsionId = nextId

        previsionMap = {
            "prevision_id": previsionEntity.previsionId,
            "opening_hour_id": previsionEntity.openingHourId,
            "generation_date": previsionEntity.generationDate
        }

        cursor.execute(PrevisionDbHelper.insertPrevisionQuery, previsionMap)

        return nextId

    # Inserts prevision data
    #
    # @param previsionDataEntityList list of prevision data entities to insert
    # @param cursor the cursor to use for the operation
    @staticmethod
    def insertPrevisionData(previsionDataEntityList, cursor):

        for currentPrevision in previsionDataEntityList:

            previsionDataMap = {
                "prevision_id": currentPrevision.previsionId,
                "attive_time": currentPrevision.arriveTime,
                "wait_seconds": currentPrevision.waitTimeSeconds
            }

            cursor.execute(PrevisionDbHelper.insertPrevisionDataQuery, previsionDataMap)
