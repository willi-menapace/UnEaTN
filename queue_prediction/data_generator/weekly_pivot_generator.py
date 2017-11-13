#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import random

#Generator for weekly pivot distributions
class WeeklyPivotGenreator:

    referencePivots = []

    # Initializes the generator
    #
    # @param referencePivots pivots array in the form (arriveTimeOffsetSeconds, waitTimeMinutes)
    #        must contain at least 2 elements
    def __init__(self, referencePivots):

        self.referencePivots = referencePivots

    # Builds newly generated pivots for each day of the week
    #
    # @param xMaxSeconds maxNumber of seconds the arrive time offser of a certain pivot can be moved
    # @param yFactor maximum percentage of variation of the wait time in each pivot
    def getWeeklyMap(self, xMaxSeconds, yFactor):

        if len(self.referencePivots) < 2:
            raise ValueError("Pivots array must contain at least 2 elements")

        weeklyMap = {}
        lastPivotIndex = len(self.referencePivots) - 1

        for day in range(0, 7):

            #First pivot is not modified
            newPivots = [self.referencePivots[0]]
            for currentIndex in range(1, lastPivotIndex):
                #x values of the neighbor elements, we cannot surpass them
                lowLimit = newPivots[currentIndex - 1][0]  #We must take the newly created x element as low limit, taking the old could generate overlaps
                upperLimit = self.referencePivots[currentIndex + 1][0]

                currentX, currentY = self.referencePivots[currentIndex]
                #Generates a new arrive time which does not surpass the limits of its neighbors
                newX = random.randint(max(currentX - xMaxSeconds, lowLimit), min(currentX + xMaxSeconds, upperLimit))
                #Generates a new wait time multiplying the original up to the maxFactor
                newY = currentY * random.uniform(max(0, 1 - yFactor), 1 + yFactor)

                newPivots += [(newX, newY)]

            #Last pivot is not modified
            newPivots += [self.referencePivots[lastPivotIndex]]

            #Adds the generated pivots to the map
            weeklyMap[day] = newPivots

        return weeklyMap
