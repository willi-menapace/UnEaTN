#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from data_generator.data_generator import DataGenerator
from data_generator.weekly_pivot_generator import WeeklyPivotGenreator
from queue_predictor.queue_predictor import QueuePredictor

from db.canteen_entity import CanteenEntity
from db.measure_entity import MeasureEntity
from db.prevision_entity import PrevisionEntity
from db.prevision_data_entity import PrevisionDataEntity
from db.measures_db_helper import MeasureDbHelper
from db.prevision_db_helper import PrevisionDbHelper
from db.canteens_db_helper import CanteensDbHelper

import utils.timeutils
from utils.command_line_parameters import Parameters
from utils.command_line_parser import CommandLineParser

from plotting.prediction_plotter import PredictionPlotter

import datetime

import MySQLdb

# Generates previsions and stores them in the database
#
# @param connection database connection
# @param measuresAgeLimitDays number of days the algorithm is allowed to go in the past to fetch measurements
# @param previsionDay day for which to generate the prevision
# @param previsionIntervalSeconds number of seconds between two generated prevision points
# @param debugMode if true it visually displays generated measures and previsions for each day and canteen
def generatePrevisions(connection, measuresAgeLimitDays = 30, previsionIntervalSeconds = 60, previsionDay = datetime.datetime.now().date(), debugMode = False):
    cursor = connection.cursor()

    canteenList = CanteensDbHelper.getAllCanteens(cursor);

    currentWeekday = previsionDay.weekday()
    #Generate data for each canteen that day
    for currentCanteen in canteenList:
        currentOpeningHours = currentCanteen.openingHours
        #If the canteen is open on that day
        if currentWeekday in currentOpeningHours:

            print(" -Generating previsions for day " + str(previsionDay) + " canteen " + currentCanteen.name)

            #Gets previsions to use for prediction generation
            previsionMeasures = MeasureDbHelper.getFromDaterangeAndDay(currentCanteen, previsionDay - datetime.timedelta(days = measuresAgeLimitDays), previsionDay, currentWeekday, cursor)

            predictor = QueuePredictor(currentOpeningHours[currentWeekday], previsionMeasures)

            predictionDataList = predictor.getPredictions(previsionIntervalSeconds)

            openingHourId = currentOpeningHours[currentWeekday][2]
            #Creates a prevision with no id
            prevision = PrevisionEntity(None, openingHourId, previsionDay)
            #Inserts the prevision
            previsionId = PrevisionDbHelper.insertPrevision(prevision, cursor)

            #Sets prediction ids
            for currentPredictionData in predictionDataList:
                currentPredictionData.previsionId = previsionId

            #Inserts prevision data for the prevision
            PrevisionDbHelper.insertPrevisionData(predictionDataList, cursor)

            if debugMode == True:
                PredictionPlotter.addMeasureEntities(previsionMeasures, currentOpeningHours[currentWeekday][0])
                PredictionPlotter.addPrevisionDataEntities(predictionDataList, currentOpeningHours[currentWeekday][0])
                PredictionPlotter.showPlot()


    #Closes database connections
    cursor.close()
    connection.commit()

# Generates initial measurements and previsions and inserts them in the database
#
# @param beginDay date of the first generated measure
# @param previsionBeginDay date on which to generate the first prevision
# @param endDay date of the last generate measure and prevision
# @param connection database connection
# @param generationDailiCount number of measures to generate for each day
# @param generationVariance vatiance of the generated measures
# @param previsionIntervalSeconds seconds separating two successive generated prediction points
# @param debugMode if true it visually displays generated measures and previsions for each day and canteen
#
def fillDatabase(beginDay, previsionBeginDay, endDay, connection, generationDailyCount = 20, generationVariance = 5, previsionIntervalSeconds = 60, debugMode = False):
    cursor = connection.cursor()

    pivotsList = [(0, 0), (900 * 1, 25), (900 * 3, 10), (900 * 4, 10), (900 * 5, 40), (900 * 6, 40), (900 * 8, 10), (900 * 9, 15), (900 * 11, 0),]

    #Generates pivots for each canteen
    pastoLestoWeeklyPivots = WeeklyPivotGenreator(pivotsList).getWeeklyMap(450, 0.2)
    povo0WeeklyPivots = WeeklyPivotGenreator(pivotsList).getWeeklyMap(450, 0.2)
    povo1WeeklyPivots = WeeklyPivotGenreator(pivotsList).getWeeklyMap(450, 0.2)

    canteenList = CanteensDbHelper.getAllCanteens(cursor);

    pastoLesto = canteenList[0]
    povo0 = canteenList[1]
    povo1 = canteenList[2]

    #Information about every canteen and their queue distributions
    canteensInfo = [
        (pastoLesto, pastoLestoWeeklyPivots),
        (povo0, povo0WeeklyPivots),
        (povo1, povo1WeeklyPivots)
    ]

    currentDay = beginDay
    #Generate data for each day
    while currentDay <= endDay:
        currentWeekday = currentDay.weekday()
        #Generate data for each canteen that day
        for currentCanteen, currentPivots in canteensInfo:
            currentOpeningHours = currentCanteen.openingHours
            #If the canteen is open on that day
            if currentWeekday in currentOpeningHours:
                #If the canteen is open we must have queue data
                if currentWeekday not in currentPivots:
                    raise ValueError("Canteen is open on day " + str(currentWeekday) + " but there is no associated queue information")

                print(" -Generating data for day " + str(currentDay) + " canteen " + currentCanteen.name)

                dataGenerator = DataGenerator(currentPivots[currentWeekday], generationVariance, generationDailyCount)
                generatedDataPoints = dataGenerator.getData()

                #Inserts generated data into the database
                for dataPoint in generatedDataPoints:

                    currentMeasureEntity = MeasureEntity.fromCanteenAndDataPoint(currentCanteen, currentDay, dataPoint[0], dataPoint[1])

                    MeasureDbHelper.insert(currentMeasureEntity, cursor)

        if currentDay >= previsionBeginDay:

            #Commits changes so that they become visible
            connection.commit()

            generatePrevisions(connection, previsionIntervalSeconds = previsionIntervalSeconds, previsionDay = currentDay, debugMode = debugMode)

        currentDay += datetime.timedelta(days = 1)

    #Closes database connections
    cursor.close()
    connection.commit()


#Parses command line arguments
commandLineParser = CommandLineParser()
commandLineParser.parseCommandLine()

connection = MySQLdb.connect(user = commandLineParser.getParam(Parameters.DB_USER), host = commandLineParser.getParam(Parameters.DB_URL), passwd = commandLineParser.getParam(Parameters.DB_PASSWORD), db = commandLineParser.getParam(Parameters.DB_NAME))

if commandLineParser.getParam(Parameters.HELP) == True:
    helpMessage = commandLineParser.generateHelpMessage()
    print(helpMessage)

elif commandLineParser.getParam(Parameters.GENERATE) == True:
    fillDatabase(commandLineParser.getParam(Parameters.GENERATION_BEGIN_DAY), commandLineParser.getParam(Parameters.GENERATION_PREVISION_BEGIN_DAY), commandLineParser.getParam(Parameters.GENERATION_END_DAY), connection, commandLineParser.getParam(Parameters.GENERATION_DAILY_MEASURES_COUNT), commandLineParser.getParam(Parameters.GENERATION_VARIANCE), commandLineParser.getParam(Parameters.PREVISION_INTERVAL), commandLineParser.getParam(Parameters.DEBUG))

elif commandLineParser.getParam(Parameters.PREDICT) == True:
    generatePrevisions(connection, commandLineParser.getParam(Parameters.MEASURES_AGE_LIMIT), commandLineParser.getParam(Parameters.PREVISION_INTERVAL), commandLineParser.getParam(Parameters.PREDICT_PREVISION_DAY), commandLineParser.getParam(Parameters.DEBUG))

connection.close()
