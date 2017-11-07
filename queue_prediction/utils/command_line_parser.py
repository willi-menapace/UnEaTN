#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import sys
import datetime

import utils.timeutils
from utils.command_line_parameters import Parameters

class CommandLineParser:

    #Mapping between command line strings and affected parameter
    _paramsAliasMap = {
        "--generate" : Parameters.GENERATE,
        "--begin_day": Parameters.GENERATION_BEGIN_DAY,
        "--prevision_begin_day": Parameters.GENERATION_PREVISION_BEGIN_DAY,
        "--end_day": Parameters.GENERATION_END_DAY,
        "--daily_measures": Parameters.GENERATION_DAILY_MEASURES_COUNT,
        "--variance": Parameters.GENERATION_VARIANCE,
        "--predict": Parameters.PREDICT,
        "--prevision_day": Parameters.PREDICT_PREVISION_DAY,
        "--help": Parameters.HELP,
        "--dburl": Parameters.DB_URL,
        "--dbname": Parameters.DB_NAME,
        "--dbuser": Parameters.DB_USER,
        "--dbpwd": Parameters.DB_PASSWORD,
        "--measures_age_limit": Parameters.MEASURES_AGE_LIMIT,
        "--prevision_interval": Parameters.PREVISION_INTERVAL,
        "--show_plots": Parameters.DEBUG
    }

    #Parameter values
    #Initialized with default parameters
    _paramsMap = {
        #whether to use database data generation mode
        Parameters.GENERATE: False,
        #day from which to begin data generation in generation mode
        Parameters.GENERATION_BEGIN_DAY: datetime.date(2017, 1, 1),
        #day from which to begin prevision generation in generation mode
        Parameters.GENERATION_PREVISION_BEGIN_DAY : datetime.date(2017, 2, 1),
        #last day for which to generate data and previsions in generation mode
        Parameters.GENERATION_END_DAY : datetime.datetime.now().date(),
        #number of measurements to generate for each day in generation mode
        Parameters.GENERATION_DAILY_MEASURES_COUNT : 20,
        #variance for the generated measures in generation mode
        Parameters.GENERATION_VARIANCE : 5,
        #whether to use prediction mode
        Parameters.PREDICT : True,
        #day for which to generate previsions in prediction mode
        Parameters.PREDICT_PREVISION_DAY : datetime.datetime.now().date(),
        #whether to use help mode
        Parameters.HELP : False,
        #database url
        Parameters.DB_URL : "nanobit.eu",
        #database name
        Parameters.DB_NAME : "unieatn",
        #database username
        Parameters.DB_USER : "mluser",
        #database password
        Parameters.DB_PASSWORD : "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ",
        #maximum age in number of days of the measures to consider for generating predictions
        Parameters.MEASURES_AGE_LIMIT : 30,
        #interval in seconds between two generated prediction points
        Parameters.PREVISION_INTERVAL : 60,
        #whether to display debug information
        Parameters.DEBUG : False,
    }

    _paramsDescriptionsMap = {
        Parameters.GENERATE: "whether to use database data generation mode",
        Parameters.GENERATION_BEGIN_DAY: "day from which to begin data generation in generation mode",
        Parameters.GENERATION_PREVISION_BEGIN_DAY : "day from which to begin prevision generation in generation mode",
        Parameters.GENERATION_END_DAY : "last day for which to generate data and previsions in generation mode",
        Parameters.GENERATION_DAILY_MEASURES_COUNT : "number of measurements to generate for each day in generation mode",
        Parameters.GENERATION_VARIANCE : "variance for the generated measures in generation mode",
        Parameters.PREDICT : "whether to use prediction mode",
        Parameters.PREDICT_PREVISION_DAY : "day for which to generate previsions in prediction mode",
        Parameters.HELP : "whether to use help mode",
        Parameters.DB_URL : "database url",
        Parameters.DB_NAME : "database name",
        Parameters.DB_USER : "database username",
        Parameters.DB_PASSWORD : "database password",
        Parameters.MEASURES_AGE_LIMIT : "maximum age in number of days of the measures to consider for generating predictions",
        Parameters.PREVISION_INTERVAL : "interval in seconds between two generated prediction points",
        Parameters.DEBUG : "whether to display debug information",
    }

    def generateHelpMessage(self):

        #Generates a list of Parameters in values orders and associates it with its list of aliases
        paramToAliasMap = {}
        for parameter in self._paramsMap.keys():
            aliasList = []
            for currentAlias, currentParameter in self._paramsAliasMap.items():
                if currentParameter == parameter:
                    aliasList += [currentAlias]

            paramToAliasMap[parameter] = sorted(aliasList)


        paramTouplesList = []
        for parameter, aliasList in paramToAliasMap.items():
            paramTouplesList += [(parameter, aliasList)]

        paramTouplesList.sort(key=lambda x: x[0].value)

        helpMessage = "Usage:\n"
        for parameter, aliasList in paramTouplesList:
            for currentAlias in aliasList:
                helpMessage += "\t" + currentAlias

            helpMessage += "\t" + self._paramsDescriptionsMap[parameter] + "\n\n"

        return helpMessage

    # Gets the value of parsed parameters
    # If called before parseCommandLine obtains default parameters
    #
    # @param parameter parameter of which to retrieve the value
    #
    # @return value of the requested parameter
    def getParam(self, parameter):
        if not parameter in self._paramsMap:
            raise ValueError("Specified parameter is not registeres as a valid parameter in the parser")

        return self._paramsMap[parameter]

    # Parses command line parameters
    #
    # @param arguments arguments string array to parse
    def parseCommandLine(self, arguments = sys.argv):

        currentOptionIndex = 1
        while currentOptionIndex < len(arguments):
            parameterName = arguments[currentOptionIndex]

            if not parameterName in self._paramsAliasMap:
                raise ValueError("Unknown command line parameter name " + parameterName)

            parameter = self._paramsAliasMap[parameterName]

            if parameter == Parameters.GENERATE:
                self._paramsMap[parameter] = True

            elif parameter == Parameters.GENERATION_BEGIN_DAY:
                currentOptionIndex += 1
                self._paramsMap[parameter] = datetime.strptime(arguments[currentOptionIndex], "%Y-%m-%d")

            elif parameter == Parameters.GENERATION_PREVISION_BEGIN_DAY:
                currentOptionIndex += 1
                self._paramsMap[parameter] = datetime.strptime(arguments[currentOptionIndex], "%Y-%m-%d")

            elif parameter == Parameters.GENERATION_END_DAY:
                currentOptionIndex += 1
                self._paramsMap[parameter] = datetime.strptime(arguments[currentOptionIndex], "%Y-%m-%d")

            elif parameter == Parameters.GENERATION_DAILY_MEASURES_COUNT:
                currentOptionIndex += 1
                self._paramsMap[parameter] = int(arguments[currentOptionIndex])

            elif parameter == Parameters.GENERATION_VARIANCE:
                currentOptionIndex += 1
                self._paramsMap[parameter] = int(arguments[currentOptionIndex])

            elif parameter == Parameters.PREDICT:
                self._paramsMap[parameter] = True

            elif parameter == Parameters.PREDICT_PREVISION_DAY:
                currentOptionIndex += 1
                self._paramsMap[parameter] = datetime.strptime(arguments[currentOptionIndex], "%Y-%m-%d")

            elif parameter == Parameters.HELP:
                self._paramsMap[parameter] = True

            elif p_paramsMaparameter == Parameters.DB_URL:
                currentOptionIndex += 1
                self._paramsMap[parameter] = arguments[currentOptionIndex]

            elif parameter == Parameters.DB_NAME:
                currentOptionIndex += 1
                self._paramsMap[parameter] = arguments[currentOptionIndex]

            elif parameter == Parameters.DB_USER:
                currentOptionIndex += 1
                self._paramsMap[parameter] = arguments[currentOptionIndex]

            elif parameter == Parameters.DB_PASSWORD:
                currentOptionIndex += 1
                self._paramsMap[parameter] = arguments[currentOptionIndex]

            elif parameter == Parameters.MEASURES_AGE_LIMIT:
                currentOptionIndex += 1
                self._paramsMap[parameter] = int(arguments[currentOptionIndex])

            elif parameter == Parameters.PREVISION_INTERVAL:
                currentOptionIndex += 1
                self._paramsMap[parameter] = int(arguments[currentOptionIndex])

            elif parameter == Parameters.DEBUG:
                self._paramsMap[parameter] = True

            else:
                raise ValuesError("Unknown parameter")

            #Processes next command line argument
            currentOptionIndex += 1
