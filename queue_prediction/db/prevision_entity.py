#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

import datetime

#Wait time previsions
class PrevisionEntity:

    previsionId = None
    openingHourId = None
    generationDate = datetime.datetime.now()

    # Creates a prevision entity
    #
    # @param previsionId id to associate to the previsionId
    # @param openeingHourId id of the opening hour to associate the prevision to
    # @param generationDate date the prevision was generated
    def __init__(self, previsionId, openingHourId, generationDate):
        self.previsionId = previsionId
        self.openingHourId = openingHourId
        self.generationDate = generationDate
