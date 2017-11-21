#       __  __     _______ ______
#     / / / /__  / __/ _ /_  __/__
#   / /_/ / _ \/ _// __ |/ / / _ \
#  \____/_//_/___/_/ |_/_/ /_//_/
#
#  Author: Willi Menapace <willi.menapace@gmail.com>
#

#A canteen with associated name and opening hours
class CanteenEntity:

    canteenId = 0
    name = ""
    codename = ""
    #Associates each day with (opening hour, closing hour, openingHourId)
    openingHours = {}

    def __init__(self, id, name, codename, openingHours):

        self.canteenId = id
        self.name = name
        self.codename = codename
        self.openingHours = {}

        #Adds opening hours for days from Monday 0 to Sunday 6
        for day in range(0, 7):
            if day in openingHours:
                self.openingHours[day] = openingHours[day]
