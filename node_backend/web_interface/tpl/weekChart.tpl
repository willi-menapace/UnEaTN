<!--
    Page Name:  Comparative Chart
    Project:    unEATn
    Author:     Simone Lorengo
    Date:       15.11.2017
    Note:       Ultimare link e richieste get

    Valori necessari:
    - selectedCanteen :: id or string :: default 1 :: Mensa selezionata
    1 -> Povo 0
    2 -> Povo 1
    3 -> Pasto Lesto

    GET:
    weekChart?canteen=x
    x con lo stesso significato di prima
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
    <link rel="icon" href="/img/favicon.png" type="image/png" />
    <!-- THEME COLOR -->
    <meta name="theme-color" content="#222222">
    <meta name="msapplication-navbutton-color" content="#222222">
    <meta name="apple-mobile-web-app-status-bar-style" content="#222222">
    <!-- STYLESHEETS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">-->
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

    <!-- CHART -->
    <div class="row">
        <div class="col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 col-lg-8 col-lg-offset-2 body-padding" id="chart">
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
                                    <select title="Seleziona Mensa" class="form-control btn-primary expand" id="canteenToShow">
                                        <option value="1">MENSA POVO 0</option>
                                        <option value="2">MENSA POVO 1</option>
                                        <option value="3">PASTO LESTO</option>
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

<script type="text/javascript">
    var selector = document.getElementById("canteenToShow");

    // QUANDO VIENE CARICATA LA PAGINA, IL SELETTORE SI PORTA SUL GIORNO SELEZIONATO
    var selectedCanteen = "(:selectedCanteen ~ 1:)";
    selector.value = selectedCanteen.toString();

    // QUANDO VIENE EFFETTUATA UNA SELEZIONE, VIENE EFFETTUATO IL REINDIRIZZAMENTO SUL GIORNO CORRETTO
    selector.onchange = function () { redirectByCanteen(selector); };

    function redirectByCanteen(selector) {
        var canteen = selector.options[selector.selectedIndex].value;
        window.location = '/weekChart?day='.concat(canteen);
    }
</script>

<script type="text/javascript">
    anychart.onDocumentReady(function() {
        // DATI DEL GRAFICO
        var dataSet = anychart.data.set([
            ['11:50', 3],
            ['12:00', 10],
            ['12:10', 12],
            ['12:20', 13],
            ['12:30', 7],
            ['12:40', 16],
            ['12:50', 22],
            ['13:00', 2],
            ['13:10', 12],
            ['13:20', 13],
            ['13:30', 7],
            ['13:40', 16],
            ['13:50', 22],
            ['14:00', 18]
        ]);

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
        chart.title('GRAFICO SETTIMANALE');
        chart.title()
            .fontSize(18)
            .fontColor('#FFFFFF')
            .fontFamily('Ubuntu')
            .fontWeight('bold')
            .padding([0, 0, 25, 5]);

        // IMPOSTAZIONI DELLE ETICHETTE DELLE SERIE
        var setupSeriesLabels = function(series, name, color) {
            series.name(name)
                .stroke('3 #fff 1')
                .fill(color);
            series.hovered().stroke('3 #fff 1');
            series.hovered().markers()
                .enabled(true)
                .type('circle')
                .size(4)
                .stroke('1.5 #fff');
            series.markers().zIndex(100);
        };

        // VARIABILE TEMPORANEA CONTENENTE LE SERIE
        var series;

        // PRIMA SERIE CON I DATI MAPPATI (POVO 0)
        var canteenToShow = selector.value;
        series = chart.area(seriesData_1);
        if(canteenToShow.toString() === "1") {
            setupSeriesLabels(series, 'Povo 0', '#FF6767');
        } else if(canteenToShow.toString() === "2") {
            setupSeriesLabels(series, 'Povo 1', '#FFDD67');
        } else if(canteenToShow.toString() === "3") {
            setupSeriesLabels(series, 'Pasto Lesto', '#67C1FF');
        } else {
            setupSeriesLabels(series, 'ERRORE CANTINA', '#FFFFFF');
        }

        // Y AXIS OFFSET
        //innerLabels = labelsInside.xAxis().labels();
        //innerLabels.offsetY(-30);

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

        // IMPOSTA L'ID DEL CONTAINER DA USARE PER IL GRAFICO
        chart.container('chart');

        // AVVIA IL DISEGNO DEL GRAFICO
        chart.draw();
    });
</script>
</body>
</html