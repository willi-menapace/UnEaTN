#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import datetime

# Calculates second difference between time objects
#
# @param time1 first time object
# @param time2 second time object
#
# @return seconds between time2 - time1
def timeDifference(time1, time2):
    dummydate = datetime.date(2017, 1, 1) #Dummy date with no meaning, just used for obtaining seconds
    return (datetime.datetime.combine(dummydate, time1) - datetime.datetime.combine(dummydate, time2)).total_seconds()
