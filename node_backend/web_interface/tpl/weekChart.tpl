<!--
    Page Name:  Comparative Chart
    Project:    unEATn
    Author:     Simone Lorengo
    Date:       21.11.2017
    Note:       OK, needs debug

    Valori necessari:
    - selectedCanteen :: id or string :: default 1 :: Mensa selezionata
    1 -> Pasto Lesto
    2 -> Povo 0
    3 -> Povo 1

    GET:
    weekChart?canteen=x
    x con il significato indicato
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

    <!-- CHARTS -->
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-0">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-1">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-2">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-3">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-4">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-5">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding chart" id="chart-6">
        </div>
    </div>
    <!-- BUTTON  -->
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 body-padding">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6 bottom-margin">
                        <div class="alignment-wrapper margin-right-null">
                            <div class="selector">
                                <div class="rail-select">
                                    <div class="select-side">
                                        <i class="zmdi zmdi-chevron-down"></i>
                                    </div>
                                    <select title="SELEZIONE MENSA" class="form-control btn-primary expand" id="canteenToShow">
                                        <option value="1">PASTO LESTO</option>
                                        <option value="2">MENSA POVO 0</option>
                                        <option value="3">MENSA POVO 1</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 bottom-margin">
                        <div class="alignment-wrapper margin-left-null">
                            <button type="button" class="btn btn-danger expand" onclick="window.location='/joinProject';">PARTECIPA AL PROGETTO</button>
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

<!-- SELEZIONE MENSA DA DATI -->
<script type="text/javascript">
    var selector = document.getElementById("canteenToShow");

    // QUANDO VIENE CARICATA LA PAGINA, IL SELETTORE SI PORTA SUL GIORNO SELEZIONATO
    var selectedCanteen = "(:selectedCanteen ~ 1:)";
    selector.value = selectedCanteen.toString();

    // QUANDO VIENE EFFETTUATA UNA SELEZIONE, VIENE EFFETTUATO IL REINDIRIZZAMENTO SUL GIORNO CORRETTO
    selector.onchange = function () { redirectByCanteen(selector); };

    function redirectByCanteen(selector) {
        var canteen = selector.options[selector.selectedIndex].value;
        window.location = '/weekChart?canteenId='.concat(canteen);
    }
</script>

<!-- ELABORAZIONE DATI GRAFICO E INIZIALIZZAZIONE-->
<script type="text/javascript">
    // LEGGE IL TESTO E NE RICAVA IL JSON
    var jsonTxt = '(:weeklyStatistics:)';
    var jsonObj = JSON.parse(jsonTxt);

    // ESEGUE LA LETTURA E LA CONVERSIONE DEI DATI
    var xValues = [];
    var i;
    for (i = 0; i < 7; i++) {
        var thisChart = document.getElementById("chart-".concat(i));
        var xValuesNum = -1;
        if (jsonObj.statistics[i] === null){
            xValuesNum = 0;
        }
        else {
            xValuesNum = jsonObj.statistics[i].length;
        }

        var dailyValues = [];
        // IN BASE AL CONTENUTO DEI DATI, DECIDE SE MOSTRARE O MENO UN DETERMINATO GRAFICO
        if(xValuesNum > 0) {
            thisChart.style.display = 'block';
            var j;
            for (j = 0; j < xValuesNum; j++) {
                var value;
                value = [
                    jsonObj.statistics[i][j].time,
                    jsonObj.statistics[i][j].waitingTime
                ];
                dailyValues.push(value);
            }
        }
        else {
            thisChart.style.display = 'none';
        }
        // SCRIVE I DATI GIORNALIERI FORMATTATI IN UN ARRAY GENERICO DI VALORI DELL'ASSE X
        xValues.push(dailyValues);
    }

    // INIZIALIZZA I 7 GRAFICI QUANDO IL DOCUMENTO E' STATO INTERAMENTE CARICATO
    anychart.onDocumentReady(function() {
        var canteenActive = selector.value;
        initializeChart("LUNEDÌ", xValues[0], "#FF6767", canteenActive, "chart-0");
        initializeChart("MARTEDÌ", xValues[1], "#FFE866", canteenActive, "chart-1");
        initializeChart("MERCOLEDÌ", xValues[2], "#94FF66", canteenActive, "chart-2");
        initializeChart("GIOVEDÌ", xValues[3], "#66FFBA", canteenActive, "chart-3");
        initializeChart("VENERDÌ", xValues[4], "#66C2FF", canteenActive, "chart-4");
        initializeChart("SABATO", xValues[5], "#8C66FF", canteenActive, "chart-5");
        initializeChart("DOMENICA", xValues[6], "#FF66F0", canteenActive, "chart-6");
    });

    // FUNZIONE GENERICA DI GENERAZIONE GRAFICI
    function initializeChart(cTitle, cValues, cColor, cCanteen, cContainer) {
        // DATI DEL GRAFICO
        var dataSet = anychart.data.set(cValues);

        // MAPPATURA DATI MENSA "POVO 0"
        var seriesData_1 = dataSet.mapAs({
            'x': 0,
            'value': 1
        });

        // IMPOSTAZIONE DEL TIPO DI GRAFICO
        chart = anychart.area();

        // IMPOSTAZIONE LA MODALITA' STACKED RISPETTO ALL'ASSE Y
        chart.yScale().stackMode('value');

        // ABILITA L'ANIMAZIONE
        chart.animation(true);

        // IMPOSTA LO SFONDO
        chart.background().fill("#222222");

        // IMPOSTAZIONE CURSORE
        var crosshair = chart.crosshair();
        crosshair.enabled(true)
            .yStroke(null)
            .xStroke('#fff')
            .zIndex(39);

        // IMPOSTAZIONI ETICHETTE SU ASSI PER CURSORE
        crosshair.yLabel().enabled(false);
        crosshair.xLabel().enabled(false);

        // IMPOSTAZIONE DEL TITOLO DEL GRAFICO
        chart.title(cTitle);
        chart.title()
            .fontSize(18)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu')
            .fontWeight('bold')
            .padding([0, 0, 25, 5]);

        // IMPOSTAZIONI DELLE LEGENDE
        var setupSeriesLabels = function(series, name, color) {
            var strokeSetup = '2 #fff 1';
            if ($(window).width() > 991){
                strokeSetup = '2 #fff 1';
            } else {
                strokeSetup = '1 #fff 1';
            }
            series.name(name)
                .stroke(strokeSetup)
                .fill(color);
            series.hovered().stroke('3 #fff 1');
            series.hovered().markers()
                .enabled(true)
                .type('circle')
                .size(4)
                .stroke('1.5 #fff');
            series.selected().markers()
                .enabled(true)
                .type('circle')
                .size(4)
                .stroke('1.5 #fff');
            series.markers().zIndex(100);
        };

        // VARIABILE TEMPORANEA CONTENENTE LE SERIE
        var series;

        // MAPPATURA DATI
        var canteenName = "non corretta: mensa non selezionata.";
        series = chart.splineArea(seriesData_1);
        if(cCanteen.toString() === "1") {
            canteenName = "Pasto Lesto";
        } else if(cCanteen.toString() === "2") {
            canteenName = "Mensa Povo 0";
        } else if(cCanteen.toString() === "3") {
            canteenName = "Mensa Povo 1";
        } else {
            canteenName = "non corretta: mensa inesistente."
        }
        setupSeriesLabels(series, 'Attesa '.concat(canteenName), cColor);

        // IMPOSTAZIONE DELLA LEGENDA GRAFICI
        chart.legend()
            .enabled(true)
            .fontSize(13)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu')
            .padding([0, 0, 20, 0]);

        // TITOLAZIONE DEGLI ASSI
        chart.xAxis().title(false);
        chart.yAxis().title('Tempo di attesa');
        chart.yAxis().title()
            .enabled(true)
            .fontSize(13)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu');

        // IMPOSTAZIONE ETICHETTE ASSI
        chart.xAxis().labels()
            .enabled(true)
            .fontSize(13)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu');
        chart.yAxis().labels()
            .enabled(true)
            .fontSize(13)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu');

        // IMPOSTAZIONE DI INTERATTIVITA' E TOOLTIP BOX
        chart.interactivity().hoverMode('by-x');
        chart.tooltip()
            .valuePostfix(' min')
            .displayMode('union')
            .fontSize(13)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu');

        // ETICHETTA IN CASO DI MANCANZA DATI
        noDataLabel = chart.noData().label();
        noDataLabel.enabled(true);
        noDataLabel.text("Nessun dato.");
        noDataLabel.fontSize(18);
        noDataLabel.fontColor('#FFFFFF');
        noDataLabel.fontFamily('Ubuntu');

        // IMPOSTA L'ID DEL CONTAINER DA USARE PER IL GRAFICO
        chart.container(cContainer);

        // AVVIA IL DISEGNO DEL GRAFICO
        chart.draw();
    }
</script>

</body>
</html>