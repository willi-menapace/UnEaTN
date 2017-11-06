#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import utils.timeutils as timeutils

from matplotlib import pyplot

#Utility class for predictions plotting
class PredictionPlotter:

    # Adds measure entities to the plot
    #
    # @param measureEntityList list of measures to add
    # @param startTime time representing the starting point of the plot
    @staticmethod
    def addMeasureEntities(measureEntityList, startTime):

        xValues = []
        yValues = []
        for currentMeasure in measureEntityList:
            xValues += [timeutils.timeDifference(currentMeasure.arriveDateTime.time(), startTime)]
            yValues += [currentMeasure.waitSeconds]

            pyplot.plot(xValues, yValues, ".")

    # Adds prevision data entities to the plot
    #
    # @param previsionDataEntities list of prevision data to add
    # @param startTime time representing the starting point of the plot
    @staticmethod
    def addPrevisionDataEntities(previsionDataEntities, startTime):

            xValues = []
            yValues = []
            for currentPrevisionData in previsionDataEntities:
                xValues += [timeutils.timeDifference(currentPrevisionData.arriveTime, startTime)]
                yValues += [currentPrevisionData.waitTimeSeconds]

                pyplot.plot(xValues, yValues, ".")

    # Shows the plot
    @staticmethod
    def showPlot():
        pyplot.show()
