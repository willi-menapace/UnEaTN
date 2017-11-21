<!--
    Page Name:  Home
    Project:    unEATn
    Author:     Simone Lorengo
    Date:       21.11.2017
    Note:       OK, needs debug

    Valori necessari:
    - canteenAffStatus_1 :: int or string :: default 4 :: Stato Affluenza Mensa di Povo 0
    - canteenAffStatus_2 :: int or string :: default 4 :: Stato Affluenza Mensa di Povo 1
    - canteenAffStatus_3 :: int or string :: default 4 :: Stato Affluenza Mensa Pasto Lesto
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
    <link rel="icon" href="/img/favicon.png" type="image/png" />
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
        <!-- EMOJI -->
        <div class="col-sm-12 col-sm-offset-0 col-md-4 col-md-offset-2 col-lg-4 col-lg-offset-2 body-padding">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 bottom-margin cursor-pointer" onclick="window.location='/weekChart?canteen=0';">
                        <div class="alignment-wrapper float-right">
                            <div class="icon-img" id="icon-img-1"></div>
                            <div class="icon-txt">
                                <span class="icon-txt-title">Mensa Povo 0</span>
                                <span class="icon-txt-message" id="icon-txt-message-1">Oops, qualcuno pagher&agrave; per questo</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin cursor-pointer" onclick="window.location='/weekChart?canteen=1';">
                        <div class="alignment-wrapper float-right">
                            <div class="icon-img" id="icon-img-2"></div>
                            <div class="icon-txt">
                                <span class="icon-txt-title">Mensa Povo 1</span>
                                <span class="icon-txt-message" id="icon-txt-message-2">Oops, qualcuno pagher&agrave; per questo</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin cursor-pointer" onclick="window.location='/weekChart?canteen=2';">
                        <div class="alignment-wrapper float-right">
                            <div class="icon-img" id="icon-img-3"></div>
                            <div class="icon-txt">
                                <span class="icon-txt-title">Pasto Lesto</span>
                                <span class="icon-txt-message" id="icon-txt-message-3">Oops, qualcuno pagher&agrave; per questo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- BUTTON  -->

        <div class="col-sm-12 col-md-4 col-lg-4 body-padding">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 bottom-margin">
                        <div class="alignment-wrapper float-left">
                            <button type="button" class="btn btn-primary expand" onclick="window.location='/compChart';">GRAFICO COMPARATIVO</button>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin">
                        <div class="alignment-wrapper float-left">
                            <button type="button" class="btn btn-primary expand" onclick="window.location='/weekChart';">GRAFICO SETTIMANALE</button>
                        </div>
                    </div>
                    <div class="col-sm-12 bottom-margin">
                        <div class="alignment-wrapper float-left">
                            <button type="button" class="btn btn-danger expand" onclick="window.location='/joinProject';">PARTECIPA AL PROGETTO</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="alignment-wrapper" style="height: 25px">
        <div style="vertical-align: middle;">
            <span class="icon-txt-message txt-center">STIMA VALIDA PER I SUCCESSIVI 15 MINUTI</span>
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
    var canteenAffStatus_1 = "(:canteenAffStatus_1 ~ 4:)";
    var canteenAffStatus_2 = "(:canteenAffStatus_2 ~ 4:)";
    var canteenAffStatus_3 = "(:canteenAffStatus_3 ~ 4:)";

    var imgDivID = "#icon-img-";
    var txtDivID = "#icon-txt-message-";

    setCanteenStatus(1, canteenAffStatus_1);
    setCanteenStatus(2, canteenAffStatus_2);
    setCanteenStatus(3, canteenAffStatus_3);

    function setCanteenStatus(canteen, status) {
        var txt, img;
        if(status.toString() === "0"){
            img = "closed.png";
            txt = "Eh, voleeeevi! È chiusa ora.";
        } else if(status.toString() === "1"){
            img = "empty-1.png";
            txt = "Via libera: corri a mangiare!";
        } else if(status.toString() === "2"){
            img = "busy-1.png";
            txt = "Spero che tu non abbia fretta..."
        } else if(status.toString() === "3"){
            img = "full-1.png";
            txt = "E anche oggi si mangia domani.";
        } else {
            img = "unloaded.png";
            txt = "Oops, qualcuno pagherà per questo.";
        }
        $(imgDivID.concat(canteen)).css("background-image", "url('/img/".concat(img).concat("')"));
        $(txtDivID.concat(canteen)).text(txt);
    }
</script>
</body>
</html