#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#


from db.measure_entity import MeasureEntity
from db.measures_db_helper import MeasureDbHelper
from db.canteen_entity import CanteenEntity

import unittest
import datetime
import MySQLdb

# Test cases for MeasuresDbHelper
#
class MeasuresDbHelperTestCase(unittest.TestCase):

    dbUser = "testuser"
    dbName = "uneatn_test"
    dbUrl = "nanobit.eu"
    dbPassword = "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ"
    canteenId = 1
    canteenEntity = CanteenEntity(canteenId, "test_canteen", "test_canteen", {})

    def setUp(self):
        self.connection = MySQLdb.connect(user = self.dbUser,
                                     host = self.dbUrl,
                                     passwd = self.dbPassword,
                                     db = self.dbName)

    def testInsertRetrieveMeasures(self):
        cursor = self.connection.cursor()

        generatedDates = []
        for i in range(20):
            currentDateTime = datetime.datetime(2017, 1, i + 1)
            generatedDates.append(currentDateTime)
            currentEntity = MeasureEntity(None, self.canteenId, currentDateTime, i, i)

            MeasureDbHelper.insert(currentEntity, cursor)

        self.connection.commit()

        for i in range(20):

            currentDateTime = generatedDates[i]
            retrievedMeasures = MeasureDbHelper.getFromDaterangeAndDay(self.canteenEntity, currentDateTime, currentDateTime + datetime.timedelta(days = 1), currentDateTime.weekday(), cursor)

            self.assertTrue(len(retrievedMeasures) == 1)

    def tearDown(self):
        MeasureDbHelper.deleteAllMeasures(self.connection.cursor())
        self.connection.commit()
        self.connection.close()

if __name__ == '__main__':
    unittest.main()