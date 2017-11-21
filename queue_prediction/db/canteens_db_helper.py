#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from db.canteen_entity import CanteenEntity

import datetime

# Helper class for database canteen entities manupulation
class CanteensDbHelper:

    _getAllCanteensQuery = (""
        "SELECT canteen_id, name, codename "
        "FROM canteens ")

    _getOpeningHoursByCanteenId = (""
        "SELECT weekday, open_time, close_time, opening_hour_id "
        "FROM opening_hours "
        "WHERE canteen_id = %(canteenId)s ")

    @staticmethod
    def getAllCanteens(cursor):
        cursor.execute(CanteensDbHelper._getAllCanteensQuery)

        canteensResults = cursor.fetchall()

        canteensList = []

        #Converts results to canteen entities
        for canteenRow in canteensResults:
            currentCanteenId = canteenRow[0]
            canteenName = canteenRow[1]
            codename = canteenRow[2]

            getOpeningHoursParameters = {
                "canteenId": currentCanteenId
            }

            cursor.execute(CanteensDbHelper._getOpeningHoursByCanteenId, getOpeningHoursParameters)

            openingHoursResults = cursor.fetchall()
            currentCanteenOpeningHours = {}


            #For each canteen fetches its opening hours
            for openingHourRow in openingHoursResults:

                weekday = openingHourRow[0]
                #Transforms timedelta objects into time ones
                openHour = (datetime.datetime.min + openingHourRow[1]).time()
                closeHour = (datetime.datetime.min + openingHourRow[2]).time()
                openingHourId = openingHourRow[3]


                currentOpeningHour = (openHour, closeHour, openingHourId)

                currentCanteenOpeningHours[weekday] = currentOpeningHour

            canteensList += [CanteenEntity(currentCanteenId, canteenName, codename, currentCanteenOpeningHours)]

        return canteensList
