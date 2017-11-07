#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import numpy

#Generator for probabilistically distributed
class DataGenerator:

    #Sorted pivot points that govern the shape of the generated data
    #Must have at least 2 elements
    #Have form (arriveTime, waitTime)
    _pivotList = []
    #Variance index in the generated data
    _variance = 0.0
    #Number of data points to generate
    _dataPointsCount = 0

    #Initializes the generator
    def __init__(self, pivotList, variance, dataPointsCount):
        self._pivotList = sorted(pivotList)
        self._variance = variance
        self._dataPointsCount = dataPointsCount
        if len(pivotList) < 2:
            raise ValueError("Pivot list must have at least 2 elements")

    # Generates the sample data
    #
    # @returns List of generated data points in the form (arrive time offset seconds, wait minutes))
    def getData(self):

        lowerPivot = self._pivotList[0]
        upperPivot = self._pivotList[1]
        upperPivotIndex = 1

        pivotsCount = len(self._pivotList)
        #Gets range limit
        minX = self._pivotList[0][0]
        maxX = self._pivotList[pivotsCount - 1][0]

        #Distance betweed each data point
        xStep = (maxX - minX) / self._dataPointsCount

        currentX = minX
        generatedPoints = []
        #Generated each point
        for currentIndex in range(self._dataPointsCount):

            #Advances pivot if we crossed the boundaries of the current two
            while currentX > upperPivot[0] and upperPivotIndex < pivotsCount - 1:
                upperPivotIndex += 1
                lowerPivot = upperPivot
                upperPivot = self._pivotList[upperPivotIndex]


            #Interpolated pivots with a straight line and calculated point position on the line
            gradient = (upperPivot[1] - lowerPivot[1]) / (upperPivot[0] - lowerPivot[0])
            generatedY = lowerPivot[1] + gradient * (currentX - lowerPivot[0])

            #Adds error to the generated value
            randomError = numpy.random.normal(0, self._variance)
            generatedY += randomError
            generatedY = max(generatedY, 0);

            generatedPoints += [(currentX, generatedY)]

            currentX += xStep

        return generatedPoints
