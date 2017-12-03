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
    GENERATION_USERBASE_SIZE = 7

    PREDICT = 8
    PREDICT_PREVISION_DAY = 9

    HELP = 10

    DB_URL = 11
    DB_NAME = 12
    DB_USER = 13
    DB_PASSWORD = 14

    MEASURES_AGE_LIMIT = 15
    PREVISION_INTERVAL = 16
    DEBUG = 17
