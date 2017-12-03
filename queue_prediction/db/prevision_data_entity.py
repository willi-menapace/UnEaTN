#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import datetime

#Wait time prevision data
class PrevisionDataEntity:

    previsionDataId = None
    previsionId = None
    arriveTime = datetime.datetime.now().time()
    waitTimeSeconds = 0

    def __init__(self, previsionDataId, previsionId, arriveTime, waitTimeSeconds):
        self.previsionId = previsionId
        self.arriveTime = arriveTime
        self.waitTimeSeconds = waitTimeSeconds
