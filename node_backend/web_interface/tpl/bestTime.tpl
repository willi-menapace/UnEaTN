<!--
    Page Name:  Home
    Project:    unEATn
    Author:     Simone Lorengo
    Date:       21.11.2017
    Note:       OK, needs debug

    Valori necessari:
    - canteenAffStatus_1 :: int or string :: default 4 :: Stato Affluenza Mensa Pasto Lesto
    - canteenAffStatus_2 :: int or string :: default 4 :: Stato Affluenza Mensa di Povo 0
    - canteenAffStatus_3 :: int or string :: default 4 :: Stato Affluenza Mensa di Povo 1
    0 -> Mensa chiusa
    1 -> Mensa libera
    2 -> Mensa trafficata
    3 -> Mensa piena
    * -> Errore visualizzato
-->

<!DOCTYPE html>
<html lang="it">
<head>
    <!-- METADATA -->
    <meta charset="utf-8">
    <meta name="description" content="Prima di mangiare, mensa">
    <meta name="author" content="Simone Lorengo">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- TITLE -->
    <title>unEATn</title>
    <!-- FAVICON -->
    <link rel="icon" href="img/favicon.png" type="image/png" />
    <!-- THEME COLOR -->
    <meta name="theme-color" content="#222222">
    <meta name="msapplication-navbutton-color" content="#222222">
    <meta name="apple-mobile-web-app-status-bar-style" content="#222222">
    <!-- STYLESHEETS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" href="https://cdn.anychart.com/releases/8.0.1/css/anychart-ui.min.css" />
    <link rel="stylesheet" href="/css/styles.css">
    <!-- EXTERNAL SCRIPTS -->
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-base.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-ui.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-exports.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
    <![endif]-->
</head>

<body>
<div class="container-fluid">
    <!-- HEADER -->
    <div class="row">
        <div class="col-lg-12 logo cursor-pointer" onclick="window.location='/';">
        </div>
    </div>
    <!-- BODY -->
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 body-padding" style="padding-bottom: 0">
            <div class="alignment-wrapper txt-justify">
                <span class="txt-center txt-bold"><p style="margin-bottom: 25px">TROVA ORARIO MIGLIORE</p></span>
            </div>
        </div>
        <!-- EMOJI -->
        <div class="col-sm-12 col-sm-offset-0 col-md-4 col-md-offset-2 col-lg-4 col-lg-offset-2 body-padding" style="padding-top: 0">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 bottom-margin cursor-pointer">
                        <div class="alignment-wrapper float-right rail-select">
                            <div class="row show-results" style="display: none">
                                <div class="col-sm-6">
                                    <span class="txt-right txt-bold"><p style="margin-top: 7px; margin-bottom: 0; line-height: 30px;">Pasto Lesto</p></span>
                                    <span class="txt-right"><p style="margin-bottom: 0; line-height: 10px; font-size: 12px" id="waitingTimeShow-1">Culocane</p></span>
                                </div>
                                <div class="col-sm-6">
                                    <span class="txt-right txt-bold"><p style="margin-bottom: 0; line-height: 60px; font-size: 40px;" id="timeShow-1">ERR</p></span>
                                </div>
                            </div>
                            <span class="txt-center txt-bold no-results"><p style="margin-bottom: 0; line-height: 60px;">Seleziona un intervallo orario..</p></span>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin cursor-pointer">
                        <div class="alignment-wrapper float-right rail-select">
                            <div class="row show-results" style="display: none">
                                <div class="col-sm-6">
                                    <span class="txt-right txt-bold"><p style="margin-top: 7px; margin-bottom: 0; line-height: 30px;">Mensa Povo 0</p></span>
                                    <span class="txt-right"><p style="margin-bottom: 0; line-height: 10px; font-size: 12px" id="waitingTimeShow-2">Culocane</p></span>
                                </div>
                                <div class="col-sm-6">
                                    <span class="txt-right txt-bold"><p style="margin-bottom: 0; line-height: 60px; font-size: 40px;" id="timeShow-2">ERR</p></span>
                                </div>
                            </div>
                            <span class="txt-center txt-bold no-results"><p style="margin-bottom: 0; line-height: 60px;">..scegli il giorno della settimana..</p></span>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin cursor-pointer">
                        <div class="alignment-wrapper float-right rail-select">
                            <div class="row show-results" style="display: none">
                                <div class="col-sm-6">
                                    <span class="txt-right txt-bold"><p style="margin-top: 7px; margin-bottom: 0; line-height: 30px;">Mensa Povo 1</p></span>
                                    <span class="txt-right"><p style="margin-bottom: 0; line-height: 10px; font-size: 12px" id="waitingTimeShow-3">Culocane</p></span>
                                </div>
                                <div class="col-sm-6">
                                    <span class="txt-right txt-bold"><p style="margin-bottom: 0; line-height: 60px; font-size: 40px;" id="timeShow-3">ERR</p></span>
                                </div>
                            </div>
                            <span class="txt-center txt-bold no-results"><p style="margin-bottom: 0; line-height: 60px;">..e trova quando mangiare! 👻</p></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- BUTTON  -->

        <div class="col-sm-12 col-md-4 col-lg-4 body-padding"style="padding-top: 0">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 bottom-margin">
                        <div class="alignment-wrapper float-left">
                            <div class="selector-half" style="float: left;">
                                <div class="rail-select-half">
                                    <div class="select-side">
                                        <i class="zmdi zmdi-chevron-down"></i>
                                    </div>
                                    <select title="ORA INIZIO" class="form-control btn-primary btn-primary-half expand" id="startTime">
                                        <option value="11:30">11:30</option>
                                        <option value="11:45">11:45</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:15">12:15</option>
                                        <option value="12:30">12:30</option>
                                        <option value="12:45">12:45</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:15">13:15</option>
                                        <option value="13:30">13:30</option>
                                        <option value="13:45">13:45</option>
                                    </select>
                                </div>
                            </div>
                            <div class="selector-half" style="float: left;  margin-left: 10px;">
                                <div class="rail-select-half">
                                    <div class="select-side">
                                        <i class="zmdi zmdi-chevron-down"></i>
                                    </div>
                                    <select title="ORA INIZIO" class="form-control btn-primary btn-primary-half expand" id="endTime">
                                        <option value="11:45">11:45</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:15">12:15</option>
                                        <option value="12:30">12:30</option>
                                        <option value="12:45">12:45</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:15">13:15</option>
                                        <option value="13:30">13:30</option>
                                        <option value="13:45">13:45</option>
                                        <option value="14:00">14:00</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin">
                        <div class="alignment-wrapper float-left">
                            <div class="selector">
                                <div class="rail-select">
                                    <div class="select-side">
                                        <i class="zmdi zmdi-chevron-down"></i>
                                    </div>
                                    <select title="SELEZIONA GIORNO" class="form-control btn-primary expand" id="dayOfTheWeek">
                                        <option value="0">LUNED&Igrave;</option>
                                        <option value="1">MARTED&Igrave;</option>
                                        <option value="2">MERCOLED&Igrave;</option>
                                        <option value="3">GIOVED&Igrave;</option>
                                        <option value="4">VENERD&Igrave;</option>
                                        <option value="5">SABATO</option>
                                        <option value="6">DOMENICA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin">
                        <div class="alignment-wrapper float-left">
                            <button type="button" class="btn btn-danger expand" id="submit-button">TROVA ORARIO MIGLIORE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FOOTER -->
    <div class="row">
        <div class="col-lg-12 footer">
            Copyright &copy; 2017 unEATn software engineering ii project
        </div>
    </div>
</div>

<script type="text/javascript">

    var startTimeSelector = document.getElementById("startTime");
    var endTimeSelector = document.getElementById("endTime");
    var dayOTWeekSelector = document.getElementById("dayOfTheWeek");

    if("(:isFirstRequest:)".toString() === "1") {
        $(".no-results").css("display", "block");
        $(".show-results").css("display", "none");
    }
    else {
        var actualStartTime = "(:selectedStartTime:)";
        var actualEndTime = "(:selectedEndTime:)";
        var actualDayOfTheWeek = "(:selectedDay:)";
        var bestTimes = '(:bestWaitingTimes:)';

        var time_1 = $("#timeShow-1");
        var time_2 = $("#timeShow-2");
        var time_3 = $("#timeShow-3");
        var wtime_1 = $("#waitingTimeShow-1");
        var wtime_2 = $("#waitingTimeShow-2");
        var wtime_3 = $("#waitingTimeShow-3");

        var jsonBestTimes = JSON.parse(bestTimes);
        var bestCanteenTime = [];

        if (jsonBestTimes.bestTimes === null) {
        }
        else {
            var i;
            for (i = 0; i < 3; i++) {
                var value;
                if (jsonBestTimes.bestTimes[i] === null) {
                    value = [
                        "CHIUSA",
                        "0"
                    ];
                }
                else {
                    value = [
                        jsonBestTimes.bestTimes[i].time,
                        jsonBestTimes.bestTimes[i].waitingTime
                    ];
                }
                bestCanteenTime.push(value);
            }
        }

        startTimeSelector.value = actualStartTime.toString();
        endTimeSelector.value = actualEndTime.toString();
        dayOTWeekSelector.value = actualDayOfTheWeek.toString();

        time_1.text(bestCanteenTime[0][0]);
        time_2.text(bestCanteenTime[1][0]);
        time_3.text(bestCanteenTime[2][0]);
        wtime_1.text("attesa ".concat(bestCanteenTime[0][1]).concat(" minuti"));
        wtime_2.text("attesa ".concat(bestCanteenTime[1][1]).concat(" minuti"));
        wtime_3.text("attesa ".concat(bestCanteenTime[2][1]).concat(" minuti"));

        $(".no-results").css("display", "none");
        $(".show-results").css("display", "block");
    }

    var submitBtn = document.getElementById("submit-button");
    submitBtn.onclick = function () { submitData(startTimeSelector, endTimeSelector, dayOTWeekSelector); };

    function submitData(sts, ets, dotws) {
        var day = dotws.value.toString();
        var startTime = sts.value.toString();
        var endTime = ets.value.toString();
        window.location = '/bestTime?day='.concat(day).concat("&startTime=").concat(startTime).concat("&endTime=").concat(endTime);
    }
</script>
</body>
</html>