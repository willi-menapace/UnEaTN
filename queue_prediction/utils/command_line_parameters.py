#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

from enum import Enum

class Parameters(Enum):
    GENERATE = 1
    GENERATION_BEGIN_DAY = 2
    GENERATION_PREVISION_BEGIN_DAY = 3
    GENERATION_END_DAY = 4
    GENERATION_DAILY_MEASURES_COUNT = 5
    GENERATION_VARIANCE = 6

    PREDICT = 7
    PREDICT_PREVISION_DAY = 8

    HELP = 9

    DB_URL = 10
    DB_NAME = 11
    DB_USER = 12
    DB_PASSWORD = 13

    MEASURES_AGE_LIMIT = 14
    PREVISION_INTERVAL = 15
    DEBUG = 16
