#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from db.measure_entity import MeasureEntity
from db.prevision_entity import PrevisionEntity
from db.prevision_data_entity import PrevisionDataEntity

import datetime

# Helper class for database prevision entities manipulation
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

    getAllPrevisionsQuery = (""
    "SELECT prevision_id, opening_hour_id, generation_date "
    " FROM previsions")

    getPrevisionDataByIdQuery = (""
    "SELECT prevision_data_id, prevision_id, arrive_time, wait_seconds"
    " FROM prevision_data"
    " WHERE prevision_id = %(prevision_id)s")

    deleteAllPrevisionDataQuery = ("DELETE FROM prevision_data WHERE true")

    deleteAllPrevisionsQuery = ("DELETE FROM previsions WHERE true")

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

    # Gets all previsions
    #
    # @param cursor the cursor to use for the operation
    #
    # @return list of all previsions in the database
    @staticmethod
    def getAllPrevisions(cursor):

        cursor.execute(PrevisionDbHelper.getAllPrevisionsQuery)

        previsions = []

        results = cursor.fetchall()
        for row in results:
            previsions.append(PrevisionEntity(row[0], row[1], row[2]))

        return previsions

    # Gets all prediction data for a given prediction
    #
    # @param previsionId id of the prevision
    # @param cursor the cursor to use for the operation
    #
    # @return list of all prediction data relative to the given prediction id
    @staticmethod
    def getAllPrevisionData(previsionId, cursor):

        cursor.execute(PrevisionDbHelper.getPrevisionDataByIdQuery, {"prevision_id": previsionId})

        previsionData = []

        results = cursor.fetchall()
        for row in results:
            #Transforms timedelta objects into time ones
            previsionData.append(PrevisionDataEntity(row[0], row[1], (datetime.datetime.min + row[2]).time(), row[3]))

        return previsionData

    # Deletes all previsions
    #
    # @param cursor the cursor to use for the operation
    @staticmethod
    def deleteAllPrevisions(cursor):

        cursor.execute(PrevisionDbHelper.deleteAllPrevisionsQuery)

    # Deletes all prevision data
    #
    # @param cursor the cursor to use for the operation
    @staticmethod
    def deleteAllPrevisionData(cursor):

        cursor.execute(PrevisionDbHelper.deleteAllPrevisionDataQuery)

