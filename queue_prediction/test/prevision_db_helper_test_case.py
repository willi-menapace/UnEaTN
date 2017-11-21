#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#


from db.measure_entity import MeasureEntity
from db.measures_db_helper import MeasureDbHelper
from db.prevision_data_entity import PrevisionDataEntity
from db.prevision_db_helper import PrevisionDbHelper
from db.canteen_entity import CanteenEntity
from db.prevision_entity import PrevisionEntity

from utils import timeutils

import unittest
import datetime
import MySQLdb

# Test cases for PrevisionDbHelper
#
class PrevisionDbHelperTestCase(unittest.TestCase):

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


    def testPrevisionManipulation(self):

        cursor = self.connection.cursor()

        prevision = PrevisionEntity(1, 1, datetime.datetime.now())

        previsionId = PrevisionDbHelper.insertPrevision(prevision, cursor)

        retrievedPrevisions = PrevisionDbHelper.getAllPrevisions(cursor)

        self.assertTrue(len(retrievedPrevisions) == 1)

        baseDateTime = datetime.datetime(2017, 1, 1, 0, 0, 0)
        previsionDataCount = 20
        for i in range(previsionDataCount):

            currentPrevisionData = PrevisionDataEntity(None, previsionId, (baseDateTime + datetime.timedelta(seconds = i)).time(), i)
            PrevisionDbHelper.insertPrevisionData([currentPrevisionData], cursor)

        self.connection.commit()

        retrievedPrevisionData = PrevisionDbHelper.getAllPrevisionData(previsionId, cursor)

        self.assertTrue(previsionDataCount == len(retrievedPrevisionData))

        for i in range(previsionDataCount):
            currentPrevisionData = retrievedPrevisionData[i]
            self.assertTrue((timeutils.timeDifference((baseDateTime + datetime.timedelta(seconds = currentPrevisionData.waitTimeSeconds)).time(), currentPrevisionData.arriveTime) == 0))



    def tearDown(self):
        cursor = self.connection.cursor()
        PrevisionDbHelper.deleteAllPrevisionData(cursor)
        self.connection.commit()
        PrevisionDbHelper.deleteAllPrevisions(cursor)
        self.connection.commit()
        self.connection.close()

if __name__ == '__main__':
    unittest.main()