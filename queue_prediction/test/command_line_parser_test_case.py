#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from utils.command_line_parser import CommandLineParser
from utils.command_line_parameters import Parameters

import unittest
import datetime

# Test cases for CommandLineParser
#
class CommandLineParserTestCase(unittest.TestCase):

    def testParseGenerate(self):

        testParameters = ["program name", "--generate", "--begin_day", "2017-3-14", "--prevision_begin_day", "2017-3-15", "--variance", "5"]

        commandLineParser = CommandLineParser()

        commandLineParser.parseCommandLine(testParameters)

        self.assertTrue(commandLineParser.getParam(Parameters.GENERATE) == True)
        self.assertTrue((commandLineParser.getParam(Parameters.GENERATION_BEGIN_DAY) - datetime.datetime(2017, 3, 14)).total_seconds() == 0)
        self.assertTrue((commandLineParser.getParam(Parameters.GENERATION_PREVISION_BEGIN_DAY) - datetime.datetime(2017, 3, 15)).total_seconds() == 0)
        self.assertTrue(commandLineParser.getParam(Parameters.GENERATION_VARIANCE) == 5)

    def testParsePredict(self):

        testParameters = ["program name", "--predict", "--prevision_day", "2017-3-14", "--dburl", "mydburl", "--measures_age_limit", "5"]

        commandLineParser = CommandLineParser()

        commandLineParser.parseCommandLine(testParameters)

        self.assertTrue(commandLineParser.getParam(Parameters.PREDICT) == True)
        self.assertTrue((commandLineParser.getParam(Parameters.PREDICT_PREVISION_DAY) - datetime.datetime(2017, 3, 14)).total_seconds() == 0)
        self.assertTrue(commandLineParser.getParam(Parameters.DB_URL) == "mydburl")
        self.assertTrue(commandLineParser.getParam(Parameters.MEASURES_AGE_LIMIT) == 5)

    def testParseHelp(self):

        testParameters = ["program name", "--help", "--prevision_day", "2017-3-14", "--dburl", "mydburl", "--measures_age_limit", "5"]

        commandLineParser = CommandLineParser()

        commandLineParser.parseCommandLine(testParameters)

        self.assertTrue(commandLineParser.getParam(Parameters.HELP) == True)

if __name__ == '__main__':
    unittest.main()