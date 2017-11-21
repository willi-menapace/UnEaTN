#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from db.measure_entity import MeasureEntity
from db.prevision_data_entity import PrevisionDataEntity

from utils import timeutils

from queue_predictor.queue_predictor import QueuePredictor

from math import sqrt
import unittest
import datetime

# Test cases for QueuePredictor
#
class QueuePredictorTestCase(unittest.TestCase):

    #Time from opening to closure in seconds
    timeSpanSeconds = 3600
    #Time separating each generated measure
    secondsStep = 60

    baseDate = datetime.datetime(2017, 1, 1)

    openHour = baseDate.time()
    closeHour = (baseDate + datetime.timedelta(seconds = timeSpanSeconds)).time()

    #Creates opening hours triple. Lase parameter indicates fake database id
    openingHours = (openHour, closeHour, 0)

    #Measure arrays which will be used for testing
    emptyMeasures = []
    constantMeasures = []
    linearMeasures = []
    quadraticMeasures = []

    def _rmse(self, measuresList, previsionList):
        squareSum = 0

        for currentMeasure in measuresList:
            mostSimilarPrevision = previsionList[0]
            smallestTimeDifference = abs(timeutils.timeDifference(mostSimilarPrevision.arriveTime, currentMeasure.arriveDateTime.time()))

            for currentPrevision in previsionList:
                currentTimeDifference = abs(timeutils.timeDifference(mostSimilarPrevision.arriveTime, currentMeasure.arriveDateTime.time()))
                if currentTimeDifference < smallestTimeDifference:
                    smallestTimeDifference = currentTimeDifference
                    mostSimilarPrevision = currentPrevision

            squareSum += (mostSimilarPrevision.waitTimeSeconds - currentMeasure.waitSeconds) ** 2

        return sqrt(squareSum / len(measuresList))

    def setUp(self):

        currentArriveSeconds = 0
        while currentArriveSeconds < self.timeSpanSeconds:

            self.currentArriveDateTime = (self.baseDate + datetime.timedelta(seconds = currentArriveSeconds))
            self.constantMeasures.append(MeasureEntity(0, 0, self.currentArriveDateTime, 15, 1))
            self.linearMeasures.append(MeasureEntity(0, 0, self.currentArriveDateTime, currentArriveSeconds * 0.001, 1))
            self.quadraticMeasures.append(MeasureEntity(0, 0, self.currentArriveDateTime, currentArriveSeconds ** 2 * 0.000001 + currentArriveSeconds * 0.001 + 5, 1))

            currentArriveSeconds += self.secondsStep

    def testEmptyMeasures(self):

        self.assertRaises(ValueError, QueuePredictor, self.openingHours, self.emptyMeasures)


    def testConstantMeasures(self):
        queuePredictor = QueuePredictor(self.openingHours, self.constantMeasures)

        predictionsList = queuePredictor.getPredictions(60)

        self.assertTrue(self._rmse(self.constantMeasures, predictionsList) < 10)

    def testLinearMeasures(self):
        queuePredictor = QueuePredictor(self.openingHours, self.linearMeasures)

        predictionsList = queuePredictor.getPredictions(60)

        self.assertTrue(self._rmse(self.linearMeasures, predictionsList) < 10)

    def testQuadraticMeasures(self):
        queuePredictor = QueuePredictor(self.openingHours, self.quadraticMeasures)

        predictionsList = queuePredictor.getPredictions(60)

        self.assertTrue(self._rmse(self.quadraticMeasures, predictionsList) < 10)

if __name__ == '__main__':
    unittest.main()